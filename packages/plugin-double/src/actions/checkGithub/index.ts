import {
    Action,
    IAgentRuntime,
    ActionExample,
    elizaLogger,
    HandlerCallback,
    State,
} from '@elizaos/core';
import { GithubProvider, Message, GithubAnalysis } from '../../types/Github';
import { extractGithubUrl } from '../../utils/extractors';
import examples from './examples';

export class CheckGithubAction implements Action {
    private provider: GithubProvider;
    public name = 'CHECK_GITHUB';
    public description = 'Analyze and validate GitHub repository information';
    public similes = [
        'CHECK_REPOSITORY',
        'VALIDATE_GITHUB',
        'ANALYZE_REPO',
        'check_github',
        'validate_repository',
    ];
    public examples = examples;

    constructor(provider: GithubProvider) {
        this.provider = provider;
        elizaLogger.info('[✅ DOUBLE] CheckGithubAction - Initialized');
    }

    async validate(
        _runtime: IAgentRuntime,
        message: Message
    ): Promise<boolean> {
        elizaLogger.info('[🔄 DOUBLE] CheckGithubAction - Validating request');

        if (!message.content.text && !message.content.url) {
            elizaLogger.error('[❌ DOUBLE] CheckGithubAction - No text or URL provided');
            return false;
        }

        const isExplicitCheck = message.content.action === 'CHECK_GITHUB';
        const hasGithubKeywords = /github|repo|repository/i.test(message.content.text || '');
        const hasGithubUrl = /github\.com/i.test(message.content.text || message.content.url || '');

        const isValid = isExplicitCheck || (hasGithubKeywords && hasGithubUrl);

        if (isValid) {
            elizaLogger.info('[✅ DOUBLE] CheckGithubAction - Validation successful');
        } else {
            elizaLogger.error('[❌ DOUBLE] CheckGithubAction - Validation failed');
        }

        return isValid;
    }

    async handler(
        runtime: IAgentRuntime,
        message: Message,
        state?: State,
        options?: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> {
        try {
            elizaLogger.info('[🔄 DOUBLE] CheckGithubAction - Processing GitHub check request');

            const githubUrl = message.content.url ||
                await extractGithubUrl(message.content.text || '', runtime);

            elizaLogger.info('[🔄 DOUBLE] CheckGithubAction - Analyzing repository:', githubUrl);

            const analysis = await this.provider.checkRepository(githubUrl);

            if (callback) {
                elizaLogger.info('[✅ DOUBLE] CheckGithubAction - Analysis complete:', analysis);
                callback({
                    text: this.formatAnalysis(analysis),
                    content: {
                        action: 'CHECK_GITHUB',
                        analysis
                    },
                });
            }

            return true;
        } catch (error) {
            elizaLogger.error('[❌ DOUBLE] CheckGithubAction - Handler error:', error);
            return false;
        }
    }

    private formatAnalysis(analysis: GithubAnalysis): string {
        if (!analysis.details.isValid) {
            return `Invalid GitHub repository: ${analysis.url}`;
        }

        const stats = analysis.details.stats;
        return `
GitHub Repository Analysis:
Repository: ${analysis.details.owner}/${analysis.details.repository}
Visibility: ${analysis.details.visibility}
${stats ? `
Stats:
- Stars: ${stats.stars}
- Forks: ${stats.forks}
- Open Issues: ${stats.issues}
- Last Updated: ${new Date(stats.lastUpdate).toLocaleDateString()}
` : ''}
${analysis.details.topics?.length ? `Topics: ${analysis.details.topics.join(', ')}` : ''}
${analysis.details.languages?.length ? `Languages: ${analysis.details.languages.join(', ')}` : ''}
`;
    }
}