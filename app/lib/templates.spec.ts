/**
 * Tests pour les templates de projet BAVINI
 * Vérifie que tous les templates sont correctement définis
 */

import { describe, it, expect } from 'vitest';
import {
  PROJECT_TEMPLATES,
  getTemplateById,
  getMainTemplates,
  getAdditionalTemplates,
  getShadcnTemplates,
  isShadcnTemplate,
  getBasicTemplates,
  type ProjectTemplate,
} from './templates';

describe('Project Templates', () => {
  describe('Structure des templates', () => {
    it('contient au moins 8 templates', () => {
      expect(PROJECT_TEMPLATES.length).toBeGreaterThanOrEqual(8);
    });

    it('chaque template a tous les champs requis', () => {
      PROJECT_TEMPLATES.forEach((template) => {
        expect(template).toHaveProperty('id');
        expect(template).toHaveProperty('name');
        expect(template).toHaveProperty('description');
        expect(template).toHaveProperty('icon');
        expect(template).toHaveProperty('color');
        expect(template).toHaveProperty('prompt');
      });
    });

    it('chaque template a un ID unique', () => {
      const ids = PROJECT_TEMPLATES.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(PROJECT_TEMPLATES.length);
    });

    it('chaque template a un prompt non vide', () => {
      PROJECT_TEMPLATES.forEach((template) => {
        expect(template.prompt.trim().length).toBeGreaterThan(10);
      });
    });
  });

  describe('Templates de base', () => {
    it('contient le template react-vite-ts', () => {
      const template = getTemplateById('react-vite-ts');
      expect(template).toBeDefined();
      expect(template?.name).toBe('React');
    });

    it('contient le template node-ts', () => {
      const template = getTemplateById('node-ts');
      expect(template).toBeDefined();
      expect(template?.name).toBe('Node.js');
    });

    it('contient le template next-ts', () => {
      const template = getTemplateById('next-ts');
      expect(template).toBeDefined();
      expect(template?.name).toBe('Next.js');
    });

    it('contient le template express-ts', () => {
      const template = getTemplateById('express-ts');
      expect(template).toBeDefined();
      expect(template?.name).toBe('API Express');
    });
  });

  describe('Templates shadcn/ui', () => {
    it('contient le template react-shadcn', () => {
      const template = getTemplateById('react-shadcn');
      expect(template).toBeDefined();
      expect(template?.name).toBe('React + shadcn/ui');
      expect(template?.description).toContain('shadcn/ui');
    });

    it('contient le template nextjs-shadcn', () => {
      const template = getTemplateById('nextjs-shadcn');
      expect(template).toBeDefined();
      expect(template?.name).toBe('Next.js + shadcn/ui');
      expect(template?.description).toContain('shadcn/ui');
    });

    it('contient le template fullstack-supabase', () => {
      const template = getTemplateById('fullstack-supabase');
      expect(template).toBeDefined();
      expect(template?.name).toBe('Full-Stack Supabase');
      expect(template?.description).toContain('Supabase');
    });

    it('le template react-shadcn mentionne les dépendances clés', () => {
      const template = getTemplateById('react-shadcn');
      expect(template?.prompt).toContain('shadcn/ui');
      expect(template?.prompt).toContain('Tailwind');
      expect(template?.prompt).toContain('Lucide React');
      expect(template?.prompt).toContain('class-variance-authority');
    });

    it('le template nextjs-shadcn mentionne App Router', () => {
      const template = getTemplateById('nextjs-shadcn');
      expect(template?.prompt).toContain('App Router');
      expect(template?.prompt).toContain('Server Components');
    });

    it('le template fullstack-supabase mentionne Auth', () => {
      const template = getTemplateById('fullstack-supabase');
      expect(template?.prompt).toContain('Auth');
      expect(template?.prompt).toContain('Supabase');
      expect(template?.prompt).toContain('AuthContext');
      expect(template?.prompt).toContain('ProtectedRoute');
    });
  });

  describe('getTemplateById', () => {
    it('retourne le bon template pour un ID valide', () => {
      const template = getTemplateById('react-vite-ts');
      expect(template).toBeDefined();
      expect(template?.id).toBe('react-vite-ts');
    });

    it('retourne undefined pour un ID inexistant', () => {
      const template = getTemplateById('inexistant');
      expect(template).toBeUndefined();
    });
  });

  describe('getMainTemplates', () => {
    it('retourne les 4 premiers templates', () => {
      const main = getMainTemplates();
      expect(main).toHaveLength(4);
      expect(main[0].id).toBe('react-vite-ts');
    });
  });

  describe('getAdditionalTemplates', () => {
    it('retourne les templates après les 4 premiers', () => {
      const additional = getAdditionalTemplates();
      expect(additional.length).toBeGreaterThanOrEqual(4);
      // Le premier additionnel est express-ts (5ème template)
      expect(additional[0].id).toBe('express-ts');
    });
  });

  describe('getShadcnTemplates', () => {
    it('retourne exactement 3 templates shadcn/ui', () => {
      const shadcn = getShadcnTemplates();
      expect(shadcn).toHaveLength(3);
    });

    it('contient les bons templates', () => {
      const shadcn = getShadcnTemplates();
      const ids = shadcn.map((t) => t.id);
      expect(ids).toContain('react-shadcn');
      expect(ids).toContain('nextjs-shadcn');
      expect(ids).toContain('fullstack-supabase');
    });

    it('tous les templates retournés ont shadcn dans leur prompt', () => {
      const shadcn = getShadcnTemplates();
      shadcn.forEach((template) => {
        expect(template.prompt.toLowerCase()).toContain('shadcn');
      });
    });
  });

  describe('isShadcnTemplate', () => {
    it('retourne true pour react-shadcn', () => {
      expect(isShadcnTemplate('react-shadcn')).toBe(true);
    });

    it('retourne true pour nextjs-shadcn', () => {
      expect(isShadcnTemplate('nextjs-shadcn')).toBe(true);
    });

    it('retourne true pour fullstack-supabase', () => {
      expect(isShadcnTemplate('fullstack-supabase')).toBe(true);
    });

    it('retourne false pour react-vite-ts', () => {
      expect(isShadcnTemplate('react-vite-ts')).toBe(false);
    });

    it('retourne false pour un ID inexistant', () => {
      expect(isShadcnTemplate('inexistant')).toBe(false);
    });
  });

  describe('getBasicTemplates', () => {
    it('retourne les templates sans shadcn/ui', () => {
      const basic = getBasicTemplates();
      expect(basic.length).toBeGreaterThanOrEqual(5);
    });

    it('ne contient pas les templates shadcn', () => {
      const basic = getBasicTemplates();
      const ids = basic.map((t) => t.id);
      expect(ids).not.toContain('react-shadcn');
      expect(ids).not.toContain('nextjs-shadcn');
      expect(ids).not.toContain('fullstack-supabase');
    });

    it('contient les templates de base', () => {
      const basic = getBasicTemplates();
      const ids = basic.map((t) => t.id);
      expect(ids).toContain('react-vite-ts');
      expect(ids).toContain('node-ts');
      expect(ids).toContain('express-ts');
    });
  });

  describe('Cohérence shadcn/basic', () => {
    it('la somme des templates shadcn et basic égale le total', () => {
      const shadcn = getShadcnTemplates();
      const basic = getBasicTemplates();
      expect(shadcn.length + basic.length).toBe(PROJECT_TEMPLATES.length);
    });

    it('il n\'y a pas de chevauchement entre shadcn et basic', () => {
      const shadcnIds = new Set(getShadcnTemplates().map((t) => t.id));
      const basicIds = new Set(getBasicTemplates().map((t) => t.id));

      shadcnIds.forEach((id) => {
        expect(basicIds.has(id)).toBe(false);
      });
    });
  });
});
