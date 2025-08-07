import React from 'react';
import { MultiStageFormData, BuildBundling } from '../../types/FormTypes';

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

export default function BuildBundlingPage({ formData, updateFormData }: Props) {
  const data = formData.buildBundling;

  const handleInputChange = (field: keyof BuildBundling, value: string | string[]) => {
    updateFormData('buildBundling', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof BuildBundling, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    if (checked) {
      handleInputChange(field, [...currentValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Build & Compile</h2>
        <p className="text-gray-600">Choose your preferred build tools and compilation tools</p>
      </div>

      {/* Build Tools */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Build & Compilation Tools</h3>
        <p className="text-gray-600 mb-4">Select all build tools you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('buildBundling', { buildTools: [...buildTools] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('buildBundling', { buildTools: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {buildTools.map((tool) => (
            <label key={tool} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.buildTools || []).includes(tool)}
                onChange={(e) => handleCheckboxChange('buildTools', tool, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{tool}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Build Tool
          </label>
          <select
            value={data.defaultBuildTool || ''}
            onChange={(e) => handleInputChange('defaultBuildTool', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred build tool</option>
            {buildTools.map((tool) => (
              <option key={tool} value={tool}>{tool}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>




    </div>
  );
} 