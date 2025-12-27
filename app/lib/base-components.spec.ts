/**
 * Tests pour les composants de base shadcn/ui
 * Vérifie que toutes les configurations et composants sont correctement définis
 */

import { describe, it, expect } from 'vitest';
import {
  TAILWIND_CONFIG,
  CSS_VARIABLES,
  UTILS_TS,
  BUTTON_COMPONENT,
  CARD_COMPONENT,
  INPUT_COMPONENT,
  LABEL_COMPONENT,
  BASE_COMPONENTS,
  getComponentById,
  getComponentNames,
  getDependencies,
  getUIDependencies,
  getUIDevDependencies,
  getShadcnConfig,
} from './templates/base-components';

describe('Base Components', () => {
  describe('TAILWIND_CONFIG', () => {
    it('contient la configuration darkMode', () => {
      expect(TAILWIND_CONFIG).toContain('darkMode: ["class"]');
    });

    it('contient les couleurs shadcn/ui', () => {
      expect(TAILWIND_CONFIG).toContain('background: "hsl(var(--background))"');
      expect(TAILWIND_CONFIG).toContain('foreground: "hsl(var(--foreground))"');
      expect(TAILWIND_CONFIG).toContain('primary:');
      expect(TAILWIND_CONFIG).toContain('secondary:');
      expect(TAILWIND_CONFIG).toContain('destructive:');
      expect(TAILWIND_CONFIG).toContain('muted:');
      expect(TAILWIND_CONFIG).toContain('accent:');
    });

    it('contient les border radius', () => {
      expect(TAILWIND_CONFIG).toContain('borderRadius:');
      expect(TAILWIND_CONFIG).toContain('lg: "var(--radius)"');
    });

    it('contient les animations accordion', () => {
      expect(TAILWIND_CONFIG).toContain('accordion-down');
      expect(TAILWIND_CONFIG).toContain('accordion-up');
    });

    it('inclut le plugin tailwindcss-animate', () => {
      expect(TAILWIND_CONFIG).toContain('require("tailwindcss-animate")');
    });
  });

  describe('CSS_VARIABLES', () => {
    it('contient les directives Tailwind', () => {
      expect(CSS_VARIABLES).toContain('@tailwind base');
      expect(CSS_VARIABLES).toContain('@tailwind components');
      expect(CSS_VARIABLES).toContain('@tailwind utilities');
    });

    it('contient les variables light mode', () => {
      expect(CSS_VARIABLES).toContain(':root {');
      expect(CSS_VARIABLES).toContain('--background:');
      expect(CSS_VARIABLES).toContain('--foreground:');
      expect(CSS_VARIABLES).toContain('--primary:');
      expect(CSS_VARIABLES).toContain('--radius: 0.5rem');
    });

    it('contient les variables dark mode', () => {
      expect(CSS_VARIABLES).toContain('.dark {');
    });

    it('applique les styles de base', () => {
      expect(CSS_VARIABLES).toContain('@apply border-border');
      expect(CSS_VARIABLES).toContain('@apply bg-background text-foreground');
    });
  });

  describe('UTILS_TS', () => {
    it('importe clsx et tailwind-merge', () => {
      expect(UTILS_TS).toContain('import { type ClassValue, clsx }');
      expect(UTILS_TS).toContain('import { twMerge }');
    });

    it('exporte la fonction cn', () => {
      expect(UTILS_TS).toContain('export function cn');
      expect(UTILS_TS).toContain('twMerge(clsx(inputs))');
    });
  });

  describe('BUTTON_COMPONENT', () => {
    it('utilise class-variance-authority', () => {
      expect(BUTTON_COMPONENT).toContain('cva');
      expect(BUTTON_COMPONENT).toContain('VariantProps');
    });

    it('contient toutes les variantes', () => {
      expect(BUTTON_COMPONENT).toContain('default:');
      expect(BUTTON_COMPONENT).toContain('destructive:');
      expect(BUTTON_COMPONENT).toContain('outline:');
      expect(BUTTON_COMPONENT).toContain('secondary:');
      expect(BUTTON_COMPONENT).toContain('ghost:');
      expect(BUTTON_COMPONENT).toContain('link:');
    });

    it('contient toutes les tailles', () => {
      expect(BUTTON_COMPONENT).toContain('size:');
      expect(BUTTON_COMPONENT).toContain('sm:');
      expect(BUTTON_COMPONENT).toContain('lg:');
      expect(BUTTON_COMPONENT).toContain('icon:');
    });

    it('supporte asChild avec Slot', () => {
      expect(BUTTON_COMPONENT).toContain('@radix-ui/react-slot');
      expect(BUTTON_COMPONENT).toContain('asChild');
    });

    it('exporte Button et buttonVariants', () => {
      expect(BUTTON_COMPONENT).toContain('export { Button, buttonVariants }');
    });
  });

  describe('CARD_COMPONENT', () => {
    it('exporte tous les sous-composants', () => {
      expect(CARD_COMPONENT).toContain('Card');
      expect(CARD_COMPONENT).toContain('CardHeader');
      expect(CARD_COMPONENT).toContain('CardTitle');
      expect(CARD_COMPONENT).toContain('CardDescription');
      expect(CARD_COMPONENT).toContain('CardContent');
      expect(CARD_COMPONENT).toContain('CardFooter');
    });

    it('utilise les classes shadcn/ui', () => {
      expect(CARD_COMPONENT).toContain('bg-card');
      expect(CARD_COMPONENT).toContain('text-card-foreground');
      expect(CARD_COMPONENT).toContain('rounded-lg');
    });
  });

  describe('INPUT_COMPONENT', () => {
    it('utilise les classes focus-visible', () => {
      expect(INPUT_COMPONENT).toContain('focus-visible:outline-none');
      expect(INPUT_COMPONENT).toContain('focus-visible:ring-2');
    });

    it('gère les états disabled', () => {
      expect(INPUT_COMPONENT).toContain('disabled:cursor-not-allowed');
      expect(INPUT_COMPONENT).toContain('disabled:opacity-50');
    });

    it('exporte Input', () => {
      expect(INPUT_COMPONENT).toContain('export { Input }');
    });
  });

  describe('LABEL_COMPONENT', () => {
    it('utilise Radix Label', () => {
      expect(LABEL_COMPONENT).toContain('@radix-ui/react-label');
      expect(LABEL_COMPONENT).toContain('LabelPrimitive');
    });

    it('gère les états peer-disabled', () => {
      expect(LABEL_COMPONENT).toContain('peer-disabled:cursor-not-allowed');
      expect(LABEL_COMPONENT).toContain('peer-disabled:opacity-70');
    });

    it('exporte Label', () => {
      expect(LABEL_COMPONENT).toContain('export { Label }');
    });
  });

  describe('BASE_COMPONENTS', () => {
    it('contient 4 composants', () => {
      expect(BASE_COMPONENTS).toHaveLength(4);
    });

    it('chaque composant a tous les champs requis', () => {
      BASE_COMPONENTS.forEach((component) => {
        expect(component).toHaveProperty('id');
        expect(component).toHaveProperty('name');
        expect(component).toHaveProperty('fileName');
        expect(component).toHaveProperty('code');
        expect(component).toHaveProperty('dependencies');
      });
    });

    it('les fileNames ont l\'extension .tsx', () => {
      BASE_COMPONENTS.forEach((component) => {
        expect(component.fileName).toMatch(/\.tsx$/);
      });
    });
  });

  describe('getComponentById', () => {
    it('retourne le bon composant pour un ID valide', () => {
      const button = getComponentById('button');
      expect(button).toBeDefined();
      expect(button?.name).toBe('Button');
    });

    it('retourne undefined pour un ID inexistant', () => {
      expect(getComponentById('inexistant')).toBeUndefined();
    });
  });

  describe('getComponentNames', () => {
    it('retourne les noms de tous les composants', () => {
      const names = getComponentNames();
      expect(names).toContain('Button');
      expect(names).toContain('Card');
      expect(names).toContain('Input');
      expect(names).toContain('Label');
    });
  });

  describe('getDependencies', () => {
    it('inclut toujours clsx et tailwind-merge', () => {
      const deps = getDependencies([]);
      expect(deps).toContain('clsx');
      expect(deps).toContain('tailwind-merge');
    });

    it('ajoute les dépendances du composant button', () => {
      const deps = getDependencies(['button']);
      expect(deps).toContain('class-variance-authority');
      expect(deps).toContain('@radix-ui/react-slot');
    });

    it('ajoute les dépendances du composant label', () => {
      const deps = getDependencies(['label']);
      expect(deps).toContain('@radix-ui/react-label');
    });

    it('évite les doublons', () => {
      const deps = getDependencies(['button', 'label']);
      const uniqueDeps = [...new Set(deps)];
      expect(deps.length).toBe(uniqueDeps.length);
    });

    it('retourne un tableau trié', () => {
      const deps = getDependencies(['button', 'label']);
      const sorted = [...deps].sort();
      expect(deps).toEqual(sorted);
    });
  });

  describe('getUIDependencies', () => {
    it('retourne les dépendances UI nécessaires', () => {
      const deps = getUIDependencies();
      expect(deps).toHaveProperty('clsx');
      expect(deps).toHaveProperty('tailwind-merge');
      expect(deps).toHaveProperty('class-variance-authority');
      expect(deps).toHaveProperty('lucide-react');
    });

    it('toutes les versions commencent par ^', () => {
      const deps = getUIDependencies();
      Object.values(deps).forEach((version) => {
        expect(version).toMatch(/^\^/);
      });
    });
  });

  describe('getUIDevDependencies', () => {
    it('retourne les devDependencies nécessaires', () => {
      const deps = getUIDevDependencies();
      expect(deps).toHaveProperty('tailwindcss');
      expect(deps).toHaveProperty('tailwindcss-animate');
      expect(deps).toHaveProperty('autoprefixer');
      expect(deps).toHaveProperty('postcss');
    });
  });

  describe('getShadcnConfig', () => {
    it('retourne une configuration complète', () => {
      const config = getShadcnConfig();
      expect(config).toHaveProperty('tailwindConfig');
      expect(config).toHaveProperty('cssVariables');
      expect(config).toHaveProperty('utilsTs');
      expect(config).toHaveProperty('components');
      expect(config).toHaveProperty('dependencies');
      expect(config).toHaveProperty('devDependencies');
    });

    it('contient les bons composants', () => {
      const config = getShadcnConfig();
      expect(config.components).toHaveLength(4);
    });

    it('le tailwindConfig est valide', () => {
      const config = getShadcnConfig();
      expect(config.tailwindConfig).toBe(TAILWIND_CONFIG);
    });
  });
});
