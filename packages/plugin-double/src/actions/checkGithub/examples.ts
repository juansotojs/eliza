import { ActionExample } from '@elizaos/core';

export const examples: ActionExample[][] = [
    [
        {
            user: '{{user1}}',
            content: {
                text: 'Check this GitHub repository: https://github.com/elizaos/eliza',
                action: 'CHECK_GITHUB'
            },
        },
        {
            user: '{{user2}}',
            content: {
                text: 'GitHub repository analysis complete.',
                action: 'CHECK_GITHUB',
                analysis: {
                    url: 'https://github.com/elizaos/eliza',
                    details: {
                        isValid: true,
                        owner: 'elizaos',
                        repository: 'eliza',
                        visibility: 'public',
                        stats: {
                            stars: 150,
                            forks: 25,
                            issues: 10,
                            lastUpdate: '2024-01-15T10:30:00Z'
                        },
                        topics: ['ai', 'blockchain', 'web3'],
                        languages: ['TypeScript', 'Solidity']
                    }
                }
            },
        },
    ],
    [
        {
            user: '{{user1}}',
            content: {
                text: 'Validate my repository at github.com/invalid/repo',
                action: 'CHECK_GITHUB'
            },
        },
        {
            user: '{{user2}}',
            content: {
                text: 'Invalid GitHub repository.',
                action: 'CHECK_GITHUB',
                analysis: {
                    url: 'https://github.com/invalid/repo',
                    details: {
                        isValid: false,
                        owner: '',
                        repository: '',
                        visibility: 'private'
                    }
                }
            },
        },
    ]
];

export default examples;