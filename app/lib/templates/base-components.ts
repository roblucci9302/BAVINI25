/**
 * Composants et configurations de base pour shadcn/ui
 * Ces templates sont utilisés pour générer des projets avec une UI moderne
 */

// ============================================================================
// CONFIGURATION TAILWIND SHADCN/UI
// ============================================================================

/**
 * Configuration Tailwind CSS complète pour shadcn/ui
 * Inclut les couleurs, animations, et utilitaires
 */
export const TAILWIND_CONFIG = `/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`;

// ============================================================================
// VARIABLES CSS GLOBALES
// ============================================================================

/**
 * Variables CSS pour le thème shadcn/ui
 * Inclut les modes light et dark
 */
export const CSS_VARIABLES = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

// ============================================================================
// FONCTION UTILITAIRE CN()
// ============================================================================

/**
 * Fonction utilitaire pour merger les classes Tailwind
 */
export const UTILS_TS = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

// ============================================================================
// COMPOSANTS SHADCN/UI DE BASE
// ============================================================================

/**
 * Composant Button shadcn/ui
 */
export const BUTTON_COMPONENT = `import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };`;

/**
 * Composant Card shadcn/ui
 */
export const CARD_COMPONENT = `import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };`;

/**
 * Composant Input shadcn/ui
 */
export const INPUT_COMPONENT = `import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };`;

/**
 * Composant Label shadcn/ui
 */
export const LABEL_COMPONENT = `import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };`;

// ============================================================================
// INTERFACE ET TYPES
// ============================================================================

/**
 * Interface pour un composant de base
 */
export interface BaseComponent {
  id: string;
  name: string;
  fileName: string;
  code: string;
  dependencies: string[];
}

/**
 * Liste des composants de base disponibles
 */
export const BASE_COMPONENTS: BaseComponent[] = [
  {
    id: 'button',
    name: 'Button',
    fileName: 'button.tsx',
    code: BUTTON_COMPONENT,
    dependencies: ['@radix-ui/react-slot', 'class-variance-authority'],
  },
  {
    id: 'card',
    name: 'Card',
    fileName: 'card.tsx',
    code: CARD_COMPONENT,
    dependencies: [],
  },
  {
    id: 'input',
    name: 'Input',
    fileName: 'input.tsx',
    code: INPUT_COMPONENT,
    dependencies: [],
  },
  {
    id: 'label',
    name: 'Label',
    fileName: 'label.tsx',
    code: LABEL_COMPONENT,
    dependencies: ['@radix-ui/react-label', 'class-variance-authority'],
  },
];

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Récupère un composant par son ID
 */
export function getComponentById(id: string): BaseComponent | undefined {
  return BASE_COMPONENTS.find((c) => c.id === id);
}

/**
 * Récupère tous les noms de composants disponibles
 */
export function getComponentNames(): string[] {
  return BASE_COMPONENTS.map((c) => c.name);
}

/**
 * Récupère toutes les dépendances nécessaires pour un ensemble de composants
 */
export function getDependencies(componentIds: string[]): string[] {
  const deps = new Set<string>();

  // Dépendances de base toujours nécessaires
  deps.add('clsx');
  deps.add('tailwind-merge');

  componentIds.forEach((id) => {
    const component = getComponentById(id);
    if (component) {
      component.dependencies.forEach((dep) => deps.add(dep));
    }
  });

  return Array.from(deps).sort();
}

/**
 * Génère le contenu du fichier package.json pour les dépendances UI
 */
export function getUIDependencies(): Record<string, string> {
  return {
    'clsx': '^2.1.0',
    'tailwind-merge': '^2.2.0',
    'class-variance-authority': '^0.7.0',
    '@radix-ui/react-slot': '^1.0.2',
    '@radix-ui/react-label': '^2.0.2',
    'lucide-react': '^0.309.0',
  };
}

/**
 * Génère le contenu du fichier package.json pour les devDependencies
 */
export function getUIDevDependencies(): Record<string, string> {
  return {
    'tailwindcss': '^3.4.0',
    'tailwindcss-animate': '^1.0.7',
    'autoprefixer': '^10.4.16',
    'postcss': '^8.4.32',
  };
}

// ============================================================================
// CONFIGURATION COMPLÈTE
// ============================================================================

/**
 * Interface pour la configuration complète
 */
export interface ShadcnConfig {
  tailwindConfig: string;
  cssVariables: string;
  utilsTs: string;
  components: BaseComponent[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

/**
 * Récupère la configuration shadcn/ui complète
 */
export function getShadcnConfig(): ShadcnConfig {
  return {
    tailwindConfig: TAILWIND_CONFIG,
    cssVariables: CSS_VARIABLES,
    utilsTs: UTILS_TS,
    components: BASE_COMPONENTS,
    dependencies: getUIDependencies(),
    devDependencies: getUIDevDependencies(),
  };
}
