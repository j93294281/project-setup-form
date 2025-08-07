import React from 'react';
import { MultiStageFormData, IOTStack } from '../../types/FormTypes';

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

export default function IOTStackPage({ formData, updateFormData, skipPage, goToPage }: Props) {
  const iotData = formData.iotStack;

  const handleIOTInputChange = (field: keyof IOTStack, value: string | string[]) => {
    updateFormData('iotStack', { [field]: value });
  };

  const handleIOTCheckboxChange = (field: keyof IOTStack, value: string, checked: boolean) => {
    const currentValues = (iotData[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleIOTInputChange(field, [...filteredValues, value]);
    } else {
      handleIOTInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  // AI Decision handler for IoT sections
  const handleAIIOTCheckboxChange = (field: keyof IOTStack, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      updateFormData('iotStack', { [field]: ['Let the AI decide'] });
    } else {
      // When unchecked, clear the "Let the AI decide" option
      updateFormData('iotStack', { [field]: [] });
    }
  };

  function removeAIDecision(current: string[] = []) {
  return current.filter(v => v !== 'Let the AI decide');
}

  // Cloud IoT Platforms
  const cloudIOTPlatforms = [
    'AWS',
    'Azure',
    'Blynk',
    'Google Cloud',
    'IBM Watson',
    'Oracle',
    'Particle',
    'PTC ThingWorx',
    'Siemens MindSphere',
    'ThingsBoard'
  ];

  // Edge Computing Platforms
  const edgeComputingPlatforms = [
    'AWS IoT Greengrass',
    'Azure IoT Edge',
    'Edge Computing Stack (Generic)',
    'Google Distributed Cloud Edge',
    'Home Assistant / Open Source Smart Home',
    'KubeEdge',
    'NVIDIA Jetson'
  ];

  // IoT Protocols
  const iotProtocols = [
    'AMQP',
    'Bluetooth Low Energy (BLE)',
    'CoAP',
    'HTTP',
    'HTTPS',
    'LoRaWAN',
    'MQTT',
    'OPC-UA',
    'WebSockets',
    'Zigbee'
  ];

  // Embedded Languages
  const embeddedLanguages = [
    'Assembly',
    'C/C++',
    'FreeRTOS',
    'Java',
    'JavaScript/Node.js',
    'Python/MicroPython',
    'Rust',
    'Zephyr RTOS'
  ];



  // IoT Frameworks
  const iotFrameworks = [
    'Embedded C/C++ Stack (with RTOS)',
    'Java-Centric Stack',
    'MQTT + Node.js/JavaScript Stack',
    'Platform-Agnostic (MQTT/CoAP + Open Source)',
    'Python-Centric Stack (Raspberry Pi/MicroPython)',
    'Rust-Based Embedded Stack',
    'Zigbee/BLE Mesh Stack'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">IoT Stack</h2>
        <p className="text-gray-600">Please choose your preferred IoT platforms, protocols, and frameworks.</p>
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



      {/* Cloud IoT Platforms */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Cloud IoT Platforms</h3>
        <p className="text-gray-600 mb-4">Select all cloud IoT platforms you're comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
            {/* AI Decision Checkbox with separation */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(iotData.cloudIOTPlatforms || []).includes('Let the AI decide')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleAIIOTCheckboxChange('cloudIOTPlatforms', 'Let the AI decide', true);
                    } else {
                                             updateFormData('iotStack', { cloudIOTPlatforms: removeAIDecision(Array.isArray(iotData.cloudIOTPlatforms) ? iotData.cloudIOTPlatforms as string[] : []) });
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
                onClick={() => handleIOTInputChange('cloudIOTPlatforms', [...cloudIOTPlatforms])}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Select All
              </button>
              <button
                onClick={() => handleIOTInputChange('cloudIOTPlatforms', [])}
                className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                Deselect All
              </button>
            </div>
            
            {cloudIOTPlatforms.map((platform) => (
            <label key={platform} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(iotData.cloudIOTPlatforms || []).includes(platform)}
                onChange={(e) => handleIOTCheckboxChange('cloudIOTPlatforms', platform, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{platform}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Cloud IoT Platform
          </label>
          <select
            value={iotData.defaultCloudIOTPlatform || ''}
            onChange={(e) => handleIOTInputChange('defaultCloudIOTPlatform', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred cloud IoT platform</option>
            {cloudIOTPlatforms.map((platform) => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Edge Computing Platforms */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Edge Computing Platforms</h3>
        <p className="text-gray-600 mb-4">Select all edge computing platforms you plan to use:</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
            {/* AI Decision Checkbox with separation */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(iotData.edgeComputingPlatforms || []).includes('Let the AI decide')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleAIIOTCheckboxChange('edgeComputingPlatforms', 'Let the AI decide', true);
                    } else {
                                             updateFormData('iotStack', { edgeComputingPlatforms: removeAIDecision(Array.isArray(iotData.edgeComputingPlatforms) ? iotData.edgeComputingPlatforms as string[] : []) });
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
                onClick={() => handleIOTInputChange('edgeComputingPlatforms', [...edgeComputingPlatforms])}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Select All
              </button>
              <button
                onClick={() => handleIOTInputChange('edgeComputingPlatforms', [])}
                className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                Deselect All
              </button>
            </div>
            
            {edgeComputingPlatforms.map((platform) => (
            <label key={platform} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(iotData.edgeComputingPlatforms || []).includes(platform)}
                onChange={(e) => handleIOTCheckboxChange('edgeComputingPlatforms', platform, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{platform}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Edge Computing Platform
          </label>
          <select
            value={iotData.defaultEdgeComputingPlatform || ''}
            onChange={(e) => handleIOTInputChange('defaultEdgeComputingPlatform', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred edge computing platform</option>
            {edgeComputingPlatforms.map((platform) => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>
      </div>

      {/* IoT Protocols */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">IoT Protocols</h3>
        <p className="text-gray-600 mb-4">Select all IoT communication protocols you plan to use:</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
            {/* AI Decision Checkbox with separation */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(iotData.iotProtocols || []).includes('Let the AI decide')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleAIIOTCheckboxChange('iotProtocols', 'Let the AI decide', true);
                    } else {
                                             updateFormData('iotStack', { iotProtocols: removeAIDecision(Array.isArray(iotData.iotProtocols) ? iotData.iotProtocols as string[] : []) });
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
                onClick={() => handleIOTInputChange('iotProtocols', [...iotProtocols])}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Select All
              </button>
              <button
                onClick={() => handleIOTInputChange('iotProtocols', [])}
                className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                Deselect All
              </button>
            </div>
            
            {iotProtocols.map((protocol) => (
            <label key={protocol} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(iotData.iotProtocols || []).includes(protocol)}
                onChange={(e) => handleIOTCheckboxChange('iotProtocols', protocol, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{protocol}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred IoT Protocol
          </label>
          <select
            value={iotData.defaultIOTProtocol || ''}
            onChange={(e) => handleIOTInputChange('defaultIOTProtocol', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred IoT protocol</option>
            {iotProtocols.map((protocol) => (
              <option key={protocol} value={protocol}>{protocol}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Embedded Languages */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Embedded Languages</h3>
        <p className="text-gray-600 mb-4">Select all embedded programming languages you're comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
            {/* AI Decision Checkbox with separation */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(iotData.embeddedLanguages || []).includes('Let the AI decide')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleAIIOTCheckboxChange('embeddedLanguages', 'Let the AI decide', true);
                    } else {
                                             updateFormData('iotStack', { embeddedLanguages: removeAIDecision(Array.isArray(iotData.embeddedLanguages) ? iotData.embeddedLanguages as string[] : []) });
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
                onClick={() => handleIOTInputChange('embeddedLanguages', [...embeddedLanguages])}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Select All
              </button>
              <button
                onClick={() => handleIOTInputChange('embeddedLanguages', [])}
                className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                Deselect All
              </button>
            </div>
            
            {embeddedLanguages.map((language) => (
            <label key={language} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(iotData.embeddedLanguages || []).includes(language)}
                onChange={(e) => handleIOTCheckboxChange('embeddedLanguages', language, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{language}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Embedded Language
          </label>
          <select
            value={iotData.defaultEmbeddedLanguage || ''}
            onChange={(e) => handleIOTInputChange('defaultEmbeddedLanguage', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred embedded language</option>
            {embeddedLanguages.map((language) => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
      </div>



      {/* IoT Frameworks */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">IoT Frameworks</h3>
        <p className="text-gray-600 mb-4">Select all IoT frameworks and stack approaches you're comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
            {/* AI Decision Checkbox with separation */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(iotData.iotFrameworks || []).includes('Let the AI decide')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleAIIOTCheckboxChange('iotFrameworks', 'Let the AI decide', true);
                    } else {
                                             updateFormData('iotStack', { iotFrameworks: removeAIDecision(Array.isArray(iotData.iotFrameworks) ? iotData.iotFrameworks as string[] : []) });
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
                onClick={() => handleIOTInputChange('iotFrameworks', [...iotFrameworks])}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Select All
              </button>
              <button
                onClick={() => handleIOTInputChange('iotFrameworks', [])}
                className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                Deselect All
              </button>
            </div>
            
            {iotFrameworks.map((framework) => (
            <label key={framework} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(iotData.iotFrameworks || []).includes(framework)}
                onChange={(e) => handleIOTCheckboxChange('iotFrameworks', framework, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{framework}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred IoT Framework
          </label>
          <select
            value={iotData.defaultIOTFramework || ''}
            onChange={(e) => handleIOTInputChange('defaultIOTFramework', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred IoT framework</option>
            {iotFrameworks.map((framework) => (
              <option key={framework} value={framework}>{framework}</option>
            ))}
          </select>
        </div>
      </div>

    </div>
  );
} 