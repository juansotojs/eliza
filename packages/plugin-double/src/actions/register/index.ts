import {
    Action,
    IAgentRuntime,
    ActionExample,
    elizaLogger,
    HandlerCallback,
    State,
} from '@elizaos/core';
import { RegisterProvider, Message, ProjectData } from '../../types/Register';
import { extractProjectData } from '../../utils/extractors';
import examples from './examples';
import { PROJECT_STAGES } from '../../constants';
import { generateFarcasterCast, generateTwitterTweet } from '../../utils/generators';

export class RegisterProjectAction implements Action {
    private provider: RegisterProvider;
    public name = 'REGISTER_PROJECT';
    public description = 'Register a new project with provided information';
    public similes = [
        'REGISTER_NEW_PROJECT',
        'CREATE_PROJECT',
        'ADD_PROJECT',
        'register_project',
        'new_project',
    ];
    public examples = examples;

    constructor(provider: RegisterProvider) {
        this.provider = provider;
        elizaLogger.info('[✅ DOUBLE] RegisterProjectAction - Initialized');
    }

    async validate(
        runtime: IAgentRuntime,
        message: Message
    ): Promise<boolean> {
        try {
            elizaLogger.info('[🔄 DOUBLE] RegisterProjectAction - Starting validation');
            elizaLogger.info('[📝 DOUBLE] RegisterProjectAction - Message content:', {
                project: message.content.project,
                text: message.content.text,
                fullMessage: message.content
            });

            const projectData = message.content.project ||
                await extractProjectData(message.content.text || '', runtime);

            elizaLogger.info('[📊 DOUBLE] RegisterProjectAction - Extracted project data:', {
                name: projectData.name,
                description: projectData.description,
                repositoryUrl: projectData.repositoryUrl,
                stage: projectData.stage
            });

            const isValid = this.validateProjectData(projectData);

            if (!isValid) {
                elizaLogger.error('[❌ DOUBLE] RegisterProjectAction - Invalid project data:', projectData);
                elizaLogger.error('[❌ DOUBLE] RegisterProjectAction - Validation failed for:', {
                    hasName: !!projectData.name,
                    nameLength: projectData.name?.length,
                    hasDescription: !!projectData.description,
                    hasValidRepo: projectData.repositoryUrl?.startsWith('https://github.com/'),
                    stage: projectData.stage
                });
            } else {
                elizaLogger.info('[✅ DOUBLE] RegisterProjectAction - Validation successful');
            }

            return isValid;
        } catch (error) {
            elizaLogger.error('[❌ DOUBLE] RegisterProjectAction - Validation error:', error);
            return false;
        }
    }

    private validateProjectData(project: ProjectData): boolean {
        if (!project.name || project.name.length < 2 || project.name.length > 50) {
            elizaLogger.error('[❌ DOUBLE] RegisterProjectAction - Invalid project name:', project.name);
            return false;
        }
        if (!project.description) {
            elizaLogger.error('[❌ DOUBLE] RegisterProjectAction - Missing project description');
            return false;
        }
        if (!project.repositoryUrl?.startsWith('https://github.com/')) {
            elizaLogger.error('[❌ DOUBLE] RegisterProjectAction - Invalid repository URL:', project.repositoryUrl);
            return false;
        }
        if (!['IDEATION', 'PROTOTYPE', 'MVP', 'GROWTH', 'FUNDED'].includes(project.stage)) {
            elizaLogger.error('[❌ DOUBLE] RegisterProjectAction - Invalid project stage:', project.stage);
            return false;
        }
        elizaLogger.info('[✅ DOUBLE] RegisterProjectAction - Project data validation successful');
        return true;
    }

    async handler(
        runtime: IAgentRuntime,
        message: Message,
        state?: State,
        options?: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> {
        try {

            elizaLogger.info('[🔄 DOUBLE] RegisterProjectAction - Processing registration request');
            const projectData = message.content.project ||
                await extractProjectData(message.content.text || '', runtime);
                elizaLogger.info('[🔄 DOUBLE] RegisterProjectAction - Extracted project data:', {
                    name: projectData.name,
                    stage: projectData.stage
                });
            const castText = await generateFarcasterCast(projectData, runtime);

            elizaLogger.info('[🔄 DOUBLE] RegisterProjectAction - Generated cast text:', castText);

            const success = await this.provider.registerProject(projectData, castText);

            if (success) {
                elizaLogger.info('[✅ DOUBLE] RegisterProjectAction - Project registration successful:', projectData.name);
                if (callback) {
                    callback({
                        text: `Cast created successfully for project: ${projectData.name} cast for farcast: ${castText}`,
                        content: {
                            project: projectData,
                        },
                    });
                }
            } else {
                elizaLogger.error('[❌ DOUBLE] RegisterProjectAction - Project registration failed:', projectData.name);
            }

            return success;
        } catch (error) {
            elizaLogger.error('[❌ DOUBLE] RegisterProjectAction - Handler error:', error);
            return false;
        }
    }
}