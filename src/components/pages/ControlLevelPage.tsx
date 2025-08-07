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
  goToPage: (pageNumber: number) => void;
}

export default function ControlLevelPage({ formData, updateFormData, nextPage }: Props) {
  const handleControlLevelChange = (level: string) => {
    // If user selects 5 Minutes or 8 Minutes, automatically check all "Let the AI decide" options
    if (level === '5 Minutes' || level === '8 Minutes') {
      // Set control level
      updateFormData('controlLevel', { 
        selectedLevel: level,
        autoSelectAI: true 
      });
      
      // Set AI decision checkboxes in appConfiguration for AppConfigurationPage sections
      // These use field names in the aiDecision array
      // Also include UserInfoPage which uses 'Let the AI decide' in the same array
      updateFormData('appConfiguration', {
        aiDecision: [
          'targetAudience',
          'targetAgeRanges',
          'targetGender', 
          'languagesServed',
          'techSavviness',
          'educationLevel',
          'industrySelection',
          'companySize',
          'occupations',
          'projectBudget',
          'licenseType',
          'Let the AI decide'  // For UserInfoPage
        ]
      });
      
      // Set AI decision checkboxes in stylingDesign (for StylingDesignPage)
      // These use 'Let the AI decide' directly in the field arrays
      updateFormData('stylingDesign', {
        cssFrameworks: ['Let the AI decide'],
        styledUILibraries: ['Let the AI decide'],
        headlessUILibraries: ['Let the AI decide'],
        recipeUILibraries: ['Let the AI decide'],
        aiDecision: ['Let the AI create this for you']  // For Visual Assets section
      });
      
      // Set AI decision checkboxes in techStack (for TechStackCombinedPage)
      // These use 'Let the AI decide' directly in the field arrays
      updateFormData('techStack', {
        programmingLanguages: ['Let the AI decide'],
        uiFrameworks: ['Let the AI decide'],
        backendFullStackFrameworks: ['Let the AI decide'],
        frontendFrameworks: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in backendAPI (for TechStackCombinedPage)
      updateFormData('backendAPI', {
        backendFrameworks: ['Let the AI decide'],
        apiStyles: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in stateManagement (for TechStackCombinedPage)
      updateFormData('stateManagement', {
        stateLibraries: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in searchPlatforms (for TechStackCombinedPage)
      updateFormData('searchPlatforms', {
        searchPlatforms: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in packageManagement (for TechStackCombinedPage)
      updateFormData('packageManagement', {
        packageManagers: ['Let the AI decide'],
        monorepoTools: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in buildBundling (for TechStackCombinedPage)
      updateFormData('buildBundling', {
        buildTools: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in mobileDesktop (for TechStackCombinedPage)
      updateFormData('mobileDesktop', {
        mobileDesktopFrameworks: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in iotStack (for IOTStackPage)
      updateFormData('iotStack', {
        cloudIOTPlatforms: ['Let the AI decide'],
        edgeComputingPlatforms: ['Let the AI decide'],
        iotProtocols: ['Let the AI decide'],
        embeddedLanguages: ['Let the AI decide'],
        iotHardwarePlatforms: ['Let the AI decide'],
        iotFrameworks: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in ecommercePayments (for EcommercePaymentsPage)
      updateFormData('ecommercePayments', {
        paymentProviders: ['Let the AI decide'],
        paymentPlans: ['Let the AI decide'],
        pricingLevels: ['Let the AI decide'],
        pricingTypeAI: ['Let the AI decide'],
        pricingOptions: ['Let the AI decide'],
        yearlyDiscounts: ['Let the AI decide'],
        accountingPlatforms: ['Let the AI decide'],
        ecommerceProviders: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in communicationAPIs (for CommunicationAPIsPage)
      updateFormData('communicationAPIs', {
        communicationAPIs: ['Let the AI decide'],
        contentAPIs: ['Let the AI decide'],
        productivityAPIs: ['Let the AI decide'],
        calendarOptions: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in mapsGeolocation (for CommunicationAPIsPage)
      updateFormData('mapsGeolocation', {
        mappingProviders: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in cloudInfrastructure (for CloudInfrastructurePage)
      updateFormData('cloudInfrastructure', {
        iaasProviders: ['Let the AI decide'],
        paasProviders: ['Let the AI decide'],
        containerPlatforms: ['Let the AI decide'],
        serverlessPlatforms: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in securityAuth (for CloudInfrastructurePage)
      updateFormData('securityAuth', {
        dnsProviders: ['Let the AI decide'],
        cdnProviders: ['Let the AI decide'],
        sslProviders: ['Let the AI decide'],
        socialLogins: ['Let the AI decide'],
        enterpriseSSO: 'Let the AI decide',
        authMethod: 'Let the AI decide',
        twoFactorAuth: 'Let the AI decide',
        apiSecurity: ['Let the AI decide'],
        dataEncryption: ['Let the AI decide'],
        complianceStandards: ['Let the AI decide'],
        securityMonitoring: ['Let the AI decide'],
        backupRecovery: ['Let the AI decide'],
        secretsManagers: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in databasesStorage (for CloudInfrastructurePage)
      updateFormData('databasesStorage', {
        databases: ['Let the AI decide'],
        ormTools: ['Let the AI decide'],
        fileStorage: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in fileStorageEmail (for CloudInfrastructurePage)
      updateFormData('fileStorageEmail', {
        emailProvider: 'Let the AI decide'
      });
      
      // Set AI decision checkboxes in sdks (for SDKsPage)
      updateFormData('sdks', {
        sdks: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in aiIntegration (for AIPage)
      updateFormData('aiIntegration', {
        llmAgents: ['Let the AI decide'],
        audioVideoGeneration: ['Let the AI decide'],
        mcpServers: ['Let the AI decide']
      });
      
      // Set AI decision checkboxes in headlessCMS (for TechStackCombinedPage)
      // This uses 'Let the AI decide' in the aiDecision array
      updateFormData('headlessCMS', {
        aiDecision: ['Let the AI decide']
      });
      
    } else if (level === '15-20 Minutes') {
      // If user selects 15-20 Minutes, explicitly uncheck all "Let the AI decide" options
      updateFormData('controlLevel', { 
        selectedLevel: level,
        autoSelectAI: false 
      });
      
      // Clear all AI decision checkboxes
      updateFormData('appConfiguration', {
        aiDecision: []
      });
      
      updateFormData('stylingDesign', {
        cssFrameworks: [],
        styledUILibraries: [],
        headlessUILibraries: [],
        recipeUILibraries: [],
        aiDecision: []
      });
      
      updateFormData('techStack', {
        programmingLanguages: [],
        uiFrameworks: [],
        backendFullStackFrameworks: [],
        frontendFrameworks: []
      });
      
      updateFormData('backendAPI', {
        backendFrameworks: [],
        apiStyles: []
      });
      
      updateFormData('stateManagement', {
        stateLibraries: []
      });
      
      updateFormData('searchPlatforms', {
        searchPlatforms: []
      });
      
      updateFormData('packageManagement', {
        packageManagers: []
      });
      
      updateFormData('buildBundling', {
        buildTools: []
      });
      
      updateFormData('mobileDesktop', {
        mobileDesktopFrameworks: []
      });
      
      updateFormData('iotStack', {
        cloudIOTPlatforms: [],
        edgeComputingPlatforms: [],
        iotProtocols: [],
        embeddedLanguages: [],
        iotHardwarePlatforms: [],
        iotFrameworks: []
      });
      
      updateFormData('ecommercePayments', {
        paymentProviders: [],
        paymentPlans: [],
        pricingLevels: [],
        pricingTypeAI: [],
        pricingOptions: [],
        yearlyDiscounts: [],
        accountingPlatforms: [],
        ecommerceProviders: []
      });
      
      updateFormData('communicationAPIs', {
        communicationAPIs: [],
        contentAPIs: [],
        productivityAPIs: [],
        calendarOptions: []
      });
      
      updateFormData('mapsGeolocation', {
        mappingProviders: []
      });
      
      updateFormData('cloudInfrastructure', {
        iaasProviders: [],
        paasProviders: [],
        containerPlatforms: [],
        serverlessPlatforms: []
      });
      
      updateFormData('securityAuth', {
        dnsProviders: [],
        cdnProviders: [],
        sslProviders: [],
        socialLogins: [],
        enterpriseSSO: '',
        authMethod: '',
        twoFactorAuth: '',
        apiSecurity: [],
        dataEncryption: [],
        complianceStandards: [],
        securityMonitoring: [],
        backupRecovery: [],
        secretsManagers: []
      });
      
      updateFormData('databasesStorage', {
        databases: [],
        ormTools: [],
        fileStorage: []
      });
      
      updateFormData('fileStorageEmail', {
        emailProvider: ''
      });
      
      updateFormData('sdks', {
        sdks: []
      });
      
      updateFormData('aiIntegration', {
        llmAgents: [],
        audioVideoGeneration: [],
        mcpServers: []
      });
      
      updateFormData('headlessCMS', {
        aiDecision: []
      });
      
    } else {
      updateFormData('controlLevel', { 
        selectedLevel: level,
        autoSelectAI: false 
      });
      
      // Clear all AI decision checkboxes
      updateFormData('appConfiguration', {
        aiDecision: []
      });
      
      updateFormData('stylingDesign', {
        cssFrameworks: [],
        styledUILibraries: [],
        headlessUILibraries: [],
        recipeUILibraries: [],
        aiDecision: []
      });
      
      updateFormData('techStack', {
        programmingLanguages: [],
        uiFrameworks: [],
        backendFullStackFrameworks: [],
        frontendFrameworks: []
      });
      
      updateFormData('backendAPI', {
        backendFrameworks: [],
        apiStyles: []
      });
      
      updateFormData('stateManagement', {
        stateLibraries: []
      });
      
      updateFormData('searchPlatforms', {
        searchPlatforms: []
      });
      
      updateFormData('packageManagement', {
        packageManagers: [],
        monorepoTools: []
      });
      
      updateFormData('buildBundling', {
        buildTools: []
      });
      
      updateFormData('mobileDesktop', {
        mobileDesktopFrameworks: []
      });
      
      updateFormData('iotStack', {
        cloudIOTPlatforms: [],
        edgeComputingPlatforms: [],
        iotProtocols: [],
        embeddedLanguages: [],
        iotHardwarePlatforms: [],
        iotFrameworks: []
      });
      
      updateFormData('ecommercePayments', {
        paymentProviders: [],
        paymentPlans: [],
        pricingLevels: [],
        pricingTypeAI: [],
        pricingOptions: [],
        yearlyDiscounts: [],
        accountingPlatforms: [],
        ecommerceProviders: []
      });
      
      updateFormData('communicationAPIs', {
        communicationAPIs: [],
        contentAPIs: [],
        productivityAPIs: [],
        calendarOptions: []
      });
      
      updateFormData('mapsGeolocation', {
        mappingProviders: []
      });
      
      updateFormData('cloudInfrastructure', {
        iaasProviders: [],
        paasProviders: [],
        containerPlatforms: [],
        serverlessPlatforms: []
      });
      
      updateFormData('securityAuth', {
        dnsProviders: [],
        cdnProviders: [],
        sslProviders: [],
        socialLogins: [],
        enterpriseSSO: '',
        authMethod: '',
        twoFactorAuth: '',
        apiSecurity: [],
        dataEncryption: [],
        complianceStandards: [],
        securityMonitoring: [],
        backupRecovery: [],
        secretsManagers: []
      });
      
      updateFormData('databasesStorage', {
        databases: [],
        ormTools: [],
        fileStorage: []
      });
      
      updateFormData('fileStorageEmail', {
        emailProvider: ''
      });
      
      updateFormData('sdks', {
        sdks: []
      });
      
      updateFormData('aiIntegration', {
        llmAgents: [],
        audioVideoGeneration: [],
        mcpServers: []
      });
      
      updateFormData('headlessCMS', {
        aiDecision: []
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Control Level</h2>
        <p className="text-gray-600">Choose your level of involvement in the selection process</p>
      </div>

      <div className="bg-white p-8 rounded-lg border">
        <h3 className="text-lg font-semibold mb-6 text-center">
          Please choose the amount of time and level of detail you want to put into your selection process:
        </h3>
        
        <div className="space-y-4">
          <label className="flex items-start space-x-4 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="controlLevel"
              value="5 Minutes"
              checked={formData.controlLevel?.selectedLevel === '5 Minutes'}
              onChange={(e) => handleControlLevelChange(e.target.value)}
              className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div className="flex-1">
              <div className="font-semibold text-lg text-purple-600 mb-2">5 Minutes</div>
              <div className="text-gray-700">
                Let the AI Decide everything for me other than:
                <ul className="list-disc list-inside mt-2 ml-4 text-sm">
                  <li>Developer Information</li>
                  <li>Company Information</li>
                  <li>App Information</li>
                </ul>
              </div>
            </div>
          </label>

          <label className="flex items-start space-x-4 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="controlLevel"
              value="8 Minutes"
              checked={formData.controlLevel?.selectedLevel === '8 Minutes'}
              onChange={(e) => handleControlLevelChange(e.target.value)}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="font-semibold text-lg text-green-600 mb-2">8 Minutes</div>
              <div className="text-gray-700">
                Let the AI decide most issues (but I will go through and quickly change a few settings here and there)
              </div>
            </div>
          </label>

          <label className="flex items-start space-x-4 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="controlLevel"
              value="15-20 Minutes"
              checked={formData.controlLevel?.selectedLevel === '15-20 Minutes'}
              onChange={(e) => handleControlLevelChange(e.target.value)}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="font-semibold text-lg text-blue-600 mb-2">15-20 Minutes</div>
              <div className="text-gray-700">
                I want full control of every detail and will choose all selections myself.
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
} 