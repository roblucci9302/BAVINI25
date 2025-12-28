/**
 * Tests for the useTemplateLoader hook
 */

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

// Mock logger
vi.mock('~/utils/logger', () => ({
  createScopedLogger: vi.fn(() => ({
    trace: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  })),
}));

// Mock workbenchStore
const mockRestoreFromSnapshot = vi.fn().mockResolvedValue({ filesWritten: 5, filesDeleted: 0 });
const mockSetShowWorkbench = vi.fn();

vi.mock('~/lib/stores/workbench', () => ({
  workbenchStore: {
    restoreFromSnapshot: mockRestoreFromSnapshot,
    setShowWorkbench: mockSetShowWorkbench,
  },
}));

// Mock templates
vi.mock('~/lib/templates', () => ({
  hasTemplateFiles: vi.fn((template) => !!template.templateDir),
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Import after mocks
import { useTemplateLoader } from './useTemplateLoader';
import type { ProjectTemplate } from '~/lib/templates';

describe('useTemplateLoader', () => {
  const mockTemplate: ProjectTemplate = {
    id: 'react-vite-ts',
    name: 'React',
    description: 'React + Vite + TypeScript',
    icon: '⚛️',
    color: 'blue',
    prompt: 'Create a React app',
    templateDir: 'react-vite-ts',
  };

  const mockTemplateWithoutFiles: ProjectTemplate = {
    id: 'custom',
    name: 'Custom',
    description: 'Custom template',
    icon: '🔧',
    color: 'gray',
    prompt: 'Create a custom app',
    // No templateDir
  };

  const mockApiResponse = {
    success: true,
    metadata: {
      id: 'react-vite-ts',
      name: 'React',
      description: 'React + Vite + TypeScript',
      totalFiles: 5,
      totalSize: 1024,
    },
    files: [
      { path: 'package.json', content: '{"name": "test"}' },
      { path: 'src/App.tsx', content: 'export function App() {}' },
      { path: 'src/main.tsx', content: 'import { App } from "./App"' },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  describe('initialization', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useTemplateLoader());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.loadTemplate).toBe('function');
    });
  });

  describe('loadTemplate', () => {
    it('should return false for template without files', async () => {
      const { result } = renderHook(() => useTemplateLoader());

      let loaded: boolean = false;

      await act(async () => {
        loaded = await result.current.loadTemplate(mockTemplateWithoutFiles);
      });

      expect(loaded).toBe(false);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should load template files successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      });

      const { result } = renderHook(() => useTemplateLoader());

      let loaded: boolean = false;

      await act(async () => {
        loaded = await result.current.loadTemplate(mockTemplate);
      });

      expect(loaded).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith('/api/templates/react-vite-ts');
      expect(mockRestoreFromSnapshot).toHaveBeenCalled();
      expect(mockSetShowWorkbench).toHaveBeenCalledWith(true);
    });

    it('should set loading state during load', async () => {
      let resolveJson: (value: unknown) => void;
      const jsonPromise = new Promise((resolve) => {
        resolveJson = resolve;
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => jsonPromise,
      });

      const { result } = renderHook(() => useTemplateLoader());

      act(() => {
        result.current.loadTemplate(mockTemplate);
      });

      // Should be loading
      expect(result.current.isLoading).toBe(true);

      // Resolve the JSON promise
      await act(async () => {
        resolveJson!(mockApiResponse);
        await jsonPromise;
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('should handle fetch errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      const { result } = renderHook(() => useTemplateLoader());

      let loaded: boolean = true;

      await act(async () => {
        loaded = await result.current.loadTemplate(mockTemplate);
      });

      expect(loaded).toBe(false);
      expect(result.current.error).toContain('Not Found');
    });

    it('should handle API error responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: false, error: 'Template not found' }),
      });

      const { result } = renderHook(() => useTemplateLoader());

      let loaded: boolean = true;

      await act(async () => {
        loaded = await result.current.loadTemplate(mockTemplate);
      });

      expect(loaded).toBe(false);
      expect(result.current.error).toBeDefined();
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useTemplateLoader());

      let loaded: boolean = true;

      await act(async () => {
        loaded = await result.current.loadTemplate(mockTemplate);
      });

      expect(loaded).toBe(false);
      expect(result.current.error).toBe('Network error');
    });

    it('should convert files to FileMap with folders', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      });

      const { result } = renderHook(() => useTemplateLoader());

      await act(async () => {
        await result.current.loadTemplate(mockTemplate);
      });

      // Check that restoreFromSnapshot was called with FileMap including folders
      expect(mockRestoreFromSnapshot).toHaveBeenCalledWith(
        expect.objectContaining({
          'package.json': expect.objectContaining({ type: 'file' }),
          'src': expect.objectContaining({ type: 'folder' }),
          'src/App.tsx': expect.objectContaining({ type: 'file' }),
          'src/main.tsx': expect.objectContaining({ type: 'file' }),
        })
      );
    });

    it('should clear error on new load attempt', async () => {
      // First load fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Error',
      });

      const { result } = renderHook(() => useTemplateLoader());

      await act(async () => {
        await result.current.loadTemplate(mockTemplate);
      });

      expect(result.current.error).toBeDefined();

      // Second load succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      });

      await act(async () => {
        await result.current.loadTemplate(mockTemplate);
      });

      expect(result.current.error).toBeNull();
    });
  });
});
