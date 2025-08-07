import React, { useState, useEffect, useRef } from 'react';
import { MultiStageFormData, FormPageConfig } from '../types/FormTypes';
import ControlLevelPage from './pages/ControlLevelPage';
import DeveloperInfoPage from './pages/DeveloperInfoPage';
import CompanyInfoPage from './pages/CompanyInfoPage';
import VersionControlPage from './pages/VersionControlPage';
import EcommercePaymentsPage from './pages/EcommercePaymentsPage';
import CommunicationAPIsPage from './pages/CommunicationAPIsPage';
import TechStackCombinedPage from './pages/TechStackCombinedPage';
import IOTStackPage from './pages/IOTStackPage';
import CloudInfrastructurePage from './pages/CloudInfrastructurePage';
import StylingDesignPage from './pages/StylingDesignPage';
import AppConfigurationPage from './pages/AppConfigurationPage';
import UserInfoPage from './pages/UserInfoPage';
import AIPage from './pages/AIPage';
import APIProvidersPage from './pages/APIProvidersPage';
import SDKsPage from './pages/SDKsPage';
import MCPServersPage from './pages/MCPServersPage';

import ReviewPage from './pages/ReviewPage';

const FORM_PAGES: FormPageConfig[] = [
  { id: 1, title: '🎛️ Control Level', description: 'Choose your level of involvement', required: true, canSkip: false },
  { id: 2, title: '🧑‍💻 Developer Information', description: 'Personal developer details', required: true, canSkip: false },
  { id: 3, title: '🏢 Company Information', description: 'Business or organization details', required: true, canSkip: false },
  { id: 4, title: '📱 App Information', description: 'App-specific settings and target audience', required: true, canSkip: false },
  { id: 5, title: '👥 User Info', description: 'User information collection settings', required: true, canSkip: false },
  { id: 6, title: '💳 Payments & Accounting', description: 'Payment and commerce setup', required: false, canSkip: true },
  { id: 7, title: '🎨 Styling & Design', description: 'UI/UX and design preferences', required: true, canSkip: false },
  { id: 8, title: '⚡ Web Stack', description: 'Programming Languages and Frameworks', required: true, canSkip: false },
  { id: 9, title: '🔌 IoT Stack', description: 'IoT platforms, protocols, and frameworks', required: false, canSkip: true },
  { id: 10, title: '☁️ Cloud & Security', description: 'Hosting, infrastructure and security', required: true, canSkip: false },
  { id: 11, title: '📡 Other APIs', description: 'Communication and integration services', required: false, canSkip: true },
  { id: 12, title: '🔧 SDKs', description: 'SDKs and libraries', required: false, canSkip: true },
  { id: 13, title: '🤖 AI', description: 'AI and machine learning services', required: false, canSkip: true },
  { id: 14, title: '🤖 MCP Servers', description: 'Model Context Protocol servers', required: false, canSkip: true },
  { id: 15, title: '🔑 Test Keys', description: 'Configure API test keys', required: false, canSkip: true },
  { id: 16, title: '📋 Review & Submit', description: 'Review all selections and submit', required: true, canSkip: false }
];

const STORAGE_KEY = 'multiStageFormData';

export default function MultiStageForm() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<MultiStageFormData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          completedPages: new Set(parsed.completedPages || []),
          appConfiguration: {
            targetAgeRanges: ['All Ages'],
            targetGender: ['All Genders'],
            targetAudience: ['Everyone'],
            languagesServed: [],
            techSavviness: [],
            educationLevel: [],
            incomeRange: ['All Ranges'],
            companySize: ['All Sizes'],
            deviceTypes: ['Mobiles and Tablets', 'Desktops and Laptops'],
            occupations: [],
            locationsServed: {
              worldwide: false
            },
            ...parsed.appConfiguration
          },
          backendAPI: {
            backendFrameworks: ['NO PREFERENCE - all are ok'],
            defaultBackendFramework: '',
            apiStyles: ['NO PREFERENCE - all are ok'],
            defaultAPIStyle: '',
            apiClients: ['NO PREFERENCE - all are ok'],
            defaultAPIClient: ''
          },
          sdks: {
            sdks: []
          },
          fileStorageEmail: {
            fileStorage: '',
            emailProvider: 'All are OK'
          },
          cloudInfrastructure: {
            iaasProviders: ['All are OK'],
            paasProviders: ['All are OK'],
            containerPlatforms: ['All are OK'],
            serverlessPlatforms: ['All are OK'],
            ...parsed.cloudInfrastructure
          },
          databasesStorage: {
            databases: ['All are OK'],
            ormTools: ['All are OK'],
            fileStorage: ['All are OK'],
            ...parsed.databasesStorage
          },
          securityAuth: {
            twoFactorAuth: 'No 2FA Required',
            dnsProviders: ['All are OK'],
            cdnProviders: ['All are OK'],
            sslProviders: ['All are OK'],
            apiSecurity: ['All are OK'],
            dataEncryption: ['All are OK'],
            complianceStandards: ['All are OK'],
            securityMonitoring: ['All are OK'],
            backupRecovery: ['All are OK'],
            ...parsed.securityAuth
          }
        };
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
    return {
      currentPage: 1,
      completedPages: new Set<number>(),
      controlLevel: {},
      developerInfo: {
        fullName: '',
        email: '',
        streetAddress: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country: '',
        phoneNumber: '',
        countryCode: '+1',
        username: '',
        timezone: '',
        language: 'English',
        skillLevel: 'Rather Not Say'
      },
      companyInfo: {},
      defaultPreferences: {},
      versionControl: {
        codeHostingPlatforms: ['NO PREFERENCE - all are ok']
      },
      developmentEnvironment: {
        cloudDevelopmentEnvironments: ['NO PREFERENCE - all are ok'],
        containerizationTools: ['NO PREFERENCE - all are ok']
      },
      packageManagement: {
        packageManagers: ['NO PREFERENCE - all are ok']
      },
      buildBundling: {
        buildTools: ['NO PREFERENCE - all are ok']
      },
      mapsGeolocation: {},
      securityAuth: {
        twoFactorAuth: 'No 2FA Required',
        dnsProviders: ['All are OK'],
        cdnProviders: ['All are OK'],
        sslProviders: ['All are OK'],
        apiSecurity: ['All are OK'],
        dataEncryption: ['All are OK'],
        complianceStandards: ['All are OK'],
        securityMonitoring: ['All are OK'],
        backupRecovery: ['All are OK']
      },
      communicationAPIs: {},
      techStack: {},
      iotStack: {},
      stateManagement: {},
      ecommercePayments: {
        numberOfPricingLevels: 1
      },
      backendAPI: {
        backendFrameworks: ['NO PREFERENCE - all are ok'],
        defaultBackendFramework: '',
        apiStyles: ['NO PREFERENCE - all are ok'],
        defaultAPIStyle: '',
        apiClients: ['NO PREFERENCE - all are ok'],
        defaultAPIClient: ''
      },
      headlessCMS: {},
      searchPlatforms: {
        searchPlatforms: ['NO PREFERENCE - all are ok']
      },
      databasesStorage: {
        databases: ['All are OK'],
        ormTools: ['All are OK'],
        fileStorage: ['All are OK']
      },
      cloudInfrastructure: {
        iaasProviders: ['All are OK'],
        paasProviders: ['All are OK'],
        containerPlatforms: ['All are OK'],
        serverlessPlatforms: ['All are OK']
      },
      stylingDesign: {},
      testingCodeQuality: {},
      deploymentCICD: {
        hostingProviders: ['NO PREFERENCE - all are ok'],
        serverlessPlatforms: ['NO PREFERENCE - all are ok'],
        containerOrchestration: ['NO PREFERENCE - all are ok'],
        cicdTools: ['NO PREFERENCE - all are ok']
      },
      analyticsMonitoring: {
        analyticsTools: ['NO PREFERENCE - all are ok'],
        performanceMonitoring: ['NO PREFERENCE - all are ok'],
        loggingServices: ['NO PREFERENCE - all are ok']
      },
      financialAPIs: {},
      aiIntegration: {},
      apiProviders: {},
      mobileDesktop: {},
      colorsFonts: {},
      appConfiguration: {
        targetAgeRanges: ['All Ages'],
        targetGender: ['All Genders'],
        targetAudience: ['Everyone'],
        languagesServed: [],
        techSavviness: [],
        educationLevel: [],
        incomeRange: ['All Ranges'],
        companySize: ['All Sizes'],
        deviceTypes: ['Mobiles and Tablets', 'Desktops and Laptops'],
        occupations: [],
        locationsServed: {
          worldwide: false
        }
      },
      fileStorageEmail: {
        fileStorage: '',
        emailProvider: 'All are OK'
      },
      sdks: {
        sdks: []
      }
    };
  });

  // Add state for showing the clear confirmation modal
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const dataToSave = {
      ...formData,
      completedPages: Array.from(formData.completedPages)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [formData]);

  const updateFormData = <K extends keyof MultiStageFormData>(
    section: K,
    data: Partial<MultiStageFormData[K]>
  ) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        [section]: { ...(prev[section] as object), ...data }
      };
      
      // If control level is being updated and user selects QUICK or 5 minutes, auto-select AI options
      if (section === 'controlLevel' && (data as any).selectedLevel && 
          ((data as any).selectedLevel === 'QUICK!(3 Minutes)' || (data as any).selectedLevel === '5 minutes')) {
        // Auto-select all "Let the AI decide" options
        updated.stylingDesign = {
          ...updated.stylingDesign,
          aiDecision: ['Let the AI create this for you'],
          cssFrameworks: ['Let the AI decide'],
          cssInJs: ['Let the AI decide'],
          cssPreprocessors: ['Let the AI decide'],
          styledUILibraries: ['Let the AI decide'],
          headlessUILibraries: ['Let the AI decide'],
          recipeUILibraries: ['Let the AI decide']
        };
        
        updated.techStack = {
          ...updated.techStack,
          programmingLanguages: ['Let the AI decide'],
          defaultProgrammingLanguage: 'Let the AI decide',
          uiFrameworks: ['Let the AI decide'],
          defaultUiFramework: 'Let the AI decide',
          backendFullStackFrameworks: ['Let the AI decide'],
          defaultBackendFullStackFramework: 'Let the AI decide',
          frontendFrameworks: ['Let the AI decide'],
          defaultFrontendFramework: 'Let the AI decide'
        };
        
        updated.backendAPI = {
          ...updated.backendAPI,
          backendFrameworks: ['Let the AI decide'],
          defaultBackendFramework: 'Let the AI decide',
          apiStyles: ['Let the AI decide'],
          defaultAPIStyle: 'Let the AI decide',
          apiClients: ['Let the AI decide'],
          defaultAPIClient: 'Let the AI decide'
        };
        
        updated.stateManagement = {
          ...updated.stateManagement,
          stateLibraries: ['Let the AI decide'],
          defaultStateLibrary: 'Let the AI decide'
        };
        
        updated.headlessCMS = {
          ...updated.headlessCMS,
          headlessCMS: ['Let the AI decide'],
          defaultCMS: 'Let the AI decide'
        };
        
        updated.searchPlatforms = {
          ...updated.searchPlatforms,
          searchPlatforms: ['Let the AI decide']
        };
        
        updated.databasesStorage = {
          ...updated.databasesStorage,
          databases: ['Let the AI decide'],
          defaultDatabase: 'Let the AI decide',
          ormTools: ['Let the AI decide'],
          defaultORM: 'Let the AI decide',
          fileStorage: ['Let the AI decide'],
          defaultFileStorage: 'Let the AI decide'
        };
        
        updated.cloudInfrastructure = {
          ...updated.cloudInfrastructure,
          cloudHosting: ['Let the AI decide'],
          defaultCloudHosting: 'Let the AI decide',
          cloudStorage: ['Let the AI decide'],
          defaultCloudStorage: 'Let the AI decide',
          serverlessPlatforms: ['Let the AI decide'],
          defaultServerless: 'Let the AI decide',
          paasProviders: ['Let the AI decide'],
          defaultPaaS: 'Let the AI decide',
          containerPlatforms: ['Let the AI decide'],
          defaultContainer: 'Let the AI decide',
          iaasProviders: ['Let the AI decide'],
          defaultIaaS: 'Let the AI decide',
          cloudDevelopmentEnvironments: ['Let the AI decide'],
          defaultCDE: 'Let the AI decide',
          containerizationTools: ['Let the AI decide'],
          defaultContainerization: 'Let the AI decide',
          dnsProviders: ['Let the AI decide'],
          defaultDNS: 'Let the AI decide',
          cdnProviders: ['Let the AI decide'],
          defaultCDN: 'Let the AI decide',
          cicdTools: ['Let the AI decide'],
          defaultCicdTool: 'Let the AI decide',
          hostingRegion: 'Let the AI decide',
          domainRegistrar: 'Let the AI decide'
        };
        
        updated.iotStack = {
          ...updated.iotStack,
          cloudIOTPlatforms: ['Let the AI decide'],
          edgeComputingPlatforms: ['Let the AI decide'],
          iotProtocols: ['Let the AI decide'],
          embeddedLanguages: ['Let the AI decide'],
          iotHardwarePlatforms: ['Let the AI decide'],
          iotFrameworks: ['Let the AI decide']
        };
        
        updated.communicationAPIs = {
          ...updated.communicationAPIs,
          communicationAPIs: ['Let the AI decide'],
          contentAPIs: ['Let the AI decide'],
          productivityAPIs: ['Let the AI decide'],
          calendarOptions: ['Let the AI decide']
        };
        
        updated.mapsGeolocation = {
          ...updated.mapsGeolocation,
          mappingProviders: ['Let the AI decide']
        };
        
        updated.aiIntegration = {
          ...updated.aiIntegration,
          llmAgents: ['Let the AI decide'],
          audioVideoGeneration: ['Let the AI decide'],
          mcpServers: ['Let the AI decide']
        };
        
        updated.sdks = {
          ...updated.sdks,
          sdks: ['Let the AI decide']
        };
        
        updated.ecommercePayments = {
          ...updated.ecommercePayments,
          ecommerceProviders: ['Let the AI decide'],
          paymentPlans: ['Let the AI decide'],
          paymentProviders: ['Let the AI decide'],
          accountingPlatforms: ['Let the AI decide'],
          pricingTiers: ['Let the AI decide'],
          numberOfPricingLevels: 1,
          pricingLevels: ['Let the AI decide'],
          pricingOptions: ['Let the AI decide'],
          yearlyDiscounts: ['Let the AI decide']
        };
        
        updated.appConfiguration = {
          ...updated.appConfiguration,
          aiDecision: ['Let the AI decide']
        };
        
        updated.securityAuth = {
          ...updated.securityAuth,
          twoFactorAuth: 'Let the AI decide',
          authMethod: 'Let the AI decide',
          socialLogins: ['Let the AI decide'],
          enterpriseSSO: 'Let the AI decide',
          dnsProviders: ['Let the AI decide'],
          defaultDNS: 'Let the AI decide',
          cdnProviders: ['Let the AI decide'],
          defaultCDN: 'Let the AI decide',
          sslProviders: ['Let the AI decide'],
          defaultSSL: 'Let the AI decide'
        };
        
        updated.fileStorageEmail = {
          ...updated.fileStorageEmail,
          fileStorage: 'Let the AI decide',
          emailProvider: 'Let the AI decide'
        };
        
        updated.mobileDesktop = {
          ...updated.mobileDesktop,
          mobileDesktopFrameworks: ['Let the AI decide']
        };
        
        updated.defaultPreferences = {
          ...updated.defaultPreferences,
          contactEmail: 'Let the AI decide',
          defaultSiteType: 'Let the AI decide',
          deviceTypes: ['Let the AI decide']
        };
        
        updated.versionControl = {
          ...updated.versionControl,
          codeHostingPlatforms: ['Let the AI decide'],
          defaultCodeHosting: 'Let the AI decide'
        };
      }
      
      // If control level is being updated and user selects 8 Minutes, clear all AI options
      if (section === 'controlLevel' && (data as any).selectedLevel && 
          (data as any).selectedLevel === '8 Minutes') {
        // Clear all "Let the AI decide" options
        updated.stylingDesign = {
          ...updated.stylingDesign,
          aiDecision: [],
          cssFrameworks: [],
          cssInJs: [],
          cssPreprocessors: [],
          styledUILibraries: [],
          headlessUILibraries: [],
          recipeUILibraries: []
        };
        
        updated.techStack = {
          ...updated.techStack,
          programmingLanguages: [],
          defaultProgrammingLanguage: '',
          uiFrameworks: [],
          defaultUiFramework: '',
          backendFullStackFrameworks: [],
          defaultBackendFullStackFramework: '',
          frontendFrameworks: [],
          defaultFrontendFramework: ''
        };
        
        updated.backendAPI = {
          ...updated.backendAPI,
          backendFrameworks: [],
          defaultBackendFramework: '',
          apiStyles: [],
          defaultAPIStyle: '',
          apiClients: [],
          defaultAPIClient: ''
        };
        
        updated.stateManagement = {
          ...updated.stateManagement,
          stateLibraries: [],
          defaultStateLibrary: ''
        };
        
        updated.headlessCMS = {
          ...updated.headlessCMS,
          aiDecision: [],
          headlessCMS: [],
          defaultCMS: ''
        };
        
        updated.searchPlatforms = {
          ...updated.searchPlatforms,
          searchPlatforms: []
        };
        
        updated.databasesStorage = {
          ...updated.databasesStorage,
          databases: [],
          defaultDatabase: '',
          ormTools: [],
          defaultORM: '',
          fileStorage: [],
          defaultFileStorage: ''
        };
        
        updated.cloudInfrastructure = {
          ...updated.cloudInfrastructure,
          cloudHosting: [],
          defaultCloudHosting: '',
          cloudStorage: [],
          defaultCloudStorage: '',
          serverlessPlatforms: [],
          defaultServerless: '',
          paasProviders: [],
          defaultPaaS: '',
          containerPlatforms: [],
          defaultContainer: '',
          iaasProviders: [],
          defaultIaaS: '',
          cloudDevelopmentEnvironments: [],
          defaultCDE: '',
          containerizationTools: [],
          defaultContainerization: '',
          dnsProviders: [],
          defaultDNS: '',
          cdnProviders: [],
          defaultCDN: '',
          cicdTools: [],
          defaultCicdTool: '',
          hostingRegion: '',
          domainRegistrar: ''
        };
        
        updated.iotStack = {
          ...updated.iotStack,
          cloudIOTPlatforms: [],
          edgeComputingPlatforms: [],
          iotProtocols: [],
          embeddedLanguages: [],
          iotHardwarePlatforms: [],
          iotFrameworks: []
        };
        
        updated.communicationAPIs = {
          ...updated.communicationAPIs,
          communicationAPIs: [],
          contentAPIs: [],
          productivityAPIs: [],
          calendarOptions: []
        };
        
        updated.mapsGeolocation = {
          ...updated.mapsGeolocation,
          mappingProviders: []
        };
        
        updated.aiIntegration = {
          ...updated.aiIntegration,
          llmAgents: [],
          audioVideoGeneration: [],
          mcpServers: []
        };
        
        updated.sdks = {
          ...updated.sdks,
          sdks: []
        };
        
        updated.ecommercePayments = {
          ...updated.ecommercePayments,
          ecommerceProviders: [],
          paymentPlans: [],
          paymentProviders: [],
          accountingPlatforms: [],
          pricingTiers: [],
          numberOfPricingLevels: 1,
          pricingLevels: [],
          pricingOptions: [],
          yearlyDiscounts: []
        };
        
        updated.appConfiguration = {
          ...updated.appConfiguration,
          aiDecision: []
        };
        
        updated.securityAuth = {
          ...updated.securityAuth,
          twoFactorAuth: '',
          authMethod: '',
          socialLogins: [],
          enterpriseSSO: '',
          dnsProviders: [],
          defaultDNS: '',
          cdnProviders: [],
          defaultCDN: '',
          sslProviders: [],
          defaultSSL: ''
        };
        
        updated.fileStorageEmail = {
          ...updated.fileStorageEmail,
          fileStorage: '',
          emailProvider: ''
        };
        
        updated.mobileDesktop = {
          ...updated.mobileDesktop,
          mobileDesktopFrameworks: []
        };
        
        updated.defaultPreferences = {
          ...updated.defaultPreferences,
          contactEmail: '',
          defaultSiteType: '',
          deviceTypes: []
        };
        
        updated.versionControl = {
          ...updated.versionControl,
          codeHostingPlatforms: [],
          defaultCodeHosting: ''
        };
        
        updated.developmentEnvironment = {
          ...updated.developmentEnvironment,
          cloudDevelopmentEnvironments: ['Let the AI decide'],
          defaultCDE: 'Let the AI decide',
          containerizationTools: ['Let the AI decide'],
          defaultContainerization: 'Let the AI decide'
        };
        
        updated.packageManagement = {
          ...updated.packageManagement,
          packageManagers: ['Let the AI decide'],
          defaultPackageManager: 'Let the AI decide',
          monorepoTools: ['Let the AI decide'],
          defaultMonorepoTool: 'Let the AI decide'
        };
        
        updated.buildBundling = {
          ...updated.buildBundling,
          buildTools: ['Let the AI decide'],
          defaultBuildTool: 'Let the AI decide'
        };
        
        updated.testingCodeQuality = {
          ...updated.testingCodeQuality,
          testingFrameworks: ['Let the AI decide'],
          defaultTestingFramework: 'Let the AI decide',
          lintingTools: ['Let the AI decide'],
          defaultLinting: 'Let the AI decide',
          formattingTools: ['Let the AI decide'],
          defaultFormatting: 'Let the AI decide',
          gitHooks: ['Let the AI decide'],
          defaultGitHooks: 'Let the AI decide'
        };
        
        updated.deploymentCICD = {
          ...updated.deploymentCICD,
          hostingProviders: ['Let the AI decide'],
          defaultHosting: 'Let the AI decide',
          serverlessPlatforms: ['Let the AI decide'],
          defaultServerless: 'Let the AI decide',
          containerOrchestration: ['Let the AI decide'],
          defaultContainerOrchestration: 'Let the AI decide',
          cicdTools: ['Let the AI decide'],
          defaultCICD: 'Let the AI decide'
        };
        
        updated.analyticsMonitoring = {
          ...updated.analyticsMonitoring,
          analyticsTools: ['Let the AI decide'],
          defaultAnalytics: 'Let the AI decide',
          performanceMonitoring: ['Let the AI decide'],
          defaultPerformanceMonitoring: 'Let the AI decide',
          loggingServices: ['Let the AI decide'],
          defaultLogging: 'Let the AI decide'
        };
        
        updated.financialAPIs = {
          ...updated.financialAPIs,
          paymentProviders: ['Let the AI decide'],
          defaultPaymentProvider: 'Let the AI decide',
          accountingPlatforms: ['Let the AI decide'],
          defaultAccountingPlatform: 'Let the AI decide'
        };
        
        updated.colorsFonts = {
          ...updated.colorsFonts,
          selectedTheme: 'Let the AI decide',
          aiDecide: true,
          fontFamily: 'Let the AI decide'
        };
              }
        
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= FORM_PAGES.length) {
      setFormData(prev => ({ ...prev, currentPage: pageNumber }));
    }
  };

  // Function to center the current page button in the scroll container
  const centerCurrentPage = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentPageButton = container.querySelector(`[data-page="${formData.currentPage}"]`) as HTMLElement;
      if (currentPageButton) {
        const containerWidth = container.offsetWidth;
        const buttonLeft = currentPageButton.offsetLeft;
        const buttonWidth = currentPageButton.offsetWidth;
        // Calculate the scroll position to center the button
        const scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth'
        });
      }
    }
  };

  // Center the current page when it changes
  useEffect(() => {
    centerCurrentPage();
  }, [formData.currentPage]);

  const nextPage = () => {
    // If we're on the Review page (page 16), submit the form instead of going to next page
    if (formData.currentPage === 16) {
      completeSetup();
      return;
    }
    
    setFormData(prev => {
      const newCompletedPages = new Set(prev.completedPages);
      newCompletedPages.add(prev.currentPage);
      return {
        ...prev,
        completedPages: newCompletedPages,
        currentPage: Math.min(prev.currentPage + 1, FORM_PAGES.length)
      };
    });
    // Scroll to top of the page when navigating to next page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const previousPage = () => {
    setFormData(prev => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 1)
    }));
  };

  const skipPage = () => {
    setFormData(prev => {
      const newCompletedPages = new Set(prev.completedPages);
      newCompletedPages.add(prev.currentPage);
      return {
        ...prev,
        completedPages: newCompletedPages,
        currentPage: Math.min(prev.currentPage + 1, FORM_PAGES.length)
      };
    });
    // Scroll to top of the page when skipping to next page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const validateRequiredFields = () => {
    // Basic validation for required fields that actually exist on the Developer Information page
    const { developerInfo } = formData;
    const missingFields = [];
    if (!developerInfo.fullName) missingFields.push('Full Name');
    if (!developerInfo.email) missingFields.push('Email');
    if (!developerInfo.streetAddress) missingFields.push('Street Address');
    if (!developerInfo.city) missingFields.push('City');
    if (!developerInfo.stateProvince) missingFields.push('State/Province');
    if (!developerInfo.postalCode) missingFields.push('Postal Code');
    if (!developerInfo.country) missingFields.push('Country');
    if (!developerInfo.phoneNumber) missingFields.push('Phone Number');
    return missingFields;
  };

  const completeSetup = () => {
    // Validate required fields
    const missingFields = validateRequiredFields();
    if (missingFields.length > 0) {
      alert(`⚠️ Please complete the following required fields before submitting:\n\n${missingFields.join('\n')}\n\nGo to Page 2 (Developer Info) to complete these fields.`);
      return;
    }
    // Mark final page as completed
    setFormData(prev => {
      const newCompletedPages = new Set(prev.completedPages);
      newCompletedPages.add(prev.currentPage);
      return {
        ...prev,
        completedPages: newCompletedPages
      };
    });
    // Prepare configuration data for webhook
    const configData = {
      generatedAt: new Date().toISOString(),
      formVersion: '1.0.0',
      totalPages: FORM_PAGES.length,
      completedPages: Array.from(formData.completedPages).length + 1,
      configuration: {
        // Control Level
        controlLevel: formData.controlLevel,
        
        // Developer Information
        developerInfo: formData.developerInfo,
        
        // Company Information
        companyInfo: formData.companyInfo,
        
        // App Configuration
        appConfiguration: formData.appConfiguration,
        
        // Default Preferences
        defaultPreferences: formData.defaultPreferences,
        
        // Version Control
        versionControl: formData.versionControl,
        
        // Development Environment
        developmentEnvironment: formData.developmentEnvironment,
        
        // Package Management
        packageManagement: formData.packageManagement,
        
        // Build & Bundling
        buildBundling: formData.buildBundling,
        
        // Ecommerce & Payments
        ecommercePayments: formData.ecommercePayments,
        
        // File Storage & Email
        fileStorageEmail: formData.fileStorageEmail,
        
        // Maps & Geolocation
        mapsGeolocation: formData.mapsGeolocation,
        
        // Security & Authentication
        securityAuth: formData.securityAuth,
        
        // Communication APIs
        communicationAPIs: formData.communicationAPIs,
        
        // Tech Stack
        techStack: formData.techStack,
        
        // IoT Stack
        iotStack: formData.iotStack,
        
        // State Management
        stateManagement: formData.stateManagement,
        
        // Backend API
        backendAPI: formData.backendAPI,
        
        // Headless CMS
        headlessCMS: formData.headlessCMS,
        
        // Search Platforms
        searchPlatforms: formData.searchPlatforms,
        
        // Databases & Storage
        databasesStorage: formData.databasesStorage,
        
        // Cloud Infrastructure
        cloudInfrastructure: formData.cloudInfrastructure,
        
        // Styling & Design
        stylingDesign: formData.stylingDesign,
        
        // Testing & Code Quality
        testingCodeQuality: formData.testingCodeQuality,
        
        // Deployment & CI/CD
        deploymentCICD: formData.deploymentCICD,
        
        // Analytics & Monitoring
        analyticsMonitoring: formData.analyticsMonitoring,
        
        // Financial APIs
        financialAPIs: formData.financialAPIs,
        
        // AI Integration
        aiIntegration: formData.aiIntegration,
        
        // API Providers
        apiProviders: formData.apiProviders,
        
        // SDKs
        sdks: formData.sdks,
        
        // Mobile & Desktop
        mobileDesktop: formData.mobileDesktop,
        
        // Colors & Fonts
        colorsFonts: formData.colorsFonts
      }
    };
    // Submit to webhook
    const submitToWebhook = async () => {
      try {
        // Log complete configuration data to console for testing
        console.log('🚀 Complete Form Configuration Data:');
        console.log('📊 Configuration Summary:');
        console.log(`  - Total Sections: ${Object.keys(configData.configuration).length}`);
        console.log(`  - Completed Pages: ${configData.completedPages}/${configData.totalPages}`);
        console.log(`  - Generated At: ${configData.generatedAt}`);
        
        // Log each section with data
        Object.keys(configData.configuration).forEach(section => {
          const sectionData = (configData.configuration as any)[section];
          const hasData = sectionData && Object.keys(sectionData).length > 0;
          const dataCount = hasData ? Object.keys(sectionData).filter((key: string) => 
            sectionData[key] !== undefined && 
            sectionData[key] !== null && 
            sectionData[key] !== '' && 
            (!Array.isArray(sectionData[key]) || sectionData[key].length > 0)
          ).length : 0;
          console.log(`  📁 ${section}: ${hasData ? `${dataCount} fields with data` : 'empty'}`);
        });
        
        console.log('\n📋 Complete JSON Data:');
        console.log(JSON.stringify(configData, null, 2));
        
        // Create downloadable log file
        const logContent = `Form Submission Log - ${new Date().toISOString()}\n` +
          `==========================================\n\n` +
          `Configuration Summary:\n` +
          `- Total Sections: ${Object.keys(configData.configuration).length}\n` +
          `- Completed Pages: ${configData.completedPages}/${configData.totalPages}\n` +
          `- Generated At: ${configData.generatedAt}\n\n` +
          `Complete JSON Data:\n` +
          JSON.stringify(configData, null, 2);
        
        // Create and download log file
        const blob = new Blob([logContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `form-submission-${new Date().toISOString().replace(/[:.]/g, '-')}.log`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        const response = await fetch('https://peterallenschuh.app.n8n.cloud/form/0615e0eb-d7cf-4ddb-8ee4-f31e7698be22', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(configData)
        });
        if (response.ok) {
          const result = await response.json();
          console.log('Webhook response:', result);
          // Show success message with summary
          const completedCount = Array.from(formData.completedPages).length + 1;
          const summary = `🎉 Setup Complete!\n\n` +
            `✅ Completed ${completedCount} of ${FORM_PAGES.length} pages\n` +
            `📡 Configuration successfully sent to webhook\n` +
            `🚀 Your project setup data has been processed!\n\n` +
            `Server Response: ${result.message || 'Configuration received successfully'}`;
          alert(summary);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Webhook submission failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        alert('Webhook submission failed: ' + errorMessage);
      }
    };
    submitToWebhook();
  };

  const getCurrentPageComponent = () => {
    const pageProps = {
      formData,
      updateFormData,
      nextPage,
      previousPage,
      skipPage,
      goToPage
    };
    switch (formData.currentPage) {
      case 1: return <ControlLevelPage {...pageProps} />;
      case 2: return <DeveloperInfoPage {...pageProps} />;
      case 3: return <CompanyInfoPage {...pageProps} />;
      case 4: return <AppConfigurationPage {...pageProps} />;
      case 5: return <UserInfoPage {...pageProps} />;
      case 6: return <EcommercePaymentsPage {...pageProps} />;
      case 7: return <StylingDesignPage {...pageProps} />;
      case 8: return <TechStackCombinedPage {...pageProps} />;
      case 9: return <IOTStackPage {...pageProps} />;
      case 10: return <CloudInfrastructurePage {...pageProps} />;
      case 11: return <CommunicationAPIsPage {...pageProps} />;
      case 12: return <SDKsPage {...pageProps} />;
      case 13: return <AIPage {...pageProps} />;
      case 14: return <MCPServersPage {...pageProps} />;
      case 15: return <APIProvidersPage {...pageProps} />;
      case 16: return <ReviewPage {...pageProps} onSubmit={completeSetup} />;
      default: return <div>Page not found</div>;
    }
  };

  const currentPageConfig = FORM_PAGES[formData.currentPage - 1] || FORM_PAGES[0];
  const progress = (formData.completedPages.size / FORM_PAGES.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Project Setup</h1>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-blue-200 hover:text-white text-sm underline"
              >
                Clear All Data
              </button>
            </div>
            {/* Confirmation Modal */}
            {showClearConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-gray-900">
                  <h2 className="text-lg font-bold mb-4">Are you sure you want to clear your data?!</h2>
                  <p className="mb-6">This will clear all your form data and you will have to start again with your selections.</p>
                  <div className="flex flex-col gap-3">
                    <button
                      className="w-full px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                      onClick={() => {
                        setShowClearConfirm(false);
                        setFormData({
                          currentPage: 1,
                          completedPages: new Set<number>(),
                          controlLevel: {},
                          developerInfo: {
                            fullName: '',
                            email: '',
                            streetAddress: '',
                            city: '',
                            stateProvince: '',
                            postalCode: '',
                            country: '',
                            phoneNumber: '',
                            countryCode: '+1',
                            username: '',
                            timezone: '',
                            language: 'English',
                            skillLevel: 'Rather Not Say'
                          },
                          companyInfo: {},
                          defaultPreferences: {},
                          versionControl: {},
                          developmentEnvironment: {},
                          packageManagement: {},
                          buildBundling: {},
                          ecommercePayments: {
                            numberOfPricingLevels: 1
                          },
                          fileStorageEmail: {
                            fileStorage: '',
                            emailProvider: ''
                          },
                          mapsGeolocation: {},
                          securityAuth: {
                            twoFactorAuth: 'No 2FA Required'
                          },
                          communicationAPIs: {},
                          techStack: {},
                          iotStack: {},
                          stateManagement: {},
                          backendAPI: {
                            backendFrameworks: [],
                            defaultBackendFramework: '',
                            apiStyles: [],
                            defaultAPIStyle: '',
                            apiClients: [],
                            defaultAPIClient: ''
                          },
                          headlessCMS: {},
                          searchPlatforms: {},
                          databasesStorage: {
                            databases: ['All are OK'],
                            ormTools: ['All are OK'],
                            fileStorage: ['All are OK']
                          },
                          cloudInfrastructure: {
                            iaasProviders: ['All are OK'],
                            paasProviders: ['All are OK'],
                            containerPlatforms: ['All are OK'],
                            serverlessPlatforms: ['All are OK'],
                            dnsProviders: ['All are OK'],
                            cdnProviders: ['All are OK']
                          },
                          colorsFonts: {},
                          stylingDesign: {},
                          testingCodeQuality: {},
                          deploymentCICD: {},
                          analyticsMonitoring: {},
                          financialAPIs: {},
                          aiIntegration: {},
                          apiProviders: {},
                          sdks: {
                            sdks: []
                          },
                          mobileDesktop: {},
                          appConfiguration: {
                            targetAgeRanges: ['All Ages'],
                            targetGender: ['All Genders'],
                            targetAudience: ['Everyone'],
                            languagesServed: [],
                            techSavviness: [],
                            educationLevel: [],
                            incomeRange: ['All Ranges'],
                            companySize: ['All Sizes'],
                            deviceTypes: ['Mobiles and Tablets', 'Desktops and Laptops'],
                            occupations: [],
                            locationsServed: {
                              worldwide: false
                            }
                          }
                        });
                      }}
                    >
                      Yes, clear the form data so I can start again.
                    </button>
                    <button
                      className="w-full px-4 py-2 rounded bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-colors"
                      onClick={() => setShowClearConfirm(false)}
                    >
                      No, do NOT clear the data. Go back to my form selections.
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress: {formData.completedPages.size} of {FORM_PAGES.length} pages completed</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-blue-500 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 justify-between">
              <div>
                <span className="text-sm opacity-80">Page {formData.currentPage} of {FORM_PAGES.length}</span>
                <h2 className="text-xl font-semibold">{currentPageConfig.title}</h2>
              </div>
            </div>
            <p className="text-blue-100 mt-2">{currentPageConfig.description}</p>
          </div>

          <div className="border-b bg-gray-50 p-6 pb-12">
            <div ref={scrollContainerRef} className="flex gap-3 overflow-x-auto pb-8">
              {FORM_PAGES.map((page) => (
                <button
                  key={page.id}
                  data-page={page.id}
                  onClick={() => goToPage(page.id)}
                  className={`
                    flex-shrink-0 px-4 py-2 text-sm rounded-full border transition-colors
                    ${formData.currentPage === page.id 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : formData.completedPages.has(page.id)
                        ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200'
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                    }
                  `}
                >
                  {page.id}. {page.title.replace(/^\s*[^\w\d]+\s*/, '')}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 pb-12">
            {getCurrentPageComponent()}
          </div>

          <div className="bg-gray-50 px-8 py-6 pt-8 flex justify-between items-center border-t">
            <button
              onClick={previousPage}
              disabled={formData.currentPage === 1}
              className={`
                px-6 py-3 rounded-md font-medium transition-colors
                ${formData.currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
                }
              `}
            >
              Previous
            </button>

            <div className="flex gap-4">
              {formData.currentPage === 16 ? (
                <>
                  <button
                    onClick={completeSetup}
                    className="px-6 py-3 rounded-md font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    SUBMIT
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={nextPage}
                    className="px-6 py-3 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}