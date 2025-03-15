import { ActionExample } from '@elizaos/core';

export const examples: ActionExample[][] = [
    [
        {
            user: '{{user1}}',
            content: {
                text: 'Register my new project ElizaOS, a decentralized AI assistant platform. Repository: https://github.com/elizaos/eliza Stage: MVP Category: AI Description: ElizaOS is a decentralized platform that enables AI assistants to interact with users across multiple channels while maintaining privacy and security.',
                action: 'REGISTER_PROJECT'
            },
        },
        {
            user: '{{user2}}',
            content: {
                text: 'Project registered successfully',
                action: 'REGISTER_PROJECT',
                project: {
                    name: 'ElizaOS',
                    description: 'ElizaOS is a decentralized platform that enables AI assistants to interact with users across multiple channels while maintaining privacy and security.',
                    repositoryUrl: 'https://github.com/elizaos/eliza',
                    stage: 'MVP',
                    category: 'AI',
                    productionUrl: null,
                    website: null
                }
            },
        },
    ],
    [
        {
            user: '{{user1}}',
            content: {
                text: 'I want to register my project called CryptoTrader. It\'s a prototype stage cryptocurrency trading bot. You can find it at https://github.com/cryptotrader/bot. Category is DeFi.',
                action: 'REGISTER_PROJECT'
            },
        },
        {
            user: '{{user2}}',
            content: {
                text: 'Project registered successfully',
                action: 'REGISTER_PROJECT',
                project: {
                    name: 'CryptoTrader',
                    description: 'A cryptocurrency trading bot platform',
                    repositoryUrl: 'https://github.com/cryptotrader/bot',
                    stage: 'PROTOTYPE',
                    category: 'DeFi',
                    productionUrl: null,
                    website: null
                }
            },
        },
    ],
    [
        {
            user: '{{user1}}',
            content: {
                text: 'Please register my funded project MetaverseHub - a virtual reality social platform. Our code is at https://github.com/metaverse/hub and you can try it at https://metaversehub.io. Category: Metaverse',
            },
        },
        {
            user: '{{user2}}',
            content: {
                text: 'Project registered successfully',
                action: 'REGISTER_PROJECT',
                project: {
                    name: 'MetaverseHub',
                    description: 'A virtual reality social platform',
                    repositoryUrl: 'https://github.com/metaverse/hub',
                    stage: 'FUNDED',
                    category: 'Metaverse',
                    productionUrl: 'https://metaversehub.io',
                    website: 'https://metaversehub.io'
                }
            },
        },
    ],
    [
        {
            user: '{{user1}}',
            content: {
                text: 'Hi, I\'m working on an idea called DataGuardian. It\'s in ideation phase, focusing on data privacy solutions. Repository: https://github.com/dataguardian/core Category: Privacy',
            },
        },
        {
            user: '{{user2}}',
            content: {
                text: 'Project registered successfully',
                action: 'REGISTER_PROJECT',
                project: {
                    name: 'DataGuardian',
                    description: 'Data privacy solutions platform',
                    repositoryUrl: 'https://github.com/dataguardian/core',
                    stage: 'IDEATION',
                    category: 'Privacy',
                    productionUrl: null,
                    website: null
                }
            },
        },
    ]
];

export default examples;