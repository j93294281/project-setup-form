import React from 'react';
import { MultiStageFormData, PackageManagement } from '../../types/FormTypes';

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

export default function PackageManagementPage({ formData, updateFormData }: Props) {
  const data = formData.packageManagement;

  const handleInputChange = (field: keyof PackageManagement, value: string | string[]) => {
    updateFormData('packageManagement', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof PackageManagement, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    if (checked) {
      handleInputChange(field, [...currentValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const packageManagers = [
    'Cargo',
    'Composer',
    'Go Modules',
    'Gradle',
    'Maven',
    'npm',
    'NuGet',
    'pip',
    'pnpm',
    'RubyGems',
    'Yarn'
  ];



  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Package Management</h2>
        <p className="text-gray-600">Choose your preferred dependency and monorepo management tools</p>
      </div>

      {/* Package Managers */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Package Managers</h3>
        <p className="text-gray-600 mb-4">Select all package managers you&apos;re comfortable with:</p>
        
        <div className="space-y-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('packageManagement', { packageManagers: [...packageManagers] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('packageManagement', { packageManagers: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {packageManagers.map((manager) => (
            <label key={manager} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.packageManagers || []).includes(manager)}
                onChange={(e) => handleCheckboxChange('packageManagers', manager, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{manager}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Package Manager
          </label>
          <select
            value={data.defaultPackageManager || ''}
            onChange={(e) => handleInputChange('defaultPackageManager', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred package manager</option>
            {packageManagers.map((manager) => (
              <option key={manager} value={manager}>{manager}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>

    </div>
  );
} 