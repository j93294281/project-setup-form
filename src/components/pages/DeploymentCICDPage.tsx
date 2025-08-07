import React from 'react';
import { MultiStageFormData, DeploymentCICD } from '../../types/FormTypes';

interface Props {
  formData: MultiStageFormData;
  updateFormData: <K extends keyof MultiStageFormData>(
    section: K,
    data: Partial<MultiStageFormData[K]>
  ) => void;
  nextPage: () => void;
  previousPage: () => void;
  skipPage: () => void;
}

export default function DeploymentCICDPage({ formData, updateFormData }: Props) {
  const data = formData.deploymentCICD;

  const handleInputChange = (field: keyof DeploymentCICD, value: string | string[]) => {
    updateFormData('deploymentCICD', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof DeploymentCICD, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleInputChange(field, [...filteredValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const hostingProviders = [
    'AWS (Amazon Web Services)',
    'DigitalOcean',
    'Fly.io',
    'GCP (Google Cloud Platform)',
    'Heroku',
    'Microsoft Azure',
    'Netlify',
    'Railway',
    'Render',
    'Vercel'
  ];

  const serverlessPlatforms = [
    'AWS Lambda',
    'Cloudflare Workers',
    'Google Cloud Functions'
  ];

  const containerOrchestration = [
    'Docker',
    'Kubernetes (K8s)'
  ];

  const cicdTools = [
    'CircleCI',
    'GitHub Actions',
    'GitLab CI/CD',
    'Jenkins'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Deployment & CI/CD</h2>
        <p className="text-gray-600">Choose your preferred deployment and continuous integration tools</p>
      </div>

      {/* Hosting Providers */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Hosting Providers</h3>
        <p className="text-gray-600 mb-4">Select all hosting providers you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('deploymentCICD', { hostingProviders: [...hostingProviders] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('deploymentCICD', { hostingProviders: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {hostingProviders.map((provider) => (
            <label key={provider} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.hostingProviders || []).includes(provider)}
                onChange={(e) => handleCheckboxChange('hostingProviders', provider, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{provider}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Hosting Provider
          </label>
          <select
            value={data.defaultHosting || ''}
            onChange={(e) => handleInputChange('defaultHosting', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred hosting provider</option>
            {hostingProviders.map((provider) => (
              <option key={provider} value={provider}>{provider}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>

      {/* Serverless Platforms */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Serverless Platforms</h3>
        <p className="text-gray-600 mb-4">Select all serverless platforms you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('deploymentCICD', { serverlessPlatforms: [...serverlessPlatforms] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('deploymentCICD', { serverlessPlatforms: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {serverlessPlatforms.map((platform) => (
            <label key={platform} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.serverlessPlatforms || []).includes(platform)}
                onChange={(e) => handleCheckboxChange('serverlessPlatforms', platform, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{platform}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Serverless Platform
          </label>
          <select
            value={data.defaultServerless || ''}
            onChange={(e) => handleInputChange('defaultServerless', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred serverless platform</option>
            {serverlessPlatforms.map((platform) => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>

      {/* Container Orchestration */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Container Orchestration</h3>
        <p className="text-gray-600 mb-4">Select all container orchestration tools you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('deploymentCICD', { containerOrchestration: [...containerOrchestration] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('deploymentCICD', { containerOrchestration: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {containerOrchestration.map((tool) => (
            <label key={tool} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.containerOrchestration || []).includes(tool)}
                onChange={(e) => handleCheckboxChange('containerOrchestration', tool, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{tool}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Container Orchestration
          </label>
          <select
            value={data.defaultContainerOrchestration || ''}
            onChange={(e) => handleInputChange('defaultContainerOrchestration', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred container orchestration</option>
            {containerOrchestration.map((tool) => (
              <option key={tool} value={tool}>{tool}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>

      {/* CI/CD Tools */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">CI/CD Tools</h3>
        <p className="text-gray-600 mb-4">Select all CI/CD tools you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('deploymentCICD', { cicdTools: [...cicdTools] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('deploymentCICD', { cicdTools: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {cicdTools.map((tool) => (
            <label key={tool} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.cicdTools || []).includes(tool)}
                onChange={(e) => handleCheckboxChange('cicdTools', tool, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{tool}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred CI/CD Tool
          </label>
          <select
            value={data.defaultCICD || ''}
            onChange={(e) => handleInputChange('defaultCICD', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred CI/CD tool</option>
            {cicdTools.map((tool) => (
              <option key={tool} value={tool}>{tool}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>


    </div>
  );
} 