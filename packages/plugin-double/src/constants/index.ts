export const DEFAULT_ADMIN_ID = 'b8b593c0-dae3-42d4-8dab-78c4d176ecd6';

export const API_DEFAULTS = {
    BASE_URL: process.env.REGISTER_API_URL || 'http://localhost:3000/api',
    TIMEOUT: 5000, // 5 seconds
    HEADERS: {
        'Content-Type': 'application/json'
    }
};

export const PROJECT_STAGES = {
    IDEATION: 'IDEATION',
    PROTOTYPE: 'PROTOTYPE',
    MVP: 'MVP',
    GROWTH: 'GROWTH',
    FUNDED: 'FUNDED'
} as const;

export const PROJECT_CATEGORIES = {
    DEFI: 'DeFi',
    NFT: 'NFT',
    GAMING: 'Gaming',
    INFRASTRUCTURE: 'Infrastructure',
    SOCIAL: 'Social',
    DAO: 'DAO',
    PRIVACY: 'Privacy',
    LAYER2: 'Layer2',
    DID: 'DID',
    METAVERSE: 'Metaverse',
    AI: 'AI',
    ANALYTICS: 'Analytics',
    SECURITY: 'Security',
    WALLET: 'Wallet',
    EXCHANGE: 'Exchange'
} as const;