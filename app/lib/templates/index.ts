/**
 * Service de gestion des templates de projet
 * Permet de charger et afficher les templates disponibles pour un démarrage rapide
 */

// Re-export des UI patterns pour un accès centralisé
export * from './ui-patterns';

// Re-export des composants de base shadcn/ui
export * from './base-components';

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  prompt: string;
}

/**
 * Liste des templates disponibles pour le démarrage rapide
 * Chaque template génère un projet TypeScript avec tests Vitest
 */
export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'react-vite-ts',
    name: 'React',
    description: 'Application React + TypeScript + Vite + Vitest',
    icon: '⚛️',
    color: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30',
    prompt: 'Crée une application React avec TypeScript, Vite, et Vitest pour les tests. Inclure un composant App de base avec un test.',
  },
  {
    id: 'node-ts',
    name: 'Node.js',
    description: 'Serveur Node.js + TypeScript + Vitest',
    icon: '🟢',
    color: 'bg-green-500/10 hover:bg-green-500/20 border-green-500/30',
    prompt: 'Crée un projet Node.js avec TypeScript et Vitest pour les tests. Inclure un point d\'entrée index.ts et un module utilitaire avec tests.',
  },
  {
    id: 'next-ts',
    name: 'Next.js',
    description: 'Application Next.js 14 + TypeScript + App Router',
    icon: '▲',
    color: 'bg-gray-500/10 hover:bg-gray-500/20 border-gray-500/30',
    prompt: 'Crée une application Next.js 14 avec TypeScript et App Router. Inclure une page d\'accueil, un layout, et la configuration de tests avec Vitest.',
  },
  {
    id: 'astro-ts',
    name: 'Astro',
    description: 'Site Astro + TypeScript + Islands',
    icon: '🚀',
    color: 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30',
    prompt: 'Crée un site Astro avec TypeScript. Inclure une page d\'accueil, un composant interactif React, et la configuration de tests.',
  },
  {
    id: 'express-ts',
    name: 'API Express',
    description: 'API REST Express + TypeScript + Vitest',
    icon: '🔌',
    color: 'bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/30',
    prompt: 'Crée une API REST avec Express et TypeScript. Inclure un endpoint /health, la structure MVC, et des tests avec Vitest et Supertest.',
  },
  // ============================================================================
  // TEMPLATES SHADCN/UI - Templates avec UI moderne pré-configurée
  // ============================================================================
  {
    id: 'react-shadcn',
    name: 'React + shadcn/ui',
    description: 'React + TypeScript + Tailwind + shadcn/ui + Vitest',
    icon: '🎨',
    color: 'bg-violet-500/10 hover:bg-violet-500/20 border-violet-500/30',
    prompt: `Crée une application React moderne avec:

## Stack technique
- React 18 + TypeScript + Vite
- Tailwind CSS configuré avec le thème shadcn/ui
- shadcn/ui components installés (Button, Card, Input, Label)
- Lucide React pour les icônes
- Vitest + Testing Library pour les tests

## Structure attendue
- src/components/ui/ - Composants shadcn/ui (Button, Card, Input, Label)
- src/components/ - Composants métier
- src/lib/utils.ts - Fonction cn() pour les classes
- tailwind.config.js - Configuration avec couleurs shadcn
- Configuration du path alias "@/" vers src/

## Fichiers de base
- Un composant App.tsx avec un exemple de Card et Button
- Les styles CSS de base pour shadcn/ui (variables CSS)
- Un test pour le composant App

## Important
- Utiliser les variables CSS de shadcn pour les couleurs (--primary, --background, etc.)
- Mobile-first responsive design
- Tous les composants typés avec TypeScript
- Inclure class-variance-authority, clsx, tailwind-merge`,
  },
  {
    id: 'nextjs-shadcn',
    name: 'Next.js + shadcn/ui',
    description: 'Next.js 14 + App Router + shadcn/ui + Tailwind',
    icon: '▲',
    color: 'bg-black/10 hover:bg-black/20 border-black/30 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/30',
    prompt: `Crée une application Next.js 14 avec:

## Stack technique
- Next.js 14 avec App Router
- TypeScript strict
- Tailwind CSS + shadcn/ui theme
- shadcn/ui components de base (Button, Card, Input, Label)
- Lucide React pour les icônes
- Vitest pour les tests

## Structure attendue
- app/ - App Router pages
- components/ui/ - Composants shadcn/ui
- components/ - Composants métier
- lib/utils.ts - Fonction cn() pour les classes

## Pages de base
- app/page.tsx - Page d'accueil avec hero section responsive
- app/layout.tsx - Layout avec metadata et providers
- components/ui/button.tsx, card.tsx, input.tsx, label.tsx

## Important
- Utiliser les Server Components par défaut
- "use client" uniquement quand nécessaire
- Metadata configurée pour le SEO
- Dark mode supporté avec les variables CSS shadcn
- Mobile-first responsive design`,
  },
  {
    id: 'fullstack-supabase',
    name: 'Full-Stack Supabase',
    description: 'React + shadcn/ui + Supabase (Auth, DB, Storage)',
    icon: '⚡',
    color: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30',
    prompt: `Crée une application full-stack avec Supabase:

## Stack technique
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui (Button, Card, Input, Label, Form)
- Supabase Client pour Auth et Database
- React Router pour la navigation
- React Query pour le data fetching
- Lucide React pour les icônes
- Vitest pour les tests

## Fonctionnalités Auth
- Page de connexion (email/password) avec shadcn/ui Form
- Page d'inscription avec validation Zod
- Page mot de passe oublié
- AuthContext pour l'état utilisateur
- Protection des routes privées

## Structure
- src/lib/supabase.ts - Client Supabase configuré
- src/lib/utils.ts - Fonction cn() pour les classes
- src/contexts/AuthContext.tsx - Provider Auth
- src/hooks/useAuth.ts - Hook personnalisé
- src/pages/auth/ - Pages d'authentification (Login, Register, ForgotPassword)
- src/pages/dashboard/ - Pages protégées
- src/components/auth/ProtectedRoute.tsx
- src/components/ui/ - Composants shadcn/ui

## Important
- Variables d'environnement pour les clés Supabase (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- Fichier .env.example avec les variables requises
- Types TypeScript générés pour Supabase si applicable
- Mobile-first responsive design
- Dark mode supporté`,
  },
];

/**
 * Récupère un template par son identifiant
 */
export function getTemplateById(id: string): ProjectTemplate | undefined {
  return PROJECT_TEMPLATES.find((template) => template.id === id);
}

/**
 * Récupère les templates principaux à afficher (les 4 premiers)
 */
export function getMainTemplates(): ProjectTemplate[] {
  return PROJECT_TEMPLATES.slice(0, 4);
}

/**
 * Récupère les templates additionnels (après les 4 premiers)
 */
export function getAdditionalTemplates(): ProjectTemplate[] {
  return PROJECT_TEMPLATES.slice(4);
}

// ============================================================================
// FONCTIONS POUR TEMPLATES SHADCN/UI
// ============================================================================

/**
 * IDs des templates utilisant shadcn/ui
 */
const SHADCN_TEMPLATE_IDS = ['react-shadcn', 'nextjs-shadcn', 'fullstack-supabase'];

/**
 * Récupère les templates avec shadcn/ui pré-configuré
 */
export function getShadcnTemplates(): ProjectTemplate[] {
  return PROJECT_TEMPLATES.filter((t) => SHADCN_TEMPLATE_IDS.includes(t.id));
}

/**
 * Vérifie si un template utilise shadcn/ui
 */
export function isShadcnTemplate(templateId: string): boolean {
  return SHADCN_TEMPLATE_IDS.includes(templateId);
}

/**
 * Récupère les templates de base (sans shadcn/ui)
 */
export function getBasicTemplates(): ProjectTemplate[] {
  return PROJECT_TEMPLATES.filter((t) => !SHADCN_TEMPLATE_IDS.includes(t.id));
}
