import { IAgentRuntime, ModelClass, elizaLogger, generateText } from '@elizaos/core';
import { ProjectData } from '../types/Register';

export async function generateFarcasterCast(project: ProjectData, runtime: IAgentRuntime): Promise<string> {
    elizaLogger.info('[🔄 DOUBLE] Generators - Starting Farcaster cast generation');
    elizaLogger.info('[📝 DOUBLE] Generators - Project data:', project);

    try {
        const context = `
Generate a compelling Farcaster cast (tweet) about this project:

Project Name: ${project.name}
Description: ${project.description}
${project.category ? `Category: ${project.category}` : ''}
${project.stage ? `Stage: ${project.stage}` : ''}

Requirements:
- Maximum 240 characters
- Format: Problem → Solution → How it works
- Must be engaging and clear
-
- Include relevant technical details if applicable
- End with the project link: ${project.repositoryUrl}

Generate only the cast text, no additional formatting or JSON.`;

        elizaLogger.info('[🤖 DOUBLE] Generators - Generating cast');

        const castText = await generateText({
            runtime,
            context,
            modelClass: ModelClass.LARGE,
        });

        // Format and validate the cast
        const formattedCast = formatCastText(castText, project.repositoryUrl);
        elizaLogger.info('[✅ DOUBLE] Generators - Generated cast:', formattedCast);

        return formattedCast;

    } catch (error) {
        elizaLogger.error('[❌ DOUBLE] Generators - Failed to generate Farcaster cast:', error);
        elizaLogger.error('[❌ DOUBLE] Generators - Error details:', {
            message: error.message,
            stack: error.stack
        });
        throw new Error(`Failed to generate Farcaster cast: ${error.message}`);
    }
}

function formatCastText(text: string, url?: string): string {
    // Remove any extra whitespace and newlines
    let cleanText = text.replace(/\s+/g, ' ').trim();

    // Ensure the text doesn't exceed Farcaster's limit
    const MAX_LENGTH = 240;

    if (url) {
        const urlLength = url.length + 1; // +1 for space
        const availableLength = MAX_LENGTH - urlLength;

        if (cleanText.length > availableLength) {
            cleanText = cleanText.slice(0, availableLength - 3) + '...';
        }

        return `${cleanText} ${url}`;
    }

    return cleanText.slice(0, MAX_LENGTH);
}

export async function generateTwitterTweet(project: ProjectData, runtime: IAgentRuntime): Promise<string> {
    elizaLogger.info('[🔄 DOUBLE] Generators - Starting Twitter tweet generation');
    elizaLogger.info('[📝 DOUBLE] Generators - Project data:', project);

    try {
        const context = `
Generate a compelling Twitter tweet about this project:

Project Name: ${project.name}
Description: ${project.description}
${project.category ? `Category: ${project.category}` : ''}
${project.stage ? `Stage: ${project.stage}` : ''}

Requirements:
- Maximum 280 characters
- Format: Problem → Solution → How it works
- Must be engaging and clear
- Include relevant technical details if applicable
- End with the project link: ${project.repositoryUrl}

Generate only the tweet text, no additional formatting or JSON.`;

        elizaLogger.info('[🤖 DOUBLE] Generators - Generating tweet');

        const tweetText = await generateText({
            runtime,
            context,
            modelClass: ModelClass.LARGE,
        });

        // Format and validate the tweet
        const formattedTweet = formatTweetText(tweetText, project.repositoryUrl);
        elizaLogger.info('[✅ DOUBLE] Generators - Generated tweet:', formattedTweet);

        return formattedTweet;

    } catch (error) {
        elizaLogger.error('[❌ DOUBLE] Generators - Failed to generate Twitter tweet:', error);
        elizaLogger.error('[❌ DOUBLE] Generators - Error details:', {
            message: error.message,
            stack: error.stack
        });
        throw new Error(`Failed to generate Twitter tweet: ${error.message}`);
    }
}

function formatTweetText(text: string, url?: string): string {
    // Remove any extra whitespace and newlines
    let cleanText = text.replace(/\s+/g, ' ').trim();

    // Ensure the text doesn't exceed Twitter's limit
    const MAX_LENGTH = 280;

    if (url) {
        const urlLength = url.length + 1; // +1 for space
        const availableLength = MAX_LENGTH - urlLength;

        if (cleanText.length > availableLength) {
            cleanText = cleanText.slice(0, availableLength - 3) + '...';
        }

        return `${cleanText} ${url}`;
    }

    return cleanText.slice(0, MAX_LENGTH);
}
