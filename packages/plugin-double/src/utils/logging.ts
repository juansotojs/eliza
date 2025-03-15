import { elizaLogger } from '@elizaos/core';

/**
 * Safely logs objects that might contain circular references
 */
export function safeLog(level: 'info' | 'error' | 'warn', message: string, data?: any): void {
    // Just log the message without any data
    elizaLogger[level](message);

    // Don't even try to log complex objects
    return;
}