import { IAgentRuntime, ModelClass, generateObject, elizaLogger } from '@elizaos/core';
import { z } from 'zod';

export interface CategoryAnalysis {
    category: string;
    details: {
        description: string;
        mainFeatures: string[];
        relatedCategories: string[];
        commonActions: string[];
        marketTrends: string[];
    };
}

// Define common blockchain/web3 categories
export const projectCategories = [
    'DeFi', 'NFT', 'Gaming', 'Infrastructure', 'Social',
    'DAO', 'Privacy', 'Layer2', 'DID', 'Metaverse',
    'AI', 'Analytics', 'Security', 'Wallet', 'Exchange'
] as const;

export async function checkProjectCategory(text: string, runtime: IAgentRuntime): Promise<CategoryAnalysis> {
    elizaLogger.info('[🔄 DOUBLE] CategoryChecker - Starting category analysis');
    elizaLogger.info('[📝 DOUBLE] CategoryChecker - Input text:', text);

    try {
        // Define the schema using Zod
        const categoryAnalysisSchema = z.object({
            category: z.string(),
            details: z.object({
                description: z.string(),
                mainFeatures: z.array(z.string()),
                relatedCategories: z.array(z.string()),
                commonActions: z.array(z.string()),
                marketTrends: z.array(z.string())
            })
        });

        const context = `
Analyze the project category based on the following information:

${text}

Determine the project's category and provide detailed analysis:

1. Main Category (common categories include):
   - DeFi: Decentralized Finance
   - NFT: Non-Fungible Tokens
   - Gaming: Blockchain Games
   - Infrastructure: Blockchain Infrastructure
   - Social: Social Platforms
   - DAO: Decentralized Autonomous Organizations
   - Privacy: Privacy Solutions
   - Layer2: Scaling Solutions
   - DID: Decentralized Identity
   - Metaverse: Virtual Worlds
   - AI: Artificial Intelligence
   - Analytics: Data Analysis
   - Security: Security Solutions
   - Wallet: Crypto Wallets
   - Exchange: Trading Platforms

2. Provide detailed analysis including:
   - Category description
   - Main features/characteristics
   - Related categories
   - Common actions/use cases
   - Current market trends

Format the response as a structured object with category analysis.`;

        elizaLogger.info('[🤖 DOUBLE] CategoryChecker - Generating analysis');

        const { object: rawAnalysis } = await generateObject({
            runtime,
            context,
            modelClass: ModelClass.LARGE,
            schema: categoryAnalysisSchema
        });

        elizaLogger.info('[📊 DOUBLE] CategoryChecker - Generated raw analysis:', rawAnalysis);

        const categoryAnalysis = categoryAnalysisSchema.parse(rawAnalysis);
        elizaLogger.info('[✅ DOUBLE] CategoryChecker - Validated category analysis:', categoryAnalysis);

        return categoryAnalysis;

    } catch (error) {
        elizaLogger.error('[❌ DOUBLE] CategoryChecker - Failed to analyze project category:', error);
        elizaLogger.error('[❌ DOUBLE] CategoryChecker - Error details:', {
            message: error.message,
            stack: error.stack
        });
        throw new Error(`Failed to analyze project category: ${error.message}`);
    }
}

// Category-specific actions and characteristics
export const categoryCharacteristics: Record<string, {
    actions: string[];
    features: string[];
}> = {
    DeFi: {
        actions: ['Lending', 'Borrowing', 'Trading', 'Yield Farming', 'Staking'],
        features: ['Liquidity Pools', 'Smart Contracts', 'Token Economics']
    },
    NFT: {
        actions: ['Minting', 'Trading', 'Collecting', 'Curating', 'Displaying'],
        features: ['Digital Art', 'Collectibles', 'Marketplace', 'Royalties']
    },
    Gaming: {
        actions: ['Playing', 'Trading Items', 'Earning Rewards', 'Team Building'],
        features: ['Game Assets', 'Play-to-Earn', 'Virtual Worlds']
    },
    Infrastructure: {
        actions: ['Network Building', 'Protocol Development', 'Node Operation'],
        features: ['Scalability', 'Interoperability', 'Security']
    },
    Social: {
        actions: ['Posting', 'Following', 'Engaging', 'Content Creation'],
        features: ['Social Graph', 'Content Discovery', 'Rewards']
    }
};