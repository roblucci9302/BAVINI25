/**
 * Patterns UI prédéfinis pour BAVINI
 * Chaque pattern définit une structure et des composants recommandés
 *
 * Les patterns suivent les standards shadcn/ui et sont optimisés pour le responsive
 */

export interface UIPattern {
  id: string;
  name: string;
  description: string;
  category: 'layout' | 'page' | 'component' | 'form';
  structure: string;
  components: string[];
  promptHint: string;
}

/**
 * Pattern: Dashboard Layout
 * Layout admin avec sidebar et header
 */
export const DASHBOARD_PATTERN: UIPattern = {
  id: 'dashboard',
  name: 'Dashboard',
  description: 'Interface admin avec navigation latérale',
  category: 'layout',
  components: [
    'Sheet', 'Button', 'Avatar', 'DropdownMenu',
    'Card', 'Table', 'Badge', 'Tabs'
  ],
  structure: `
    <div className="flex h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r">
        <div className="flex h-16 items-center border-b px-4">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <NavLinks />
        </nav>
      </aside>

      {/* Sidebar - Mobile (Sheet) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav><NavLinks /></nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-6">
          <h1 className="text-lg font-semibold">{pageTitle}</h1>
          <UserMenu />
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  `,
  promptHint: `
    Pour un dashboard, utilise:
    - Sheet pour le menu mobile
    - DropdownMenu pour le menu utilisateur
    - Cards pour les statistiques
    - Table pour les données
    - Tabs pour la navigation secondaire
  `
};

/**
 * Pattern: Authentication Pages
 * Login, Register, Forgot Password
 */
export const AUTH_PATTERN: UIPattern = {
  id: 'auth',
  name: 'Authentication',
  description: 'Pages de connexion et inscription',
  category: 'page',
  components: [
    'Card', 'CardHeader', 'CardContent', 'CardFooter',
    'Form', 'Input', 'Label', 'Button', 'Separator'
  ],
  structure: `
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4 md:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2 md:space-y-4">
          <Logo className="mx-auto mb-4 h-10 w-10 md:h-12 md:w-12" />
          <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields}
            <Button type="submit" className="w-full">
              {submitLabel}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              ou continuer avec
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline">
              <GoogleIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline">
              <GithubIcon className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            {footerText} <a href={footerLink} className="text-primary hover:underline">{footerLinkText}</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  `,
  promptHint: `
    Pour l'authentification:
    - Card centré sur fond muted
    - Validation avec react-hook-form + zod
    - Boutons OAuth avec icônes
    - Liens vers les autres pages auth
    - Messages d'erreur sous chaque champ
  `
};

/**
 * Pattern: Landing Page
 * Page marketing avec sections
 */
export const LANDING_PATTERN: UIPattern = {
  id: 'landing',
  name: 'Landing Page',
  description: 'Page marketing avec hero et features',
  category: 'page',
  components: [
    'Button', 'Card', 'Badge', 'Avatar',
    'NavigationMenu', 'Sheet'
  ],
  structure: `
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <nav className="container flex h-16 items-center justify-between">
          <Logo />
          <NavigationMenu className="hidden md:flex" />
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex">Connexion</Button>
            <Button>Commencer</Button>
            <MobileMenu className="md:hidden" />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container py-24 md:py-32 text-center">
        <Badge className="mb-4">Nouveau</Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {heroTitle}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          {heroDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">{ctaPrimary}</Button>
          <Button size="lg" variant="outline">{ctaSecondary}</Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(feature => (
            <Card key={feature.id}>
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">{ctaTitle}</h2>
          <p className="text-lg opacity-90 mb-8">{ctaDescription}</p>
          <Button size="lg" variant="secondary">{ctaButton}</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <FooterContent />
        </div>
      </footer>
    </div>
  `,
  promptHint: `
    Pour une landing page:
    - Header sticky avec navigation responsive
    - Hero avec CTA prominent
    - Features en grid 3 colonnes (1 sur mobile)
    - Section CTA avec couleur primaire
    - Footer avec liens
  `
};

/**
 * Pattern: CRUD Table
 * Liste avec actions et modal
 */
export const CRUD_TABLE_PATTERN: UIPattern = {
  id: 'crud-table',
  name: 'CRUD Table',
  description: 'Tableau de données avec actions CRUD',
  category: 'component',
  components: [
    'Table', 'TableHeader', 'TableBody', 'TableRow', 'TableCell',
    'Button', 'Dialog', 'DropdownMenu', 'Input', 'Badge',
    'AlertDialog'
  ],
  structure: `
    <div className="space-y-4">
      {/* Header avec recherche et bouton ajouter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." className="pl-9" />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CreateForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(col => (
                <TableHead key={col.id}>{col.label}</TableHead>
              ))}
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                {columns.map(col => (
                  <TableCell key={col.id}>{item[col.id]}</TableCell>
                ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {totalItems} éléments
        </p>
        <Pagination />
      </div>
    </div>
  `,
  promptHint: `
    Pour un CRUD table:
    - Barre de recherche + bouton ajouter
    - Table avec colonnes triables
    - DropdownMenu pour les actions par ligne
    - Dialog pour créer/éditer
    - AlertDialog pour confirmer suppression
    - Pagination en bas
  `
};

/**
 * Pattern: Settings Page
 * Page paramètres avec tabs
 */
export const SETTINGS_PATTERN: UIPattern = {
  id: 'settings',
  name: 'Settings',
  description: 'Page de paramètres avec onglets',
  category: 'page',
  components: [
    'Tabs', 'TabsList', 'TabsTrigger', 'TabsContent',
    'Card', 'Form', 'Input', 'Label', 'Switch', 'Button',
    'Select', 'Separator', 'Avatar'
  ],
  structure: `
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Gérez vos préférences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="account">Compte</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
              <CardDescription>Vos informations publiques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <Button variant="outline">Changer la photo</Button>
              </div>
              <Separator />
              <ProfileForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configurez vos alertes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationSettings.map(setting => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{setting.label}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch checked={setting.enabled} onCheckedChange={...} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  `,
  promptHint: `
    Pour une page settings:
    - Tabs horizontaux pour les sections
    - Chaque section dans une Card
    - Switch pour les toggles
    - Formulaires avec validation
    - Bouton sauvegarder par section
  `
};

/**
 * Pattern: Profile Page
 * Page profil utilisateur
 */
export const PROFILE_PATTERN: UIPattern = {
  id: 'profile',
  name: 'Profile',
  description: 'Page profil utilisateur',
  category: 'page',
  components: [
    'Avatar', 'Card', 'Button', 'Badge', 'Tabs',
    'Separator'
  ],
  structure: `
    <div className="container max-w-4xl py-8">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl">{user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                <Badge>{user.role}</Badge>
                <Badge variant="outline">Membre depuis {user.joinDate}</Badge>
              </div>
            </div>
            <Button variant="outline">Modifier le profil</Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Content */}
      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">Activité</TabsTrigger>
          <TabsTrigger value="projects">Projets</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-6">
          <ActivityFeed activities={user.activities} />
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {user.projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  `,
  promptHint: `
    Pour une page profil:
    - Header avec avatar large et infos principales
    - Badges pour le rôle et statut
    - Tabs pour le contenu secondaire
    - Cards pour les projets/items
  `
};

// ============================================================================
// EXPORTS ET UTILITAIRES
// ============================================================================

/**
 * Export de tous les patterns indexés par ID
 */
export const UI_PATTERNS: Record<string, UIPattern> = {
  dashboard: DASHBOARD_PATTERN,
  auth: AUTH_PATTERN,
  landing: LANDING_PATTERN,
  'crud-table': CRUD_TABLE_PATTERN,
  settings: SETTINGS_PATTERN,
  profile: PROFILE_PATTERN,
};

/**
 * Liste de tous les patterns (pour itération)
 */
export const ALL_PATTERNS: UIPattern[] = Object.values(UI_PATTERNS);

/**
 * Récupère un pattern par son ID
 */
export function getPatternById(id: string): UIPattern | undefined {
  return UI_PATTERNS[id];
}

/**
 * Récupère tous les patterns d'une catégorie
 */
export function getPatternsByCategory(category: UIPattern['category']): UIPattern[] {
  return ALL_PATTERNS.filter(p => p.category === category);
}

/**
 * Récupère les composants uniques utilisés par un ensemble de patterns
 */
export function getUniqueComponents(patternIds: string[]): string[] {
  const components = new Set<string>();
  patternIds.forEach(id => {
    const pattern = UI_PATTERNS[id];
    if (pattern) {
      pattern.components.forEach(c => components.add(c));
    }
  });
  return Array.from(components).sort();
}

/**
 * Génère le prompt hint combiné pour plusieurs patterns
 */
export function combinePatternHints(patternIds: string[]): string {
  return patternIds
    .map(id => UI_PATTERNS[id]?.promptHint)
    .filter(Boolean)
    .join('\n\n');
}

/**
 * Recherche des patterns par mot-clé dans le nom ou la description
 */
export function searchPatterns(query: string): UIPattern[] {
  const lowerQuery = query.toLowerCase();
  return ALL_PATTERNS.filter(
    p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
}
