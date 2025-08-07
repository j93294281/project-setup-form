export interface ProjectMetadata {
  // Core Technology
  type: string;
  language: string;
  runtime: string;
  framework: string;

  // Package Management
  packageManager: string;
  packageLock: string;
  monorepo: string;

  // Build & Bundling
  bundler: string;
  buildTool: string;
  transpiler: string;

  // Styling & UI
  cssFramework: string;
  cssInJs: string;
  cssPreprocessor: string;
  uiLibrary: string;

  // State Management
  stateManagement: string;
  dataFetching: string;

  // Backend & API
  backendFramework: string;
  apiStyle: string;
  apiDocumentation: string;
  apiClient: string;

  // Database & Storage
  database: string;
  orm: string;
  migrations: string;
  caching: string;

  // Authentication & Security
  auth: string;
  authorization: string;
  security: string;

  // Testing
  testing: string;
  frontendTesting: string;
  e2eTesting: string;
  apiTesting: string;
  coverage: string;

  // Code Quality
  linting: string;
  formatting: string;
  typeChecking: string;
  gitHooks: string;
  codeAnalysis: string;

  // Development Environment
  editorConfig: string;
  ide: string;
  containerization: string;
  virtualEnvironment: string;

  // Deployment & Infrastructure
  hosting: string;
  cicd: string;
  cdn: string;
  monitoring: string;

  // Environment & Configuration
  environmentVariables: string;
  configuration: string;
  secretsManagement: string;

  // Documentation
  documentation: string;
  apiDocs: string;
  componentDocs: string;

  // Performance
  performanceMonitoring: string;
  bundleAnalysis: string;
  optimization: string;

  // Additional
  i18n: string;
  mobile: string;
  desktop: string;
  gitStrategy: string;
  architecture: string;
}