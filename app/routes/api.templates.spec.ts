/**
 * Tests for the /api/templates/:id endpoint
 */

import { describe, expect, it, vi, beforeEach } from 'vitest';

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

// Mock template loader
const mockLoadTemplate = vi.fn();
const mockListAvailableTemplates = vi.fn();

vi.mock('~/lib/.server/templates', () => ({
  loadTemplate: mockLoadTemplate,
  listAvailableTemplates: mockListAvailableTemplates,
}));

// Import after mocks
import { loader } from './api.templates.$id';

describe('api.templates.$id', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createRequest = (id: string) => ({
    params: { id },
    request: new Request(`http://localhost/api/templates/${id}`),
    context: {},
  });

  describe('GET /api/templates/list', () => {
    it('should return list of available templates', async () => {
      const mockTemplates = [
        { id: 'react-vite-ts', name: 'React', description: 'React app', totalFiles: 5, totalSize: 1024 },
        { id: 'node-ts', name: 'Node.js', description: 'Node app', totalFiles: 3, totalSize: 512 },
      ];
      mockListAvailableTemplates.mockReturnValue(mockTemplates);

      const response = await loader(createRequest('list') as any);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.templates).toEqual(mockTemplates);
      expect(mockListAvailableTemplates).toHaveBeenCalled();
    });
  });

  describe('GET /api/templates/:id', () => {
    it('should return template files for valid template', async () => {
      const mockResponse = {
        success: true,
        metadata: {
          id: 'react-vite-ts',
          name: 'React',
          description: 'React + Vite',
          totalFiles: 5,
          totalSize: 1024,
        },
        files: [
          { path: 'package.json', content: '{}' },
          { path: 'src/App.tsx', content: 'export {}' },
        ],
      };
      mockLoadTemplate.mockReturnValue(mockResponse);

      const response = await loader(createRequest('react-vite-ts') as any);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.metadata.id).toBe('react-vite-ts');
      expect(data.files).toHaveLength(2);
      expect(mockLoadTemplate).toHaveBeenCalledWith('react-vite-ts');
    });

    it('should return 404 for unknown template', async () => {
      mockLoadTemplate.mockReturnValue({
        success: false,
        error: 'Template not found',
        code: 'NOT_FOUND',
      });

      const response = await loader(createRequest('unknown') as any);

      expect(response.status).toBe(404);

      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.code).toBe('NOT_FOUND');
    });

    it('should return 500 for server errors', async () => {
      mockLoadTemplate.mockReturnValue({
        success: false,
        error: 'Read error',
        code: 'READ_ERROR',
      });

      const response = await loader(createRequest('broken') as any);

      expect(response.status).toBe(500);
    });

    it('should return 400 for invalid ID', async () => {
      const response = await loader({ params: {}, request: new Request('http://localhost/api/templates/') } as any);

      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data.code).toBe('INVALID_ID');
    });

    it('should include cache headers for successful responses', async () => {
      mockLoadTemplate.mockReturnValue({
        success: true,
        metadata: { id: 'test', name: 'Test', description: '', totalFiles: 1, totalSize: 100 },
        files: [],
      });

      const response = await loader(createRequest('test') as any);

      expect(response.headers.get('Cache-Control')).toContain('public');
      expect(response.headers.get('Cache-Control')).toContain('max-age');
    });
  });

  describe('error handling', () => {
    it('should handle NO_FILES error', async () => {
      mockLoadTemplate.mockReturnValue({
        success: false,
        error: 'No files',
        code: 'NO_FILES',
      });

      const response = await loader(createRequest('empty') as any);

      expect(response.status).toBe(500);
    });
  });
});
