import React from 'react';
import { MultiStageFormData, CommunicationAPIs, MapsGeolocation } from '../../types/FormTypes';

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

export default function CommunicationAPIsPage({ formData, updateFormData, skipPage, goToPage }: Props) {
  const data = formData.communicationAPIs;
  const mapsData = formData.mapsGeolocation;

  const handleInputChange = (field: keyof CommunicationAPIs, value: string[]) => {
    updateFormData('communicationAPIs', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof CommunicationAPIs, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleInputChange(field, [...filteredValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const handleMapsCheckboxChange = (field: keyof MapsGeolocation, value: string, checked: boolean) => {
    const currentValues = (mapsData[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      updateFormData('mapsGeolocation', { [field]: [...filteredValues, value] });
    } else {
      updateFormData('mapsGeolocation', { [field]: currentValues.filter(v => v !== value) });
    }
  };

  // AI Decision handlers for Communication APIs
  const handleAICommunicationCheckboxChange = (field: keyof CommunicationAPIs, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      updateFormData('communicationAPIs', { [field]: ['Let the AI decide'] });
    } else {
      // When unchecked, clear the "Let the AI decide" option
      updateFormData('communicationAPIs', { [field]: [] });
    }
  };

  const handleAIMapsCheckboxChange = (field: keyof MapsGeolocation, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      updateFormData('mapsGeolocation', { [field]: ['Let the AI decide'] });
    } else {
      // When unchecked, clear the "Let the AI decide" option
      updateFormData('mapsGeolocation', { [field]: [] });
    }
  };

  function removeAIDecision(current: string[] = []) {
  return current.filter(v => v !== 'Let the AI decide');
}

  const communicationAPIs = [
    'Ably',
    'Discord',
    'Mailgun',
    'Microsoft Teams',
    'Pusher',
    'SendGrid',
    'Slack',
    'Telegram Bot',
    'Twilio',
    'WhatsApp Business Platform',
    'Zoom'
  ];

  const contentAPIs = [
    'NewsAPI',
    'OpenWeatherMap',
    'Spotify Web',
    'Yelp Fusion',
    'YouTube IFrame Player'
  ];

  const productivityAPIs = [
    'Airtable',
    'Asana',
    'Google Workspace (Drive, Sheets, Docs)',
    'HubSpot',
    'Microsoft Graph (OneDrive, Outlook)',
    'Monday.com',
    'Notion',
    'Salesforce',
    'Slack',
    'Trello'
  ];

  const calendarOptions = [
    'Apple Calendar',
    'Cal.com',
    'Calendly',
    'Google Calendar',
    'iCal Integration',
    'Microsoft Outlook Calendar'
  ];



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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Other APIs</h2>
        <p className="text-gray-600">Choose your preferred communication and integration services</p>
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

      {/* Communication APIs */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Communication & Messaging</h3>
        <p className="text-gray-600 mb-4">Select all communication APIs you want to integrate:</p>
        
        {/* AI Decision Checkbox with separation */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.communicationAPIs || []).includes('Let the AI decide')}
              onChange={(e) => {
                if (e.target.checked) {
                  handleAICommunicationCheckboxChange('communicationAPIs', 'Let the AI decide', true);
                } else {
                                     updateFormData('communicationAPIs', { communicationAPIs: removeAIDecision(Array.isArray(data.communicationAPIs) ? data.communicationAPIs as string[] : []) });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => updateFormData('communicationAPIs', { communicationAPIs: [...communicationAPIs] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('communicationAPIs', { communicationAPIs: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {communicationAPIs.map((api) => (
            <label key={api} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.communicationAPIs || []).includes(api)}
                onChange={(e) => handleCheckboxChange('communicationAPIs', api, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{api}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Content & Data APIs */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Content & Data</h3>
        <p className="text-gray-600 mb-4">Select all content and data APIs you want to integrate:</p>
        
        {/* AI Decision Checkbox with separation */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.contentAPIs || []).includes('Let the AI decide')}
              onChange={(e) => {
                if (e.target.checked) {
                  handleAICommunicationCheckboxChange('contentAPIs', 'Let the AI decide', true);
                } else {
                                     updateFormData('communicationAPIs', { contentAPIs: removeAIDecision(Array.isArray(data.contentAPIs) ? data.contentAPIs as string[] : []) });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => updateFormData('communicationAPIs', { contentAPIs: [...contentAPIs] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('communicationAPIs', { contentAPIs: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {contentAPIs.map((api) => (
            <label key={api} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.contentAPIs || []).includes(api)}
                onChange={(e) => handleCheckboxChange('contentAPIs', api, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{api}</span>
            </label>
          ))}
        </div>
      </div>



      {/* Productivity APIs */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Productivity & Business</h3>
        <p className="text-gray-600 mb-4">Select all productivity APIs you want to integrate:</p>
        
        {/* AI Decision Checkbox with separation */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.productivityAPIs || []).includes('Let the AI decide')}
              onChange={(e) => {
                if (e.target.checked) {
                  handleAICommunicationCheckboxChange('productivityAPIs', 'Let the AI decide', true);
                } else {
                                     updateFormData('communicationAPIs', { productivityAPIs: removeAIDecision(Array.isArray(data.productivityAPIs) ? data.productivityAPIs as string[] : []) });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => updateFormData('communicationAPIs', { productivityAPIs: [...productivityAPIs] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('communicationAPIs', { productivityAPIs: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {productivityAPIs.map((api) => (
            <label key={api} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.productivityAPIs || []).includes(api)}
                onChange={(e) => handleCheckboxChange('productivityAPIs', api, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{api}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Calendar APIs */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Scheduling & Calendar</h3>
        <p className="text-gray-600 mb-4">Select all calendar and scheduling APIs you want to integrate:</p>
        
        {/* AI Decision Checkbox with separation */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.calendarOptions || []).includes('Let the AI decide')}
              onChange={(e) => {
                if (e.target.checked) {
                  handleAICommunicationCheckboxChange('calendarOptions', 'Let the AI decide', true);
                } else {
                                     updateFormData('communicationAPIs', { calendarOptions: removeAIDecision(Array.isArray(data.calendarOptions) ? data.calendarOptions as string[] : []) });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => updateFormData('communicationAPIs', { calendarOptions: [...calendarOptions] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('communicationAPIs', { calendarOptions: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {calendarOptions.map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.calendarOptions || []).includes(option)}
                onChange={(e) => handleCheckboxChange('calendarOptions', option, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Mapping Provider */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Mapping Provider</h3>
        <p className="text-gray-600 mb-4">Select all mapping and geolocation services you&apos;re comfortable with:</p>
        
        {/* AI Decision Checkbox with separation */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(mapsData.mappingProviders || []).includes('Let the AI decide')}
              onChange={(e) => {
                if (e.target.checked) {
                  handleAIMapsCheckboxChange('mappingProviders', 'Let the AI decide', true);
                } else {
                                     updateFormData('mapsGeolocation', { mappingProviders: removeAIDecision(Array.isArray(mapsData.mappingProviders) ? mapsData.mappingProviders as string[] : []) });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => updateFormData('mapsGeolocation', { mappingProviders: [...mappingProviders] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('mapsGeolocation', { mappingProviders: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {mappingProviders.map((provider) => (
            <label key={provider} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(mapsData.mappingProviders || []).includes(provider)}
                onChange={(e) => handleMapsCheckboxChange('mappingProviders', provider, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{provider}</span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
} 