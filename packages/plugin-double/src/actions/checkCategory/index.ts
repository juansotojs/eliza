import {
    Action,
    IAgentRuntime,
    ActionExample,
    elizaLogger,
    HandlerCallback,
    State,
} from '@elizaos/core';
import { checkProjectCategory, CategoryAnalysis } from '../../utils/categoryChecker';
import examples from './examples';

export class CheckProjectCategoryAction implements Action {
    public name = 'CHECK_PROJECT_CATEGORY';
    public description = 'Analyze and determine the category of a project';
    public similes = [
        'CHECK_CATEGORY',
        'ANALYZE_CATEGORY',
        'GET_PROJECT_CATEGORY',
        'DETERMINE_CATEGORY',
        'check_category',
        'analyze_category',
    ];
    public examples = examples;

    constructor() {
        elizaLogger.info('[✅ DOUBLE] CheckProjectCategoryAction - Initialized');
    }

    async validate(
        _runtime: IAgentRuntime,
        message: { content: { text?: string; action?: string } }
    ): Promise<boolean> {
        elizaLogger.info('[🔄 DOUBLE] CheckProjectCategoryAction - Validating request');

        if (!message.content.text) {
            elizaLogger.error('[❌ DOUBLE] CheckProjectCategoryAction - No text provided for analysis');
            return false;
        }

        const isExplicitCategoryCheck = message.content.action === 'CHECK_PROJECT_CATEGORY';
        const hasCategoryKeywords = /category|type|classification|kind/i.test(message.content.text);

        const isValid = isExplicitCategoryCheck || hasCategoryKeywords;

        if (isValid) {
            elizaLogger.info('[✅ DOUBLE] CheckProjectCategoryAction - Validation successful');
        } else {
            elizaLogger.error('[❌ DOUBLE] CheckProjectCategoryAction - Validation failed');
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
            elizaLogger.info('[🔄 DOUBLE] CheckProjectCategoryAction - Processing category analysis request');

            const categoryAnalysis = await checkProjectCategory(message.content.text, runtime);

            if (callback) {
                elizaLogger.info('[✅ DOUBLE] CheckProjectCategoryAction - Analysis complete:', categoryAnalysis);
                callback({
                    text: `Your project belongs to the ${categoryAnalysis.category} category.`,
                    content: {
                        action: 'CHECK_PROJECT_CATEGORY',
                        categoryAnalysis
                    },
                });
            }

            return true;
        } catch (error) {
            elizaLogger.error('[❌ DOUBLE] CheckProjectCategoryAction - Handler error:', error);
            return false;
        }
    }
}