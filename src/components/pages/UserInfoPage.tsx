import React from 'react';
import { MultiStageFormData, AppConfiguration } from '../../types/FormTypes';

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

export default function UserInfoPage({ formData, updateFormData, skipPage, goToPage }: Props) {
  const data = formData.appConfiguration;

  const handleInputChange = (field: keyof AppConfiguration, value: any) => {
    updateFormData('appConfiguration', { [field]: value });
  };

  const handleArrayChange = (field: keyof AppConfiguration, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleInputChange(field, [...filteredValues, value]);
      
      // Also clear the aiDecision field when user makes a specific selection
      if (field !== 'aiDecision') {
        updateFormData('appConfiguration', { aiDecision: [] });
      }
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  // Arrays for user information collection subsections
  const personalIdentificationContact = [
    'Full Name', 'First Name', 'Last Name', 'Username', 'Display Name / Screen Name',
    'Email Address', 'Secondary Email Address', 'Password', 'Password Confirmation',
    'Phone Number (Mobile)', 'Phone Number (Home)', 'Phone Number (Work)',
    'Profile Picture / Avatar', 'Date of Birth', 'Age Verification (Checkbox)',
    'Gender', 'Pronouns'
  ];

  const residentialGeographic = [
    'Full Street Address', 'Apartment, Suite, etc.', 'City', 'State / Province / Region',
    'Country', 'Zip / Postal Code', 'Timezone', 'Nationality'
  ];

  const professionalEducational = [
    'Company Name', 'Company Size', 'Field of Study / Major', 'Graduation Year',
    'Highest Level of Education', 'Industry', 'Job Title', 'Professional Certifications',
    'School / University Name', 'Website / Portfolio URL', 'Work Email', 'Work Phone Number'
  ];

  const preferencesUserSettings = [
    'Accessibility Needs (e.g., Screen Reader Compatibility, High Contrast)',
    'Communication Preferences (Email, SMS, Push Notifications)',
    'Content Preferences / Topics of Interest', 'Email Newsletter Subscription (Opt-in/Opt-out)',
    'Language Preference for App', 'Preferred Content Formats (e.g., Video, Article, Podcast)',
    'Theme Preference (Light/Dark Mode)'
  ];

  const billingFinancial = [
    'Bank Account Number (for Direct Debit)', 'Bank Routing Number', 'Billing Address',
    'Card Expiration Date (Month/Year)', 'Cardholder Name', 'Credit Card Number',
    'CVV / CVC / Security Code', 'PayPal Account Email', 'Secondary Billing Address',
    'Tax ID / VAT Number'
  ];

  const socialOnlinePresence = [
    'Discord ID', 'Facebook Profile URL', 'GitHub Profile URL', 'Instagram Handle',
    'LinkedIn Profile URL', 'Personal Website / Blog',
    'TikTok Handle', 'Twitter Handle / X Profile'
  ];

  const detailedDemographicsLifestyle = [
    'Ethnicity (often optional for statistical use)', 'Household Income Bracket',
    'Languages Spoken', 'Living Situation (Own, Rent, etc.)', 'Marital Status',
    'Number of Children / Dependents', 'Pet Ownership (Type and number)',
    'Vehicle Information (Make, Model, Year)'
  ];

  const healthFitness = [
    'Blood Type', 'Body Fat Percentage', 'Current Activity Level (e.g., Sedentary, Active)',
    'Dietary Restrictions / Preferences (e.g., Vegan, Gluten-Free)', 'Emergency Contact Name',
    'Emergency Contact Phone Number', 'Emergency Contact Relationship', 'Existing Medical Conditions',
    'Fitness Goals (e.g., Lose Weight, Build Muscle)', 'Food Allergies', 'Height', 'Medications',
    'Sleep Schedule / Typical Bedtime', 'Weight'
  ];

  const securityIdentityVerification = [
    'Government ID Scan (Driver\'s License, Passport)', 'Live Photo / "Liveness Check"',
    'Proof of Address Document (e.g., Utility Bill Scan)', 'Security Questions and Answers',
    'Social Security Number (SSN) / National ID Number',
    'Two-Factor Authentication (2FA) Setup Method (App, SMS)'
  ];

  const appSpecificTechnical = [
    'API Key Generation', 'Browser Type & Version', 'Connecting Other Accounts (OAuth with Google, Apple, Slack, etc.)',
    'Hardware Specifications (CPU, GPU, RAM)', 'IP Address', 'Invitation Code / Referral Code',
    'Operating System', 'Primary Goal for Using the App', 'Referral Source ("How did you hear about us?")',
    'Self-Assessed Skill Level (e.g., Beginner, Intermediate, Expert)', 'Team Name / Workspace Name',
    'User Role (e.g., Admin, Editor, Viewer)'
  ];

  // AI Decision handler for User Information Collection
  const handleAICheckboxChange = (field: keyof AppConfiguration, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all user information selections and only keep "Let the AI decide"
      updateFormData('appConfiguration', {
        aiDecision: ['Let the AI decide'],
        personalIdentificationContact: [],
        residentialGeographic: [],
        userInformationCollection: [],
        socialOnlinePresence: [],
        detailedDemographicsLifestyle: [],
        healthFitness: [],
        securityIdentityVerification: [],
        appSpecificTechnical: [],
        billingFinancial: []
      });
    } else {
      // When unchecked, clear the "Let the AI decide" option
      updateFormData('appConfiguration', { aiDecision: [] });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">User Information Collection</h2>
        <p className="text-gray-600">Configure what information you will collect from your users</p>
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

      {/* AI Decision Checkbox */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.aiDecision || []).includes('Let the AI decide')}
              onChange={(e) => handleAICheckboxChange('aiDecision', 'Let the AI decide', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI decide</span>
          </label>
        </div>
      </div>

      {/* Personal Identification & Contact */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Personal Identification & Contact</h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleInputChange('personalIdentificationContact', [...personalIdentificationContact])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleInputChange('personalIdentificationContact', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {personalIdentificationContact.map(item => (
            <label key={item} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.personalIdentificationContact || []).includes(item)}
                onChange={(e) => handleArrayChange('personalIdentificationContact', item, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Residential & Geographic */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Residential & Geographic</h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleInputChange('residentialGeographic', [...residentialGeographic])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleInputChange('residentialGeographic', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {residentialGeographic.map(item => (
            <label key={item} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.residentialGeographic || []).includes(item)}
                onChange={(e) => handleArrayChange('residentialGeographic', item, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Professional & Educational */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Professional & Educational</h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => updateFormData('appConfiguration', { userInformationCollection: [...professionalEducational] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('appConfiguration', { userInformationCollection: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {professionalEducational.map(item => (
            <label key={item} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.userInformationCollection || []).includes(item)}
                onChange={(e) => handleArrayChange('userInformationCollection', item, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Preferences & User Settings */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Preferences & User Settings</h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => updateFormData('appConfiguration', { userInformationCollection: [...preferencesUserSettings] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('appConfiguration', { userInformationCollection: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {preferencesUserSettings.map(item => (
            <label key={item} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.userInformationCollection || []).includes(item)}
                onChange={(e) => handleArrayChange('userInformationCollection', item, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Billing & Financial */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Billing & Financial</h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleInputChange('billingFinancial', [...billingFinancial])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleInputChange('billingFinancial', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {billingFinancial.map(item => (
            <label key={item} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.billingFinancial || []).includes(item)}
                onChange={(e) => handleArrayChange('billingFinancial', item, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Social & Online Presence */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Social & Online Presence</h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleInputChange('socialOnlinePresence', [...socialOnlinePresence])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleInputChange('socialOnlinePresence', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {socialOnlinePresence.map(item => (
            <label key={item} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.socialOnlinePresence || []).includes(item)}
                onChange={(e) => handleArrayChange('socialOnlinePresence', item, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Detailed Demographics & Lifestyle */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Detailed Demographics & Lifestyle</h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleInputChange('detailedDemographicsLifestyle', [...detailedDemographicsLifestyle])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleInputChange('detailedDemographicsLifestyle', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {detailedDemographicsLifestyle.map(item => (
            <label key={item} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.detailedDemographicsLifestyle || []).includes(item)}
                onChange={(e) => handleArrayChange('detailedDemographicsLifestyle', item, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Health & Fitness */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Health & Fitness</h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleInputChange('healthFitness', [...healthFitness])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleInputChange('healthFitness', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {healthFitness.map(item => (
            <label key={item} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.healthFitness || []).includes(item)}
                onChange={(e) => handleArrayChange('healthFitness', item, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Security & Identity Verification (KYC) */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Security & Identity Verification (KYC)</h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleInputChange('securityIdentityVerification', [...securityIdentityVerification])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleInputChange('securityIdentityVerification', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {securityIdentityVerification.map(item => (
            <label key={item} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.securityIdentityVerification || []).includes(item)}
                onChange={(e) => handleArrayChange('securityIdentityVerification', item, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* App-Specific & Technical */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">App-Specific & Technical</h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleInputChange('appSpecificTechnical', [...appSpecificTechnical])}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => handleInputChange('appSpecificTechnical', [])}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {appSpecificTechnical.map(item => (
            <label key={item} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.appSpecificTechnical || []).includes(item)}
                onChange={(e) => handleArrayChange('appSpecificTechnical', item, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>


    </div>
  );
} 