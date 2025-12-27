/**
 * Analytics Module
 *
 * Provides unified analytics tracking with support for:
 * - PostHog (open-source product analytics)
 * - Amplitude (product analytics platform)
 *
 * Usage:
 * ```ts
 * import { initAnalytics, trackEvent, AnalyticsEvents } from '~/lib/analytics';
 *
 * // Initialize with PostHog
 * await initAnalytics({
 *   provider: 'posthog',
 *   apiKey: 'phc_xxx',
 *   options: { debug: true }
 * });
 *
 * // Track events
 * trackEvent(AnalyticsEvents.MESSAGE_SENT, { messageLength: 150 });
 * ```
 */

// Main analytics functions
export {
  initAnalytics,
  trackEvent,
  trackPageView,
  identifyUser,
  resetUser,
  isAnalyticsInitialized,
  getProviderName,
  optOutTracking,
  optInTracking,
  resetAnalytics,
} from './analytics';

// Types
export type {
  AnalyticsProvider,
  AnalyticsConfig,
  EventProperties,
  PageViewProperties,
  UserProperties,
  ProviderOptions,
  AnalyticsEventName,
} from './types';

// Standard event names
export { AnalyticsEvents } from './types';

// Providers (for advanced usage)
export { posthogProvider } from './providers/posthog';
export { amplitudeProvider } from './providers/amplitude';
