import { Plugin, elizaLogger } from "@elizaos/core";
import { RegisterProvider } from './providers/RegisterProvider';
import { GithubProvider } from './providers/GithubProvider';
import { RegisterProjectAction } from './actions/register';
import { CheckProjectStageAction } from "./actions/checkStage";
import { CheckProjectCategoryAction } from './actions/checkCategory';
import { CheckGithubAction } from './actions/checkGithub';
import { RegisterOrderAction } from './actions/registerOrder';
import { UberEatsProvider } from './providers/UberEatsProvider';

console.log("\n┌════════════════════════════════════════┐");
console.log("│          Double PLUGIN                 │");
console.log("├────────────────────────────────────────┤");
console.log("│  Initializing Double Plugin...         │");
console.log("│  Version: 0.0.20                       │");
console.log("└════════════════════════════════════════┘");

console.log("\n┌════════════════════════════════════════┐");
console.log("│          FOOD ORDER DEBUG              │");
console.log("├────────────────────────────────────────┤");
console.log(`│  UBER_EATS_CLIENT_ID: ${process.env.UBER_EATS_CLIENT_ID ? "✓ Set" : "✗ Not Set"}        │`);
console.log(`│  UBER_EATS_CLIENT_SECRET: ${process.env.UBER_EATS_CLIENT_SECRET ? "✓ Set" : "✗ Not Set"} │`);
console.log("└════════════════════════════════════════┘");

elizaLogger.info('[🔄 DOUBLE] Plugin - Initializing');

const registerProvider = new RegisterProvider();
const githubProvider = new GithubProvider();
const uberEatsProvider = new UberEatsProvider({
    clientId: process.env.UBER_EATS_CLIENT_ID || '',
    clientSecret: process.env.UBER_EATS_CLIENT_SECRET || '',
    userId: process.env.UBER_EATS_USER_ID || ''
});

elizaLogger.info('[✅ DOUBLE] Plugin - Providers initialized');

export const doublePlugin: Plugin = {
    name: "double",
    description: "Agent double with basic actions and evaluators",
    actions: [
        new RegisterOrderAction(uberEatsProvider),
        new RegisterProjectAction(registerProvider),
        new CheckProjectStageAction(),
        new CheckProjectCategoryAction(),
        new CheckGithubAction(githubProvider)
    ],
    evaluators: [],
    providers: [],
};

elizaLogger.info('[✅ DOUBLE] Plugin - Initialization complete');

export default doublePlugin;
