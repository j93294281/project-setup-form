import React from 'react';
import { MultiStageFormData, DevelopmentEnvironment } from '../../types/FormTypes';

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

export default function DevelopmentEnvironmentPage({ formData, updateFormData }: Props) {
  const data = formData.developmentEnvironment;

  const handleInputChange = (field: keyof DevelopmentEnvironment, value: string | string[]) => {
    updateFormData('developmentEnvironment', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof DevelopmentEnvironment, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleInputChange(field, [...filteredValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const cloudDevelopmentEnvironments = [
    'GitHub Codespaces',
    'Gitpod',
    'StackBlitz',
    'CodeSandbox'
  ];

  const containerizationTools = [
    'Docker',
    'Vagrant',
    'Podman',
    'LXC'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Development Environment</h2>
        <p className="text-gray-600">Choose your preferred IDE and development tools</p>
      </div>

      {/* Cloud Development Environments */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Cloud Development Environments</h3>
        <p className="text-gray-600 mb-4">Select all cloud development environments you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('developmentEnvironment', { cloudDevelopmentEnvironments: [...cloudDevelopmentEnvironments] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('developmentEnvironment', { cloudDevelopmentEnvironments: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {cloudDevelopmentEnvironments.map((cde) => (
            <label key={cde} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.cloudDevelopmentEnvironments || []).includes(cde)}
                onChange={(e) => handleCheckboxChange('cloudDevelopmentEnvironments', cde, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{cde}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Cloud Development Environment
          </label>
          <select
            value={data.defaultCDE || ''}
            onChange={(e) => handleInputChange('defaultCDE', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Select default CDE</option>
            {cloudDevelopmentEnvironments.map((cde) => (
              <option key={cde} value={cde}>{cde}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>

      {/* Containerization Tools */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Containerization & Virtualization</h3>
        <p className="text-gray-600 mb-4">Select all containerization tools you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('developmentEnvironment', { containerizationTools: [...containerizationTools] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('developmentEnvironment', { containerizationTools: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {containerizationTools.map((tool) => (
            <label key={tool} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.containerizationTools || []).includes(tool)}
                onChange={(e) => handleCheckboxChange('containerizationTools', tool, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{tool}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Containerization Tool
          </label>
          <select
            value={data.defaultContainerization || ''}
            onChange={(e) => handleInputChange('defaultContainerization', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred tool</option>
            {containerizationTools.map((tool) => (
              <option key={tool} value={tool}>{tool}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>


    </div>
  );
} 