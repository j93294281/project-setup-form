import React from 'react';
import { MultiStageFormData, AppConfiguration } from '../../types/FormTypes';
import naicsFlat from '../../data/naics_flat.json';
import Select from 'react-select';

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

export default function AppConfigurationPage({ formData, updateFormData }: Props) {
  const data = formData.appConfiguration;

  const handleInputChange = (field: keyof AppConfiguration, value: any) => {
    updateFormData('appConfiguration', { [field]: value });
  };

  const handleArrayChange = (field: keyof AppConfiguration, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    
    if (field === 'languagesServed') {
      if (value === 'All of These Languages') {
        if (checked) {
          // When "All of These Languages" is checked, select all languages
          const allLanguages = languagesServed.filter(lang => lang !== 'All of These Languages');
          handleInputChange(field, allLanguages);
        } else {
          // When "All of These Languages" is unchecked, clear all selections
          handleInputChange(field, []);
        }
      } else {
        // For individual language selections
        if (checked) {
          handleInputChange(field, [...currentValues, value]);
        } else {
          handleInputChange(field, currentValues.filter(v => v !== value));
        }
      }
    } else if (field === 'targetAudience') {
      if (value === 'Everyone') {
        if (checked) {
          // When "Everyone" is checked, select all target audiences
          const allAudiences = targetAudience.filter(audience => audience !== 'Everyone');
          handleInputChange(field, allAudiences);
        } else {
          // When "Everyone" is unchecked, clear all selections
          handleInputChange(field, []);
        }
      } else {
        // For individual audience selections
        if (checked) {
          handleInputChange(field, [...currentValues, value]);
        } else {
          handleInputChange(field, currentValues.filter(v => v !== value));
        }
      }
    } else if (field === 'targetAgeRanges') {
      if (value === 'All Ages') {
        if (checked) {
          // When "All Ages" is checked, select all age ranges
          const allAgeRanges = targetAgeRanges.filter(age => age !== 'All Ages');
          handleInputChange(field, allAgeRanges);
        } else {
          // When "All Ages" is unchecked, clear all selections
          handleInputChange(field, []);
        }
      } else {
        // For individual age range selections
        if (checked) {
          handleInputChange(field, [...currentValues, value]);
        } else {
          handleInputChange(field, currentValues.filter(v => v !== value));
        }
      }
    } else if (field === 'targetGender') {
      if (value === 'All Genders') {
        if (checked) {
          // When "All Genders" is checked, select all genders
          const allGenders = targetGender.filter(gender => gender !== 'All Genders');
          handleInputChange(field, allGenders);
        } else {
          // When "All Genders" is unchecked, clear all selections
          handleInputChange(field, []);
        }
      } else {
        // For individual gender selections
        if (checked) {
          handleInputChange(field, [...currentValues, value]);
        } else {
          handleInputChange(field, currentValues.filter(v => v !== value));
        }
      }
    } else if (field === 'techSavviness') {
      if (value === 'All Levels') {
        if (checked) {
          // When "All Levels" is checked, select all technical levels
          const allLevels = techSavviness.filter((level: string) => level !== 'All Levels');
          handleInputChange(field, allLevels);
        } else {
          // When "All Levels" is unchecked, clear all selections
          handleInputChange(field, []);
        }
      } else {
        // For individual technical level selections
        if (checked) {
          handleInputChange(field, [...currentValues, value]);
        } else {
          handleInputChange(field, currentValues.filter(v => v !== value));
        }
      }
    } else if (field === 'educationLevel') {
      if (value === 'All Levels') {
        if (checked) {
          // When "All Levels" is checked, select all education levels
          const allLevels = educationLevel.filter(level => level !== 'All Levels');
          handleInputChange(field, allLevels);
        } else {
          // When "All Levels" is unchecked, clear all selections
          handleInputChange(field, []);
        }
      } else {
        // For individual education level selections
        if (checked) {
          handleInputChange(field, [...currentValues, value]);
        } else {
          handleInputChange(field, currentValues.filter(v => v !== value));
        }
      }
    } else if (field === 'deviceTypes') {
      if (value === 'All of these') {
        if (checked) {
          // When "All of these" is checked, select all device types
          handleInputChange(field, ['Mobiles and Tablets', 'Desktops and Laptops']);
        } else {
          // When "All of these" is unchecked, clear all selections
          handleInputChange(field, []);
        }
      } else {
        // For individual device type selections - REPLACE the selection, don't add to it
        if (checked) {
          handleInputChange(field, [value]);
        } else {
          handleInputChange(field, []);
        }
      }
    } else {
      // For other fields, use the original logic
      if (checked) {
        handleInputChange(field, [...currentValues, value]);
      } else {
        handleInputChange(field, currentValues.filter(v => v !== value));
      }
    }
  };

  const targetAudience = [
    'Businesses/Enterprise',
    'Content Creators',
    'Developers',
    'E-commerce',
    'Educators',
    'Financial Services',
    'Gaming',
    'Healthcare Professionals',
    'Non-profit Organizations',
    'Social Media',
    'Students'
  ];

  const targetAgeRanges = [
    'Children (0-12)',
    'Teenagers (13-17)',
    'Young Adults (18-24)',
    'Adults (25-34)',
    'Adults (35-44)',
    'Adults (45-54)',
    'Adults (55-64)',
    'Seniors (65+)'
  ];

  const targetGender = [
    'Male',
    'Female',
    'Non-binary'
  ];

  const languagesServed = [
    'Arabic',
    'Chinese',
    'English',
    'French',
    'German',
    'Hindi',
    'Italian',
    'Japanese',
    'Korean',
    'Portuguese',
    'Russian',
    'Spanish'
  ];

  const techSavviness = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
  ];

  const educationLevel = [
    'High School',
    'Some College',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD/Doctorate',
    'Technical Certification',
    'Self-taught'
  ];

  // Single NAICS dropdown
  const handleNaicsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData('appConfiguration', { sector: e.target.value });
  };

  const occupations = [
    'Software Developer',
    'Designer',
    'Product Manager',
    'Business Analyst',
    'Student',
    'Entrepreneur',
    'Healthcare Professional',
    'Educator',
    'Marketing Professional',
    'Sales Professional',
    'Executive/Manager'
  ];





  const incomeRange = [
    'Under $25,000',
    '$25,000 - $50,000',
    '$50,000 - $75,000',
    '$75,000 - $100,000',
    '$100,000 - $150,000',
    '$150,000 - $200,000',
    'Over $200,000',
    'All Ranges'
  ];

  const companySize = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees',
    'All Sizes'
  ];

  const projectBudget = [
    'Under $1,000',
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    'Over $250,000',
    'Not specified'
  ];

  const licenseType = [
    'Open Source (MIT)',
    'Open Source (GPL)',
    'Open Source (Apache)',
    'Proprietary',
    'Freemium',
    'Subscription',
    'One-time Purchase',
    'Not specified'
  ];

  // IoT Hardware Platforms
  const iotHardwarePlatforms = [
    'Arduino',
    'Custom Microcontrollers',
    'ESP32',
    'NORDIC nRF series',
    'NVIDIA Jetson',
    'Particle Boron/Argon',
    'Raspberry Pi',
    'STM32'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">App Information</h2>
        <p className="text-gray-600">Configure your application settings and target audience</p>
      </div>

      {/* Basic App Information */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Basic App Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              App Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.appName || ''}
              onChange={(e) => handleInputChange('appName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="SuperFunky App"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              App Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={data.appDescription || ''}
              onChange={(e) => handleInputChange('appDescription', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Describe your app"
              rows={8}
              required
            />
            <p className="text-sm text-gray-600 mt-2">
              Example: SuperFunky is an online app that obtains an application developer's 'settings' and 'preferences' and creates a folder/directory of usable context specifically made for LLMs and AI Agents to ingest prior to the coding of the project. This context helps limit false-starts and dependency related failure issues related to normal, yet often-times insufficient planning. SuperFunky reduces token usage during the coding phase of the project by providing the user pre-existing; Project Requirment Documents (PRDs), package files, scripts, build processes, conceptual planning diagrams, suggested developer extensions, library downloads, user-interaction flows, MCP json files, visual artwork and logo creation, business objectives planning for bank lending opportunities, marketing materials, SAFE Agreements for VCs, Delaware Incorporation Documentation, 83(b) filing documents, and financial accounting books setup, ALL designed prior to issues being encountered during the coding process.The app reduces costs to the developer and makes a better finished product than any normal user developed prompt could create. The app saves the user time and money!
            </p>
          </div>
        </div>
      </div>

      {/* Web App Type */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Web App Type</h3>
        
        <div className="space-y-2">
          {[
            'AI and LLMs',
            'API and Service Monitoring',
            'Booking and Reservation Systems',
            'Cloud Computing',
            'Code Hosting and Collaboration',
            'Content Management Systems (CMS)',
            'Dynamic Web Apps',
            'Educational and E-Learning',
            'E-commerce and Marketplace',
            'Financial Services (FinTech)',
            'Health, Fitness, and Telemedicine',
            'Media Entertainment and Streaming',
            'On-Demand Service',
            'Online Design and Editing',
            'Productivity and Collaboration',
            'Progressive Web Apps (PWAs)',
            'Single Page Applications (SPAs)',
            'Social Networking and Media',
            'Software as a Service (SaaS)',
            'Static Web Apps',
            'Web3 and Decentralized Applications (dApps)'
          ].map(type => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="defaultSiteType"
                value={type}
                checked={data.defaultSiteType === type}
                onChange={(e) => {
                  handleInputChange('defaultSiteType', e.target.value);
                  // Clear IoT app type when regular app type is selected
                  handleInputChange('iotAppType', '');
                }}
                className="mr-2"
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* IoT App Type */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">IoT App Type</h3>
        
        <div className="space-y-2">
          {[
            'Connected Vehicles & Automotive IoT',
            'Consumer & Smart Home IoT',
            'Energy & Utilities IoT',
            'Environmental Monitoring',
            'Financial & Insurance IoT (FinTech/InsurTech)',
            'Healthcare IoT (IoMT - Internet of Medical Things)',
            'Hospitality IoT',
            'Industrial IoT (IIoT) & Smart Manufacturing',
            'Logistics & Supply Chain IoT',
            'Military IoT (IoBT - Internet of Battlefield Things)',
            'Retail IoT',
            'Smart Agriculture (AgriTech)',
            'Smart Buildings & Commercial Real Estate',
            'Smart Cities'
          ].map(type => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="iotAppType"
                value={type}
                checked={data.iotAppType === type}
                onChange={(e) => {
                  handleInputChange('iotAppType', e.target.value);
                  // Clear regular app type when IoT app type is selected
                  handleInputChange('defaultSiteType', '');
                }}
                className="mr-2"
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* App or URL that inspired you */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">App or URL that inspired you</h3>
        <p className="text-gray-600 mb-4">Select an app or service that inspired your project:</p>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inspiration Source
          </label>
          <select
            value={data.inspirationUrl || ''}
            onChange={(e) => handleInputChange('inspirationUrl', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Select an inspiration</option>
            <option value="Adidas">Adidas</option>
            <option value="Slack">Slack</option>
            <option value="YouTube">YouTube</option>
          </select>
        </div>
      </div>

      {/* Patent Information */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Patent Information</h3>
        <p className="text-gray-600 mb-4">If your project was inspired by a specific patent, please provide the patent number:</p>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patent that inspired you
          </label>
          <input
            type="text"
            value={data.patentNumber || ''}
            onChange={(e) => handleInputChange('patentNumber', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="US8354030B1"
          />
        </div>
      </div>

      {/* Device Types */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Device Types</h3>
        <p className="text-gray-600 mb-4">Device types your apps should work on:</p>
        
        <div className="space-y-2">
          {/* All of these option */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="deviceTypes"
              checked={(data.deviceTypes || []).length === 2}
              onChange={() => handleInputChange('deviceTypes', ['Mobiles and Tablets', 'Desktops and Laptops'])}
              className="border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-blue-600 font-medium">All Devices (Mobiles, Tablets, Desktops, Laptops)</span>
          </label>
          
          {['Mobiles and Tablets Only', 'Desktops and Laptops Only'].map(device => (
            <label key={device} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="deviceTypes"
                checked={(data.deviceTypes || []).includes(device.replace(' Only', '')) && (data.deviceTypes || []).length === 1}
                onChange={() => handleInputChange('deviceTypes', [device.replace(' Only', '')])}
                className="border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{device}</span>
            </label>
          ))}
        </div>
      </div>

      {/* IoT Hardware Platforms */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">IoT Hardware Platforms (For IoT Projects ONLY. Skip this if only making a Web App)</h3>
        <p className="text-gray-600 mb-4">Select all IoT hardware platforms you plan to use:</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
            {/* AI Decision Checkbox with separation */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(data.aiDecision || []).includes('iotHardwarePlatforms')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateFormData('appConfiguration', { 
                        aiDecision: [...(data.aiDecision || []), 'iotHardwarePlatforms'],
                        iotHardwarePlatforms: []
                      });
                    } else {
                      updateFormData('appConfiguration', { 
                        aiDecision: (data.aiDecision || []).filter(v => v !== 'iotHardwarePlatforms'),
                        iotHardwarePlatforms: []
                      });
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
                onClick={() => {
                  updateFormData('appConfiguration', { 
                    iotHardwarePlatforms: [...iotHardwarePlatforms],
                    aiDecision: (data.aiDecision || []).filter(v => v !== 'iotHardwarePlatforms')
                  });
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Select All
              </button>
              <button
                onClick={() => updateFormData('appConfiguration', { 
                  iotHardwarePlatforms: [],
                  aiDecision: (data.aiDecision || []).filter(v => v !== 'iotHardwarePlatforms')
                })}
                className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                Deselect All
              </button>
            </div>
            
            {iotHardwarePlatforms.map((platform) => (
            <label key={platform} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.iotHardwarePlatforms || []).includes(platform)}
                onChange={(e) => {
                  if (e.target.checked) {
                    // Remove 'Let the AI decide' if user selects a non-AI option
                    updateFormData('appConfiguration', { 
                      iotHardwarePlatforms: [...(data.iotHardwarePlatforms || []), platform],
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'iotHardwarePlatforms')
                    });
                  } else {
                    updateFormData('appConfiguration', { 
                      iotHardwarePlatforms: (data.iotHardwarePlatforms || []).filter(v => v !== platform)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{platform}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred IoT Hardware Platform
          </label>
          <select
            value={data.defaultIOTHardwarePlatform || ''}
            onChange={(e) => handleInputChange('defaultIOTHardwarePlatform', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred IoT hardware platform</option>
            {iotHardwarePlatforms.map((platform) => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Audience */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Target Audience</h3>
        <p className="text-gray-600 mb-4">Select all target audiences for your app:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.aiDecision || []).includes('targetAudience')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('appConfiguration', { 
                      aiDecision: [...(data.aiDecision || []), 'targetAudience'],
                      targetAudience: []
                    });
                  } else {
                    updateFormData('appConfiguration', { 
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'targetAudience'),
                      targetAudience: []
                    });
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
              onClick={() => {
                updateFormData('appConfiguration', { 
                  targetAudience: [...targetAudience],
                  aiDecision: (data.aiDecision || []).filter(v => v !== 'targetAudience')
                });
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('appConfiguration', { 
                targetAudience: [],
                aiDecision: (data.aiDecision || []).filter(v => v !== 'targetAudience')
              })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {targetAudience.map((audience) => (
            <label key={audience} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.targetAudience || []).includes(audience)}
                onChange={(e) => {
                  if (e.target.checked) {
                    // Remove 'Let the AI decide' if user selects a non-AI option
                    updateFormData('appConfiguration', { 
                      targetAudience: [...(data.targetAudience || []), audience],
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'targetAudience')
                    });
                  } else {
                    updateFormData('appConfiguration', { 
                      targetAudience: (data.targetAudience || []).filter(v => v !== audience)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{audience}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Demographics */}
      {/* Target Age Ranges */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Target Age Ranges</h3>
        <div className="grid grid-cols-1 gap-3">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.aiDecision || []).includes('targetAgeRanges')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('appConfiguration', { 
                      aiDecision: [...(data.aiDecision || []), 'targetAgeRanges'],
                      targetAgeRanges: []
                    });
                  } else {
                    updateFormData('appConfiguration', { 
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'targetAgeRanges'),
                      targetAgeRanges: []
                    });
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
              onClick={() => {
                updateFormData('appConfiguration', { 
                  targetAgeRanges: [...targetAgeRanges],
                  aiDecision: (data.aiDecision || []).filter(v => v !== 'targetAgeRanges')
                });
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('appConfiguration', { 
                targetAgeRanges: [],
                aiDecision: (data.aiDecision || []).filter(v => v !== 'targetAgeRanges')
              })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {targetAgeRanges.map((range) => (
            <label key={range} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.targetAgeRanges || []).includes(range)}
                onChange={(e) => {
                  if (e.target.checked) {
                    // Remove 'Let the AI decide' if user selects a non-AI option
                    updateFormData('appConfiguration', { 
                      targetAgeRanges: [...(data.targetAgeRanges || []), range],
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'targetAgeRanges')
                    });
                  } else {
                    updateFormData('appConfiguration', { 
                      targetAgeRanges: (data.targetAgeRanges || []).filter(v => v !== range)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{range}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Target Genders */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Target Genders</h3>
        <div className="grid grid-cols-1 gap-3">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.aiDecision || []).includes('targetGender')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('appConfiguration', { 
                      aiDecision: [...(data.aiDecision || []), 'targetGender'],
                      targetGender: []
                    });
                  } else {
                    updateFormData('appConfiguration', { 
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'targetGender'),
                      targetGender: []
                    });
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
              onClick={() => {
                updateFormData('appConfiguration', { 
                  targetGender: [...targetGender],
                  aiDecision: (data.aiDecision || []).filter(v => v !== 'targetGender')
                });
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('appConfiguration', { 
                targetGender: [],
                aiDecision: (data.aiDecision || []).filter(v => v !== 'targetGender')
              })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {targetGender.map((gender) => (
            <label key={gender} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.targetGender || []).includes(gender)}
                onChange={(e) => {
                  if (e.target.checked) {
                    // Remove 'Let the AI decide' if user selects a non-AI option
                    updateFormData('appConfiguration', { 
                      targetGender: [...(data.targetGender || []), gender],
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'targetGender')
                    });
                  } else {
                    updateFormData('appConfiguration', { 
                      targetGender: (data.targetGender || []).filter(v => v !== gender)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages Served */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Languages Served</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Languages Served</h4>
            <div className="grid grid-cols-1 gap-3">
              {/* AI Decision Checkbox with separation */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(data.aiDecision || []).includes('languagesServed')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData('appConfiguration', { 
                          aiDecision: [...(data.aiDecision || []), 'languagesServed'],
                          languagesServed: []
                        });
                      } else {
                        updateFormData('appConfiguration', { 
                          aiDecision: (data.aiDecision || []).filter(v => v !== 'languagesServed'),
                          languagesServed: []
                        });
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
                  onClick={() => {
                    updateFormData('appConfiguration', { 
                      languagesServed: [...languagesServed],
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'languagesServed')
                    });
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  Select All
                </button>
                <button
                  onClick={() => updateFormData('appConfiguration', { 
                    languagesServed: [],
                    aiDecision: (data.aiDecision || []).filter(v => v !== 'languagesServed')
                  })}
                  className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
                >
                  Deselect All
                </button>
              </div>
              
              {languagesServed.map((language) => (
                <label key={language} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(data.languagesServed || []).includes(language)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        // Remove 'Let the AI decide' if user selects a non-AI option
                        updateFormData('appConfiguration', { 
                          languagesServed: [...(data.languagesServed || []), language],
                          aiDecision: (data.aiDecision || []).filter(v => v !== 'languagesServed')
                        });
                      } else {
                        updateFormData('appConfiguration', { 
                          languagesServed: (data.languagesServed || []).filter(v => v !== language)
                        });
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 text-sm">{language}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Coverage */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Geographic Coverage</h3>
        <p className="text-gray-600 mb-4">Select the geographic areas your app should target:</p>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.locationsServed?.worldwide || false}
                onChange={(e) => handleInputChange('locationsServed', { 
                  ...data.locationsServed, 
                  worldwide: e.target.checked 
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-blue-600 font-medium">Worldwide</span>
            </label>
            
            {!data.locationsServed?.worldwide && (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={data.locationsServed?.city || ''}
                    onChange={(e) => handleInputChange('locationsServed', { 
                      ...data.locationsServed, 
                      city: e.target.value 
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                  <input
                    type="text"
                    value={data.locationsServed?.state || ''}
                    onChange={(e) => handleInputChange('locationsServed', { 
                      ...data.locationsServed, 
                      state: e.target.value 
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="State/Province"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={data.locationsServed?.country || ''}
                    onChange={(e) => handleInputChange('locationsServed', { 
                      ...data.locationsServed, 
                      country: e.target.value 
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Country"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Technical Savviness */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Technical Savviness</h3>
        <p className="text-gray-600 mb-4">Select all technical skill levels your app should target:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.aiDecision || []).includes('techSavviness')}
                                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData('appConfiguration', { 
                          aiDecision: [...(data.aiDecision || []), 'techSavviness'],
                          techSavviness: []
                        });
                      } else {
                        updateFormData('appConfiguration', { 
                          aiDecision: (data.aiDecision || []).filter(v => v !== 'techSavviness'),
                          techSavviness: []
                        });
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
                  onClick={() => {
                    updateFormData('appConfiguration', { 
                      techSavviness: [...techSavviness],
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'techSavviness')
                    });
                  }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('appConfiguration', { 
                techSavviness: [],
                aiDecision: (data.aiDecision || []).filter(v => v !== 'techSavviness')
              })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {techSavviness.map((level) => (
            <label key={level} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.techSavviness || []).includes(level)}
                onChange={(e) => {
                  if (e.target.checked) {
                                            // Remove 'Let the AI decide' if user selects a non-AI option
                        updateFormData('appConfiguration', { 
                          techSavviness: [...(data.techSavviness || []), level],
                          aiDecision: (data.aiDecision || []).filter(v => v !== 'techSavviness')
                        });
                  } else {
                    updateFormData('appConfiguration', { 
                      techSavviness: (data.techSavviness || []).filter(v => v !== level)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Education Level */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Education Level</h3>
        <p className="text-gray-600 mb-4">Select all education levels your app should target:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.aiDecision || []).includes('educationLevel')}
                                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData('appConfiguration', { 
                          aiDecision: [...(data.aiDecision || []), 'educationLevel'],
                          educationLevel: []
                        });
                      } else {
                        updateFormData('appConfiguration', { 
                          aiDecision: (data.aiDecision || []).filter(v => v !== 'educationLevel'),
                          educationLevel: []
                        });
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
                  onClick={() => {
                    updateFormData('appConfiguration', { 
                      educationLevel: [...educationLevel],
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'educationLevel')
                    });
                  }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('appConfiguration', { 
                educationLevel: [],
                aiDecision: (data.aiDecision || []).filter(v => v !== 'educationLevel')
              })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {educationLevel.map((level) => (
            <label key={level} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.educationLevel || []).includes(level)}
                onChange={(e) => {
                  if (e.target.checked) {
                                            // Remove 'Let the AI decide' if user selects a non-AI option
                        updateFormData('appConfiguration', { 
                          educationLevel: [...(data.educationLevel || []), level],
                          aiDecision: (data.aiDecision || []).filter(v => v !== 'educationLevel')
                        });
                  } else {
                    updateFormData('appConfiguration', { 
                      educationLevel: (data.educationLevel || []).filter(v => v !== level)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Industry Selection */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Industry Selection</h3>
        <p className="text-gray-600 mb-4">Select the industry focus for your app:</p>
        
        <div className="space-y-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.aiDecision || []).includes('industrySelection')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('appConfiguration', { 
                      aiDecision: [...(data.aiDecision || []), 'industrySelection'],
                      sector: ''
                    });
                  } else {
                    updateFormData('appConfiguration', { 
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'industrySelection'),
                      sector: ''
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>

          {!(data.aiDecision || []).includes('industrySelection') && (
            <div>
              <label className="flex items-center space-x-3 cursor-pointer mb-3">
                <input
                  type="radio"
                  name="industrySelection"
                  value="all"
                  checked={!data.sector || data.sector === ''}
                  onChange={() => updateFormData('appConfiguration', { sector: '' })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-blue-600 font-medium">All Industries</span>
              </label>
              
              <div className="flex items-center space-x-3 mb-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="industrySelection"
                    value="specific"
                    checked={Boolean(data.sector && data.sector !== '')}
                    onChange={() => updateFormData('appConfiguration', { sector: 'selected' })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 text-sm">Choose the industry from the dropdown</span>
                </label>
              </div>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NAICS Industry (6-digit, full path)
              </label>
              <Select
                options={naicsFlat.map((item: any) => ({ value: item.code, label: `${item.label} (${item.code})` }))}
                value={(() => {
                  const found = naicsFlat.find((item: any) => item.code === data.sector);
                  return found ? { value: data.sector, label: `${found.label} (${data.sector})` } : null;
                })()}
                onChange={(option: any) => updateFormData('appConfiguration', { sector: option ? option.value : '' })}
                onFocus={() => {
                  // Unselect "All Industries" when user focuses on the NAICS input
                  if (!data.sector || data.sector === '') {
                    updateFormData('appConfiguration', { sector: 'selected' });
                  }
                }}
                isClearable
                classNamePrefix="react-select"
                styles={{
                  menu: (provided: any) => ({ ...provided, width: '100%', whiteSpace: 'nowrap', overflowX: 'auto' }),
                  option: (provided: any) => ({ ...provided, fontSize: '0.75rem', whiteSpace: 'nowrap' }),
                  control: (provided: any) => ({ ...provided, fontSize: '0.75rem', width: '100%' }),
                }}
                filterOption={(option, input) => {
                  const label = option.label.toLowerCase();
                  const value = option.value.toLowerCase();
                  const inputValue = input.toLowerCase();
                  return label.includes(inputValue) || value.includes(inputValue);
                }}
                placeholder="Type your 6 digit code or select from the dropdown choices"
              />
            </div>
          )}
        </div>
      </div>

      {/* Company Size */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Company Size</h3>
        <p className="text-gray-600 mb-4">Select the target company size for your app:</p>
        
        <div className="space-y-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.aiDecision || []).includes('companySize')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('appConfiguration', { 
                      aiDecision: [...(data.aiDecision || []), 'companySize'],
                      companySize: []
                    });
                  } else {
                    updateFormData('appConfiguration', { 
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'companySize'),
                      companySize: []
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>

          {!(data.aiDecision || []).includes('companySize') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size
              </label>
              <select
                value={data.companySize || ''}
                onChange={(e) => handleInputChange('companySize', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Select company size</option>
                {companySize.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Target Occupations */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Target Occupations</h3>
        <p className="text-gray-600 mb-4">Select all occupations your app should target:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.aiDecision || []).includes('occupations')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('appConfiguration', { 
                      aiDecision: [...(data.aiDecision || []), 'occupations'],
                      occupations: []
                    });
                  } else {
                    updateFormData('appConfiguration', { 
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'occupations'),
                      occupations: []
                    });
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
              onClick={() => {
                updateFormData('appConfiguration', { 
                  occupations: [...occupations],
                  aiDecision: (data.aiDecision || []).filter(v => v !== 'occupations')
                });
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('appConfiguration', { 
                occupations: [],
                aiDecision: (data.aiDecision || []).filter(v => v !== 'occupations')
              })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {[...occupations].sort().map((occupation) => (
            <label key={occupation} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.occupations || []).includes(occupation)}
                onChange={(e) => {
                  if (e.target.checked) {
                    // Remove 'Let the AI decide' if user selects a non-AI option
                    updateFormData('appConfiguration', { 
                      occupations: [...(data.occupations || []), occupation],
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'occupations')
                    });
                  } else {
                    updateFormData('appConfiguration', { 
                      occupations: (data.occupations || []).filter(v => v !== occupation)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{occupation}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Project Budget */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Project Budget (Per Month)</h3>
        <p className="text-gray-600 mb-4">Select the monthly budget for your project:</p>
        
        <div className="space-y-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.aiDecision || []).includes('projectBudget')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('appConfiguration', { 
                      aiDecision: [...(data.aiDecision || []), 'projectBudget'],
                      projectBudget: ''
                    });
                  } else {
                    updateFormData('appConfiguration', { 
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'projectBudget'),
                      projectBudget: ''
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>

          {!(data.aiDecision || []).includes('projectBudget') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Budget (Per Month)
              </label>
              <select
                value={data.projectBudget || ''}
                onChange={(e) => handleInputChange('projectBudget', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Select budget range</option>
                <option value="Under $1,000">Under $1,000</option>
                <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                <option value="Over $250,000">Over $250,000</option>
                <option value="Not specified">Not specified</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* License Type */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">License Type</h3>
        <p className="text-gray-600 mb-4">Select the license type for your app:</p>
        
        <div className="space-y-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.aiDecision || []).includes('licenseType')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('appConfiguration', { 
                      aiDecision: [...(data.aiDecision || []), 'licenseType'],
                      licenseType: ''
                    });
                  } else {
                    updateFormData('appConfiguration', { 
                      aiDecision: (data.aiDecision || []).filter(v => v !== 'licenseType'),
                      licenseType: ''
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>

          {!(data.aiDecision || []).includes('licenseType') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Type
              </label>
              <select
                value={data.licenseType || ''}
                onChange={(e) => handleInputChange('licenseType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Select license type</option>
                {licenseType.map((license) => (
                  <option key={license} value={license}>{license}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

    </div>
  );
} 