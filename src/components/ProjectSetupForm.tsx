import React, { useState } from 'react';
import { ProjectMetadata } from '../types/ProjectMetadata';
import { metadataOptions, sectionTitles } from '../data/metadataOptions';

/**
 * ProjectSetupForm component for selecting project metadata and generating CLAUDE.md
 */
const ProjectSetupForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<ProjectMetadata>>({});
  const [generatedOutput, setGeneratedOutput] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('core');
  const WEBHOOK_URL = 'https://encinitaseyes.app.n8n.cloud/form/0615e0eb-d7cf-4ddb-8ee4-f31e7698be22'; // n8n webhook URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [webhookResponse, setWebhookResponse] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);

  /**
   * Handle form field changes
   */
  const handleFieldChange = (field: keyof ProjectMetadata, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === 'None' ? '' : value
    }));
  };

  /**
   * Generate CLAUDE.md format output
   */
  const generateOutput = () => {
    const sections = [
      '# CLAUDE.md\n',
      'This file provides guidance to Claude Code when working with this project.\n',
      '## Project Overview\n'
    ];

    // Core Technology
    if (formData.type) sections.push(`- **Type**: ${formData.type}`);
    if (formData.language) sections.push(`- **Language**: ${formData.language}`);
    if (formData.runtime) sections.push(`- **Runtime**: ${formData.runtime}`);
    if (formData.framework) sections.push(`- **Framework**: ${formData.framework}`);

    // Package Management
    if (formData.packageManager || formData.monorepo) {
      sections.push('\n## Package Management');
      if (formData.packageManager) sections.push(`- **Package Manager**: ${formData.packageManager}`);
      if (formData.monorepo) sections.push(`- **Monorepo**: ${formData.monorepo}`);
    }

    // Build & Bundling
    if (formData.bundler || formData.buildTool || formData.transpiler) {
      sections.push('\n## Build & Bundling');
      if (formData.bundler) sections.push(`- **Bundler**: ${formData.bundler}`);
      if (formData.buildTool) sections.push(`- **Build Tool**: ${formData.buildTool}`);
      if (formData.transpiler) sections.push(`- **Transpiler**: ${formData.transpiler}`);
    }

    // Styling & UI
    if (formData.cssFramework || formData.cssInJs || formData.uiLibrary) {
      sections.push('\n## Styling & UI');
      if (formData.cssFramework) sections.push(`- **CSS Framework**: ${formData.cssFramework}`);
      if (formData.cssInJs) sections.push(`- **CSS-in-JS**: ${formData.cssInJs}`);
      if (formData.uiLibrary) sections.push(`- **UI Library**: ${formData.uiLibrary}`);
    }

    // State Management
    if (formData.stateManagement || formData.dataFetching) {
      sections.push('\n## State Management');
      if (formData.stateManagement) sections.push(`- **State**: ${formData.stateManagement}`);
      if (formData.dataFetching) sections.push(`- **Data Fetching**: ${formData.dataFetching}`);
    }

    // Backend & API
    if (formData.backendFramework || formData.apiStyle || formData.apiClient) {
      sections.push('\n## Backend & API');
      if (formData.backendFramework) sections.push(`- **Backend Framework**: ${formData.backendFramework}`);
      if (formData.apiStyle) sections.push(`- **API Style**: ${formData.apiStyle}`);
      if (formData.apiClient) sections.push(`- **API Client**: ${formData.apiClient}`);
    }

    // Database & Storage
    if (formData.database || formData.orm || formData.caching) {
      sections.push('\n## Database & Storage');
      if (formData.database) sections.push(`- **Database**: ${formData.database}`);
      if (formData.orm) sections.push(`- **ORM/ODM**: ${formData.orm}`);
      if (formData.caching) sections.push(`- **Caching**: ${formData.caching}`);
    }

    // Authentication & Security
    if (formData.auth || formData.authorization) {
      sections.push('\n## Authentication & Security');
      if (formData.auth) sections.push(`- **Auth**: ${formData.auth}`);
      if (formData.authorization) sections.push(`- **Authorization**: ${formData.authorization}`);
    }

    // Testing
    if (formData.testing || formData.frontendTesting || formData.e2eTesting) {
      sections.push('\n## Testing');
      if (formData.testing) sections.push(`- **Testing**: ${formData.testing}`);
      if (formData.frontendTesting) sections.push(`- **Frontend Testing**: ${formData.frontendTesting}`);
      if (formData.e2eTesting) sections.push(`- **E2E Testing**: ${formData.e2eTesting}`);
    }

    // Code Quality
    if (formData.linting || formData.formatting || formData.typeChecking) {
      sections.push('\n## Code Quality');
      if (formData.linting) sections.push(`- **Linting**: ${formData.linting}`);
      if (formData.formatting) sections.push(`- **Formatting**: ${formData.formatting}`);
      if (formData.typeChecking) sections.push(`- **Type Checking**: ${formData.typeChecking}`);
    }

    // Deployment & Infrastructure
    if (formData.hosting || formData.cicd || formData.monitoring) {
      sections.push('\n## Deployment & Infrastructure');
      if (formData.hosting) sections.push(`- **Hosting**: ${formData.hosting}`);
      if (formData.cicd) sections.push(`- **CI/CD**: ${formData.cicd}`);
      if (formData.monitoring) sections.push(`- **Monitoring**: ${formData.monitoring}`);
    }

    setGeneratedOutput(sections.join('\n'));
  };

  /**
   * Send form data to webhook
   */
  const sendToWebhook = async () => {
    setIsLoading(true);
    setWebhookResponse(null);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          timestamp: new Date().toISOString(),
          source: 'project-setup-form'
        }),
      });

      const responseData = await response.json().catch(() => ({}));

      if (response.ok) {
        setWebhookResponse({
          success: true,
          message: 'Data sent successfully!',
          data: responseData
        });
      } else {
        setWebhookResponse({
          success: false,
          message: `Failed to send data: ${response.status} ${response.statusText}`,
          data: responseData
        });
      }
    } catch (error) {
      setWebhookResponse({
        success: false,
        message: `Error sending data: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Render a select field
   */
  const renderSelect = (
    label: string,
    field: keyof ProjectMetadata,
    options: string[]
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={formData[field] || ''}
        onChange={(e) => handleFieldChange(field, e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const sections = [
    {
      id: 'core',
      title: sectionTitles.core,
      fields: [
        { label: 'Project Type', field: 'type' as keyof ProjectMetadata, options: metadataOptions.type },
        { label: 'Language', field: 'language' as keyof ProjectMetadata, options: metadataOptions.language },
        { label: 'Runtime', field: 'runtime' as keyof ProjectMetadata, options: metadataOptions.runtime },
        { label: 'Framework', field: 'framework' as keyof ProjectMetadata, options: metadataOptions.framework }
      ]
    },
    {
      id: 'packageManagement',
      title: sectionTitles.packageManagement,
      fields: [
        { label: 'Package Manager', field: 'packageManager' as keyof ProjectMetadata, options: metadataOptions.packageManager },
        { label: 'Monorepo Tool', field: 'monorepo' as keyof ProjectMetadata, options: metadataOptions.monorepo }
      ]
    },
    {
      id: 'buildBundling',
      title: sectionTitles.buildBundling,
      fields: [
        { label: 'Bundler', field: 'bundler' as keyof ProjectMetadata, options: metadataOptions.bundler },
        { label: 'Build Tool', field: 'buildTool' as keyof ProjectMetadata, options: metadataOptions.buildTool },
        { label: 'Transpiler', field: 'transpiler' as keyof ProjectMetadata, options: metadataOptions.transpiler }
      ]
    },
    {
      id: 'stylingUi',
      title: sectionTitles.stylingUi,
      fields: [
        { label: 'CSS Framework', field: 'cssFramework' as keyof ProjectMetadata, options: metadataOptions.cssFramework },
        { label: 'CSS-in-JS', field: 'cssInJs' as keyof ProjectMetadata, options: metadataOptions.cssInJs },
        { label: 'UI Library', field: 'uiLibrary' as keyof ProjectMetadata, options: metadataOptions.uiLibrary }
      ]
    },
    {
      id: 'stateManagement',
      title: sectionTitles.stateManagement,
      fields: [
        { label: 'State Management', field: 'stateManagement' as keyof ProjectMetadata, options: metadataOptions.stateManagement },
        { label: 'Data Fetching', field: 'dataFetching' as keyof ProjectMetadata, options: metadataOptions.dataFetching }
      ]
    },
    {
      id: 'backendApi',
      title: sectionTitles.backendApi,
      fields: [
        { label: 'Backend Framework', field: 'backendFramework' as keyof ProjectMetadata, options: metadataOptions.backendFramework },
        { label: 'API Style', field: 'apiStyle' as keyof ProjectMetadata, options: metadataOptions.apiStyle },
        { label: 'API Client', field: 'apiClient' as keyof ProjectMetadata, options: metadataOptions.apiClient }
      ]
    },
    {
      id: 'databaseStorage',
      title: sectionTitles.databaseStorage,
      fields: [
        { label: 'Database', field: 'database' as keyof ProjectMetadata, options: metadataOptions.database },
        { label: 'ORM/ODM', field: 'orm' as keyof ProjectMetadata, options: metadataOptions.orm },
        { label: 'Caching', field: 'caching' as keyof ProjectMetadata, options: metadataOptions.caching }
      ]
    },
    {
      id: 'authSecurity',
      title: sectionTitles.authSecurity,
      fields: [
        { label: 'Authentication', field: 'auth' as keyof ProjectMetadata, options: metadataOptions.auth },
        { label: 'Authorization', field: 'authorization' as keyof ProjectMetadata, options: metadataOptions.authorization }
      ]
    },
    {
      id: 'testing',
      title: sectionTitles.testing,
      fields: [
        { label: 'Testing Framework', field: 'testing' as keyof ProjectMetadata, options: metadataOptions.testing },
        { label: 'Frontend Testing', field: 'frontendTesting' as keyof ProjectMetadata, options: metadataOptions.frontendTesting },
        { label: 'E2E Testing', field: 'e2eTesting' as keyof ProjectMetadata, options: metadataOptions.e2eTesting }
      ]
    },
    {
      id: 'codeQuality',
      title: sectionTitles.codeQuality,
      fields: [
        { label: 'Linting', field: 'linting' as keyof ProjectMetadata, options: metadataOptions.linting },
        { label: 'Formatting', field: 'formatting' as keyof ProjectMetadata, options: metadataOptions.formatting },
        { label: 'Type Checking', field: 'typeChecking' as keyof ProjectMetadata, options: metadataOptions.typeChecking }
      ]
    },
    {
      id: 'deploymentInfra',
      title: sectionTitles.deploymentInfra,
      fields: [
        { label: 'Hosting', field: 'hosting' as keyof ProjectMetadata, options: metadataOptions.hosting },
        { label: 'CI/CD', field: 'cicd' as keyof ProjectMetadata, options: metadataOptions.cicd },
        { label: 'Monitoring', field: 'monitoring' as keyof ProjectMetadata, options: metadataOptions.monitoring }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Project Setup Configuration
      </h1>
      
      <div className="space-y-6">
        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6 z-10">
          <h2 className="text-lg font-semibold mb-4">Sections</h2>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
          
          <div className="mt-6 space-y-4">
            <button
              onClick={generateOutput}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Generate CLAUDE.md
            </button>
            
            <div className="border-t pt-4">
              <button
                onClick={sendToWebhook}
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send to Webhook'}
              </button>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`bg-white rounded-lg shadow-sm p-6 ${
                activeSection === section.id ? 'block' : 'hidden'
              }`}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {section.title}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {section.fields.map((field) => (
                  <div key={field.field}>
                    {renderSelect(field.label, field.field, field.options)}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Generated Output */}
          {generatedOutput && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Generated CLAUDE.md
              </h2>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto">
                <pre className="whitespace-pre-wrap text-sm">{generatedOutput}</pre>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(generatedOutput)}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm"
              >
                Copy to Clipboard
              </button>
            </div>
          )}

          {/* Webhook Response */}
          {webhookResponse && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Webhook Response
              </h2>
              <div 
                className={`p-4 rounded-lg ${
                  webhookResponse.success 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className={`flex items-center mb-2 ${
                  webhookResponse.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  <span className="font-medium">
                    {webhookResponse.success ? '✓ Success' : '✗ Error'}
                  </span>
                </div>
                <p className={`mb-2 ${
                  webhookResponse.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {webhookResponse.message}
                </p>
                {webhookResponse.data && Object.keys(webhookResponse.data).length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Response Data:</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-auto">
                      <pre>{JSON.stringify(webhookResponse.data, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectSetupForm;