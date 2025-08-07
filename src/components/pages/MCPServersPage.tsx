import React from 'react';
import { MultiStageFormData, AIIntegration } from '../../types/FormTypes';

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

export default function MCPServersPage({ formData, updateFormData, skipPage, goToPage }: Props) {
  const aiData = formData.aiIntegration;

  const handleAIInputChange = (field: keyof AIIntegration, value: string | string[] | boolean) => {
    updateFormData('aiIntegration', { [field]: value });
  };

  const handleAICheckboxChange = (field: keyof AIIntegration, value: string, checked: boolean) => {
    const currentValues = (aiData[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleAIInputChange(field, [...filteredValues, value]);
    } else {
      handleAIInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  // AI Decision handler for MCP Servers
  const handleAIMCPServersCheckboxChange = (field: keyof AIIntegration, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      handleAIInputChange(field, ['Let the AI decide']);
    } else {
      // When unchecked, clear the "Let the AI decide" option
      handleAIInputChange(field, []);
    }
  };

  const handleDeSelectAll = () => {
    updateFormData('aiIntegration', { mcpServers: [] });
  };

  // Define the actual popular servers (26 total)
  const popularServers = [
    // Core Infrastructure (8)
    'Anthropic',
    'AWS',
    'Docker',
    'File System',
    'Git',
    'GitHub',
    'Google Cloud',
    'OpenAI',
    // Development & Cloud (9)
    'Azure',
    'Cloudflare',
    'Firebase',
    'MongoDB',
    'Netlify',
    'PostgreSQL',
    'Redis',
    'Supabase',
    'Vercel',
    // Communication & Collaboration (3)
    'Discord',
    'Slack',
    'Zoom',
    // CRM & Business Tools (2)
    'Salesforce',
    'WordPress',
    // Design & Creative (1)
    'Figma',
    // Payments & Accounting (3)
    'Paddle',
    'Stripe'
  ];

  const handleSelectTop8 = () => {
    // Select the most popular/essential servers (22 total, not just 8)
    updateFormData('aiIntegration', { mcpServers: popularServers });
  };

  const handleSelectAll = () => {
    updateFormData('aiIntegration', { mcpServers: [...allServers] });
  };

  const mcpServersByCategory = {
    'Core Infrastructure': [
      'Anthropic',
      'AWS',
      'Docker',
      'File System',
      'Git',
      'GitHub',
      'Google Cloud',
      'OpenAI'
    ],
    'Automation': [
      'IFTTT',
      'N8N',
      'Zapier'
    ],
    'Communication & Collaboration': [
      'Confluence',
      'Discord',
      'Mailchimp',
      'Microsoft Teams',
      'Notion',
      'SendGrid',
      'Slack',
      'Twilio',
      'Zoom'
    ],
    'CRM & Business Tools': [
      'HubSpot',
      'Salesforce',
      'WordPress'
    ],
    'Design & Creative': [
      'Figma'
    ],
    'Development & Cloud': [
      'Airtable',
      'Azure',
      'Cloudflare',
      'DigitalOcean',
      'Dropbox',
      'Firebase',
      'Google Cloud',
      'Google Drive',
      'Heroku',
      'MongoDB',
      'Netlify',
      'PlanetScale',
      'PostgreSQL',
      'Redis',
      'Supabase',
      'Vercel'
    ],
    'Payments & Accounting': [
      'Paddle',
      'Shopify',
      'Stripe'
    ],
    'Project Management': [
      'Asana',
      'Jira',
      'Linear',
      'Monday.com',
      'Trello'
    ]
  };

  const allServers = Object.values(mcpServersByCategory).flat();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">MCP Servers</h2>
        <p className="text-gray-600">Choose your preferred MCP servers for AI integration</p>
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

      {/* Quick Selection Options */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Quick Selection</h3>
        <div className="space-y-3">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(aiData.mcpServers || []).includes('Let the AI decide')}
                onChange={(e) => handleAIMCPServersCheckboxChange('mcpServers', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
                              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Quick Selection Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSelectTop8}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm font-medium w-full"
            >
              Top 26 (Most Popular)
            </button>
            <button
              onClick={handleSelectAll}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium w-full"
            >
              Select All (48 servers)
            </button>
            <button
              onClick={handleDeSelectAll}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium w-full"
            >
              De-Select All
            </button>
          </div>
          
          {/* Selection Status */}
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              {aiData.mcpServers && aiData.mcpServers.includes('Let the AI decide') ? (
                <span>AI will decide which servers to use</span>
              ) : (
                <span>
                  Currently selected: <span className="font-medium text-blue-600">
                    {(aiData.mcpServers || []).filter(server => server !== 'Let the AI decide').length}
                  </span> servers
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* MCP Servers by Category */}
      {Object.entries(mcpServersByCategory).map(([category, servers]) => (
        <div key={category} className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 text-blue-600">{category}</h3>
          <div className="space-y-3">
            {servers.map((server) => (
              <label key={server} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(aiData.mcpServers || []).includes(server)}
                  onChange={(e) => handleAICheckboxChange('mcpServers', server, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">
                  {server}
                  {popularServers.includes(server) && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Popular
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
} 