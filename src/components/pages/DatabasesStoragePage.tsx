import React from 'react';
import { MultiStageFormData, DatabasesStorage } from '../../types/FormTypes';

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

export default function DatabasesStoragePage({ formData, updateFormData }: Props) {
  const data = formData.databasesStorage;

  const handleInputChange = (field: keyof DatabasesStorage, value: string | string[]) => {
    updateFormData('databasesStorage', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof DatabasesStorage, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleInputChange(field, [...filteredValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const databases = [
    'DynamoDB',
    'Elasticsearch',
    'MongoDB',
    'MySQL',
    'PostgreSQL',
    'Redis',
    'SQLite',
    'Supabase'
  ];

  const ormTools = [
    'Drizzle ORM',
    'Mongoose',
    'Prisma',
    'Sequelize',
    'TypeORM'
  ];

  const fileStorage = [
    'Amazon S3 (Simple Storage Service)',
    'Google Cloud Storage',
    'Microsoft Azure Blob Storage'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Databases & Storage</h2>
        <p className="text-gray-600">Choose your preferred data storage and management solutions</p>
      </div>

      {/* Databases */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Databases</h3>
        <p className="text-gray-600 mb-4">Select all databases you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('databasesStorage', { databases: [...databases] })}
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
          
          {databases.map((database) => (
            <label key={database} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.databases || []).includes(database)}
                onChange={(e) => handleCheckboxChange('databases', database, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{database}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Database
          </label>
          <select
            value={data.defaultDatabase || ''}
            onChange={(e) => handleInputChange('defaultDatabase', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Select default database</option>
            {databases.map((database) => (
              <option key={database} value={database}>{database}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>

      {/* ORM Tools */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">ORM & Query Builders</h3>
        <p className="text-gray-600 mb-4">Select all ORM tools you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('databasesStorage', { ormTools: [...ormTools] })}
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
          
          {ormTools.map((orm) => (
            <label key={orm} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.ormTools || []).includes(orm)}
                onChange={(e) => handleCheckboxChange('ormTools', orm, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{orm}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred ORM Tool
          </label>
          <select
            value={data.defaultORM || ''}
            onChange={(e) => handleInputChange('defaultORM', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred ORM</option>
            {ormTools.map((orm) => (
              <option key={orm} value={orm}>{orm}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>

      {/* File Storage */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">File Storage & CDN</h3>
        <p className="text-gray-600 mb-4">Select all file storage services you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => updateFormData('databasesStorage', { fileStorage: [...fileStorage] })}
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
          
          {fileStorage.map((storage) => (
            <label key={storage} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.fileStorage || []).includes(storage)}
                onChange={(e) => handleCheckboxChange('fileStorage', storage, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{storage}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred File Storage
          </label>
          <select
            value={data.defaultFileStorage || ''}
            onChange={(e) => handleInputChange('defaultFileStorage', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Choose your preferred file storage</option>
            {fileStorage.map((storage) => (
              <option key={storage} value={storage}>{storage}</option>
            ))}
            <option value="NO PREFERENCE - all are ok">NO PREFERENCE - all are ok</option>
          </select>
        </div>
      </div>


    </div>
  );
} 