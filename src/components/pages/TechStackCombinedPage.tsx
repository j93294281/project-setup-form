import React from 'react';
import { MultiStageFormData, TechStack, BackendAPI, StateManagement, HeadlessCMS, SearchPlatforms, PackageManagement, BuildBundling, MobileDesktop } from '../../types/FormTypes';

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

// Helper to remove AI value if user selects a non-AI value
function removeAIDecision(current: string[] = []) {
  return current.filter(v => v !== 'Let the AI decide');
}

export default function TechStackCombinedPage({ formData, updateFormData, skipPage, goToPage }: Props) {
  const techData = formData.techStack;
  const backendData = formData.backendAPI;
  const stateData = formData.stateManagement;
  const cmsData = formData.headlessCMS;
  const searchData = formData.searchPlatforms;
  const packageData = formData.packageManagement;
  const buildData = formData.buildBundling;
  const mobileDesktopData = formData.mobileDesktop;

  const handleTechInputChange = (field: keyof TechStack, value: string | string[]) => {
    updateFormData('techStack', { [field]: value });
  };

  const handleTechCheckboxChange = (field: keyof TechStack, value: string, checked: boolean) => {
    const currentValues = (techData[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleTechInputChange(field, [...filteredValues, value]);
    } else {
      handleTechInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const handleBackendInputChange = (field: keyof BackendAPI, value: string | string[]) => {
    updateFormData('backendAPI', { [field]: value });
  };

  const handleBackendCheckboxChange = (field: keyof BackendAPI, value: string, checked: boolean) => {
    const currentValues = (backendData[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleBackendInputChange(field, [...filteredValues, value]);
    } else {
      handleBackendInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const handleStateInputChange = (field: keyof StateManagement, value: string | string[]) => {
    updateFormData('stateManagement', { [field]: value });
  };

  const handleStateCheckboxChange = (field: keyof StateManagement, value: string, checked: boolean) => {
    const currentValues = (stateData[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleStateInputChange(field, [...filteredValues, value]);
    } else {
      handleStateInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const handleCMSInputChange = (field: keyof HeadlessCMS, value: string | string[]) => {
    updateFormData('headlessCMS', { [field]: value });
  };

  const handleCMSCheckboxChange = (field: keyof HeadlessCMS, value: string, checked: boolean) => {
    const currentValues = (cmsData[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleCMSInputChange(field, [...filteredValues, value]);
      // Clear AI decision when user selects a specific CMS
      if ((cmsData.aiDecision || []).includes('Let the AI decide')) {
        handleCMSInputChange('aiDecision', []);
      }
    } else {
      handleCMSInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const handleSearchInputChange = (field: keyof SearchPlatforms, value: string | string[]) => {
    updateFormData('searchPlatforms', { [field]: value });
  };

  const handleSearchCheckboxChange = (field: keyof SearchPlatforms, value: string, checked: boolean) => {
    const currentValues = (searchData[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleSearchInputChange(field, [...filteredValues, value]);
    } else {
      handleSearchInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const handlePackageInputChange = (field: keyof PackageManagement, value: string | string[]) => {
    updateFormData('packageManagement', { [field]: value });
  };

  const handlePackageCheckboxChange = (field: keyof PackageManagement, value: string, checked: boolean) => {
    const currentValues = (packageData[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handlePackageInputChange(field, [...filteredValues, value]);
    } else {
      handlePackageInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const handleBuildInputChange = (field: keyof BuildBundling, value: string | string[]) => {
    updateFormData('buildBundling', { [field]: value });
  };

  const handleBuildCheckboxChange = (field: keyof BuildBundling, value: string, checked: boolean) => {
    const currentValues = (buildData[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleBuildInputChange(field, [...filteredValues, value]);
    } else {
      handleBuildInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const handleMobileDesktopInputChange = (field: keyof MobileDesktop, value: string | string[]) => {
    updateFormData('mobileDesktop', { [field]: value });
  };

  const handleMobileDesktopCheckboxChange = (field: keyof MobileDesktop, value: string, checked: boolean) => {
    const currentValues = (mobileDesktopData[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleMobileDesktopInputChange(field, [...filteredValues, value]);
    } else {
      handleMobileDesktopInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  // AI Decision handlers for each section
  const handleAITechCheckboxChange = (field: keyof TechStack, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      handleTechInputChange(field, ['Let the AI decide']);
      // Also reset the corresponding default dropdown
      if (field === 'uiFrameworks') {
        handleTechInputChange('defaultUiFramework', '');
      } else if (field === 'backendFullStackFrameworks') {
        handleTechInputChange('defaultBackendFullStackFramework', '');
      } else if (field === 'programmingLanguages') {
        handleTechInputChange('defaultProgrammingLanguage', '');
      }
    } else {
      // When unchecked, clear the "Let the AI decide" option
      handleTechInputChange(field, []);
    }
  };

  const handleAIBackendCheckboxChange = (field: keyof BackendAPI, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      handleBackendInputChange(field, ['Let the AI decide']);
      // Also reset the corresponding default dropdown
      if (field === 'apiStyles') {
        handleBackendInputChange('defaultAPIStyle', '');
      }
    } else {
      // When unchecked, clear the "Let the AI decide" option
      handleBackendInputChange(field, []);
    }
  };

  const handleAIStateCheckboxChange = (field: keyof StateManagement, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      handleStateInputChange(field, ['Let the AI decide']);
      // Also reset the corresponding default dropdown
      if (field === 'stateLibraries') {
        handleStateInputChange('defaultStateLibrary', '');
      }
    } else {
      // When unchecked, clear the "Let the AI decide" option
      handleStateInputChange(field, []);
    }
  };

  const handleAICMSCheckboxChange = (field: keyof HeadlessCMS, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      if (field === 'aiDecision') {
        handleCMSInputChange('aiDecision', ['Let the AI decide']);
        handleCMSInputChange('headlessCMS', []);
        handleCMSInputChange('defaultCMS', '');
      } else {
        handleCMSInputChange(field, ['Let the AI decide']);
        // Also reset the corresponding default dropdown
        if (field === 'headlessCMS') {
          handleCMSInputChange('defaultCMS', '');
        }
      }
    } else {
      // When unchecked, clear the "Let the AI decide" option
      handleCMSInputChange(field, []);
    }
  };

  const handleAISearchCheckboxChange = (field: keyof SearchPlatforms, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      handleSearchInputChange(field, ['Let the AI decide']);
      // Also reset the corresponding default dropdown
      if (field === 'searchPlatforms') {
        handleSearchInputChange('defaultSearchPlatform', '');
      }
    } else {
      // When unchecked, clear the "Let the AI decide" option
      handleSearchInputChange(field, []);
    }
  };

  const handleAIPackageCheckboxChange = (field: keyof PackageManagement, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      handlePackageInputChange(field, ['Let the AI decide']);
      // Also reset the corresponding default dropdowns
      if (field === 'packageManagers') {
        handlePackageInputChange('defaultPackageManager', '');
      } else if (field === 'monorepoTools') {
        handlePackageInputChange('defaultMonorepoTool', '');
      }
    } else {
      // When unchecked, clear the "Let the AI decide" option
      handlePackageInputChange(field, []);
    }
  };

  const handleAIBuildCheckboxChange = (field: keyof BuildBundling, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      handleBuildInputChange(field, ['Let the AI decide']);
      // Also reset the corresponding default dropdown
      if (field === 'buildTools') {
        handleBuildInputChange('defaultBuildTool', '');
      }
    } else {
      // When unchecked, clear the "Let the AI decide" option
      handleBuildInputChange(field, []);
    }
  };

  const handleAIMobileDesktopCheckboxChange = (field: keyof MobileDesktop, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      handleMobileDesktopInputChange(field, ['Let the AI decide']);
      // Also reset the corresponding default dropdown
      if (field === 'mobileDesktopFrameworks') {
        handleMobileDesktopInputChange('defaultMobileDesktopFramework', '');
      }
    } else {
      // When unchecked, clear the "Let the AI decide" option
      handleMobileDesktopInputChange(field, []);
    }
  };

  // Programming Languages
  const programmingLanguages = [
    'C#',
    'C++',
    'Dart',
    'Elixir',
    'Go (Golang)',
    'Java',
    'JavaScript (JS)',
    'Kotlin',
    'PHP',
    'Python',
    'Ruby',
    'Rust',
    'SQL',
    'Swift',
    'TypeScript (TS)',
    'Zig'
  ];

  // UI Frameworks
  const uiFrameworks = [
    'Angular',
    'Lit',
    'Preact',
    'Qwik',
    'React',
    'SolidJS',
    'Svelte',
    'Vue.js'
  ];

  // Backend & Full-Stack Frameworks
  const backendFullStackFrameworks = [
    'Analog.js',
    'ASP.NET Core',
    'Astro',
    'Django',
    'Echo (Go)',
    'Express.js',
    'FastAPI',
    'Fastify',
    'Fiber (Go)',
    'Flask',
    'Fresh',
    'Gin (Go)',
    'Laravel',
    'NestJS',
    'Next.js',
    'Nuxt',
    'Phoenix',
    'Qwik City',
    'RedwoodJS',
    'Remix',
    'Ruby on Rails',
    'SolidStart',
    'Spring Boot',
    'SvelteKit'
  ];



  // API Styles
  const apiStyles = [
    'GraphQL',
    'gRPC',
    'REST',
    'Server-Sent Events (SSE)',
    'WebSockets',
    'WebHooks'
  ];

  // State & Data Fetching Libraries
  const stateLibraries = [
    'Apollo Client',
    'Axios',
    'Context API (React)',
    'Fetch API',
    'Jotai',
    'MobX',
    'Recoil',
    'Redux',
    'RTK Query',
    'SWR',
    'TanStack Query (React Query)',
    'Valtio',
    'XState',
    'Zustand'
  ];

  // Build & Compilation Tools
  const buildTools = [
    'Babel',
    'esbuild',
    'Parcel',
    'Rollup',
    'SWC',
    'Turbopack',
    'TypeScript Compiler',
    'Vite',
    'Webpack'
  ];

  // Package Managers
  const packageManagers = [
    'Cargo (Rust)',
    'Composer (PHP)',
    'Go Modules',
    'Maven / Gradle (Java)',
    'npm',
    'NuGet (.NET)',
    'pip (Python)',
    'pnpm',
    'RubyGems',
    'Yarn'
  ];

  // Mobile & Desktop Frameworks
  const mobileDesktopFrameworks = [
    'Capacitor / Ionic',
    'Electron',
    'Flutter',
    'React Native',
    'Tauri'
  ];

  // Headless CMS
  const headlessCMS = [
    'Contentful',
    'Decap CMS',
    'Directus',
    'Hygraph',
    'Kontent.ai',
    'Sanity.io',
    'Storyblok',
    'Strapi',
    'Supabase'
  ];

  // Search Platforms
  const searchPlatforms = [
    'Algolia',
    'Meilisearch',
    'Typesense'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Web Stack</h2>
        <p className="text-gray-600">Please choose your preferred languages and frameworks.</p>
      </div>

      {/* Blue info box with Skip Section button */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col space-y-3">
        <span className="text-blue-700 text-sm">This section is optional. If it does not apply, you can continue to the next one.</span>
        <button
          onClick={skipPage}
          className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors w-full"
        >
          Skip Section
        </button>
        <div className="h-2"></div>
        <button
          onClick={() => goToPage(16)}
          className="px-4 py-2 bg-green-100 text-green-700 border border-green-300 rounded-md hover:bg-green-200 transition-colors w-full"
        >
          Skip to Review & Submit Page
        </button>
      </div>

      {/* Programming Languages */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Programming Languages</h3>
        <p className="text-gray-600 mb-4">Choose the programming languages you are comfortable with.</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(techData.programmingLanguages || []).includes('Let the AI decide')}
                onChange={(e) => handleAITechCheckboxChange('programmingLanguages', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleTechInputChange('programmingLanguages', [...programmingLanguages])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleTechInputChange('programmingLanguages', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {programmingLanguages.map((language) => (
            <label key={language} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(techData.programmingLanguages || []).includes(language)}
                onChange={(e) => handleTechCheckboxChange('programmingLanguages', language, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{language}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Language
          </label>
          <select
            value={techData.defaultProgrammingLanguage || ''}
            onChange={(e) => handleTechInputChange('defaultProgrammingLanguage', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Select your favorite programming language</option>
            {programmingLanguages.map((language) => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
      </div>

              {/* UI Frameworks */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">UI Frameworks</h3>
          <p className="text-gray-600 mb-4">Choose the UI frameworks you are comfortable with.</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(techData.uiFrameworks || []).includes('Let the AI decide')}
                onChange={(e) => handleAITechCheckboxChange('uiFrameworks', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleTechInputChange('uiFrameworks', [...uiFrameworks])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleTechInputChange('uiFrameworks', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {uiFrameworks.map((framework) => (
            <label key={framework} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(techData.uiFrameworks || []).includes(framework)}
                onChange={(e) => handleTechCheckboxChange('uiFrameworks', framework, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{framework}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred UI Framework
          </label>
          <select
            value={techData.defaultUiFramework || ''}
            onChange={(e) => handleTechInputChange('defaultUiFramework', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred UI framework</option>
            {uiFrameworks.map((framework) => (
              <option key={framework} value={framework}>{framework}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Backend & Full-Stack Frameworks */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Backend & Full-Stack Frameworks</h3>
        <p className="text-gray-600 mb-4">Select the backend and full-stack frameworks you're experienced with.</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(techData.backendFullStackFrameworks || []).includes('Let the AI decide')}
                onChange={(e) => handleAITechCheckboxChange('backendFullStackFrameworks', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleTechInputChange('backendFullStackFrameworks', [...backendFullStackFrameworks])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleTechInputChange('backendFullStackFrameworks', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {backendFullStackFrameworks.map((framework) => (
            <label key={framework} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(techData.backendFullStackFrameworks || []).includes(framework)}
                onChange={(e) => handleTechCheckboxChange('backendFullStackFrameworks', framework, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{framework}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Backend & Full-Stack Framework
          </label>
          <select
            value={techData.defaultBackendFullStackFramework || ''}
            onChange={(e) => handleTechInputChange('defaultBackendFullStackFramework', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred backend & full-stack framework</option>
            {backendFullStackFrameworks.map((framework) => (
              <option key={framework} value={framework}>{framework}</option>
            ))}
          </select>
        </div>
      </div>



      {/* API Styles */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">API Styles</h3>
        <p className="text-gray-600 mb-4">Specify your preferred methods for designing APIs.</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(backendData.apiStyles || []).includes('Let the AI decide')}
                onChange={(e) => handleAIBackendCheckboxChange('apiStyles', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleBackendInputChange('apiStyles', [...apiStyles])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleBackendInputChange('apiStyles', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {apiStyles.map((style) => (
            <label key={style} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(backendData.apiStyles || []).includes(style)}
                onChange={(e) => handleBackendCheckboxChange('apiStyles', style, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{style}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred API Style
          </label>
          <select
            value={backendData.defaultAPIStyle || ''}
            onChange={(e) => handleBackendInputChange('defaultAPIStyle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred API style</option>
            {apiStyles.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
      </div>

      {/* State & Data Fetching Libraries */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">State & Data Fetching Libraries</h3>
        <p className="text-gray-600 mb-4">Select the libraries you will use for managing application state and data fetching.</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(stateData.stateLibraries || []).includes('Let the AI decide')}
                onChange={(e) => handleAIStateCheckboxChange('stateLibraries', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleStateInputChange('stateLibraries', [...stateLibraries])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleStateInputChange('stateLibraries', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {stateLibraries.map((library) => (
            <label key={library} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(stateData.stateLibraries || []).includes(library)}
                onChange={(e) => handleStateCheckboxChange('stateLibraries', library, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{library}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Library
          </label>
          <select
            value={stateData.defaultStateLibrary || ''}
            onChange={(e) => handleStateInputChange('defaultStateLibrary', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred state library</option>
            {stateLibraries.map((library) => (
              <option key={library} value={library}>{library}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Build & Compilation Tools */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Build & Compilation Tools</h3>
        <p className="text-gray-600 mb-4">Choose your go-to tools for building and compiling your code.</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(buildData.buildTools || []).includes('Let the AI decide')}
                onChange={(e) => handleAIBuildCheckboxChange('buildTools', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleBuildInputChange('buildTools', [...buildTools])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleBuildInputChange('buildTools', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {buildTools.map((tool) => (
            <label key={tool} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(buildData.buildTools || []).includes(tool)}
                onChange={(e) => handleBuildCheckboxChange('buildTools', tool, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{tool}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Tool
          </label>
          <select
            value={buildData.defaultBuildTool || ''}
            onChange={(e) => handleBuildInputChange('defaultBuildTool', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred build tool</option>
            {buildTools.map((tool) => (
              <option key={tool} value={tool}>{tool}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Package Managers */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Package Managers</h3>
        <p className="text-gray-600 mb-4">Choose your preferred tools for managing packages and dependencies.</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(packageData.packageManagers || []).includes('Let the AI decide')}
                onChange={(e) => handleAIPackageCheckboxChange('packageManagers', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handlePackageInputChange('packageManagers', [...packageManagers])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handlePackageInputChange('packageManagers', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {packageManagers.map((manager) => (
            <label key={manager} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(packageData.packageManagers || []).includes(manager)}
                onChange={(e) => handlePackageCheckboxChange('packageManagers', manager, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{manager}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Package Manager
          </label>
          <select
            value={packageData.defaultPackageManager || ''}
            onChange={(e) => handlePackageInputChange('defaultPackageManager', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred package manager</option>
            {packageManagers.map((manager) => (
              <option key={manager} value={manager}>{manager}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile & Desktop Frameworks */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Mobile & Desktop Frameworks</h3>
        <p className="text-gray-600 mb-4">Select any frameworks you use for building mobile or desktop applications.</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(mobileDesktopData.mobileDesktopFrameworks || []).includes('Let the AI decide')}
                onChange={(e) => handleAIMobileDesktopCheckboxChange('mobileDesktopFrameworks', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleMobileDesktopInputChange('mobileDesktopFrameworks', [...mobileDesktopFrameworks])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleMobileDesktopInputChange('mobileDesktopFrameworks', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {mobileDesktopFrameworks.map((framework) => (
            <label key={framework} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(mobileDesktopData.mobileDesktopFrameworks || []).includes(framework)}
                onChange={(e) => handleMobileDesktopCheckboxChange('mobileDesktopFrameworks', framework, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{framework}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Framework
          </label>
          <select
            value={mobileDesktopData.defaultMobileDesktopFramework || ''}
            onChange={(e) => handleMobileDesktopInputChange('defaultMobileDesktopFramework', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred mobile/desktop framework</option>
            {mobileDesktopFrameworks.map((framework) => (
              <option key={framework} value={framework}>{framework}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Headless CMS */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Headless CMS</h3>
        <p className="text-gray-600 mb-4">Select the headless CMS platforms you are willing to use.</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(cmsData.aiDecision || []).includes('Let the AI decide')}
                onChange={(e) => handleAICMSCheckboxChange('aiDecision', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => {
                handleCMSInputChange('headlessCMS', [...headlessCMS]);
                // Clear AI decision when user selects all
                if ((cmsData.aiDecision || []).includes('Let the AI decide')) {
                  handleCMSInputChange('aiDecision', []);
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => {
                handleCMSInputChange('headlessCMS', []);
                // Clear AI decision when user deselects all
                if ((cmsData.aiDecision || []).includes('Let the AI decide')) {
                  handleCMSInputChange('aiDecision', []);
                }
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {headlessCMS.map((cms) => (
            <label key={cms} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(cmsData.headlessCMS || []).includes(cms)}
                onChange={(e) => handleCMSCheckboxChange('headlessCMS', cms, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{cms}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred CMS
          </label>
          <select
            value={cmsData.defaultCMS || ''}
            onChange={(e) => {
              handleCMSInputChange('defaultCMS', e.target.value);
              // Clear AI decision when user selects a specific CMS
              if (e.target.value && (cmsData.aiDecision || []).includes('Let the AI decide')) {
                handleCMSInputChange('aiDecision', []);
              }
            }}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred headless CMS</option>
            {headlessCMS.map((cms) => (
              <option key={cms} value={cms}>{cms}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Platforms */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Search Platforms</h3>
        <p className="text-gray-600 mb-4">Select the search platforms you have experience with.</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(searchData.searchPlatforms || []).includes('Let the AI decide')}
                onChange={(e) => handleAISearchCheckboxChange('searchPlatforms', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleSearchInputChange('searchPlatforms', [...searchPlatforms])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleSearchInputChange('searchPlatforms', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {searchPlatforms.map((platform) => (
            <label key={platform} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(searchData.searchPlatforms || []).includes(platform)}
                onChange={(e) => handleSearchCheckboxChange('searchPlatforms', platform, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{platform}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Search Platform
          </label>
          <select
            value={searchData.defaultSearchPlatform || ''}
            onChange={(e) => handleSearchInputChange('defaultSearchPlatform', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred search platform</option>
            {searchPlatforms.map((platform) => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
} 