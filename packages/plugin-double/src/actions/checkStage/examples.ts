import { ActionExample } from '@elizaos/core';

export const examples: ActionExample[][] = [
    [
        {
            user: '{{user1}}',
            content: {
                text: 'Check the stage of my project ElizaOS. We have a working prototype with basic AI functionality implemented, technical documentation is complete, and we\'re following our development roadmap.',
                action: 'CHECK_PROJECT_STAGE'
            },
        },
        {
            user: '{{user2}}',
            content: {
                text: 'Based on the analysis, your project is in the PROTOTYPE stage.',
                action: 'CHECK_PROJECT_STAGE',
                stageAnalysis: {
                    currentStage: 'PROTOTYPE',
                    stageDetails: {
                        description: 'Project has a working prototype with basic functionality',
                        completedActions: [
                            'Basic AI functionality implemented',
                            'Technical documentation complete',
                            'Development roadmap established'
                        ],
                        nextSteps: [
                            'Implement core features',
                            'Begin user testing',
                            'Prepare for MVP release'
                        ],
                        requirements: [
                            'Complete core feature set',
                            'User testing feedback',
                            'Initial performance metrics'
                        ]
                    }
                }
            },
        },
    ],
    [
        {
            user: '{{user1}}',
            content: {
                text: 'What stage is my project CryptoTrader in? We have an active user base of 1000 traders, our infrastructure is scaling well, and we\'re implementing our revenue model.',
                action: 'CHECK_PROJECT_STAGE'
            },
        },
        {
            user: '{{user2}}',
            content: {
                text: 'Your project is in the GROWTH stage.',
                action: 'CHECK_PROJECT_STAGE',
                stageAnalysis: {
                    currentStage: 'GROWTH',
                    stageDetails: {
                        description: 'Project has active users and is scaling operations',
                        completedActions: [
                            'Active user base established',
                            'Infrastructure scaling',
                            'Revenue model implementation'
                        ],
                        nextSteps: [
                            'Expand user acquisition',
                            'Optimize revenue streams',
                            'Seek investment opportunities'
                        ],
                        requirements: [
                            'Proven growth metrics',
                            'Sustainable revenue model',
                            'Scalable infrastructure'
                        ]
                    }
                }
            },
        },
    ]
];

export default examples;