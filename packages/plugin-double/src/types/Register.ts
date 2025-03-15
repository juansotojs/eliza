export interface SocialLinks {
    twitter?: string;
    discord?: string;
    [key: string]: string | undefined;
}

export interface ProjectMetadata {
    websiteUrl?: string;
    socialLinks?: SocialLinks;
    [key: string]: any;
}

export interface Admin {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string | null;
}

export interface ProjectResponse {
    id: string;
    wallet: string | null;
    name: string;
    description: string;
    repositoryUrl: string | null;
    videoUrl: string | null;
    productionUrl: string | null;
    pitchDeckUrl: string | null;
    website: string | null;
    email: string | null;
    category: string | null;
    projectType: string | null;
    stage: ProjectStage;
    apiUrl: string;
    activeUrl: string;
    avatarUrl: string | null;
    bannerUrl: string | null;
    tokenId: string | null;
    contractAddresses: string[];
    networks: string[];
    farcasterId: string | null;
    farcasterUsername: string | null;
    githubUsername: string | null;
    xUsername: string | null;
    telegramUsername: string | null;
    adminId: string;
    communityId: string | null;
    createdAt: string;
    updatedAt: string;
    admin: Admin;
    community: any | null;
    quests: any[];
    badges: any[];
    token: any | null;
}

export interface ProjectData {
    name: string;
    description: string;
    adminId?: string;
    communityId: string;
    tokenId: string;
    status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    metadata?: ProjectMetadata;
    category?: string;
    repositoryUrl?: string;
    stage?: ProjectStage;
}

export interface RegisterProvider {
    registerProject(project: ProjectData, castText: string): Promise<boolean>;
}

export type ProjectStage = 'IDEATION' | 'PROTOTYPE' | 'MVP' | 'GROWTH' | 'FUNDED';

export interface Message {
    content: {
        text?: string;
        project?: ProjectData;
    };
}