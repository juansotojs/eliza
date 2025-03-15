import {
    Action,
    IAgentRuntime,
    ActionExample,
    elizaLogger,
    HandlerCallback,
    State,
    ModelClass,
    generateObject
} from '@elizaos/core';
import { z } from 'zod';
import examples from './examples';

interface OrderAnalysis {
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
    estimatedTotal: number;
}

export class CheckOrderAction implements Action {
    public name = 'CHECK_ORDER';
    public description = 'Analyze food order details including items, customizations, and pricing';
    public similes = [
        'ANALYZE_ORDER',
        'VERIFY_ORDER',
        'CHECK_FOOD_ORDER',
        'REVIEW_ORDER',
        'check_order',
        'analyze_order'
    ];
    public examples = examples;

    constructor() {
        elizaLogger.info('[✅ DOUBLE] CheckOrderAction - Initialized');
    }

    async validate(
        _runtime: IAgentRuntime,
        message: { content: { text?: string; action?: string } }
    ): Promise<boolean> {
        elizaLogger.info('[🔄 DOUBLE] CheckOrderAction - Validating request');

        if (!message.content.text) {
            elizaLogger.error('[❌ DOUBLE] CheckOrderAction - No text provided for analysis');
            return false;
        }

        const isExplicitOrderCheck = message.content.action === 'CHECK_ORDER';
        const hasOrderKeywords = /order|get|food|drink|meal|restaurant/i.test(message.content.text);

        const isValid = isExplicitOrderCheck || hasOrderKeywords;

        if (isValid) {
            elizaLogger.info('[✅ DOUBLE] CheckOrderAction - Validation successful');
        } else {
            elizaLogger.error('[❌ DOUBLE] CheckOrderAction - Validation failed');
        }

        return isValid;
    }

    async handler(
        runtime: IAgentRuntime,
        message: { content: { text: string } },
        state?: State,
        options?: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> {
        try {
            elizaLogger.info('[🔄 DOUBLE] CheckOrderAction - Processing order analysis request');

            const orderAnalysisSchema = z.object({
                restaurant: z.object({
                    name: z.string(),
                    type: z.string(),
                    cuisine: z.string()
                }),
                items: z.array(z.object({
                    name: z.string(),
                    size: z.string().optional(),
                    customizations: z.array(z.object({
                        type: z.enum(['add', 'remove']),
                        item: z.string(),
                        price: z.number().optional()
                    })).optional(),
                    sides: z.array(z.object({
                        name: z.string(),
                        size: z.string().optional(),
                        basePrice: z.number()
                    })).optional(),
                    drinks: z.array(z.object({
                        name: z.string(),
                        size: z.string().optional(),
                        basePrice: z.number()
                    })).optional(),
                    quantity: z.number(),
                    basePrice: z.number()
                })),
                estimatedTotal: z.number()
            });

            const context = `
Analyze the food order request based on the following information:

${message.content.text}

Provide a detailed breakdown of:
1. Restaurant information
2. Ordered items with:
   - Item names and sizes
   - Customizations (additions/removals)
   - Side dishes
   - Drinks
   - Quantities
   - Pricing
3. Estimated total cost

Format the response as a structured object with order analysis.`;

            const { object: rawAnalysis } = await generateObject({
                runtime,
                context,
                modelClass: ModelClass.LARGE,
                schema: orderAnalysisSchema
            });

            const orderAnalysis = orderAnalysisSchema.parse(rawAnalysis);

            if (callback) {
                elizaLogger.info('[✅ DOUBLE] CheckOrderAction - Analysis complete:', orderAnalysis);
                callback({
                    text: this.formatOrderSummary(orderAnalysis),
                    content: {
                        action: 'CHECK_ORDER',
                        orderAnalysis
                    }
                });
            }

            return true;
        } catch (error) {
            elizaLogger.error('[❌ DOUBLE] CheckOrderAction - Handler error:', error);
            return false;
        }
    }

    private formatOrderSummary(analysis: OrderAnalysis): string {
        let summary = `Order Summary from ${analysis.restaurant.name} (${analysis.restaurant.cuisine}):\n\n`;

        analysis.items.forEach(item => {
            summary += `${item.quantity}x ${item.name}${item.size ? ` (${item.size})` : ''} - $${item.basePrice}\n`;

            if (item.customizations?.length) {
                item.customizations.forEach(custom => {
                    summary += `  • ${custom.type === 'add' ? 'Add' : 'Remove'}: ${custom.item}${
                        custom.price ? ` (+$${custom.price})` : ''
                    }\n`;
                });
            }

            if (item.sides?.length) {
                item.sides.forEach(side => {
                    summary += `  • Side: ${side.name}${side.size ? ` (${side.size})` : ''} - $${side.basePrice}\n`;
                });
            }

            if (item.drinks?.length) {
                item.drinks.forEach(drink => {
                    summary += `  • Drink: ${drink.name}${drink.size ? ` (${drink.size})` : ''} - $${drink.basePrice}\n`;
                });
            }
        });

        summary += `\nEstimated Total: $${analysis.estimatedTotal}`;
        return summary;
    }
}