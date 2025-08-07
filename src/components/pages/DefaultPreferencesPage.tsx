import React from 'react';
import { MultiStageFormData, DefaultPreferences } from '../../types/FormTypes';

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

export default function DefaultPreferencesPage({ formData, updateFormData }: Props) {
  const data = formData.defaultPreferences;

  const handleInputChange = (field: keyof DefaultPreferences, value: string | string[]) => {
    updateFormData('defaultPreferences', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof DefaultPreferences, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    if (checked) {
      handleInputChange(field, [...currentValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const siteTypes = [
    'AI and Generative Platforms',
    'API and Service Monitoring Platforms',
    'Booking and Reservation Systems',
    'Cloud Computing Platforms',
    'Code Hosting and Collaboration Platforms',
    'Content Management Systems (CMS)',
    'Dynamic Web Apps',
    'Educational and E-Learning Platforms',
    'E-commerce and Marketplace Applications',
    'Financial Services (FinTech) Applications',
    'Health, Fitness, and Telemedicine Platforms',
    'Media Entertainment and Streaming Platforms',
    'Multi-Page Applications (MPAs)',
    'On-Demand Service Applications',
    'Online Design and Editing Tools',
    'Productivity and Collaboration Tools',
    'Progressive Web Apps (PWAs)',
    'Single Page Applications (SPAs)',
    'Social Networking and Media Applications',
    'Software as a Service (SaaS) Platforms',
    'Static Web Apps',
    'Web3 and Decentralized Applications (dApps)'
  ];

  const deviceTypes = ['Mobile', 'Desktops/Laptops', 'Tablets', 'Smart-TVs', 'ALL OF THE ABOVE'];




  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Default Preferences</h2>
        <p className="text-gray-600">Set your default preferences for new projects</p>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Contact Email
          </label>
          <input
            type="email"
            value={data.contactEmail || ''}
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="contact@the-new-app-you-are-developing.com"
            required
          />
        </div>
      </div>

      {/* Default App Type */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Default App Type</h3>
        <p className="text-gray-600 mb-4">If you make a certain type of app all the time, set it as default:</p>
        
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="defaultSiteType"
              value=""
              checked={!data.defaultSiteType}
              onChange={() => handleInputChange('defaultSiteType', '')}
              className="mr-2"
            />
            <span className="text-sm font-medium">No Default</span>
          </label>
          
          {siteTypes.map(type => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="defaultSiteType"
                value={type}
                checked={data.defaultSiteType === type}
                onChange={(e) => handleInputChange('defaultSiteType', e.target.value)}
                className="mr-2"
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Device Types */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Device Types</h3>
        <p className="text-gray-600 mb-4">Device types your apps should work on:</p>
        
        <div className="space-y-2">
          {deviceTypes.map(device => (
            <label key={device} className="flex items-center">
              <input
                type="checkbox"
                checked={(data.deviceTypes || []).includes(device)}
                onChange={(e) => handleCheckboxChange('deviceTypes', device, e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">{device}</span>
            </label>
          ))}
        </div>
      </div>






    </div>
  );
}