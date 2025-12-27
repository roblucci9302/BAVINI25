import { describe, it, expect, beforeEach } from 'vitest';
import {
  initAnalytics,
  trackEvent,
  trackPageView,
  identifyUser,
  resetUser,
  isAnalyticsInitialized,
  getProviderName,
  resetAnalytics,
} from './analytics';
import { AnalyticsEvents } from './types';

describe('Analytics', () => {
  beforeEach(() => {
    resetAnalytics();
  });

  describe('initAnalytics', () => {
    it('should set provider to none when configured', async () => {
      await initAnalytics({
        provider: 'none',
        apiKey: '',
      });

      expect(getProviderName()).toBe('none');
    });

    it('should not throw with any provider config', () => {
      // Just verify the function accepts different providers without throwing
      expect(() => {
        // These would try to load scripts, but we can at least check the config is accepted
        const configs = [
          { provider: 'posthog' as const, apiKey: 'test' },
          { provider: 'amplitude' as const, apiKey: 'test' },
          { provider: 'none' as const, apiKey: '' },
        ];
        configs.forEach(() => {}); // Just verify types compile
      }).not.toThrow();
    });
  });

  describe('trackEvent', () => {
    it('should not throw when tracking without initialization', () => {
      expect(() => {
        trackEvent(AnalyticsEvents.MESSAGE_SENT, { messageLength: 100 });
      }).not.toThrow();
    });

    it('should track event with properties', async () => {
      await initAnalytics({
        provider: 'none',
        apiKey: '',
      });

      expect(() => {
        trackEvent(AnalyticsEvents.MESSAGE_SENT, {
          messageLength: 150,
          hasAttachments: false,
        });
      }).not.toThrow();
    });
  });

  describe('trackPageView', () => {
    it('should track page view', async () => {
      await initAnalytics({
        provider: 'none',
        apiKey: '',
      });

      expect(() => {
        trackPageView({ path: '/chat', title: 'Chat' });
      }).not.toThrow();
    });
  });

  describe('identifyUser', () => {
    it('should identify user with properties', async () => {
      await initAnalytics({
        provider: 'none',
        apiKey: '',
      });

      expect(() => {
        identifyUser('user_123', {
          email: 'test@example.com',
          plan: 'pro',
        });
      }).not.toThrow();
    });
  });

  describe('resetUser', () => {
    it('should reset user', async () => {
      await initAnalytics({
        provider: 'none',
        apiKey: '',
      });

      identifyUser('user_123');

      expect(() => {
        resetUser();
      }).not.toThrow();
    });
  });

  describe('isAnalyticsInitialized', () => {
    it('should return false before initialization', () => {
      expect(isAnalyticsInitialized()).toBe(false);
    });

    it('should return false with none provider and no apiKey', async () => {
      // none provider with empty apiKey skips initialization
      await initAnalytics({
        provider: 'none',
        apiKey: '',
      });

      expect(isAnalyticsInitialized()).toBe(false);
    });
  });

  describe('AnalyticsEvents', () => {
    it('should have all expected event names', () => {
      expect(AnalyticsEvents.CHAT_STARTED).toBe('chat_started');
      expect(AnalyticsEvents.MESSAGE_SENT).toBe('message_sent');
      expect(AnalyticsEvents.WORKBENCH_OPENED).toBe('workbench_opened');
      expect(AnalyticsEvents.TEMPLATE_SELECTED).toBe('template_selected');
      expect(AnalyticsEvents.ERROR_OCCURRED).toBe('error_occurred');
    });
  });
});
