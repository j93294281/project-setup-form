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

export default function AIPage({ formData, updateFormData, skipPage, goToPage }: Props) {
  const aiData = formData.aiIntegration;

  const handleAIInputChange = (field: keyof AIIntegration, value: string | string[] | boolean) => {
    updateFormData('aiIntegration', { [field]: value });
  };

  const handleAICheckboxChange = (field: keyof AIIntegration, value: string, checked: boolean) => {
    const currentValues = (aiData[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      updateFormData('aiIntegration', { [field]: [...filteredValues, value] });
    } else {
      updateFormData('aiIntegration', { [field]: currentValues.filter(v => v !== value) });
    }
  };

  // AI Decision handler for AI sections
  const handleAIAICheckboxChange = (field: keyof AIIntegration, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      handleAIInputChange(field, ['Let the AI decide']);
    } else {
      // When unchecked, clear the "Let the AI decide" option
      handleAIInputChange(field, []);
    }
  };

  function removeAIDecision(current: string[] = []) {
  return current.filter(v => v !== 'Let the AI decide');
}


  const llmAgents = [
    'Anthropic - Claude',
    'Deepseek',
    'Google - Gemini',
    'Hugging Face - for inference',
    'LangChain',
    'Meta - Llama',
    'Mistral AI',
    'Moonshot - Kimi',
    'OpenAI',
    'Qwen Code',
    'X/AI Grok'
  ];

  const audioVideoGeneration = [
    'BasedLabs AI',
    'ElevenLabs',
    'Flux',
    'Google - Veo 3',
    'Hailuo AI (MiniMax)',
    'Higgsfield',
    'Kling',
    'Luma Dream Machine',
    'Murf AI',
    'OpenAI - Sora',
    'Runway',
    'Suno AI',
    'Vidu'
  ];





  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI</h2>
        <p className="text-gray-600">Choose your preferred AI and machine learning services</p>
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



      {/* LLM Agents */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">AI Agents & LLMs</h3>
        <p className="text-gray-600 mb-4">Select all AI agents and LLMs you want to integrate:</p>
        
        {/* AI Decision Checkbox with separation */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(aiData.llmAgents || []).includes('Let the AI decide')}
              onChange={(e) => {
                if (e.target.checked) {
                  handleAIAICheckboxChange('llmAgents', 'Let the AI decide', true);
                } else {
                                     updateFormData('aiIntegration', { llmAgents: removeAIDecision(Array.isArray(aiData.llmAgents) ? aiData.llmAgents as string[] : []) });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {llmAgents.map((agent) => (
            <label key={agent} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(aiData.llmAgents || []).includes(agent)}
                onChange={(e) => handleAICheckboxChange('llmAgents', agent, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{agent}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Audio and Video Generation */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Audio and Video Generation</h3>
        <p className="text-gray-600 mb-4">Select all audio and video generation tools you want to integrate:</p>
        
        {/* AI Decision Checkbox with separation */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(aiData.audioVideoGeneration || []).includes('Let the AI decide')}
              onChange={(e) => {
                if (e.target.checked) {
                  handleAIAICheckboxChange('audioVideoGeneration', 'Let the AI decide', true);
                } else {
                                     updateFormData('aiIntegration', { audioVideoGeneration: removeAIDecision(Array.isArray(aiData.audioVideoGeneration) ? aiData.audioVideoGeneration as string[] : []) });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {audioVideoGeneration.map((tool) => (
            <label key={tool} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(aiData.audioVideoGeneration || []).includes(tool)}
                onChange={(e) => handleAICheckboxChange('audioVideoGeneration', tool, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{tool}</span>
            </label>
          ))}
        </div>
      </div>





    </div>
  );
} 