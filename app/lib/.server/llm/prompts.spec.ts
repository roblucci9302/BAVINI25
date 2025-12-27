/**
 * Tests pour les prompts système de BAVINI
 * Vérifie que les standards UI et responsive sont bien inclus
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { getSystemPrompt } from './prompts';

describe('System Prompt', () => {
  let prompt: string;

  beforeAll(() => {
    prompt = getSystemPrompt();
  });

  describe('Structure de base', () => {
    it('contient les quality_standards', () => {
      expect(prompt).toContain('<quality_standards>');
      expect(prompt).toContain('</quality_standards>');
    });

    it('contient les ui_standards', () => {
      expect(prompt).toContain('<ui_standards>');
      expect(prompt).toContain('</ui_standards>');
    });

    it('contient les responsive_rules', () => {
      expect(prompt).toContain('<responsive_rules>');
      expect(prompt).toContain('</responsive_rules>');
    });

    it('contient les ui_patterns', () => {
      expect(prompt).toContain('<ui_patterns>');
      expect(prompt).toContain('</ui_patterns>');
    });

    it('contient les examples', () => {
      expect(prompt).toContain('<examples>');
      expect(prompt).toContain('</examples>');
    });
  });

  describe('UI Standards - shadcn/ui', () => {
    it('mentionne shadcn/ui comme obligatoire', () => {
      expect(prompt).toContain('shadcn/ui');
      expect(prompt).toContain('COMPOSANTS SHADCN/UI');
    });

    it('liste les composants shadcn requis', () => {
      expect(prompt).toContain('Button');
      expect(prompt).toContain('Card');
      expect(prompt).toContain('Dialog');
      expect(prompt).toContain('Input');
      expect(prompt).toContain('Label');
      expect(prompt).toContain('Table');
    });

    it('spécifie le chemin d\'import shadcn', () => {
      expect(prompt).toContain('@/components/ui/');
    });

    it('mentionne les dépendances shadcn', () => {
      expect(prompt).toContain('class-variance-authority');
      expect(prompt).toContain('clsx');
      expect(prompt).toContain('tailwind-merge');
    });
  });

  describe('UI Standards - Lucide React', () => {
    it('mentionne Lucide React comme obligatoire', () => {
      expect(prompt).toContain('lucide-react');
      expect(prompt).toContain('ICÔNES LUCIDE REACT');
    });

    it('interdit les emoji comme icônes', () => {
      expect(prompt).toContain('JAMAIS d\'emoji comme icônes');
    });

    it('interdit les SVG inline', () => {
      expect(prompt).toContain('JAMAIS d\'icônes en SVG inline');
    });
  });

  describe('UI Standards - Tailwind CSS', () => {
    it('mentionne Tailwind CSS comme obligatoire', () => {
      expect(prompt).toContain('TAILWIND CSS');
      expect(prompt).toContain('classes Tailwind');
    });

    it('liste les breakpoints standard', () => {
      expect(prompt).toContain('sm (640px)');
      expect(prompt).toContain('md (768px)');
      expect(prompt).toContain('lg (1024px)');
      expect(prompt).toContain('xl (1280px)');
    });

    it('interdit le CSS custom', () => {
      expect(prompt).toContain('JAMAIS de CSS custom');
    });

    it('mentionne la fonction cn()', () => {
      expect(prompt).toContain('cn()');
      expect(prompt).toContain('@/lib/utils');
    });
  });

  describe('UI Standards - Thème et couleurs', () => {
    it('mentionne les variables CSS shadcn', () => {
      expect(prompt).toContain('--background');
      expect(prompt).toContain('--foreground');
      expect(prompt).toContain('--primary');
      expect(prompt).toContain('--muted');
    });

    it('mentionne les classes Tailwind correspondantes', () => {
      expect(prompt).toContain('bg-background');
      expect(prompt).toContain('text-foreground');
      expect(prompt).toContain('bg-primary');
    });

    it('supporte le dark mode', () => {
      expect(prompt).toContain('dark mode');
      expect(prompt).toContain('dark:');
    });
  });

  describe('UI Standards - Accessibilité', () => {
    it('mentionne les règles d\'accessibilité', () => {
      expect(prompt).toContain('ACCESSIBILITÉ');
      expect(prompt).toContain('A11Y');
    });

    it('mentionne aria-label', () => {
      expect(prompt).toContain('aria-label');
    });

    it('mentionne WCAG', () => {
      expect(prompt).toContain('WCAG');
    });

    it('mentionne les labels de formulaire', () => {
      expect(prompt).toContain('htmlFor');
      expect(prompt).toContain('Label');
    });

    it('mentionne le focus visible', () => {
      expect(prompt).toContain('focus-visible');
    });
  });

  describe('Responsive Rules', () => {
    it('mentionne mobile-first', () => {
      expect(prompt).toContain('Mobile-First');
      expect(prompt).toContain('mobile');
    });

    it('contient les patterns de navigation responsive', () => {
      expect(prompt).toContain('hidden md:flex');
      expect(prompt).toContain('md:hidden');
      expect(prompt).toContain('Sheet');
    });

    it('contient les patterns de grille responsive', () => {
      expect(prompt).toContain('grid-cols-1');
      expect(prompt).toContain('md:grid-cols-2');
      expect(prompt).toContain('lg:grid-cols-3');
    });

    it('contient les patterns de typographie responsive', () => {
      expect(prompt).toContain('text-2xl md:text-3xl');
      expect(prompt).toContain('text-sm md:text-base');
    });

    it('contient les patterns d\'espacement responsive', () => {
      expect(prompt).toContain('p-4 md:p-6');
      expect(prompt).toContain('gap-4 md:gap-6');
    });

    it('contient les règles pour les images', () => {
      expect(prompt).toContain('aspect-video');
      expect(prompt).toContain('object-cover');
      expect(prompt).toContain('loading="lazy"');
    });
  });

  describe('UI Patterns prédéfinis', () => {
    it('contient les 6 patterns', () => {
      expect(prompt).toContain('DASHBOARD');
      expect(prompt).toContain('AUTHENTICATION');
      expect(prompt).toContain('LANDING PAGE');
      expect(prompt).toContain('CRUD TABLE');
      expect(prompt).toContain('SETTINGS');
      expect(prompt).toContain('PROFILE');
    });

    it('le pattern Dashboard mentionne Sheet et Sidebar', () => {
      expect(prompt).toContain('Sidebar avec navigation');
      expect(prompt).toContain('Sheet pour le menu mobile');
    });

    it('le pattern Auth mentionne react-hook-form et zod', () => {
      expect(prompt).toContain('react-hook-form + zod');
    });

    it('le pattern Landing mentionne Hero et Features', () => {
      expect(prompt).toContain('Hero section');
      expect(prompt).toContain('Features en grid');
    });

    it('le pattern CRUD mentionne Dialog et AlertDialog', () => {
      expect(prompt).toContain('Dialog pour créer/éditer');
      expect(prompt).toContain('AlertDialog pour confirmer');
    });

    it('le pattern Settings mentionne Tabs et Switch', () => {
      expect(prompt).toContain('Tabs horizontaux');
      expect(prompt).toContain('Switch pour les toggles');
    });

    it('le pattern Profile mentionne Avatar et Badges', () => {
      expect(prompt).toContain('avatar large');
      expect(prompt).toContain('Badges pour rôle');
    });
  });

  describe('Exemple ContactForm shadcn/ui', () => {
    it('contient l\'exemple de formulaire de contact', () => {
      expect(prompt).toContain('contact-form-shadcn');
      expect(prompt).toContain('Formulaire de Contact shadcn/ui');
    });

    it('l\'exemple utilise les composants shadcn', () => {
      expect(prompt).toContain('import { Button }');
      expect(prompt).toContain('import { Input }');
      expect(prompt).toContain('import { Label }');
      expect(prompt).toContain('import { Card');
    });

    it('l\'exemple utilise Lucide React', () => {
      expect(prompt).toContain('import { Send, Loader2 }');
      expect(prompt).toContain('from "lucide-react"');
    });

    it('l\'exemple utilise Zod pour la validation', () => {
      expect(prompt).toContain('zod');
      expect(prompt).toContain('zodResolver');
      expect(prompt).toContain('contactSchema');
    });

    it('l\'exemple utilise react-hook-form', () => {
      expect(prompt).toContain('react-hook-form');
      expect(prompt).toContain('useForm');
    });

    it('l\'exemple inclut la configuration Tailwind shadcn', () => {
      expect(prompt).toContain('tailwind.config.js');
      expect(prompt).toContain('hsl(var(--primary))');
    });

    it('l\'exemple inclut les variables CSS', () => {
      expect(prompt).toContain('--background: 0 0% 100%');
      expect(prompt).toContain('--primary: 222.2 47.4% 11.2%');
    });

    it('l\'exemple inclut la fonction cn()', () => {
      expect(prompt).toContain('src/lib/utils.ts');
      expect(prompt).toContain('export function cn');
      expect(prompt).toContain('twMerge(clsx(inputs))');
    });
  });

  describe('Fichiers de configuration requis', () => {
    it('mentionne tailwind.config.js', () => {
      expect(prompt).toContain('tailwind.config.js');
    });

    it('mentionne src/lib/utils.ts', () => {
      expect(prompt).toContain('src/lib/utils.ts');
    });

    it('mentionne src/index.css', () => {
      expect(prompt).toContain('src/index.css');
    });

    it('mentionne l\'alias de chemin @/', () => {
      expect(prompt).toContain('@/');
      expect(prompt).toContain('tsconfig.json');
    });
  });
});
