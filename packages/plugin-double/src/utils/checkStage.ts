import { IAgentRuntime, ModelClass, generateObject, elizaLogger } from '@elizaos/core';
import { ProjectStage } from '../types/Register';
import { z } from 'zod';

export interface StageAnalysis {
    currentStage: ProjectStage;
    stageDetails: {
        description: string;
        completedActions: string[];
        nextSteps: string[];
        requirements: string[];
    };
}

export async function checkProjectStage(text: string, runtime: IAgentRuntime): Promise<StageAnalysis> {
    elizaLogger.info('[🔄 DOUBLE] StageChecker - Starting stage analysis');
    elizaLogger.info('[📝 DOUBLE] StageChecker - Input text:', text);

    try {
        // Define the schema using Zod
        const stageAnalysisSchema = z.object({
            currentStage: z.enum(['IDEATION', 'PROTOTYPE', 'MVP', 'GROWTH', 'FUNDED'] as const),
            stageDetails: z.object({
                description: z.string(),
                completedActions: z.array(z.string()),
                nextSteps: z.array(z.string()),
                requirements: z.array(z.string())
            })
        });

        // Generate context for the LLM
        const context = `
Analyze the project stage based on the following information:

${text}

Determine the project's current stage and provide detailed analysis:

1. Current Stage (must be one of):
   - IDEATION: Initial concept phase
   - PROTOTYPE: Basic working version
   - MVP: Minimum viable product
   - GROWTH: Active user growth
   - FUNDED: Received significant funding

2. For the identified stage, provide:
   - Description of current stage
   - Completed actions/milestones
   - Next steps needed
   - Requirements for next stage

Format the response as a structured object with stage analysis.`;

        elizaLogger.info('[🤖 DOUBLE] StageChecker - Generating analysis');

        // Use generateObject with schema
        const { object: rawAnalysis } = await generateObject({
            runtime,
            context,
            modelClass: ModelClass.LARGE,
            schema: stageAnalysisSchema
        });

        elizaLogger.info('[📊 DOUBLE] StageChecker - Generated raw analysis:', rawAnalysis);

        // Parse and validate with Zod schema
        const stageAnalysis = stageAnalysisSchema.parse(rawAnalysis);
        elizaLogger.info('[✅ DOUBLE] StageChecker - Validated stage analysis:', stageAnalysis);

        return stageAnalysis;

    } catch (error) {
        elizaLogger.error('[❌ DOUBLE] StageChecker - Failed to analyze project stage:', error);
        elizaLogger.error('[❌ DOUBLE] StageChecker - Error details:', {
            message: error.message,
            stack: error.stack
        });
        throw new Error(`Failed to analyze project stage: ${error.message}`);
    }
}

// Stage-specific criteria and requirements
export const stageRequirements: Record<ProjectStage, string[]> = {
    IDEATION: [
        'Clear project concept',
        'Basic documentation',
        'Market research',
        'Initial team formation'
    ],
    PROTOTYPE: [
        'Working proof of concept',
        'Basic functionality implemented',
        'Technical documentation',
        'Development roadmap'
    ],
    MVP: [
        'Core features implemented',
        'User testing completed',
        'Bug fixes and improvements',
        'Initial user feedback'
    ],
    GROWTH: [
        'Active user base',
        'Scaling infrastructure',
        'Marketing strategy',
        'Revenue model implementation'
    ],
    FUNDED: [
        'Secured investment',
        'Growth metrics',
        'Team expansion',
        'Long-term strategy'
    ]
};

// Helper function to validate stage transitions
export function validateStageTransition(currentStage: ProjectStage, targetStage: ProjectStage): boolean {
    const stageOrder: ProjectStage[] = ['IDEATION', 'PROTOTYPE', 'MVP', 'GROWTH', 'FUNDED'];
    const currentIndex = stageOrder.indexOf(currentStage);
    const targetIndex = stageOrder.indexOf(targetStage);

    // Can only move one stage at a time
    return targetIndex === currentIndex + 1;
}