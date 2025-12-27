/**
 * Tests pour les patterns UI de BAVINI
 * Vérifie que tous les patterns sont correctement définis et fonctionnels
 */

import { describe, it, expect } from 'vitest';
import {
  UI_PATTERNS,
  ALL_PATTERNS,
  DASHBOARD_PATTERN,
  AUTH_PATTERN,
  LANDING_PATTERN,
  CRUD_TABLE_PATTERN,
  SETTINGS_PATTERN,
  PROFILE_PATTERN,
  getPatternById,
  getPatternsByCategory,
  getUniqueComponents,
  combinePatternHints,
  searchPatterns,
  type UIPattern,
} from './templates/ui-patterns';

describe('UI Patterns', () => {
  describe('Structure des patterns', () => {
    it('contient exactement 6 patterns', () => {
      expect(Object.keys(UI_PATTERNS)).toHaveLength(6);
      expect(ALL_PATTERNS).toHaveLength(6);
    });

    it('contient les 6 patterns attendus', () => {
      expect(UI_PATTERNS).toHaveProperty('dashboard');
      expect(UI_PATTERNS).toHaveProperty('auth');
      expect(UI_PATTERNS).toHaveProperty('landing');
      expect(UI_PATTERNS).toHaveProperty('crud-table');
      expect(UI_PATTERNS).toHaveProperty('settings');
      expect(UI_PATTERNS).toHaveProperty('profile');
    });

    it('chaque pattern a tous les champs requis', () => {
      ALL_PATTERNS.forEach((pattern) => {
        expect(pattern).toHaveProperty('id');
        expect(pattern).toHaveProperty('name');
        expect(pattern).toHaveProperty('description');
        expect(pattern).toHaveProperty('category');
        expect(pattern).toHaveProperty('structure');
        expect(pattern).toHaveProperty('components');
        expect(pattern).toHaveProperty('promptHint');
      });
    });

    it('chaque pattern a un ID valide et unique', () => {
      const ids = ALL_PATTERNS.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ALL_PATTERNS.length);
      ids.forEach((id) => {
        expect(id).toBeTruthy();
        expect(typeof id).toBe('string');
      });
    });

    it('chaque pattern a au moins un composant', () => {
      ALL_PATTERNS.forEach((pattern) => {
        expect(pattern.components.length).toBeGreaterThan(0);
      });
    });

    it('chaque pattern a une structure non vide', () => {
      ALL_PATTERNS.forEach((pattern) => {
        expect(pattern.structure.trim().length).toBeGreaterThan(0);
      });
    });

    it('chaque pattern a une catégorie valide', () => {
      const validCategories = ['layout', 'page', 'component', 'form'];
      ALL_PATTERNS.forEach((pattern) => {
        expect(validCategories).toContain(pattern.category);
      });
    });
  });

  describe('DASHBOARD_PATTERN', () => {
    it('est de catégorie layout', () => {
      expect(DASHBOARD_PATTERN.category).toBe('layout');
    });

    it('contient les composants Sheet et Card', () => {
      expect(DASHBOARD_PATTERN.components).toContain('Sheet');
      expect(DASHBOARD_PATTERN.components).toContain('Card');
      expect(DASHBOARD_PATTERN.components).toContain('Table');
    });

    it('la structure contient le pattern responsive sidebar', () => {
      expect(DASHBOARD_PATTERN.structure).toContain('hidden md:flex');
      expect(DASHBOARD_PATTERN.structure).toContain('md:hidden');
    });

    it('mentionne les composants clés dans promptHint', () => {
      expect(DASHBOARD_PATTERN.promptHint).toContain('Sheet');
      expect(DASHBOARD_PATTERN.promptHint).toContain('Cards');
    });
  });

  describe('AUTH_PATTERN', () => {
    it('est de catégorie page', () => {
      expect(AUTH_PATTERN.category).toBe('page');
    });

    it('contient les composants de formulaire', () => {
      expect(AUTH_PATTERN.components).toContain('Form');
      expect(AUTH_PATTERN.components).toContain('Input');
      expect(AUTH_PATTERN.components).toContain('Button');
      expect(AUTH_PATTERN.components).toContain('Label');
    });

    it('la structure contient Card centré', () => {
      expect(AUTH_PATTERN.structure).toContain('min-h-screen');
      expect(AUTH_PATTERN.structure).toContain('items-center');
      expect(AUTH_PATTERN.structure).toContain('justify-center');
    });

    it('mentionne la validation dans promptHint', () => {
      expect(AUTH_PATTERN.promptHint).toContain('react-hook-form');
      expect(AUTH_PATTERN.promptHint).toContain('zod');
    });
  });

  describe('LANDING_PATTERN', () => {
    it('est de catégorie page', () => {
      expect(LANDING_PATTERN.category).toBe('page');
    });

    it('contient les composants de navigation', () => {
      expect(LANDING_PATTERN.components).toContain('Button');
      expect(LANDING_PATTERN.components).toContain('NavigationMenu');
    });

    it('la structure contient hero et features', () => {
      expect(LANDING_PATTERN.structure).toContain('Hero');
      expect(LANDING_PATTERN.structure).toContain('Features');
      expect(LANDING_PATTERN.structure).toContain('Footer');
    });

    it('utilise les breakpoints responsive', () => {
      expect(LANDING_PATTERN.structure).toContain('md:');
      expect(LANDING_PATTERN.structure).toContain('lg:');
    });
  });

  describe('CRUD_TABLE_PATTERN', () => {
    it('est de catégorie component', () => {
      expect(CRUD_TABLE_PATTERN.category).toBe('component');
    });

    it('contient les composants Table', () => {
      expect(CRUD_TABLE_PATTERN.components).toContain('Table');
      expect(CRUD_TABLE_PATTERN.components).toContain('TableHeader');
      expect(CRUD_TABLE_PATTERN.components).toContain('TableBody');
    });

    it('contient Dialog et DropdownMenu', () => {
      expect(CRUD_TABLE_PATTERN.components).toContain('Dialog');
      expect(CRUD_TABLE_PATTERN.components).toContain('DropdownMenu');
    });

    it('la structure contient recherche et pagination', () => {
      expect(CRUD_TABLE_PATTERN.structure).toContain('Rechercher');
      expect(CRUD_TABLE_PATTERN.structure).toContain('Pagination');
    });

    it('mentionne AlertDialog pour suppression', () => {
      expect(CRUD_TABLE_PATTERN.components).toContain('AlertDialog');
      expect(CRUD_TABLE_PATTERN.promptHint).toContain('AlertDialog');
    });
  });

  describe('SETTINGS_PATTERN', () => {
    it('est de catégorie page', () => {
      expect(SETTINGS_PATTERN.category).toBe('page');
    });

    it('contient les composants Tabs', () => {
      expect(SETTINGS_PATTERN.components).toContain('Tabs');
      expect(SETTINGS_PATTERN.components).toContain('TabsList');
      expect(SETTINGS_PATTERN.components).toContain('TabsTrigger');
      expect(SETTINGS_PATTERN.components).toContain('TabsContent');
    });

    it('contient Switch pour les toggles', () => {
      expect(SETTINGS_PATTERN.components).toContain('Switch');
    });

    it('la structure contient les sections attendues', () => {
      expect(SETTINGS_PATTERN.structure).toContain('profile');
      expect(SETTINGS_PATTERN.structure).toContain('notifications');
    });
  });

  describe('PROFILE_PATTERN', () => {
    it('est de catégorie page', () => {
      expect(PROFILE_PATTERN.category).toBe('page');
    });

    it('contient Avatar et Badge', () => {
      expect(PROFILE_PATTERN.components).toContain('Avatar');
      expect(PROFILE_PATTERN.components).toContain('Badge');
    });

    it('la structure est responsive', () => {
      expect(PROFILE_PATTERN.structure).toContain('md:flex-row');
      expect(PROFILE_PATTERN.structure).toContain('md:text-left');
    });

    it('contient Tabs pour le contenu', () => {
      expect(PROFILE_PATTERN.components).toContain('Tabs');
    });
  });

  describe('getPatternById', () => {
    it('retourne le bon pattern pour un ID valide', () => {
      expect(getPatternById('dashboard')).toEqual(DASHBOARD_PATTERN);
      expect(getPatternById('auth')).toEqual(AUTH_PATTERN);
      expect(getPatternById('landing')).toEqual(LANDING_PATTERN);
      expect(getPatternById('crud-table')).toEqual(CRUD_TABLE_PATTERN);
      expect(getPatternById('settings')).toEqual(SETTINGS_PATTERN);
      expect(getPatternById('profile')).toEqual(PROFILE_PATTERN);
    });

    it('retourne undefined pour un ID inexistant', () => {
      expect(getPatternById('inexistant')).toBeUndefined();
      expect(getPatternById('')).toBeUndefined();
    });
  });

  describe('getPatternsByCategory', () => {
    it('filtre correctement les layouts', () => {
      const layouts = getPatternsByCategory('layout');
      expect(layouts.length).toBeGreaterThan(0);
      layouts.forEach((p) => expect(p.category).toBe('layout'));
      expect(layouts).toContainEqual(DASHBOARD_PATTERN);
    });

    it('filtre correctement les pages', () => {
      const pages = getPatternsByCategory('page');
      expect(pages.length).toBeGreaterThan(0);
      pages.forEach((p) => expect(p.category).toBe('page'));
      expect(pages).toContainEqual(AUTH_PATTERN);
      expect(pages).toContainEqual(LANDING_PATTERN);
      expect(pages).toContainEqual(SETTINGS_PATTERN);
      expect(pages).toContainEqual(PROFILE_PATTERN);
    });

    it('filtre correctement les components', () => {
      const components = getPatternsByCategory('component');
      expect(components.length).toBeGreaterThan(0);
      components.forEach((p) => expect(p.category).toBe('component'));
      expect(components).toContainEqual(CRUD_TABLE_PATTERN);
    });

    it('retourne un tableau vide pour une catégorie sans patterns', () => {
      const forms = getPatternsByCategory('form');
      expect(forms).toEqual([]);
    });
  });

  describe('getUniqueComponents', () => {
    it('retourne les composants uniques pour un seul pattern', () => {
      const components = getUniqueComponents(['dashboard']);
      expect(components).toContain('Sheet');
      expect(components).toContain('Card');
      // Pas de doublons
      expect(new Set(components).size).toBe(components.length);
    });

    it('fusionne les composants de plusieurs patterns', () => {
      const components = getUniqueComponents(['dashboard', 'auth']);
      expect(components).toContain('Button'); // Les deux
      expect(components).toContain('Sheet'); // Dashboard
      expect(components).toContain('Form'); // Auth
    });

    it('retourne un tableau trié', () => {
      const components = getUniqueComponents(['dashboard', 'auth']);
      const sorted = [...components].sort();
      expect(components).toEqual(sorted);
    });

    it('gère les IDs invalides', () => {
      const components = getUniqueComponents(['inexistant']);
      expect(components).toEqual([]);
    });
  });

  describe('combinePatternHints', () => {
    it('combine les hints de plusieurs patterns', () => {
      const combined = combinePatternHints(['dashboard', 'auth']);
      expect(combined).toContain('Sheet');
      expect(combined).toContain('react-hook-form');
    });

    it('retourne une chaîne vide pour des IDs invalides', () => {
      const combined = combinePatternHints(['inexistant']);
      expect(combined).toBe('');
    });

    it('ignore les IDs invalides dans la liste', () => {
      const combined = combinePatternHints(['dashboard', 'inexistant', 'auth']);
      expect(combined).toContain('Sheet');
      expect(combined).toContain('react-hook-form');
    });
  });

  describe('searchPatterns', () => {
    it('trouve des patterns par nom', () => {
      const results = searchPatterns('dashboard');
      expect(results).toContainEqual(DASHBOARD_PATTERN);
    });

    it('trouve des patterns par description', () => {
      const results = searchPatterns('admin');
      expect(results).toContainEqual(DASHBOARD_PATTERN);
    });

    it('est insensible à la casse', () => {
      const resultsLower = searchPatterns('dashboard');
      const resultsUpper = searchPatterns('DASHBOARD');
      expect(resultsLower).toEqual(resultsUpper);
    });

    it('retourne un tableau vide si aucun résultat', () => {
      const results = searchPatterns('xyz123inexistant');
      expect(results).toEqual([]);
    });

    it('trouve plusieurs patterns correspondants', () => {
      const results = searchPatterns('page');
      expect(results.length).toBeGreaterThan(1);
    });
  });

  describe('Conformité shadcn/ui', () => {
    it('tous les patterns utilisent des composants shadcn/ui', () => {
      const shadcnComponents = [
        'Button', 'Card', 'Dialog', 'Form', 'Input', 'Label',
        'Select', 'Table', 'Tabs', 'Sheet', 'Avatar', 'Badge',
        'DropdownMenu', 'Switch', 'Separator', 'AlertDialog',
        'NavigationMenu'
      ];

      ALL_PATTERNS.forEach((pattern) => {
        pattern.components.forEach((component) => {
          // Vérifie que c'est un composant shadcn/ui ou une variante
          const isValid = shadcnComponents.some(
            (sc) => component.includes(sc) || sc.includes(component)
          );
          expect(isValid).toBe(true);
        });
      });
    });

    it('les structures utilisent les classes Tailwind responsive', () => {
      ALL_PATTERNS.forEach((pattern) => {
        // Au moins une classe responsive
        const hasResponsive =
          pattern.structure.includes('md:') ||
          pattern.structure.includes('sm:') ||
          pattern.structure.includes('lg:');
        expect(hasResponsive).toBe(true);
      });
    });
  });
});
