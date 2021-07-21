export const apiUrl = process.env.NEXT_PUBLIC_API_URI;
export const pkbUrl = process.env.NEXT_PUBLIC_PKB_URI;
export const pkbAuth = process.env.NEXT_PUBLIC_PKB_AUTH;
export const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
export const auth0ClientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
export const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const sampleRate = parseFloat(process.env.NEXT_PUBLIC_SENTRY_APM || "");
export const sentrySampleRate = isNaN(sampleRate) ? 0 : sampleRate;
export const serviceWorkerTimeout =
  parseInt(process.env.SERVICE_WORKER_TIMEOUT || "", 10) || 60 * 1000;
export const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
export const ssrMode = typeof window === "undefined";
export const channelSlug = process.env.NEXT_PUBLIC_SALEOR_CHANNEL_SLUG;
