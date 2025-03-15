export interface GithubProvider {
    checkRepository(url: string): Promise<GithubAnalysis>;
}

export interface GithubAnalysis {
    url: string;
    details: {
        isValid: boolean;
        owner: string;
        repository: string;
        visibility: 'public' | 'private';
        stats?: {
            stars: number;
            forks: number;
            issues: number;
            lastUpdate: string;
        };
        topics?: string[];
        languages?: string[];
    };
}

export interface Message {
    content: {
        text?: string;
        url?: string;
        action?: string;
    };
}