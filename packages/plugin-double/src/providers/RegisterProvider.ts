import { elizaLogger } from '@elizaos/core';
import { ProjectData } from '../types/Register';
import axios from 'axios';
import { DEFAULT_ADMIN_ID, API_DEFAULTS } from '../constants';

interface ProjectResponse {
    success: boolean;
    data?: ProjectData;
    error?: string;
}

interface ProjectListResponse {
    success: boolean;
    data?: ProjectData[];
    error?: string;
}

export class RegisterProvider {
    private apiUrl: string;

    constructor(apiUrl: string = API_DEFAULTS.BASE_URL) {
        this.apiUrl = apiUrl;
        elizaLogger.info('[✅ DOUBLE] RegisterProvider - Initialized with API URL:', this.apiUrl);
    }

    async registerProject(project: ProjectData): Promise<boolean> {
        try {
            elizaLogger.info('[🔄 DOUBLE] RegisterProvider - Registering project:', project);

            // Add adminId to projectData
            const projectModified = {
                ...project,
                adminId: project.adminId || DEFAULT_ADMIN_ID
            }

            const response = await axios.post<ProjectResponse>(
                `${this.apiUrl}/projects`,
                projectModified,
                {
                    headers: API_DEFAULTS.HEADERS,
                    timeout: API_DEFAULTS.TIMEOUT
                }
            );

            elizaLogger.info('[✅ DOUBLE] RegisterProvider - Project registered successfully:', response.data);

            // Generate and post Farcaster cast
            try {
                // Verify environment variables
                if (!process.env.FARCASTER_NEYNAR_API_KEY) {
                    throw new Error("Missing FARCASTER_NEYNAR_API_KEY");
                }

                if (!process.env.FARCASTER_NEYNAR_SIGNER_UUID) {
                    throw new Error("Missing FARCASTER_NEYNAR_SIGNER_UUID");
                }

                // Generate cast text
                const castText = `🚀 New Project Alert: ${project.name}\n\n${project.description}\n\n${project.repositoryUrl || ''}`;

                // Post to Farcaster
                const url = "https://api.neynar.com/v2/farcaster/cast";
                const options = {
                    method: "POST",
                    headers: {
                        "accept": "application/json",
                        "content-type": "application/json",
                        "x-api-key": process.env.FARCASTER_NEYNAR_API_KEY
                    },
                    body: JSON.stringify({
                        text: castText,
                        signer_uuid: process.env.FARCASTER_NEYNAR_SIGNER_UUID
                    })
                };

                const farcasterResponse = await fetch(url, options);

                if (!farcasterResponse.ok) {
                    const errorText = await farcasterResponse.text();
                    throw new Error(`Farcaster API error: ${farcasterResponse.status} - ${errorText}`);
                }

                const responseData = await farcasterResponse.json();
                elizaLogger.info('[✅ DOUBLE] RegisterProvider - Cast posted successfully:', responseData);

            } catch (castError) {
                elizaLogger.error('[❌ DOUBLE] RegisterProvider - Farcaster cast error:', {
                    error: castError,
                    message: castError.message,
                    stack: castError.stack,
                    hasApiKey: !!process.env.FARCASTER_NEYNAR_API_KEY,
                    hasSignerUuid: !!process.env.FARCASTER_NEYNAR_SIGNER_UUID
                });
                // Don't fail the whole registration if casting fails
            }

            return true;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                elizaLogger.error('[❌ DOUBLE] RegisterProvider - API error:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message
                });
                throw new Error(error.response?.data?.error || error.message);
            }
            elizaLogger.error('[❌ DOUBLE] RegisterProvider - Unknown error:', error);
            throw new Error('Unknown error occurred while registering project');
        }
    }

    async getProject(name: string): Promise<ProjectData | null> {
        try {
            elizaLogger.info('[🔄 DOUBLE] RegisterProvider - Fetching project:', name);

            const response = await axios.get<ProjectResponse>(
                `${this.apiUrl}/projects/${encodeURIComponent(name)}`
            );

            if (!response.data.success || !response.data.data) {
                elizaLogger.warn('[⚠️ DOUBLE] RegisterProvider - Project not found:', name);
                return null;
            }

            elizaLogger.info('[✅ DOUBLE] RegisterProvider - Project found:', response.data.data);
            return response.data.data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                elizaLogger.error('[❌ DOUBLE] RegisterProvider - API error:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message
                });
                return null;
            }
            elizaLogger.error('[❌ DOUBLE] RegisterProvider - Unknown error:', error);
            return null;
        }
    }

    async listProjects(): Promise<ProjectData[]> {
        try {
            elizaLogger.info('[🔄 DOUBLE] RegisterProvider - Listing all projects');

            const response = await axios.get<ProjectListResponse>(
                `${this.apiUrl}/projects`
            );

            if (!response.data.success || !response.data.data) {
                elizaLogger.warn('[⚠️ DOUBLE] RegisterProvider - No projects found');
                return [];
            }

            elizaLogger.info('[✅ DOUBLE] RegisterProvider - Projects retrieved:', response.data.data.length);
            return response.data.data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                elizaLogger.error('[❌ DOUBLE] RegisterProvider - API error:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message
                });
                return [];
            }
            elizaLogger.error('[❌ DOUBLE] RegisterProvider - Unknown error:', error);
            return [];
        }
    }
}