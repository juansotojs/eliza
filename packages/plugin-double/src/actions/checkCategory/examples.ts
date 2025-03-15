import { ActionExample } from '@elizaos/core';

export const examples: ActionExample[][] = [
    [
        {
            user: '{{user1}}',
            content: {
                text: 'Check the category of my DeFi project SwapMaster. We provide decentralized token swapping, liquidity pools, and yield farming opportunities.',
                action: 'CHECK_PROJECT_CATEGORY'
            },
        },
        {
            user: '{{user2}}',
            content: {
                text: 'Your project belongs to the DeFi category.',
                action: 'CHECK_PROJECT_CATEGORY',
                categoryAnalysis: {
                    category: 'DeFi',
                    details: {
                        description: 'Decentralized Finance platform focusing on token swapping and yield generation',
                        mainFeatures: [
                            'Token swapping',
                            'Liquidity pools',
                            'Yield farming'
                        ],
                        relatedCategories: [
                            'Exchange',
                            'Infrastructure',
                            'Analytics'
                        ],
                        commonActions: [
                            'Token swaps',
                            'Liquidity provision',
                            'Yield optimization'
                        ],
                        marketTrends: [
                            'Growing DEX volume',
                            'Multi-chain integration',
                            'Yield optimization tools'
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
                text: 'What category does my project ArtBlock fit in? We\'re creating an NFT marketplace for digital artists with built-in royalty management.',
                action: 'CHECK_PROJECT_CATEGORY'
            },
        },
        {
            user: '{{user2}}',
            content: {
                text: 'Your project belongs to the NFT category.',
                action: 'CHECK_PROJECT_CATEGORY',
                categoryAnalysis: {
                    category: 'NFT',
                    details: {
                        description: 'NFT marketplace platform for digital artists',
                        mainFeatures: [
                            'NFT minting',
                            'Marketplace',
                            'Royalty management'
                        ],
                        relatedCategories: [
                            'Art',
                            'Social',
                            'DeFi'
                        ],
                        commonActions: [
                            'Minting NFTs',
                            'Trading artwork',
                            'Collecting royalties'
                        ],
                        marketTrends: [
                            'Artist-focused platforms',
                            'Automated royalties',
                            'Social features'
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
                text: 'Can you help determine the category for my project GameVerse? It\'s a blockchain-based gaming platform with play-to-earn mechanics and in-game NFT items.',
                action: 'CHECK_PROJECT_CATEGORY'
            },
        },
        {
            user: '{{user2}}',
            content: {
                text: 'Your project belongs to the Gaming category.',
                action: 'CHECK_PROJECT_CATEGORY',
                categoryAnalysis: {
                    category: 'Gaming',
                    details: {
                        description: 'Blockchain gaming platform with P2E mechanics',
                        mainFeatures: [
                            'Play-to-earn mechanics',
                            'In-game NFTs',
                            'Virtual economy'
                        ],
                        relatedCategories: [
                            'NFT',
                            'Metaverse',
                            'DeFi'
                        ],
                        commonActions: [
                            'Gaming',
                            'Asset trading',
                            'Token rewards'
                        ],
                        marketTrends: [
                            'P2E adoption',
                            'Cross-game assets',
                            'Game guilds'
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
                text: 'Help me identify the category for PrivacyGuard - we\'re building a zero-knowledge proof system for private transactions and data verification.',
                action: 'CHECK_PROJECT_CATEGORY'
            },
        },
        {
            user: '{{user2}}',
            content: {
                text: 'Your project belongs to the Privacy category.',
                action: 'CHECK_PROJECT_CATEGORY',
                categoryAnalysis: {
                    category: 'Privacy',
                    details: {
                        description: 'Privacy-focused protocol using zero-knowledge proofs',
                        mainFeatures: [
                            'Zero-knowledge proofs',
                            'Private transactions',
                            'Data verification'
                        ],
                        relatedCategories: [
                            'Infrastructure',
                            'DeFi',
                            'Security'
                        ],
                        commonActions: [
                            'Private transfers',
                            'Identity verification',
                            'Data protection'
                        ],
                        marketTrends: [
                            'ZK technology adoption',
                            'Privacy regulations',
                            'Cross-chain privacy'
                        ]
                    }
                }
            },
        },
    ]
];

export default examples;