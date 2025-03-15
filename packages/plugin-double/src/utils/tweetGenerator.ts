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

export async function generateOrderTweet(orderDetails: OrderDetails, runtime: IAgentRuntime): Promise<string> {
    elizaLogger.info('[🔄 DOUBLE] TweetGenerator - Starting order tweet generation');
    elizaLogger.info('[📝 DOUBLE] TweetGenerator - Order details:', orderDetails);

    try {
        const itemsList = orderDetails.items.map(item => 
            `${item.quantity}x ${item.size ? item.size + ' ' : ''}${item.name}`
        ).join(', ');

        const context = `
Generate a fun, engaging tweet about ordering food:

Restaurant: ${orderDetails.restaurant.name}
Cuisine: ${orderDetails.restaurant.cuisine}
Order: ${itemsList}
Total: $${orderDetails.estimatedTotal.toFixed(2)}

Requirements:
- Maximum 280 characters
- Be casual and enthusiastic
- Don't include personal information
- Use 1-2 relevant hashtags
- Make it sound like a real person tweeting about their food order
- Don't mention specific delivery services unless in the restaurant name

Generate only the tweet text, no additional formatting or JSON.`;

        elizaLogger.info('[🤖 DOUBLE] TweetGenerator - Generating tweet');

        const tweetText = await generateText({
            runtime,
            context,
            modelClass: ModelClass.LARGE,
        });

        // Format and validate the tweet
        const formattedTweet = formatTweetText(tweetText);
        elizaLogger.info('[✅ DOUBLE] TweetGenerator - Generated order tweet:', formattedTweet);

        return formattedTweet;

    } catch (error) {
        elizaLogger.error('[❌ DOUBLE] TweetGenerator - Failed to generate order tweet:', error);
        elizaLogger.error('[❌ DOUBLE] TweetGenerator - Error details:', {
            message: error.message,
            stack: error.stack
        });
        
        // Fallback to a simple tweet
        return `Just ordered some delicious food from ${orderDetails.restaurant.name}! Can't wait for it to arrive. #FoodDelivery`;
    }
}

function formatTweetText(text: string): string {
    // Remove any extra whitespace and newlines
    let cleanText = text.replace(/\s+/g, ' ').trim();

    // Ensure the text doesn't exceed Twitter's limit
    const MAX_LENGTH = 280;
    
    if (cleanText.length > MAX_LENGTH) {
        cleanText = cleanText.slice(0, MAX_LENGTH - 3) + '...';
    }

    return cleanText;
} 