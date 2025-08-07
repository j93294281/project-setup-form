import React from 'react';
import { MultiStageFormData } from '../../types/FormTypes';

interface SDKs {
  sdks: string[];
}

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

// Helper to remove AI value if user selects a non-AI value
function removeAIDecision(current: string[] = []) {
  return current.filter(v => v !== 'Let the AI decide');
}

export default function SDKsPage({ formData, updateFormData, skipPage, goToPage }: Props) {
  const sdksData = formData.sdks || { sdks: [] };

  const handleInputChange = (field: keyof SDKs, value: string[]) => {
    updateFormData('sdks', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof SDKs, value: string, checked: boolean) => {
    const currentValues = (sdksData[field] as string[]) || [];
    if (checked) {
      handleInputChange(field, [...currentValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const handleSelectAll = () => {
    const allSDKs = [
      'Ably',
      'Adyen',
      'Algolia',
      'Amplitude',
      'Anthropic Claude',
      'Asana',
      'AWS (Amazon Web Services)',
      'Bing Maps',
      'Braintree',
      'Canva',
      'Cloudflare',
      'Cohere',
      'Discord',
      'DigitalOcean',
      'ElevenLabs',
      'Elasticsearch',
      'Firebase',
      'Giphy',
      'Google Analytics',
      'Google Cloud Platform',
      'Google Gemini',
      'Google Maps Platform',
      'Google Workspace (Drive, Sheets, Docs)',
      'HERE Maps',
      'HotJar',
      'HubSpot',
      'Hugging Face',
      'LangChain',
      'Lemon Squeezy',
      'Mailgun',
      'Mapbox',
      'Meilisearch',
      'Meta Llama',
      'Microsoft Azure',
      'Microsoft Graph (OneDrive, Outlook)',
      'Mistral AI',
      'Mixpanel',
      'Monday.com',
      'Notion',
      'OpenAI',
      'OpenStreetMap',
      'Paddle',
      'PayPal',
      'Pexels',
      'Plausible',
      'Pusher',
      'Runway',
      'Salesforce',
      'SendGrid',
      'Slack',
      'Spotify Web',
      'Stripe',
      'Telegram Bot',
      'TomTom',
      'Trello',
      'Twilio',
      'Typesense',
      'Unsplash',
      'WhatsApp Business Platform',
      'YouTube IFrame Player',
      'Zoom'
    ];
    handleInputChange('sdks', allSDKs);
  };

  const handleDeselectAll = () => {
    handleInputChange('sdks', []);
  };

  // AI Decision handler for SDKs
  const handleAISDKsCheckboxChange = (field: keyof SDKs, value: string, checked: boolean) => {
    if (checked) {
      updateFormData('sdks', { [field]: ['Let the AI decide'] });
    } else {
      updateFormData('sdks', { [field]: removeAIDecision(Array.isArray(sdksData[field]) ? sdksData[field] : []) });
    }
  };

  const allSDKs = [
    'Ably',
    'Adyen',
    'Algolia',
    'Amplitude',
    'Anthropic Claude',
    'Asana',
    'AWS (Amazon Web Services)',
    'Bing Maps',
    'Braintree',
    'Canva',
    'Cloudflare',
    'Cohere',
    'Discord',
    'DigitalOcean',
    'ElevenLabs',
    'Elasticsearch',
    'Firebase',
    'Giphy',
    'Google Analytics',
    'Google Cloud Platform',
    'Google Gemini',
    'Google Maps Platform',
    'Google Workspace (Drive, Sheets, Docs)',
    'HERE Maps',
    'HotJar',
    'HubSpot',
    'Hugging Face',
    'LangChain',
    'Lemon Squeezy',
    'Mailgun',
    'Mapbox',
    'Meilisearch',
    'Meta Llama',
    'Microsoft Azure',
    'Microsoft Graph (OneDrive, Outlook)',
    'Mistral AI',
    'Mixpanel',
    'Monday.com',
    'Notion',
    'OpenAI',
    'OpenStreetMap',
    'Paddle',
    'PayPal',
    'Pexels',
    'Plausible',
    'Pusher',
    'Runway',
    'Salesforce',
    'SendGrid',
    'Slack',
    'Spotify Web',
    'Stripe',
    'Telegram Bot',
    'TomTom',
    'Trello',
    'Twilio',
    'Typesense',
    'Unsplash',
    'WhatsApp Business Platform',
    'YouTube IFrame Player',
    'Zoom'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">SDKs</h2>
        <p className="text-gray-600">Choose your preferred SDKs and libraries</p>
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

      {/* SDKs Selection */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">SDKs & Libraries</h3>
        <p className="text-gray-600 mb-4">Select all SDKs and libraries you want to integrate:</p>
        
        {/* AI Decision Checkbox with separation */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(sdksData.sdks || []).includes('Let the AI decide')}
              onChange={(e) => {
                if (e.target.checked) {
                  handleAISDKsCheckboxChange('sdks', 'Let the AI decide', true);
                } else {
                                     updateFormData('sdks', { sdks: removeAIDecision(Array.isArray(sdksData.sdks) ? sdksData.sdks as string[] : []) });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Select All / Deselect All buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={handleDeselectAll}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {/* All SDKs alphabetically */}
          {allSDKs.map((sdk) => (
            <label key={sdk} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(sdksData.sdks || []).includes(sdk)}
                onChange={(e) => handleCheckboxChange('sdks', sdk, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{sdk}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 