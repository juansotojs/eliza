import {
    Action,
    IAgentRuntime,
    ActionExample,
    elizaLogger,
    HandlerCallback,
    State,
} from '@elizaos/core';
import { checkProjectStage, StageAnalysis } from '../../utils/checkStage';
import examples from './examples';

export class CheckProjectStageAction implements Action {
    public name = 'CHECK_PROJECT_STAGE';
    public description = 'Analyze and determine the current stage of a project';
    public similes = [
        'CHECK_STAGE',
        'ANALYZE_STAGE',
        'GET_PROJECT_STAGE',
        'DETERMINE_STAGE',
        'check_stage',
        'analyze_stage',
    ];
    public examples = examples;

    constructor() {
        elizaLogger.info('[✅ DOUBLE] CheckProjectStageAction - Initialized');
    }

    async validate(
        _runtime: IAgentRuntime,
        message: { content: { text?: string; action?: string } }
    ): Promise<boolean> {
        elizaLogger.info('[🔄 DOUBLE] CheckProjectStageAction - Validating request');

        // Check if we have text to analyze
        if (!message.content.text) {
            elizaLogger.error('[❌ DOUBLE] CheckProjectStageAction - No text provided for analysis');
            return false;
        }

        // Check if this is explicitly for stage checking or if it contains relevant keywords
        const isExplicitStageCheck = message.content.action === 'CHECK_PROJECT_STAGE';
        const hasStageKeywords = /stage|phase|progress|status/i.test(message.content.text);

        const isValid = isExplicitStageCheck || hasStageKeywords;

        if (isValid) {
            elizaLogger.info('[✅ DOUBLE] CheckProjectStageAction - Validation successful');
        } else {
            elizaLogger.error('[❌ DOUBLE] CheckProjectStageAction - Validation failed');
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
            elizaLogger.info('[🔄 DOUBLE] CheckProjectStageAction - Processing stage analysis request');

            const stageAnalysis = await checkProjectStage(message.content.text, runtime);

            if (callback) {
                elizaLogger.info('[✅ DOUBLE] CheckProjectStageAction - Analysis complete:', stageAnalysis);
                callback({
                    text: `Your project is in the ${stageAnalysis.currentStage} stage.`,
                    content: {
                        action: 'CHECK_PROJECT_STAGE',
                        stageAnalysis
                    },
                });
            }

            return true;
        } catch (error) {
            elizaLogger.error('[❌ DOUBLE] CheckProjectStageAction - Handler error:', error);
            return false;
        }
    }
}