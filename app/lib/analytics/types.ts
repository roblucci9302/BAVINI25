/**
 * Analytics Types
 *
 * Defines the interface for analytics providers and events.
 */

/**
 * User properties for identification
 */
export interface UserProperties {
  id?: string;
  email?: string;
  name?: string;
  plan?: string;
  createdAt?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Event properties
 */
export interface EventProperties {
  [key: string]: string | number | boolean | string[] | undefined;
}

/**
 * Page view properties
 */
export interface PageViewProperties {
  path?: string;
  title?: string;
  referrer?: string;
  [key: string]: string | undefined;
}

/**
 * Analytics provider interface
 * All providers must implement this interface
 */
export interface AnalyticsProvider {
  /** Provider name for debugging */
  name: string;

  /** Initialize the provider with API key */
  init(apiKey: string, options?: ProviderOptions): Promise<void>;

  /** Track a custom event */
  track(eventName: string, properties?: EventProperties): void;

  /** Track a page view */
  page(properties?: PageViewProperties): void;

  /** Identify a user */
  identify(userId: string, properties?: UserProperties): void;

  /** Reset/logout user */
  reset(): void;

  /** Check if provider is initialized */
  isInitialized(): boolean;

  /** Opt user out of tracking */
  optOut(): void;

  /** Opt user back in to tracking */
  optIn(): void;
}

/**
 * Provider initialization options
 */
export interface ProviderOptions {
  /** Enable debug mode */
  debug?: boolean;
  /** API host override */
  apiHost?: string;
  /** Disable automatic page view tracking */
  disableAutoPageviews?: boolean;
  /** Disable automatic session recording (PostHog) */
  disableSessionRecording?: boolean;
  /** Additional provider-specific options */
  [key: string]: unknown;
}

/**
 * Analytics configuration
 */
export interface AnalyticsConfig {
  /** Provider to use: 'posthog' | 'amplitude' | 'none' */
  provider: 'posthog' | 'amplitude' | 'none';
  /** API key for the provider */
  apiKey: string;
  /** Provider options */
  options?: ProviderOptions;
}

/**
 * Standard event names for consistency
 */
export const AnalyticsEvents = {
  // Chat events
  CHAT_STARTED: 'chat_started',
  MESSAGE_SENT: 'message_sent',
  MESSAGE_RECEIVED: 'message_received',
  PROMPT_ENHANCED: 'prompt_enhanced',

  // Workbench events
  WORKBENCH_OPENED: 'workbench_opened',
  FILE_CREATED: 'file_created',
  FILE_EDITED: 'file_edited',
  TERMINAL_USED: 'terminal_used',
  PREVIEW_OPENED: 'preview_opened',

  // Template events
  TEMPLATE_SELECTED: 'template_selected',
  TEMPLATE_DEPLOYED: 'template_deployed',

  // User events
  USER_SIGNED_UP: 'user_signed_up',
  USER_LOGGED_IN: 'user_logged_in',
  USER_LOGGED_OUT: 'user_logged_out',

  // Feature usage
  FEATURE_USED: 'feature_used',
  ERROR_OCCURRED: 'error_occurred',

  // Performance
  PAGE_LOAD_TIME: 'page_load_time',
  FIRST_CONTENTFUL_PAINT: 'first_contentful_paint',
} as const;

export type AnalyticsEventName = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];
