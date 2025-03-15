import { elizaLogger } from '@elizaos/core';
import { GithubProvider as IGithubProvider, GithubAnalysis } from '../types/Github';

export class GithubProvider implements IGithubProvider {
    private apiUrl: string;
    private token: string;

    constructor(token: string = process.env.GITHUB_TOKEN || '') {
        this.apiUrl = 'https://api.github.com';
        this.token = token;
        elizaLogger.info('[✅ DOUBLE] GithubProvider - Initialized');
    }

    public async checkRepository(url: string): Promise<GithubAnalysis> {
        try {
            elizaLogger.info('[🔄 DOUBLE] GithubProvider - Checking repository:', url);

            // Extract owner and repo from URL
            const { owner, repo } = this.parseGithubUrl(url);

            const headers = {
                'Authorization': `token ${this.token}`,
                'Accept': 'application/vnd.github.v3+json'
            };

            // Fetch repository data
            const response = await fetch(`${this.apiUrl}/repos/${owner}/${repo}`, { headers });

            if (!response.ok) {
                elizaLogger.error('[❌ DOUBLE] GithubProvider - Failed to fetch repository:', response.statusText);
                throw new Error(`GitHub API error: ${response.statusText}`);
            }

            const data = await response.json();

            elizaLogger.info('[✅ DOUBLE] GithubProvider - Repository data fetched successfully');

            return {
                url,
                details: {
                    isValid: true,
                    owner,
                    repository: repo,
                    visibility: data.private ? 'private' : 'public',
                    stats: {
                        stars: data.stargazers_count,
                        forks: data.forks_count,
                        issues: data.open_issues_count,
                        lastUpdate: data.updated_at
                    },
                    topics: data.topics || [],
                    languages: data.language ? [data.language] : []
                }
            };
        } catch (error) {
            elizaLogger.error('[❌ DOUBLE] GithubProvider - Error checking repository:', error);
            return {
                url,
                details: {
                    isValid: false,
                    owner: '',
                    repository: '',
                    visibility: 'private'
                }
            };
        }
    }

    private parseGithubUrl(url: string): { owner: string; repo: string } {
        try {
            const urlObj = new URL(url);
            const [, owner, repo] = urlObj.pathname.split('/');

            if (!owner || !repo) {
                throw new Error('Invalid GitHub URL format');
            }

            return { owner, repo: repo.replace('.git', '') };
        } catch (error) {
            elizaLogger.error('[❌ DOUBLE] GithubProvider - Error parsing GitHub URL:', error);
            throw new Error('Invalid GitHub URL');
        }
    }
}