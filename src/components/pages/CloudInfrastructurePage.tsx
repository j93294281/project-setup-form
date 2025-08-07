import React from 'react';
import { MultiStageFormData, CloudInfrastructure, SecurityAuth, DatabasesStorage, FileStorageEmail } from '../../types/FormTypes';

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

export default function CloudInfrastructurePage({ formData, updateFormData, skipPage, goToPage }: Props) {
  const cloudData = formData.cloudInfrastructure || {};
  const securityData = formData.securityAuth || {};
  const dbData = formData.databasesStorage || {};
  const fileEmailData = formData.fileStorageEmail || {};

  // Generic checkbox handler for any section
  const handleCheckboxChange = (section: string, field: string, value: string, checked: boolean) => {
    const currentValues = (formData[section as keyof MultiStageFormData] as any)?.[field] || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter((v: string) => v !== 'Let the AI decide');
      updateFormData(section as keyof MultiStageFormData, { [field]: [...filteredValues, value] });
    } else {
      updateFormData(section as keyof MultiStageFormData, { [field]: currentValues.filter((v: string) => v !== value) });
    }
  };

  // Generic AI decision handler for any section
  const handleAIDecisionChange = (section: string, field: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections
      updateFormData(section as keyof MultiStageFormData, { [field]: ['Let the AI decide'] });
    } else {
      // When unchecked, clear the "Let the AI decide" option
      updateFormData(section as keyof MultiStageFormData, { [field]: [] });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cloud & Security</h2>
        <p className="text-gray-600">Configure your cloud infrastructure, hosting, and security preferences</p>
      </div>

      {/* Skip Option */}
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

      {/* Section 1: IaaS Providers */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">IaaS (Virtual Machines)</h3>
        <p className="text-gray-600 mb-6">Select your preferred Infrastructure as a Service providers</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(cloudData.iaasProviders || []).includes('Let the AI decide')}
              onChange={(e) => handleAIDecisionChange('cloudInfrastructure', 'iaasProviders', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Select All / Deselect All buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => updateFormData('cloudInfrastructure', { iaasProviders: ['All are OK', 'AWS EC2', 'Google Compute Engine', 'Azure VMs', 'DigitalOcean Droplets', 'Linode', 'Vultr'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('cloudInfrastructure', { iaasProviders: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['All are OK', 'AWS EC2', 'Google Compute Engine', 'Azure VMs', 'DigitalOcean Droplets', 'Linode', 'Vultr'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(cloudData.iaasProviders || []).includes(option)}
                onChange={(e) => handleCheckboxChange('cloudInfrastructure', 'iaasProviders', option, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${option === 'All are OK' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{option}</span>
            </label>
          ))}
        </div>
        
        {/* Preferred Choice Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Choice</label>
          <select
            value={cloudData.defaultIaaS || ''}
            onChange={(e) => updateFormData('cloudInfrastructure', { defaultIaaS: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select your preferred choice</option>
            {['All are OK', 'AWS EC2', 'Google Compute Engine', 'Azure VMs', 'DigitalOcean Droplets', 'Linode', 'Vultr'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 2: PaaS/Serverless Platforms */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">PaaS / Serverless Platforms</h3>
        <p className="text-gray-600 mb-6">Select your preferred Platform as a Service and serverless providers</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(cloudData.paasProviders || []).includes('Let the AI decide')}
              onChange={(e) => handleAIDecisionChange('cloudInfrastructure', 'paasProviders', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Select All / Deselect All buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => updateFormData('cloudInfrastructure', { paasProviders: ['All are OK', 'Vercel', 'Netlify', 'Railway', 'Heroku', 'Fly.io', 'Render', 'Platform.sh'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('cloudInfrastructure', { paasProviders: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['All are OK', 'Vercel', 'Netlify', 'Railway', 'Heroku', 'Fly.io', 'Render', 'Platform.sh'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(cloudData.paasProviders || []).includes(option)}
                onChange={(e) => handleCheckboxChange('cloudInfrastructure', 'paasProviders', option, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${option === 'All are OK' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{option}</span>
            </label>
          ))}
        </div>
        
        {/* Preferred Choice Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Choice</label>
          <select
            value={cloudData.defaultPaaS || ''}
            onChange={(e) => updateFormData('cloudInfrastructure', { defaultPaaS: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select your preferred choice</option>
            {['All are OK', 'Vercel', 'Netlify', 'Railway', 'Heroku', 'Fly.io', 'Render', 'Platform.sh'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 3: Container Platforms */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Container Platforms</h3>
        <p className="text-gray-600 mb-6">Select your preferred container orchestration and management platforms</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(cloudData.containerPlatforms || []).includes('Let the AI decide')}
              onChange={(e) => handleAIDecisionChange('cloudInfrastructure', 'containerPlatforms', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Select All / Deselect All buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => updateFormData('cloudInfrastructure', { containerPlatforms: ['All are OK', 'Kubernetes (Managed K8s)', 'Serverless Containers', 'Docker'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('cloudInfrastructure', { containerPlatforms: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['All are OK', 'Kubernetes (Managed K8s)', 'Serverless Containers', 'Docker'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(cloudData.containerPlatforms || []).includes(option)}
                onChange={(e) => handleCheckboxChange('cloudInfrastructure', 'containerPlatforms', option, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${option === 'All are OK' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{option}</span>
            </label>
          ))}
        </div>
        
        {/* Preferred Choice Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Choice</label>
          <select
            value={cloudData.defaultContainer || ''}
            onChange={(e) => updateFormData('cloudInfrastructure', { defaultContainer: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select your preferred choice</option>
            {['All are OK', 'Kubernetes (Managed K8s)', 'Serverless Containers', 'Docker'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 4: Functions as a Service (FaaS) */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Functions as a Service (FaaS)</h3>
        <p className="text-gray-600 mb-6">Select your preferred serverless function platforms</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(cloudData.serverlessPlatforms || []).includes('Let the AI decide')}
              onChange={(e) => handleAIDecisionChange('cloudInfrastructure', 'serverlessPlatforms', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Select All / Deselect All buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => updateFormData('cloudInfrastructure', { serverlessPlatforms: ['All are OK', 'AWS Lambda', 'Google Cloud Functions', 'Cloudflare Workers', 'Vercel/Netlify Functions'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('cloudInfrastructure', { serverlessPlatforms: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['All are OK', 'AWS Lambda', 'Google Cloud Functions', 'Cloudflare Workers', 'Vercel/Netlify Functions'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(cloudData.serverlessPlatforms || []).includes(option)}
                onChange={(e) => handleCheckboxChange('cloudInfrastructure', 'serverlessPlatforms', option, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${option === 'All are OK' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{option}</span>
            </label>
          ))}
        </div>
        
        {/* Preferred Choice Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Choice</label>
          <select
            value={cloudData.defaultServerless || ''}
            onChange={(e) => updateFormData('cloudInfrastructure', { defaultServerless: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select your preferred choice</option>
            {['All are OK', 'AWS Lambda', 'Google Cloud Functions', 'Cloudflare Workers', 'Vercel/Netlify Functions'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 5: DNS Provider */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">DNS Provider</h3>
        <p className="text-gray-600 mb-6">Select your preferred DNS service providers</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(securityData.dnsProviders || []).includes('Let the AI decide')}
              onChange={(e) => handleAIDecisionChange('securityAuth', 'dnsProviders', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Select All / Deselect All buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => updateFormData('securityAuth', { dnsProviders: ['All are OK', 'Cloudflare', 'AWS Route 53', 'Google Cloud DNS', 'GoDaddy', 'Namecheap'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('securityAuth', { dnsProviders: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['All are OK', 'Cloudflare', 'AWS Route 53', 'Google Cloud DNS', 'GoDaddy', 'Namecheap'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(securityData.dnsProviders || []).includes(option)}
                onChange={(e) => handleCheckboxChange('securityAuth', 'dnsProviders', option, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${option === 'All are OK' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{option}</span>
            </label>
          ))}
        </div>
        
        {/* Preferred Choice Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Choice</label>
          <select
            value={securityData.defaultDNS || ''}
            onChange={(e) => updateFormData('securityAuth', { defaultDNS: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select your preferred choice</option>
            {['All are OK', 'Cloudflare', 'AWS Route 53', 'Google Cloud DNS', 'GoDaddy', 'Namecheap'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 6: CDN Provider */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">CDN Provider</h3>
        <p className="text-gray-600 mb-6">Select your preferred Content Delivery Network providers</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(securityData.cdnProviders || []).includes('Let the AI decide')}
              onChange={(e) => handleAIDecisionChange('securityAuth', 'cdnProviders', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Select All / Deselect All buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => updateFormData('securityAuth', { cdnProviders: ['All are OK', 'Cloudflare', 'AWS CloudFront', 'Fastly', 'Google Cloud CDN', 'Bunny CDN'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('securityAuth', { cdnProviders: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['All are OK', 'Cloudflare', 'AWS CloudFront', 'Fastly', 'Google Cloud CDN', 'Bunny CDN'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(securityData.cdnProviders || []).includes(option)}
                onChange={(e) => handleCheckboxChange('securityAuth', 'cdnProviders', option, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${option === 'All are OK' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{option}</span>
            </label>
          ))}
        </div>
        
        {/* Preferred Choice Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Choice</label>
          <select
            value={securityData.defaultCDN || ''}
            onChange={(e) => updateFormData('securityAuth', { defaultCDN: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select your preferred choice</option>
            {['All are OK', 'Cloudflare', 'AWS CloudFront', 'Fastly', 'Google Cloud CDN', 'Bunny CDN'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 7: SSL Certificate Provider */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">SSL Certificate Provider</h3>
        <p className="text-gray-600 mb-6">Select your preferred SSL certificate providers</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(securityData.sslProviders || []).includes('Let the AI decide')}
              onChange={(e) => handleAIDecisionChange('securityAuth', 'sslProviders', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Select All / Deselect All buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => updateFormData('securityAuth', { sslProviders: ['All are OK', "Let's Encrypt", 'Cloudflare', 'AWS Certificate Manager', 'Manual Purchase'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('securityAuth', { sslProviders: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['All are OK', "Let's Encrypt", 'Cloudflare', 'AWS Certificate Manager', 'Manual Purchase'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(securityData.sslProviders || []).includes(option)}
                onChange={(e) => handleCheckboxChange('securityAuth', 'sslProviders', option, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${option === 'All are OK' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{option}</span>
            </label>
          ))}
        </div>
        
        {/* Preferred Choice Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Choice</label>
          <select
            value={securityData.defaultSSL || ''}
            onChange={(e) => updateFormData('securityAuth', { defaultSSL: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select your preferred choice</option>
            {['All are OK', "Let's Encrypt", 'Cloudflare', 'AWS Certificate Manager', 'Manual Purchase'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 8: Databases */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Databases</h3>
        <p className="text-gray-600 mb-6">Select your preferred database systems</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(dbData.databases || []).includes('Let the AI decide')}
              onChange={(e) => handleAIDecisionChange('databasesStorage', 'databases', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Select All / Deselect All buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => updateFormData('databasesStorage', { databases: ['All are OK', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'DynamoDB', 'Elasticsearch', 'Supabase'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('databasesStorage', { databases: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['All are OK', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'DynamoDB', 'Elasticsearch', 'Supabase'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(dbData.databases || []).includes(option)}
                onChange={(e) => handleCheckboxChange('databasesStorage', 'databases', option, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${option === 'All are OK' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{option}</span>
            </label>
          ))}
        </div>
        
        {/* Preferred Choice Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Choice</label>
          <select
            value={dbData.defaultDatabase || ''}
            onChange={(e) => updateFormData('databasesStorage', { defaultDatabase: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select your preferred choice</option>
            {['All are OK', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'DynamoDB', 'Elasticsearch', 'Supabase'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 9: ORM & Query Builders */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">ORM & Query Builders</h3>
        <p className="text-gray-600 mb-6">Select your preferred Object-Relational Mapping and query building tools</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(dbData.ormTools || []).includes('Let the AI decide')}
              onChange={(e) => handleAIDecisionChange('databasesStorage', 'ormTools', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Select All / Deselect All buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => updateFormData('databasesStorage', { ormTools: ['All are OK', 'Prisma', 'Drizzle ORM', 'TypeORM', 'Sequelize', 'Mongoose'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('databasesStorage', { ormTools: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['All are OK', 'Prisma', 'Drizzle ORM', 'TypeORM', 'Sequelize', 'Mongoose'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(dbData.ormTools || []).includes(option)}
                onChange={(e) => handleCheckboxChange('databasesStorage', 'ormTools', option, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${option === 'All are OK' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{option}</span>
            </label>
          ))}
        </div>
        
        {/* Preferred Choice Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Choice</label>
          <select
            value={dbData.defaultORM || ''}
            onChange={(e) => updateFormData('databasesStorage', { defaultORM: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select your preferred choice</option>
            {['All are OK', 'Prisma', 'Drizzle ORM', 'TypeORM', 'Sequelize', 'Mongoose'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 10: File/Object Storage */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">File/Object Storage</h3>
        <p className="text-gray-600 mb-6">Select your preferred file and object storage providers</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(dbData.fileStorage || []).includes('Let the AI decide')}
              onChange={(e) => handleAIDecisionChange('databasesStorage', 'fileStorage', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Select All / Deselect All buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => updateFormData('databasesStorage', { fileStorage: ['All are OK', 'AWS S3', 'Google Cloud Storage', 'Cloudflare R2', 'Azure Blob Storage', 'Backblaze B2', 'DigitalOcean Spaces'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('databasesStorage', { fileStorage: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['All are OK', 'AWS S3', 'Google Cloud Storage', 'Cloudflare R2', 'Azure Blob Storage', 'Backblaze B2', 'DigitalOcean Spaces'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(dbData.fileStorage || []).includes(option)}
                onChange={(e) => handleCheckboxChange('databasesStorage', 'fileStorage', option, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${option === 'All are OK' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{option}</span>
            </label>
          ))}
        </div>
        
        {/* Preferred Choice Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Choice</label>
          <select
            value={fileEmailData.fileStorage || ''}
            onChange={(e) => updateFormData('fileStorageEmail', { fileStorage: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select your preferred choice</option>
            {['All are OK', 'AWS S3', 'Google Cloud Storage', 'Cloudflare R2', 'Azure Blob Storage', 'Backblaze B2', 'DigitalOcean Spaces'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 11: Email Service Provider */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Email Service Provider</h3>
        <p className="text-gray-600 mb-6">Select your preferred email service provider</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={fileEmailData.emailProvider === 'Let the AI decide'}
              onChange={(e) => updateFormData('fileStorageEmail', { emailProvider: e.target.checked ? 'Let the AI decide' : '' })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Radio Button Options */}
        <div className="space-y-2 mb-4">
          {['All are OK', 'AWS SES', 'Gmail', 'Mailgun', 'Postmark', 'Resend', 'SendGrid'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="emailProvider"
                checked={fileEmailData.emailProvider === option}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('fileStorageEmail', { emailProvider: option });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${option === 'All are OK' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{option}</span>
            </label>
          ))}
        </div>
        
        {/* Preferred Choice Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Choice</label>
          <select
            value={fileEmailData.emailProvider || ''}
            onChange={(e) => updateFormData('fileStorageEmail', { emailProvider: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select your preferred choice</option>
            {['All are OK', 'AWS SES', 'Gmail', 'Mailgun', 'Postmark', 'Resend', 'SendGrid'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 12: Identity & Login Providers */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Identity & Login Providers</h3>
        <p className="text-gray-600 mb-6">Select the social login and identity providers you would like to use</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(securityData.socialLogins || []).includes('Let the AI decide')}
              onChange={(e) => handleAIDecisionChange('securityAuth', 'socialLogins', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Select All / Deselect All buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => updateFormData('securityAuth', { socialLogins: ['NONE', 'Google', 'GitHub', 'Microsoft', 'Apple', 'Discord', 'Facebook'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('securityAuth', { socialLogins: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {/* NONE option - prepopulated and formatted in blue */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(securityData.socialLogins || []).includes('NONE') || (securityData.socialLogins || []).length === 0}
              onChange={(e) => {
                if (e.target.checked) {
                  updateFormData('securityAuth', { socialLogins: ['NONE'] });
                } else {
                  updateFormData('securityAuth', { socialLogins: [] });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-blue-600 font-medium text-sm">NONE</span>
          </label>
          
          {['Google', 'GitHub', 'Microsoft', 'Apple', 'Discord', 'Facebook'].map((provider) => (
            <label key={provider} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(securityData.socialLogins || []).includes(provider)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleCheckboxChange('securityAuth', 'socialLogins', provider, true);
                  } else {
                    handleCheckboxChange('securityAuth', 'socialLogins', provider, false);
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{provider}</span>
            </label>
          ))}
        </div>
        

      </div>

      {/* Section 13: Enterprise SSO */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Enterprise SSO</h3>
        <p className="text-gray-600 mb-6">Select your preferred enterprise Single Sign-On solution</p>
        
        {/* AI Decision Radio Button */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="enterpriseSSO_AI"
              checked={securityData.enterpriseSSO === 'Let the AI decide'}
              onChange={(e) => {
                if (e.target.checked) {
                  updateFormData('securityAuth', { enterpriseSSO: 'Let the AI decide' });
                }
              }}
              className="border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Radio Button Options */}
        <div className="space-y-2 mb-4">
          {['NONE', 'Auth0', 'Azure AD', 'Keycloak', 'Okta', 'SAML 2.0'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="enterpriseSSO"
                checked={securityData.enterpriseSSO === option || (option === 'NONE' && !securityData.enterpriseSSO)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('securityAuth', { enterpriseSSO: option });
                  }
                }}
                className="border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${option === 'NONE' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{option}</span>
            </label>
          ))}
        </div>
        

      </div>

      {/* Section 14: Authentication Strategy */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Authentication Strategy</h3>
        <p className="text-gray-600 mb-6">Select your preferred authentication method</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={securityData.authMethod === 'Let the AI decide'}
              onChange={(e) => updateFormData('securityAuth', { authMethod: e.target.checked ? 'Let the AI decide' : '' })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Radio Button Options */}
        <div className="space-y-2 mb-4">
          {['Session-based', 'JWT (JSON Web Tokens)', 'OAuth 2.0 / OpenID Connect'].map((strategy) => (
            <label key={strategy} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="authMethod"
                checked={securityData.authMethod === strategy}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('securityAuth', { authMethod: strategy });
                  }
                }}
                className="border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{strategy}</span>
            </label>
          ))}
        </div>
        

      </div>

      {/* Section 15: Two-Factor Authentication */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
        <p className="text-gray-600 mb-6">Select your preferred 2FA method</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={securityData.twoFactorAuth === 'Let the AI decide'}
              onChange={(e) => updateFormData('securityAuth', { twoFactorAuth: e.target.checked ? 'Let the AI decide' : '' })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
        
        {/* Radio Button Options */}
        <div className="space-y-2 mb-4">
          {['SMS/Text Message', 'Authenticator App (TOTP)', 'Email-based', 'Hardware Token', 'None'].map((method) => (
            <label key={method} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="twoFactorAuth"
                checked={securityData.twoFactorAuth === method}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('securityAuth', { twoFactorAuth: method });
                  }
                }}
                className="border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${method === 'None' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{method}</span>
            </label>
          ))}
        </div>
        

      </div>

      {/* Section 16: API Security */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">API Security</h3>
        <p className="text-gray-600 mb-6">Select the preferred API security methods</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={securityData.apiSecurity?.includes('Let the AI decide')}
              onChange={(e) => {
                const currentSecurity = securityData.apiSecurity || [];
                if (e.target.checked) {
                  updateFormData('securityAuth', { apiSecurity: ['Let the AI decide'] });
                } else {
                  updateFormData('securityAuth', { apiSecurity: [] });
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
            onClick={() => updateFormData('securityAuth', { apiSecurity: ['API Keys', 'OAuth 2.0', 'JWT Tokens', 'Rate Limiting', 'CORS Configuration', 'API Gateway'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('securityAuth', { apiSecurity: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['API Keys', 'OAuth 2.0', 'JWT Tokens', 'Rate Limiting', 'CORS Configuration', 'API Gateway'].map((security) => (
            <label key={security} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={securityData.apiSecurity?.includes(security)}
                onChange={(e) => {
                  const currentSecurity = securityData.apiSecurity || [];
                  if (e.target.checked) {
                    // Remove 'Let the AI decide' if user selects a non-AI option
                    const filteredSecurity = currentSecurity.filter(s => s !== 'Let the AI decide');
                    updateFormData('securityAuth', {
                      apiSecurity: [...filteredSecurity, security]
                    });
                  } else {
                    updateFormData('securityAuth', {
                      apiSecurity: currentSecurity.filter(s => s !== security)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{security}</span>
            </label>
          ))}
        </div>
        

      </div>

      {/* Section 17: Data Encryption */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Data Encryption</h3>
        <p className="text-gray-600 mb-6">Select the encryption methods you want to use</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={securityData.dataEncryption?.includes('Let the AI decide')}
              onChange={(e) => {
                const currentEncryption = securityData.dataEncryption || [];
                if (e.target.checked) {
                  updateFormData('securityAuth', { dataEncryption: ['Let the AI decide'] });
                } else {
                  updateFormData('securityAuth', { dataEncryption: [] });
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
            onClick={() => updateFormData('securityAuth', { dataEncryption: ['AES-256', 'RSA-2048', 'ChaCha20-Poly1305', 'End-to-End Encryption', 'Field-Level Encryption', 'Database Encryption'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('securityAuth', { dataEncryption: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['AES-256', 'RSA-2048', 'ChaCha20-Poly1305', 'End-to-End Encryption', 'Field-Level Encryption', 'Database Encryption'].map((encryption) => (
            <label key={encryption} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={securityData.dataEncryption?.includes(encryption)}
                onChange={(e) => {
                  const currentEncryption = securityData.dataEncryption || [];
                  if (e.target.checked) {
                    // Remove 'Let the AI decide' if user selects a non-AI option
                    const filteredEncryption = currentEncryption.filter((s: string) => s !== 'Let the AI decide');
                    updateFormData('securityAuth', {
                      dataEncryption: [...filteredEncryption, encryption]
                    });
                  } else {
                    updateFormData('securityAuth', {
                      dataEncryption: currentEncryption.filter((s: string) => s !== encryption)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{encryption}</span>
            </label>
          ))}
        </div>
        

      </div>

      {/* Section 18: Compliance & Standards */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Compliance & Standards</h3>
        <p className="text-gray-600 mb-6">Select your required compliance standards</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={securityData.complianceStandards?.includes('Let the AI decide')}
              onChange={(e) => {
                const currentStandards = securityData.complianceStandards || [];
                if (e.target.checked) {
                  updateFormData('securityAuth', { complianceStandards: ['Let the AI decide'] });
                } else {
                  updateFormData('securityAuth', { complianceStandards: [] });
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
            onClick={() => updateFormData('securityAuth', { complianceStandards: ['GDPR', 'HIPAA', 'SOC 2', 'ISO 27001', 'PCI DSS', 'CCPA', 'None'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('securityAuth', { complianceStandards: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['GDPR', 'HIPAA', 'SOC 2', 'ISO 27001', 'PCI DSS', 'CCPA', 'None'].map((standard) => (
            <label key={standard} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={securityData.complianceStandards?.includes(standard)}
                onChange={(e) => {
                  const currentStandards = securityData.complianceStandards || [];
                  if (e.target.checked) {
                    // Remove 'Let the AI decide' if user selects a non-AI option
                    const filteredStandards = currentStandards.filter((s: string) => s !== 'Let the AI decide');
                    updateFormData('securityAuth', {
                      complianceStandards: [...filteredStandards, standard]
                    });
                  } else {
                    updateFormData('securityAuth', {
                      complianceStandards: currentStandards.filter((s: string) => s !== standard)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${standard === 'None' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{standard}</span>
            </label>
          ))}
        </div>
        

      </div>

      {/* Section 19: Secrets Managers */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Secrets Managers</h3>
        <p className="text-gray-600 mb-6">Select the secrets management solutions you want to use</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={securityData.secretsManagers?.includes('Let the AI decide')}
              onChange={(e) => {
                const currentSecrets = securityData.secretsManagers || [];
                if (e.target.checked) {
                  updateFormData('securityAuth', { secretsManagers: ['Let the AI decide'] });
                } else {
                  updateFormData('securityAuth', { secretsManagers: [] });
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
            onClick={() => updateFormData('securityAuth', { secretsManagers: ['AWS Secrets Manager', 'HashiCorp Vault', 'Azure Key Vault', 'Google Secret Manager', 'None'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('securityAuth', { secretsManagers: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['AWS Secrets Manager', 'HashiCorp Vault', 'Azure Key Vault', 'Google Secret Manager'].map((secret) => (
            <label key={secret} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={securityData.secretsManagers?.includes(secret)}
                onChange={(e) => {
                  const currentSecrets = securityData.secretsManagers || [];
                  if (e.target.checked) {
                    // Remove 'Let the AI decide' if user selects a non-AI option
                    const filteredSecrets = currentSecrets.filter((s: string) => s !== 'Let the AI decide');
                    updateFormData('securityAuth', {
                      secretsManagers: [...filteredSecrets, secret]
                    });
                  } else {
                    updateFormData('securityAuth', {
                      secretsManagers: currentSecrets.filter((s: string) => s !== secret)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${secret === 'None' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>{secret}</span>
            </label>
          ))}
        </div>
        

      </div>

      {/* Section 20: Security Monitoring */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Security Monitoring</h3>
        <p className="text-gray-600 mb-6">Select the security monitoring tools you use or plan on using</p>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={securityData.securityMonitoring?.includes('Let the AI decide')}
              onChange={(e) => {
                const currentMonitoring = securityData.securityMonitoring || [];
                if (e.target.checked) {
                  updateFormData('securityAuth', { securityMonitoring: ['Let the AI decide'] });
                } else {
                  updateFormData('securityAuth', { securityMonitoring: [] });
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
            onClick={() => updateFormData('securityAuth', { securityMonitoring: ['SIEM (Security Information and Event Management)', 'Intrusion Detection System (IDS)', 'Intrusion Prevention System (IPS)', 'Vulnerability Scanning', 'Penetration Testing', 'Security Auditing'] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => updateFormData('securityAuth', { securityMonitoring: [] })}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Deselect All
          </button>
        </div>
        
        {/* Checkbox Options */}
        <div className="space-y-2 mb-4">
          {['SIEM (Security Information and Event Management)', 'Intrusion Detection System (IDS)', 'Intrusion Prevention System (IPS)', 'Vulnerability Scanning', 'Penetration Testing', 'Security Auditing'].map((monitoring) => (
            <label key={monitoring} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={securityData.securityMonitoring?.includes(monitoring)}
                onChange={(e) => {
                  const currentMonitoring = securityData.securityMonitoring || [];
                  if (e.target.checked) {
                    // Remove 'Let the AI decide' if user selects a non-AI option
                    const filteredMonitoring = currentMonitoring.filter((s: string) => s !== 'Let the AI decide');
                    updateFormData('securityAuth', {
                      securityMonitoring: [...filteredMonitoring, monitoring]
                    });
                  } else {
                    updateFormData('securityAuth', {
                      securityMonitoring: currentMonitoring.filter((s: string) => s !== monitoring)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{monitoring}</span>
            </label>
          ))}
        </div>
        

      </div>


    </div>
  );
} 