import {
    Action,
    IAgentRuntime,
    ActionExample,
    elizaLogger,
    HandlerCallback,
    State,
    Message
} from '@elizaos/core';
import { UberEatsProvider } from '../../providers/UberEatsProvider';
import examples from './examples';
import { extractOrderDetails } from '../../utils/orderExtractor';
import { generateOrderTweet } from '../../utils/tweetGenerator';
import { safeLog } from '../../utils/logging';

interface OrderDetails {
    restaurant: {
        name: string;
        type: string;
        cuisine: string;
    };
    items: {
        name: string;
        size?: string;
        customizations?: {
            type: 'add' | 'remove';
            item: string;
            price?: number;
        }[];
        sides?: {
            name: string;
            size?: string;
            basePrice: number;
        }[];
        drinks?: {
            name: string;
            size?: string;
            basePrice: number;
        }[];
        quantity: number;
        basePrice: number;
    }[];
    deliveryAddress?: string;
    pickupDetails?: {
        location: string;
        preferredTime: string;
    };
    estimatedTotal: number;
}

interface OrderConfirmation {
    orderId: string;
    status: 'CONFIRMED' | 'FAILED' | 'PENDING';
    estimatedDelivery?: string;
    estimatedPickup?: string;
    trackingUrl?: string;
    pickupLocation?: string;
    pickupCode?: string;
    paymentStatus: 'COMPLETED' | 'PENDING' | 'FAILED';
    total: number;
}

export class RegisterOrderAction implements Action {
    private provider: UberEatsProvider;
    public name = 'REGISTER_ORDER';
    public description = 'Place a food order with the specified restaurant';
    public similes = [
        'PLACE_ORDER',
        'SUBMIT_ORDER',
        'ORDER_FOOD',
        'CONFIRM_ORDER',
        'place_order',
        'submit_order'
    ];
    public examples = examples;

    constructor(provider: UberEatsProvider) {
        this.provider = provider;
        elizaLogger.info('[✅ DOUBLE] RegisterOrderAction - Initialized');
    }

    async validate(message: Message): Promise<boolean> {
        elizaLogger.info('[🔄 DOUBLE] RegisterOrderAction - Validating request');

        if (!message.content?.text) {
            return false;
        }

        const text = message.content.text.toLowerCase();

        // First check if it's explicitly a food order
        if (message.content.action === 'REGISTER_ORDER') {
            return true;
        }

        // Check for food-related keywords
        const foodKeywords = [
            'order', 'food', 'eat', 'delivery', 'pickup',
            'restaurant', 'hungry', 'lunch', 'dinner',
            'tacos', 'burger', 'pizza', 'ceviche', 'horchata'
        ];

        return foodKeywords.some(keyword => text.includes(keyword));
    }

    async handler(
        runtime: IAgentRuntime,
        message: Message,
        state?: State,
        options?: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> {
        try {
            elizaLogger.info('[🔄 DOUBLE] RegisterOrderAction - Processing order request');

            // Extract order details if not provided
            let orderDetails = message.content.orderDetails;
            if (!orderDetails) {
                try {
                    orderDetails = await extractOrderDetails(message.content.text || '', runtime);
                    elizaLogger.info('[✅ DOUBLE] RegisterOrderAction - Extracted order details:', orderDetails);
                } catch (extractError) {
                    elizaLogger.error('[❌ DOUBLE] RegisterOrderAction - Failed to extract order details:', extractError);
                    return false;
                }
            }

            if (!orderDetails) {
                elizaLogger.error('[❌ DOUBLE] RegisterOrderAction - No order details available');
                return false;
            }

            // Generate a tweet about the order
            const tweetText = await generateOrderTweet(orderDetails, runtime);
            elizaLogger.info('[🔄 DOUBLE] RegisterOrderAction - Generated tweet text:', tweetText);

            // Process the order with UberEats
            try {
                const orderResult = await this.provider.placeOrder({
                    restaurantId: orderDetails.restaurant.name,
                    items: orderDetails.items.map(item => ({
                        menuItemId: item.name,
                        quantity: item.quantity,
                        customizations: item.customizations?.map(c => ({
                            id: c.item,
                            selectedOptions: [c.type]
                        }))
                    })),
                    deliveryAddress: orderDetails.deliveryAddress || 'Default Address',
                    specialInstructions: orderDetails.specialInstructions
                });

                elizaLogger.info('[✅ DOUBLE] RegisterOrderAction - Order placed successfully:', orderResult);

                if (callback) {
                    callback({
                        text: `Your order from ${orderDetails.restaurant.name} has been placed successfully! Your food will be delivered shortly.`,
                        content: {
                            action: 'REGISTER_ORDER',
                            orderConfirmation: {
                                orderId: orderResult.orderId,
                                status: 'CONFIRMED',
                                estimatedDelivery: orderResult.estimatedDelivery,
                                paymentStatus: 'COMPLETED',
                                total: orderDetails.estimatedTotal
                            },
                            socialPosts: {
                                twitter: tweetText
                            }
                        }
                    });
                }

                return true;
            } catch (orderError) {
                elizaLogger.error('[❌ DOUBLE] RegisterOrderAction - Failed to place order:', orderError);

                if (callback) {
                    callback({
                        text: `I'm sorry, but there was an issue placing your order with ${orderDetails.restaurant.name}. Please try again later or contact the restaurant directly.`,
                        content: {
                            action: 'REGISTER_ORDER',
                            error: {
                                message: orderError.message,
                                code: 'ORDER_PLACEMENT_FAILED'
                            }
                        }
                    });
                }

                return false;
            }
        } catch (error) {
            elizaLogger.error('[❌ DOUBLE] RegisterOrderAction - Handler error:', error);
            return false;
        }
    }
}