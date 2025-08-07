import React from 'react';
import { MultiStageFormData, MapsGeolocation } from '../../types/FormTypes';

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

export default function MapsGeolocationPage({ formData, updateFormData }: Props) {
  const data = formData.mapsGeolocation;

  const handleInputChange = (field: keyof MapsGeolocation, value: string[]) => {
    updateFormData('mapsGeolocation', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof MapsGeolocation, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    if (checked) {
      handleInputChange(field, [...currentValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const mappingProviders = [
    'Apple Maps (iOS)',
    'Bing Maps',
    'Carto',
    'Google Maps Platform',
    'HERE Maps',
    'MapTiler',
    'Mapbox',
    'OpenStreetMap',
    'TomTom'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Maps & Geolocation</h2>
        <p className="text-gray-600">Choose your preferred mapping and location services</p>
      </div>

      {/* Mapping Provider */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Mapping Provider</h3>
        <p className="text-gray-600 mb-4">Select all mapping and geolocation services you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => handleInputChange('mappingProviders', [...mappingProviders])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleInputChange('mappingProviders', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {mappingProviders.map((provider) => (
            <label key={provider} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.mappingProviders || []).includes(provider)}
                onChange={(e) => handleCheckboxChange('mappingProviders', provider, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{provider}</span>
            </label>
          ))}
        </div>
      </div>


    </div>
  );
} 