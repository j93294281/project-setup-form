import React from 'react';
import { MultiStageFormData } from '../../types/FormTypes';

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

export default function APIProvidersPage({ formData, updateFormData, nextPage, previousPage, skipPage, goToPage }: Props) {
  const apiProvidersData = formData.apiProviders || {};

  const handleInputChange = (provider: string, value: string) => {
    updateFormData('apiProviders', { [provider]: value });
  };

  // All API providers found throughout the application, alphabetically sorted
  const allAPIProviders = [
    '123RF',
    'ABBYY FineReader',
    'Ably',
    'Adobe Acrobat OCR',
    'Adobe',
    'Adyen',
    'Airtable',
    'Algolia',
    'Amazon Polly',
    'AnimateDiff',
    'Anthropic Claude',
    'Apple Calendar',
    'Apple Maps (iOS)',
    'Asana',
    'AutoGPT',
    'AWS (Amazon Web Services)',
    'AWS CloudWatch',
    'AWS Lambda',
    'AWS Textract',
    'Azure Computer Vision',
    'Azure Speech Service',
    'BabyAGI',
    'Basecamp',
    'Behance',
    'BigCommerce',
    'Bing Maps',
    'Bitbucket',
    'Braintree',
    'Cal.com',
    'Calendly',
    'Canva',
    'Carto',
    'ClickUp',
    'Cloudflare',
    'Cohere',
    'Coqui TTS',
    'Creative Market',
    'Depositphotos',
    'Descript',
    'DigitalOcean',
    'Discord',
    'Dribbble',
    'Dreamstime',
    'ElevenLabs',
    'Elasticsearch',
    'Envato',
    'Figma',
    'Firebase',
    'Fotolia',
    'FreeAgent',
    'FreshBooks',
    'Framer',
    'Gen-2 (Runway)',
    'GitHub',
    'GitHub Actions',
    'GitHub Codespaces',
    'GitLab',
    'GitLab CI/CD',
    'GoDaddy Bookkeeping',
    'Google AI Platform (Vertex AI)',
    'Google Analytics',
    'Google Calendar',
    'Google Cloud Functions',
    'Google Cloud Platform (GCP)',
    'Google Cloud Storage',
    'Google Cloud Text-to-Speech',
    'Google Cloud Vision API',
    'Google Gemini',
    'Google Maps Platform',
    'Google Workspace (Drive, Sheets, Docs)',
    'Google Workspace Add-ons',
    'HERE Maps',
    'Headless CMS',
    'HubSpot',
    'Hugging Face',
    'iCal Integration',
    'iStock',
    'IFTTT',
    'Imagen Video (Google)',
    'Instagram',
    'Jira',
    'LangChain',
    'Lemon Squeezy',
    'LinkedIn',
    'Mailgun',
    'Make-A-Video (Meta)',
    'MapTiler',
    'Mapbox',
    'Medium',
    'Meilisearch',
    'Meta Llama',
    'Microsoft Azure',
    'Microsoft Azure Blob Storage',
    'Microsoft Graph (OneDrive, Outlook)',
    'Microsoft Outlook Calendar',
    'Microsoft Teams',
    'Mistral AI',
    'Monday.com',
    'MongoDB',
    'Murf AI',
    'MySQL',
    'NewsAPI',
    'Notion',
    'OCR.space',
    'OpenAI GPT-4',
    'OpenStreetMap',
    'OpenWeatherMap',
    'Outlook Web Add-ins',
    'Paddle',
    'PaddleOCR',
    'PayPal',
    'Pexels',
    'Pika Labs',
    'Pinterest',
    'Play.ht',
    'PostgreSQL',
    'Pusher',
    'QuickBooks',
    'Reddit',
    'Redis',
    'Resemble AI',
    'Runway ML',
    'Sage',
    'Salesforce',
    'SendGrid',
    'Shopify',
    'Shutterstock',
    'Sketch',
    'Slack',
    'Snapchat',
    'Spotify Web',
    'Squarespace',
    'Squarespace Commerce',
    'Stable Video Diffusion',
    'Strapi',
    'Stripe',
    'Synthesia',
    'Telegram Bot',
    'Tesseract OCR',
    'Text2Video-Zero',
    'TikTok',
    'TomTom',
    'Trello',
    'Tumblr',
    'Twilio',
    'Typesense',
    'Twitter',
    'Unsplash',
    'Wave',
    'WhatsApp Business Platform',
    'Wix',
    'Wix eCommerce',
    'WooCommerce',
    'WordPress',
    'Xero',
    'YouTube',
    'YouTube IFrame Player',
    'Yelp Fusion',
    'Zapier',
    'Zoho Books',
    'Zoom'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Keys</h2>
        <p className="text-gray-600">Configure API test keys</p>
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

      {/* API Providers List */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">API Keys & Configuration</h3>
        <p className="text-gray-600 mb-6">
          Enter <span className="text-gray-700 font-semibold">API</span> <span className="text-gray-700 font-semibold">TEST KEYS</span>, tokens, or configuration details for the providers you plan to use.
          <br />
          <br />
          <span className="text-red-600 font-semibold">ONLY USE</span> <span className="text-red-600 font-semibold">TEST KEYS</span>
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          {allAPIProviders.map((provider) => (
            <div key={provider} className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {provider}
              </label>
              <input
                type="text"
                placeholder={`Enter ${provider} API key`}
                value={apiProvidersData[provider] || ''}
                onChange={(e) => handleInputChange(provider, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          ))}
        </div>
      </div>


    </div>
  );
} 