import React from 'react';
import { MultiStageFormData, VersionControl } from '../../types/FormTypes';

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

export default function VersionControlPage({ formData, updateFormData }: Props) {
  const data = formData.versionControl;

  const handleInputChange = (field: keyof VersionControl, value: string | string[]) => {
    updateFormData('versionControl', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof VersionControl, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    if (checked) {
      handleInputChange(field, [...currentValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const codeHostingPlatforms = [
    'Bitbucket',
    'GitHub',
    'GitLab'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Version Control & Code Hosting</h2>
        <p className="text-gray-600">Choose your preferred code repository and collaboration platform</p>
      </div>

      {/* Code Hosting Platforms */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Code Hosting Platforms</h3>
        <p className="text-gray-600 mb-4">Select all code hosting platforms you're comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('versionControl', { codeHostingPlatforms: [...codeHostingPlatforms] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('versionControl', { codeHostingPlatforms: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {codeHostingPlatforms.map((platform) => (
            <label key={platform} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.codeHostingPlatforms || []).includes(platform)}
                onChange={(e) => handleCheckboxChange('codeHostingPlatforms', platform, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{platform}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Code Hosting Platform
          </label>
          <select
            value={data.defaultCodeHosting || ''}
            onChange={(e) => handleInputChange('defaultCodeHosting', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred platform</option>
            {codeHostingPlatforms.map((platform) => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>


    </div>
  );
} 