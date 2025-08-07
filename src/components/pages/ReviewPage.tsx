import React from 'react';
import { MultiStageFormData } from '../../types/FormTypes';

interface Props {
  formData: MultiStageFormData;
  updateFormData: <K extends keyof MultiStageFormData>(
    section: K,
    data: Partial<MultiStageFormData[K]>
  ) => void;
  nextPage: () => void;
  previousPage: () => void;
  skipPage: () => void;
  onSubmit?: () => void;
}

export default function ReviewPage({ formData, previousPage, nextPage, onSubmit }: Props) {
  const renderSection = (title: string, data: any, fields: string[]) => {
    const hasData = fields.some(field => {
      const value = data[field];
      return value && (Array.isArray(value) ? value.length > 0 : value !== '');
    });

    if (!hasData) return null;

    const formatValue = (value: any, fieldName: string): string => {
      if (value === null || value === undefined) return '';
      if (Array.isArray(value)) return value.join(', ');
      if (typeof value === 'object') {
        // Handle special object cases
        if (fieldName === 'locationsServed') {
          const locations = value as { worldwide: boolean; city?: string; state?: string; country?: string };
          const parts = [];
          if (locations.worldwide) parts.push('Worldwide');
          if (locations.city) parts.push(locations.city);
          if (locations.state) parts.push(locations.state);
          if (locations.country) parts.push(locations.country);
          return parts.length > 0 ? parts.join(', ') : 'Not specified';
        }
        // For other objects, try to extract meaningful information
        const entries = Object.entries(value).filter(([_, v]) => v !== null && v !== undefined && v !== '');
        if (entries.length === 0) return '';
        return entries.map(([k, v]) => `${k}: ${v}`).join(', ');
      }
      return String(value);
    };

    return (
      <div key={title} className="bg-white p-6 rounded-lg border mb-6">
        <h3 className="text-lg font-semibold mb-4 text-blue-600">{title}</h3>
        <div className="space-y-2">
          {fields.map(field => {
            const value = data[field];
            if (!value || (Array.isArray(value) && value.length === 0) || value === '') return null;
            
            return (
              <div key={field} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-600 font-medium capitalize">
                  {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                </span>
                <span className="text-gray-900 text-right max-w-xs">
                  {formatValue(value, field)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Selections</h2>
        <p className="text-gray-600">Please review all your selections before submitting</p>
        
        {/* Submit Button at the top */}
        {onSubmit && (
          <div className="mt-6 flex justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              If things look good, submit your form!
            </p>
            <button
              onClick={onSubmit}
              className="px-6 py-3 rounded-md font-medium bg-green-600 text-white hover:bg-green-700 transition-colors shadow-lg"
            >
              SUBMIT
            </button>
          </div>
        )}
      </div>

      {/* Developer Information */}
      {renderSection('Developer Information', formData.developerInfo, [
        'fullName', 'email', 'streetAddress', 'city', 'stateProvince', 'postalCode', 'country',
        'phoneNumber', 'countryCode', 'username', 'timezone', 'language',
        'githubUsername', 'gitlabUsername', 'bitbucketUsername', 'portfolioUrl',
        'operatingSystem', 'developerEnvironment', 'designTools',
        'developerLinkedin', 'developerTwitter', 'developerFacebook', 'developerInstagram', 'developerYoutube', 'developerGithub'
      ])}

      {/* Company Information */}
      {renderSection('Company Information', formData.companyInfo, [
        'companyName', 'companyWebsite', 'companyEmail', 'companyPhone',
        'companyStreetAddress', 'companyCity', 'companyStateProvince', 'companyPostalCode', 'companyCountry',
        'companyGithub', 'companyGitlab', 'companyBitbucket',
        'companyTwitter', 'companyYoutube', 'companyLinkedin', 'companyTiktok', 'companyFacebook', 'companyInstagram'
      ])}

      {/* App Configuration */}
      {renderSection('App Configuration', formData.appConfiguration, [
        'appName', 'appDescription', 'inspirationUrl', 'iotAppType', 'patentNumber',
        'targetAudience', 'targetAgeRanges', 'targetGender', 'languagesServed', 
        'techSavviness', 'educationLevel', 'sector', 'occupations', 'incomeRange', 
        'companySize', 'projectBudget', 'licenseType', 'aiDecision'
      ])}

      {/* Styling & Design */}
      {renderSection('Styling & Design', formData.stylingDesign, [
        'cssFrameworks', 'defaultCSSFramework', 'cssInJs', 'defaultCSSInJS',
        'cssPreprocessors', 'defaultCSSPreprocessor', 'styledUILibraries',
        'defaultStyledUILibrary', 'headlessUILibraries', 'defaultHeadlessUILibrary',
        'recipeUILibraries', 'defaultRecipeUILibrary', 'designTools', 'defaultDesignTool',
        'designApproach'
      ])}

      {/* Colors & Fonts */}
      {renderSection('Colors & Fonts', formData.colorsFonts, [
        'selectedTheme', 'fontFamily'
      ])}

      {/* Ecommerce & Payments */}
      {renderSection('Ecommerce & Payments', formData.ecommercePayments, [
        'ecommerceProviders', 'defaultEcommerceProvider', 'paymentPlans',
        'defaultPaymentPlan', 'paymentProviders', 'defaultPaymentProvider',
        'accountingPlatforms', 'defaultAccountingPlatform', 'pricingTiers',
        'defaultPricingTier', 'numberOfPricingLevels', 'pricingLevels', 'defaultPricingLevel',
        'pricingOptions', 'defaultPricingOption', 'yearlyDiscounts', 'defaultYearlyDiscount',
        'pricingType', 'level1Value', 'level2Value', 'level3Value', 'level4Value'
      ])}

      {/* Tech Stack */}
      {renderSection('Tech Stack', formData.techStack, [
        'programmingLanguages', 'defaultProgrammingLanguage', 'uiFrameworks', 'defaultUiFramework',
        'backendFullStackFrameworks', 'defaultBackendFullStackFramework',
        'frontendFrameworks', 'defaultFrontendFramework', 'allowedLibraries',
        'disallowedLibraries', 'starterRepo', 'dockerImage', 'starterFolder'
      ])}

      {/* IoT Stack */}
      {renderSection('IoT Stack', formData.iotStack, [
        'cloudIOTPlatforms', 'defaultCloudIOTPlatform', 'edgeComputingPlatforms',
        'defaultEdgeComputingPlatform', 'iotProtocols', 'defaultIOTProtocol',
        'embeddedLanguages', 'defaultEmbeddedLanguage', 'iotHardwarePlatforms',
        'defaultIOTHardwarePlatform', 'iotFrameworks', 'defaultIOTFramework'
      ])}

      {/* State Management */}
      {renderSection('State Management', formData.stateManagement, [
        'stateLibraries', 'defaultStateLibrary'
      ])}

      {/* Backend API */}
      {renderSection('Backend API', formData.backendAPI, [
        'backendFrameworks', 'defaultBackendFramework', 'apiStyles',
        'defaultAPIStyle', 'apiClients', 'defaultAPIClient'
      ])}

      {/* Headless CMS */}
      {renderSection('Headless CMS', formData.headlessCMS, [
        'headlessCMS', 'defaultCMS'
      ])}

      {/* Search Platforms */}
      {renderSection('Search Platforms', formData.searchPlatforms, [
        'searchPlatforms', 'defaultSearchPlatform'
      ])}

      {/* Databases & Storage */}
      {renderSection('Databases & Storage', formData.databasesStorage, [
        'databases', 'defaultDatabase', 'ormTools', 'defaultORM',
        'fileStorage', 'defaultFileStorage'
      ])}

      {/* Cloud Infrastructure */}
      {renderSection('Cloud Infrastructure', formData.cloudInfrastructure, [
        'cloudHosting', 'defaultCloudHosting', 'cloudStorage', 'defaultCloudStorage',
        'serverlessPlatforms', 'defaultServerless', 'paasProviders', 'defaultPaaS',
        'containerPlatforms', 'defaultContainer', 'iaasProviders', 'defaultIaaS',
        'cloudDevelopmentEnvironments', 'defaultCDE', 'containerizationTools',
        'defaultContainerization', 'dnsProviders', 'defaultDNS', 'cdnProviders',
        'defaultCDN', 'cicdTools', 'defaultCicdTool', 'hostingRegion', 'domainRegistrar'
      ])}

      {/* Testing & Code Quality */}
      {renderSection('Testing & Code Quality', formData.testingCodeQuality, [
        'testingFrameworks', 'defaultTestingFramework', 'lintingTools',
        'defaultLinting', 'formattingTools', 'defaultFormatting', 'gitHooks',
        'defaultGitHooks'
      ])}

      {/* Deployment & CI/CD */}
      {renderSection('Deployment & CI/CD', formData.deploymentCICD, [
        'hostingProviders', 'defaultHosting', 'serverlessPlatforms',
        'defaultServerless', 'containerOrchestration', 'defaultContainerOrchestration',
        'cicdTools', 'defaultCICD'
      ])}

      {/* Analytics & Monitoring */}
      {renderSection('Analytics & Monitoring', formData.analyticsMonitoring, [
        'analyticsTools', 'defaultAnalytics', 'performanceMonitoring',
        'defaultPerformanceMonitoring', 'loggingServices', 'defaultLogging'
      ])}

      {/* Mobile & Desktop */}
      {renderSection('Mobile & Desktop', formData.mobileDesktop, [
        'mobileDesktopFrameworks', 'defaultMobileDesktopFramework'
      ])}

      {/* Financial APIs */}
      {renderSection('Financial APIs', formData.financialAPIs, [
        'paymentProviders', 'defaultPaymentProvider', 'accountingPlatforms',
        'defaultAccountingPlatform'
      ])}

      {/* AI Integration */}
      {renderSection('AI Integration', formData.aiIntegration, [
        'llmAgents', 'videoGeneration', 'audioGeneration', 'ocr',
        'mcpServers', 'analyticsIntegration', 'testingFrameworks',
        'defaultTestingFramework', 'lintingPreferences', 'defaultLinting'
      ])}

      {/* Version Control */}
      {renderSection('Version Control', formData.versionControl, [
        'codeHostingPlatforms', 'defaultCodeHosting'
      ])}

      {/* Development Environment */}
      {renderSection('Development Environment', formData.developmentEnvironment, [
        'cloudDevelopmentEnvironments', 'defaultCDE', 'containerizationTools',
        'defaultContainerization'
      ])}

      {/* Package Management */}
      {renderSection('Package Management', formData.packageManagement, [
        'packageManagers', 'defaultPackageManager', 'monorepoTools',
        'defaultMonorepoTool'
      ])}

      {/* Build & Bundling */}
      {renderSection('Build & Bundling', formData.buildBundling, [
        'buildTools', 'defaultBuildTool'
      ])}

      {/* File Storage & Email */}
      {renderSection('File Storage & Email', formData.fileStorageEmail, [
        'fileStorage', 'emailProvider'
      ])}

      {/* Maps & Geolocation */}
      {renderSection('Maps & Geolocation', formData.mapsGeolocation, [
        'mappingProvider'
      ])}

      {/* Security & Authentication */}
      {renderSection('Security & Authentication', formData.securityAuth, [
        'twoFactorAuth', 'authMethod', 'socialLogins', 'enterpriseSSO',
        'dnsProviders', 'defaultDNS', 'cdnProviders', 'defaultCDN',
        'sslProviders', 'defaultSSL', 'apiSecurity', 'preferredApiSecurity',
        'dataEncryption', 'preferredDataEncryption', 'complianceStandards', 'preferredComplianceStandard',
        'securityMonitoring', 'preferredSecurityMonitoring', 'backupRecovery', 'preferredBackupRecovery',
        'secretsManagers'
      ])}

      {/* Communication APIs */}
      {renderSection('Communication APIs', formData.communicationAPIs, [
        'communicationAPIs', 'contentAPIs', 'productivityAPIs', 'calendarOptions',
        'accountingPlatforms', 'defaultAccountingPlatform'
      ])}

      {/* API Providers */}
      {renderSection('API Providers', formData.apiProviders, Object.keys(formData.apiProviders || {}))}

      {/* Control Level */}
      {renderSection('Control Level', formData.controlLevel, [
        'selectedLevel', 'autoSelectAI'
      ])}

      {/* SDKs */}
      {renderSection('SDKs', formData.sdks, [
        'sdks'
      ])}

      {/* User Information Collection */}
      {renderSection('User Information Collection', formData.appConfiguration, [
        'userInformationCollection', 'personalIdentificationContact', 'residentialGeographic',
        'socialOnlinePresence', 'detailedDemographicsLifestyle', 'healthFitness',
        'securityIdentityVerification', 'appSpecificTechnical', 'billingFinancial'
      ])}

      {/* App Configuration Additional */}
      {renderSection('App Configuration Additional', formData.appConfiguration, [
        'locationsServed', 'iotHardwarePlatforms', 'defaultIOTHardwarePlatform'
      ])}

      {/* Default Preferences */}
      {renderSection('Default Preferences', formData.defaultPreferences, [
        'contactEmail', 'defaultSiteType', 'deviceTypes'
      ])}
    </div>
  );
} 