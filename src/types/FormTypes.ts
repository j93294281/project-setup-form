export interface DeveloperInfo {
  fullName: string;
  email: string;
  // International address fields
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  // International phone
  phoneNumber: string;
  countryCode: string;
  username: string;
  timezone: string;
  language: string;
  githubUsername?: string;
  gitlabUsername?: string;
  bitbucketUsername?: string;
  appleDevAccount?: string;
  portfolioUrl?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  tiktok?: string;
  facebook?: string;
  instagram?: string;
  skillLevel: string;
  developerEnvironment?: string[];
  designTools?: string[];
  operatingSystem?: string[];
  developerLogo?: File;
  developerAvatar?: File;
  // Additional social media fields (matching company style)
  developerLinkedin?: string;
  developerTwitter?: string;
  developerFacebook?: string;
  developerInstagram?: string;
  developerYoutube?: string;
  developerGithub?: string;
}

export interface CompanyInfo {
  usePersonalInfo: boolean;
  companyName?: string;
  companyWebsite?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyAddress?: string;
  companyStreetAddress?: string;
  companyCity?: string;
  companyStateProvince?: string;
  companyPostalCode?: string;
  companyCountryCode?: string;
  companyUsername?: string;
  companyTimezone?: string;
  companyCountry?: string;
  companyLanguage?: string;
  companyGithub?: string;
  companyGitlab?: string;
  companyBitbucket?: string;
  companyAppleDevAccount?: string;
  companyPortfolioUrl?: string;
  companyTwitter?: string;
  companyYoutube?: string;
  companyLinkedin?: string;
  companyTiktok?: string;
  companyFacebook?: string;
  companyInstagram?: string;
  companySkillLevel?: string;
  companyLogo?: File;
  profilePhoto?: File;
}

export interface DefaultPreferences {
  contactEmail: string;
  defaultSiteType: string;
  deviceTypes: string[];
}

export interface ProjectManagement {
  projectManagementTools: string[];
  defaultProjectManagement: string;
}

export interface VersionControl {
  codeHostingPlatforms: string[];
  defaultCodeHosting: string;
}

export interface DevelopmentEnvironment {
  cloudDevelopmentEnvironments: string[];
  defaultCDE: string;
  containerizationTools: string[];
  defaultContainerization: string;
}

export interface PackageManagement {
  packageManagers: string[];
  defaultPackageManager: string;
  monorepoTools: string[];
  defaultMonorepoTool: string;
}

export interface BuildBundling {
  buildTools: string[];
  defaultBuildTool: string;
}

export interface EcommercePayments {
  skipPage: boolean;
  ecommerceProviders: string[];
  defaultEcommerceProvider: string;
  paymentPlans: string[];
  defaultPaymentPlan: string;
  paymentProviders: string[];
  defaultPaymentProvider: string;
  accountingPlatforms: string[];
  defaultAccountingPlatform: string;
  // App Pricing fields
  pricingTiers: string[];
  defaultPricingTier: string;
  numberOfPricingLevels: number;
  pricingLevels: string[];
  defaultPricingLevel: string;
  pricingOptions: string[];
  defaultPricingOption: string;
  yearlyDiscounts: string[];
  defaultYearlyDiscount: string;
  // Pricing type selection
  pricingType?: 'x99' | 'rounded';
  pricingTypeAI?: string[];
  // Level-specific pricing values
  level1Value?: string;
  level2Value?: string;
  level3Value?: string;
  level4Value?: string;
}

export interface FileStorageEmail {
  fileStorage: string;
  emailProvider: string;
}

export interface MapsGeolocation {
  mappingProviders: string[];
}

export interface SecurityAuth {
  twoFactorAuth: string;
  authMethod: string;
  socialLogins: string[];
  enterpriseSSO: string;
  dnsProviders: string[];
  defaultDNS: string;
  cdnProviders: string[];
  defaultCDN: string;
  sslProviders: string[];
  defaultSSL: string;
  apiSecurity: string[];
  preferredApiSecurity: string;
  dataEncryption: string[];
  preferredDataEncryption: string;
  complianceStandards: string[];
  preferredComplianceStandard: string;
  securityMonitoring: string[];
  preferredSecurityMonitoring: string;
  backupRecovery: string[];
  preferredBackupRecovery: string;
  secretsManagers: string[];
}

export interface CommunicationAPIs {
  communicationAPIs: string[];
  contentAPIs: string[];
  productivityAPIs: string[];
  calendarOptions: string[];
  accountingPlatforms: string[];
  defaultAccountingPlatform: string;
}



export interface TechStack {
  programmingLanguages: string[];
  defaultProgrammingLanguage: string;
  uiFrameworks: string[];
  defaultUiFramework: string;
  backendFullStackFrameworks: string[];
  defaultBackendFullStackFramework: string;
  frontendFrameworks: string[];
  defaultFrontendFramework: string;
  allowedLibraries?: string;
  disallowedLibraries?: string;
  // Starter Resources moved from AppConfiguration
  starterRepo?: string;
  dockerImage?: string;
  starterFolder?: string;
}

export interface StateManagement {
  stateLibraries: string[];
  defaultStateLibrary: string;
}

export interface BackendAPI {
  backendFrameworks: string[];
  defaultBackendFramework: string;
  apiStyles: string[];
  defaultAPIStyle: string;
  apiClients: string[];
  defaultAPIClient: string;
}

export interface HeadlessCMS {
  aiDecision: string[];
  headlessCMS: string[];
  defaultCMS: string;
}

export interface SearchPlatforms {
  searchPlatforms: string[];
  defaultSearchPlatform: string;
}

export interface DatabasesStorage {
  databases: string[];
  defaultDatabase: string;
  ormTools: string[];
  defaultORM: string;
  fileStorage: string[];
  defaultFileStorage: string;
}

export interface CloudInfrastructure {
  cloudHosting: string[];
  defaultCloudHosting: string;
  cloudStorage: string[];
  defaultCloudStorage: string;
  serverlessPlatforms: string[];
  defaultServerless: string;
  paasProviders: string[];
  defaultPaaS: string;
  containerPlatforms: string[];
  defaultContainer: string;
  iaasProviders: string[];
  defaultIaaS: string;
  // Development Environment fields moved here
  cloudDevelopmentEnvironments: string[];
  defaultCDE: string;
  containerizationTools: string[];
  defaultContainerization: string;
  dnsProviders: string[];
  defaultDNS: string;
  cdnProviders: string[];
  defaultCDN: string;
  // CI/CD Tools moved from AppConfiguration
  cicdTools: string[];
  defaultCicdTool: string;
  // Hosting & Infrastructure moved from AppConfiguration
  hostingRegion: string;
  domainRegistrar: string;
}

export interface StylingDesign {
  aiDecision: string[];
  cssFrameworks: string[];
  defaultCSSFramework: string;
  cssInJs: string[];
  defaultCSSInJS: string;
  cssPreprocessors: string[];
  defaultCSSPreprocessor: string;
  styledUILibraries: string[];
  defaultStyledUILibrary: string;
  headlessUILibraries: string[];
  defaultHeadlessUILibrary: string;
  recipeUILibraries: string[];
  defaultRecipeUILibrary: string;
  defaultDesignTool: string;
  // Screenshot uploads for design inspiration
  designApproach: 'screenshots' | 'manual' | '';
  homePageScreenshot?: File;
  formPageScreenshot?: File;
  signupPageScreenshot?: File;
  pricingPageScreenshot?: File;
  // App visual assets
  appLogo?: File;
  appIcon?: File;
}

export interface TestingCodeQuality {
  testingFrameworks: string[];
  defaultTestingFramework: string;
  lintingTools: string[];
  defaultLinting: string;
  formattingTools: string[];
  defaultFormatting: string;
  gitHooks: string[];
  defaultGitHooks: string;
}

export interface DeploymentCICD {
  hostingProviders: string[];
  defaultHosting: string;
  serverlessPlatforms: string[];
  defaultServerless: string;
  containerOrchestration: string[];
  defaultContainerOrchestration: string;
  cicdTools: string[];
  defaultCICD: string;
}

export interface AnalyticsMonitoring {
  analyticsTools: string[];
  defaultAnalytics: string;
  performanceMonitoring: string[];
  defaultPerformanceMonitoring: string;
  loggingServices: string[];
  defaultLogging: string;
}

export interface MobileDesktop {
  mobileDesktopFrameworks: string[];
  defaultMobileDesktopFramework: string;
}

export interface IOTStack {
  cloudIOTPlatforms: string[];
  defaultCloudIOTPlatform: string;
  edgeComputingPlatforms: string[];
  defaultEdgeComputingPlatform: string;
  iotProtocols: string[];
  defaultIOTProtocol: string;
  embeddedLanguages: string[];
  defaultEmbeddedLanguage: string;
  iotHardwarePlatforms: string[];
  defaultIOTHardwarePlatform: string;
  iotFrameworks: string[];
  defaultIOTFramework: string;
}

export interface FinancialAPIs {
  paymentProviders: string[];
  defaultPaymentProvider: string;
  accountingPlatforms: string[];
  defaultAccountingPlatform: string;
}

export interface AIIntegration {
  llmAgents: string[];
  audioVideoGeneration: string[];
  canvas2D: boolean;
  webGL: boolean;
  webAudio: boolean;

  mcpServers: string[];
  analyticsIntegration: string;
  testingFrameworks: string[];
  defaultTestingFramework: string;
  lintingPreferences: string[];
  defaultLinting: string;
}

export interface APIProviders {
  [key: string]: string;
}

export interface SDKs {
  sdks: string[];
}

export interface ControlLevel {
  selectedLevel?: string;
  autoSelectAI?: boolean;
}

export interface ColorsFonts {
  selectedTheme: string;
  aiDecide: boolean;
  fontFamily?: string;
  customColors?: {
    primaryBackground?: string;
    secondaryBackground?: string;
    accent?: string;
    text?: string;
    heading?: string;
  };
}

export interface AppConfiguration {
  appName: string;
  appDescription: string;
  inspirationUrl: string;
  targetAudience: string[];
  targetAgeRanges: string[];
  targetGender: string[];
  locationsServed: {
    worldwide: boolean;
    city?: string;
    state?: string;
    country?: string;
  };
  languagesServed: string[];
  techSavviness: string[];
  educationLevel: string[];
  sector: string;
  occupations: string[];
  incomeRange: string[];
  companySize: string[];
  projectBudget: string;
  bankLoan: {
    requested: boolean;
    amount?: string;
    months?: string;
    bank?: string;
  };
  safeAgreement: {
    needed: boolean;
    investmentAmount?: string;
    valuationCap?: string;
  };
  licenseType: string;
  marketingMaterials: {
    tshirt: {
      wanted: boolean;
      size?: string;
    };
    businessCards: boolean;
    emailOutreach: boolean;
  };
  // Default Preferences fields
  contactEmail: string;
  defaultSiteType: string;
  iotAppType: string;
  deviceTypes: string[];
  // AI Decision field
  aiDecision: string[];
  // User Information Collection fields
  userInformationCollection: string[];
  // Separate user information collection sections
  personalIdentificationContact: string[];
  residentialGeographic: string[];
  socialOnlinePresence: string[];
  detailedDemographicsLifestyle: string[];
  healthFitness: string[];
  securityIdentityVerification: string[];
  appSpecificTechnical: string[];
  billingFinancial: string[];
  // Patent Information
  patentNumber: string;
  // IoT Hardware Platforms
  iotHardwarePlatforms: string[];
  defaultIOTHardwarePlatform: string;
}

export interface MultiStageFormData {
  currentPage: number;
  completedPages: Set<number>;
  controlLevel: Partial<ControlLevel>;
  developerInfo: Partial<DeveloperInfo>;
  companyInfo: Partial<CompanyInfo>;
  defaultPreferences: Partial<DefaultPreferences>;
  versionControl: Partial<VersionControl>;
  developmentEnvironment: Partial<DevelopmentEnvironment>;
  packageManagement: Partial<PackageManagement>;
  buildBundling: Partial<BuildBundling>;
  ecommercePayments: Partial<EcommercePayments>;
  fileStorageEmail: Partial<FileStorageEmail>;
  mapsGeolocation: Partial<MapsGeolocation>;
  securityAuth: Partial<SecurityAuth>;
  communicationAPIs: Partial<CommunicationAPIs>;
  techStack: Partial<TechStack>;
  iotStack: Partial<IOTStack>;
  stateManagement: Partial<StateManagement>;
  backendAPI: Partial<BackendAPI>;
  headlessCMS: Partial<HeadlessCMS>;
  searchPlatforms: Partial<SearchPlatforms>;
  databasesStorage: Partial<DatabasesStorage>;
  cloudInfrastructure: Partial<CloudInfrastructure>;
  stylingDesign: Partial<StylingDesign>;
  testingCodeQuality: Partial<TestingCodeQuality>;
  deploymentCICD: Partial<DeploymentCICD>;
  analyticsMonitoring: Partial<AnalyticsMonitoring>;
  financialAPIs: Partial<FinancialAPIs>;
  aiIntegration: Partial<AIIntegration>;
  apiProviders: Partial<APIProviders>;
  sdks: Partial<SDKs>;
  mobileDesktop: Partial<MobileDesktop>;
  appConfiguration: Partial<AppConfiguration>;
  colorsFonts: Partial<ColorsFonts>;
}

export interface FormPageConfig {
  id: number;
  title: string;
  description: string;
  required: boolean;
  canSkip: boolean;
}