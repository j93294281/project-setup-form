import React from 'react';
import { MultiStageFormData, BackendAPI } from '../../types/FormTypes';

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

export default function BackendAPIPage({ formData, updateFormData }: Props) {
  const data = formData.backendAPI;

  const handleInputChange = (field: keyof BackendAPI, value: string | string[]) => {
    updateFormData('backendAPI', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof BackendAPI, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleInputChange(field, [...filteredValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const backendFrameworks = [
    'ASP.NET Core',
    'Django',
    'Echo',
    'Express.js',
    'FastAPI',
    'Fastify',
    'Fiber',
    'Flask',
    'Gin',
    'Laravel',
    'NestJS',
    'Phoenix',
    'Ruby on Rails',
    'Spring Boot'
  ];

  const apiStyles = [
    'GraphQL',
    'gRPC',
    'REST',
    'Server-Sent Events',
    'Webhook',
    'WebSocket'
  ];

  const apiClients = [
    'Apollo Client',
    'Axios',
    'Fetch API',
    'React Query',
    'RTK Query',
    'SWR'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Backend & API</h2>
        <p className="text-gray-600">Choose your preferred server-side frameworks and API design</p>
      </div>

      {/* Backend Frameworks */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Backend Frameworks</h3>
        <p className="text-gray-600 mb-4">Select all backend frameworks you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('backendAPI', { backendFrameworks: [...backendFrameworks] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('backendAPI', { backendFrameworks: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {backendFrameworks.map((framework) => (
            <label key={framework} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.backendFrameworks || []).includes(framework)}
                onChange={(e) => handleCheckboxChange('backendFrameworks', framework, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{framework}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Backend Framework
          </label>
          <select
            value={data.defaultBackendFramework || ''}
            onChange={(e) => handleInputChange('defaultBackendFramework', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred backend framework</option>
            {backendFrameworks.map((framework) => (
              <option key={framework} value={framework}>{framework}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>

      {/* API Styles */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">API Design Patterns</h3>
        <p className="text-gray-600 mb-4">Select all API styles you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('backendAPI', { apiStyles: [...apiStyles] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('backendAPI', { apiStyles: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {apiStyles.map((style) => (
            <label key={style} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.apiStyles || []).includes(style)}
                onChange={(e) => handleCheckboxChange('apiStyles', style, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{style}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred API Style
          </label>
          <select
            value={data.defaultAPIStyle || ''}
            onChange={(e) => handleInputChange('defaultAPIStyle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred API style</option>
            {apiStyles.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>

      {/* API Clients */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">API Client Libraries</h3>
        <p className="text-gray-600 mb-4">Select all API client libraries you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('backendAPI', { apiClients: [...apiClients] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('backendAPI', { apiClients: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {apiClients.map((client) => (
            <label key={client} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.apiClients || []).includes(client)}
                onChange={(e) => handleCheckboxChange('apiClients', client, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{client}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default API Client
          </label>
          <select
            value={data.defaultAPIClient || ''}
            onChange={(e) => handleInputChange('defaultAPIClient', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Select default API client</option>
            {apiClients.map((client) => (
              <option key={client} value={client}>{client}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>


    </div>
  );
} 