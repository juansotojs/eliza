import { elizaLogger, IAgentRuntime, generateText, ModelClass } from '@elizaos/core';

interface OrderItem {
    name: string;
    size?: string;
    quantity: number;
    customizations?: Array<{
        type: 'add' | 'remove' | 'style' | 'entree' | 'side';
        item: string;
        price?: number;
    }>;
    basePrice?: number;
}

interface Restaurant {
    name: string;
    type: string;
    cuisine: string;
}

interface OrderDetails {
    restaurant: Restaurant;
    items: OrderItem[];
    estimatedTotal: number;
    deliveryAddress?: string;
    specialInstructions?: string;
    pickupDetails?: {
        location: string;
        preferredTime: string;
    };
}

export async function extractOrderDetails(text: string, runtime: IAgentRuntime): Promise<OrderDetails> {
    elizaLogger.info('[🔄 DOUBLE] OrderExtractor - Starting order extraction');
    elizaLogger.info('[📝 DOUBLE] OrderExtractor - Input text:', text);

    try {
        const context = `
Extract food order details from the following text:

"${text}"

Return a JSON object with the following structure:
{
  "restaurant": {
    "name": "Restaurant Name",
    "type": "Restaurant Type (Fast Food, Casual Dining, etc.)",
    "cuisine": "Cuisine Type"
  },
  "items": [
    {
      "name": "Item Name",
      "size": "Size (if applicable)",
      "quantity": number,
      "customizations": [
        {
          "type": "add/remove/style/entree/side",
          "item": "Customization Name",
          "price": number (optional)
        }
      ],
      "basePrice": estimated base price (optional)
    }
  ],
  "estimatedTotal": estimated total price,
  "deliveryAddress": "Delivery Address (if mentioned)",
  "specialInstructions": "Special Instructions (if mentioned)",
  "pickupDetails": {
    "location": "Pickup Location (if mentioned)",
    "preferredTime": "Preferred Pickup Time (if mentioned)"
  }
}

Only include fields that are explicitly mentioned or can be reasonably inferred from the text.`;

        elizaLogger.info('[🤖 DOUBLE] OrderExtractor - Generating order details');

        const orderDetailsText = await generateText({
            runtime,
            context,
            modelClass: ModelClass.LARGE,
        });

        // Parse the JSON response
        const orderDetails = JSON.parse(orderDetailsText);
        elizaLogger.info('[✅ DOUBLE] OrderExtractor - Extracted order details:', orderDetails);

        return orderDetails;
    } catch (error) {
        elizaLogger.error('[❌ DOUBLE] OrderExtractor - Failed to extract order details:', error);
        throw new Error(`Failed to extract order details: ${error.message}`);
    }
}