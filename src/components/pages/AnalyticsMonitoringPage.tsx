import React from 'react';
import { MultiStageFormData, AnalyticsMonitoring } from '../../types/FormTypes';

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

export default function AnalyticsMonitoringPage({ formData, updateFormData }: Props) {
  const data = formData.analyticsMonitoring;

  const handleInputChange = (field: keyof AnalyticsMonitoring, value: string | string[]) => {
    updateFormData('analyticsMonitoring', { [field]: value });
  };

  const analyticsTools = [
    'Fathom Analytics',
    'Google Analytics',
    'Hotjar',
    'Mixpanel',
    'Plausible'
  ];

  const performanceMonitoring = [
    'DataDog',
    'Lighthouse',
    'LogRocket',
    'New Relic',
    'Sentry'
  ];

  const loggingServices = [
    'AWS CloudWatch',
    'Datadog',
    'Logtail (by BetterStack)'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics & Monitoring</h2>
        <p className="text-gray-600">Choose your preferred performance and user analytics tools</p>
      </div>
      {/* Analytics Tools */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Analytics Tools</h3>
        <p className="text-gray-600 mb-4">Select all analytics tools you&apos;re comfortable with:</p>
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('analyticsMonitoring', { analyticsTools: [...analyticsTools] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('analyticsMonitoring', { analyticsTools: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {analyticsTools.map((tool) => (
            <label key={tool} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.analyticsTools || []).includes(tool)}
                onChange={(e) => handleInputChange('analyticsTools', [...(data.analyticsTools || []).filter(v => v !== tool), ...(e.target.checked ? [tool] : [])])}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{tool}</span>
            </label>
          ))}
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Analytics Tool
          </label>
          <select
            value={data.defaultAnalytics || ''}
            onChange={(e) => handleInputChange('defaultAnalytics', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred analytics tool</option>
            {analyticsTools.map((tool) => (
              <option key={tool} value={tool}>{tool}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>
      {/* Performance Monitoring */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Performance Monitoring</h3>
        <p className="text-gray-600 mb-4">Select all performance monitoring tools you&apos;re comfortable with:</p>
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('analyticsMonitoring', { performanceMonitoring: [...performanceMonitoring] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('analyticsMonitoring', { performanceMonitoring: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {performanceMonitoring.map((tool) => (
            <label key={tool} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.performanceMonitoring || []).includes(tool)}
                onChange={(e) => handleInputChange('performanceMonitoring', [...(data.performanceMonitoring || []).filter(v => v !== tool), ...(e.target.checked ? [tool] : [])])}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{tool}</span>
            </label>
          ))}
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Performance Monitoring
          </label>
          <select
            value={data.defaultPerformanceMonitoring || ''}
            onChange={(e) => handleInputChange('defaultPerformanceMonitoring', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Select default performance monitoring</option>
            {performanceMonitoring.map((tool) => (
              <option key={tool} value={tool}>{tool}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>
      {/* Logging Services */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Logging Services</h3>
        <p className="text-gray-600 mb-4">Select all logging services you&apos;re comfortable with:</p>
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('analyticsMonitoring', { loggingServices: [...loggingServices] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('analyticsMonitoring', { loggingServices: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {loggingServices.map((service) => (
            <label key={service} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.loggingServices || []).includes(service)}
                onChange={(e) => handleInputChange('loggingServices', [...(data.loggingServices || []).filter(v => v !== service), ...(e.target.checked ? [service] : [])])}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{service}</span>
            </label>
          ))}
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Logging Service
          </label>
          <select
            value={data.defaultLogging || ''}
            onChange={(e) => handleInputChange('defaultLogging', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Select default logging service</option>
            {loggingServices.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>
    </div>
  );
} 