export const metadataOptions = {
  // Core Technology
  type: [
    'React App', 'Vue App', 'Angular App', 'Next.js App', 'API Server', 
    'CLI Tool', 'Library', 'Mobile App', 'Desktop App', 'Full-stack App'
  ],
  language: [
    'TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java', 
    'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin'
  ],
  runtime: [
    'Node.js 18+', 'Node.js 20+', 'Deno', 'Bun', 'Python 3.9+', 
    'Python 3.11+', 'Go 1.19+', 'Browser'
  ],
  framework: [
    'React', 'Vue', 'Angular', 'Svelte', 'Express', 'Fastify', 
    'NestJS', 'Next.js', 'Nuxt', 'SvelteKit', 'Astro'
  ],

  // Package Management
  packageManager: ['npm', 'yarn', 'pnpm', 'pip', 'cargo', 'go mod', 'composer'],
  packageLock: ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'requirements.txt'],
  monorepo: ['None', 'Lerna', 'Rush', 'Nx', 'Turborepo', 'Yarn Workspaces'],

  // Build & Bundling
  bundler: ['Webpack', 'Vite', 'Parcel', 'Rollup', 'esbuild', 'SWC', 'Turbopack'],
  buildTool: ['Create React App', 'Next.js', 'Nuxt', 'Astro', 'Remix', 'SvelteKit'],
  transpiler: ['Babel', 'SWC', 'TypeScript', 'esbuild'],

  // Styling & UI
  cssFramework: [
    'None', 'Tailwind CSS', 'Bootstrap', 'Bulma', 'Material-UI', 
    'Ant Design', 'Chakra UI', 'Mantine'
  ],
  cssInJs: [
    'None', 'Styled Components', 'Emotion', 'Stitches', 'JSS', 
    'Linaria', 'Vanilla Extract'
  ],
  cssPreprocessor: ['None', 'Sass/SCSS', 'Less', 'Stylus', 'PostCSS'],
  uiLibrary: [
    'None', 'Material-UI', 'Ant Design', 'Chakra UI', 'Mantine', 
    'React Bootstrap', 'Semantic UI', 'Headless UI'
  ],

  // State Management
  stateManagement: [
    'React State', 'Redux Toolkit', 'Zustand', 'Context API', 
    'MobX', 'Recoil', 'Jotai', 'Valtio'
  ],
  dataFetching: [
    'Fetch API', 'React Query', 'SWR', 'Apollo Client', 'Relay', 
    'Axios', 'RTK Query'
  ],

  // Backend & API
  backendFramework: [
    'Express', 'Fastify', 'NestJS', 'Koa', 'Hapi', 'Restify', 
    'Adonis', 'Sails'
  ],
  apiStyle: ['REST', 'GraphQL', 'gRPC', 'tRPC', 'JSON-RPC'],
  apiDocumentation: ['Swagger/OpenAPI', 'GraphQL Schema', 'Postman', 'Insomnia'],
  apiClient: ['Fetch', 'Axios', 'Superagent', 'Got', 'Apollo Client'],

  // Database & Storage
  database: [
    'PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis', 
    'MariaDB', 'CouchDB', 'DynamoDB', 'Supabase', 'PlanetScale'
  ],
  orm: [
    'Prisma', 'TypeORM', 'Sequelize', 'Mongoose', 'Drizzle', 
    'Knex', 'Objection.js', 'MikroORM'
  ],
  migrations: ['Auto migrations', 'Manual migrations', 'Schema-first', 'Code-first'],
  caching: ['None', 'Redis', 'Memcached', 'In-memory', 'CDN caching'],

  // Authentication & Security
  auth: [
    'JWT', 'OAuth 2.0', 'Auth0', 'Firebase Auth', 'NextAuth.js', 
    'Passport.js', 'Supabase Auth', 'Clerk'
  ],
  authorization: ['RBAC', 'ABAC', 'Simple permissions', 'Custom logic'],
  security: ['Helmet', 'CORS', 'Rate limiting', 'Input validation', 'CSRF protection'],

  // Testing
  testing: ['Jest', 'Vitest', 'Mocha', 'Jasmine', 'Ava', 'Node:test'],
  frontendTesting: [
    'React Testing Library', 'Enzyme', 'Vue Test Utils', 
    'Angular Testing Utilities'
  ],
  e2eTesting: ['Cypress', 'Playwright', 'Selenium', 'Puppeteer', 'WebDriver'],
  apiTesting: ['Supertest', 'Postman', 'Insomnia', 'REST Assured'],
  coverage: ['Istanbul', 'c8', 'nyc', 'Jest coverage'],

  // Code Quality
  linting: ['ESLint', 'TSLint', 'StandardJS', 'Biome', 'Rome'],
  formatting: ['Prettier', 'dprint', 'Biome', 'Rome'],
  typeChecking: ['TypeScript', 'Flow', 'PropTypes', 'JSDoc'],
  gitHooks: ['Husky', 'pre-commit', 'lint-staged', 'simple-git-hooks'],
  codeAnalysis: ['SonarQube', 'CodeClimate', 'DeepCode', 'Snyk'],

  // Development Environment
  editorConfig: ['EditorConfig', 'VS Code settings', 'Custom'],
  ide: ['VS Code', 'WebStorm', 'Vim/Neovim', 'Sublime Text', 'Atom'],
  containerization: ['None', 'Docker', 'Docker Compose', 'Podman'],
  virtualEnvironment: ['None', 'nvm', 'venv', 'conda', 'pyenv'],

  // Deployment & Infrastructure
  hosting: [
    'Vercel', 'Netlify', 'AWS', 'Google Cloud', 'Azure', 
    'Railway', 'Render', 'Heroku', 'DigitalOcean'
  ],
  cicd: [
    'GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI', 
    'Travis CI', 'Azure DevOps'
  ],
  cdn: ['Cloudflare', 'AWS CloudFront', 'Google Cloud CDN', 'Azure CDN'],
  monitoring: ['Sentry', 'DataDog', 'New Relic', 'LogRocket', 'Bugsnag'],

  // Environment & Configuration
  environmentVariables: ['.env files', 'Docker secrets', 'CI/CD variables', 'Cloud config'],
  configuration: ['JSON config', 'YAML config', 'Environment-based', 'Dynamic config'],
  secretsManagement: ['Environment variables', 'AWS Secrets Manager', 'HashiCorp Vault'],

  // Documentation
  documentation: ['README.md', 'Docusaurus', 'GitBook', 'Notion', 'Wiki'],
  apiDocs: ['Swagger UI', 'Redoc', 'GraphQL Playground', 'Postman'],
  componentDocs: ['Storybook', 'Styleguidist', 'Docz', 'React Docgen'],

  // Performance
  performanceMonitoring: ['Lighthouse', 'Web Vitals', 'GTmetrix', 'PageSpeed Insights'],
  bundleAnalysis: ['webpack-bundle-analyzer', 'source-map-explorer', 'Bundle Buddy'],
  optimization: ['Code splitting', 'Lazy loading', 'Tree shaking', 'Image optimization'],

  // Additional
  i18n: ['None', 'react-i18next', 'next-i18next', 'formatjs', 'LinguiJS'],
  mobile: ['None', 'React Native', 'Ionic', 'Capacitor', 'PWA'],
  desktop: ['None', 'Electron', 'Tauri', 'Flutter Desktop'],
  gitStrategy: ['Git Flow', 'GitHub Flow', 'GitLab Flow', 'Custom'],
  architecture: ['MVC', 'Clean Architecture', 'Domain-driven', 'Feature-based', 'Layered']
};

export const sectionTitles = {
  core: 'Core Technology',
  packageManagement: 'Package Management',
  buildBundling: 'Build & Bundling',
  stylingUi: 'Styling & UI',
  stateManagement: 'State Management',
  backendApi: 'Backend & API',
  databaseStorage: 'Database & Storage',
  authSecurity: 'Authentication & Security',
  testing: 'Testing',
  codeQuality: 'Code Quality',
  devEnvironment: 'Development Environment',
  deploymentInfra: 'Deployment & Infrastructure',
  envConfig: 'Environment & Configuration',
  documentation: 'Documentation',
  performance: 'Performance',
  additional: 'Additional Features'
};