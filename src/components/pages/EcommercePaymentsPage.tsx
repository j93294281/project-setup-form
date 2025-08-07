import React from 'react';
import { MultiStageFormData, EcommercePayments } from '../../types/FormTypes';

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

export default function EcommercePaymentsPage({ formData, updateFormData, skipPage, goToPage }: Props) {
  const data = formData.ecommercePayments;

  const handleInputChange = (field: keyof EcommercePayments, value: string | string[]) => {
    updateFormData('ecommercePayments', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof EcommercePayments, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleInputChange(field, [...filteredValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  // Helper to remove AI value if user selects a non-AI value
  function removeAIDecision(current: string[] = []) {
    return current.filter(v => v !== 'Let the AI decide');
  }

  // Example for paymentProviders:
  const handleAICheckboxChange = (field: keyof EcommercePayments, value: string, checked: boolean) => {
    if (checked) {
      // When "Let the AI decide" is checked, clear all other selections and only keep "Let the AI decide"
      updateFormData('ecommercePayments', { [field]: ['Let the AI decide'] });
    } else {
      // When unchecked, clear the "Let the AI decide" option
      updateFormData('ecommercePayments', { [field]: [] });
    }
  };

  const paymentProviders = [
    'Adyen',
    'Braintree',
    'Lemon Squeezy',
    'Paddle',
    'PayPal',
    'Stripe'
  ];

  const ecommerceProviders = [
    'BigCommerce',
    'Shopify',
    'Squarespace Commerce',
    'Wix eCommerce',
    'WooCommerce'
  ];

  const paymentPlans = [
    'One-Time Sales (e.g., goods, services, digital products)',
    'Usage-Based (e.g., API credits, metered services)',
    'Subscriptions/Memberships (e.g., monthly, annual access)'
  ];

  const accountingPlatforms = [
    'FreeAgent',
    'FreshBooks',
    'GoDaddy Bookkeeping',
    'QuickBooks',
    'Sage',
    'Wave',
    'Xero',
    'Zoho Books'
  ];

  const pricingTiers = [
    'Free Tier',
    'Starter',
    'Professional',
    'Enterprise'
  ];

  const yearlyDiscounts = [
    'No discount',
    '5%',
    '10%',
    '15%',
    '20%',
    '25%',
    '33%',
    '50%'
  ];

  const pricingLevelNames = {
    low: ['Basic', 'Free', 'Hobby', 'Lite', 'Mini', 'Starter'],
    mid: ['Advanced', 'Business', 'Plus', 'Premium', 'Pro', 'Standard'],
    high: ['Elite', 'Enterprise', 'Max', 'Platinum', 'Professional', 'Ultimate']
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payments & Accounting</h2>
        <p className="text-gray-600">Choose your preferred payment and accounting solutions</p>
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

      {/* Payment Providers */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Payment Providers</h3>
        <p className="text-gray-600 mb-4">Select your preferred payment processor:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* AI Decision Radio with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="paymentProviders"
                checked={(data.paymentProviders || []).includes('Let the AI decide')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { paymentProviders: ['Let the AI decide'] });
                  } else {
                    updateFormData('ecommercePayments', { paymentProviders: removeAIDecision(Array.isArray(data.paymentProviders) ? data.paymentProviders as string[] : []) });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* NONE option */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentProviders"
              checked={(data.paymentProviders || []).includes('NONE') || (data.paymentProviders || []).length === 0}
              onChange={(e) => {
                if (e.target.checked) {
                  updateFormData('ecommercePayments', { paymentProviders: ['NONE'] });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-blue-600 text-sm font-medium">NONE</span>
          </label>
          
          {paymentProviders.map((provider) => (
            <label key={provider} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="paymentProviders"
                checked={(data.paymentProviders || []).includes(provider)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { paymentProviders: [provider] });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{provider}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Plans */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Payment Plans</h3>
        <p className="text-gray-600 mb-4">Select all payment models you plan to use:</p>
        
        <div className="space-y-3">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.paymentPlans || []).includes('Let the AI decide')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { paymentPlans: ['Let the AI decide'] });
                  } else {
                    updateFormData('ecommercePayments', { paymentPlans: removeAIDecision(data.paymentPlans) });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          {paymentPlans.map((plan) => (
            <label key={plan} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.paymentPlans || []).includes(plan)}
                onChange={(e) => {
                  if (e.target.checked) {
                    // Remove 'Let the AI decide' if user selects a non-AI option
                    const currentValues = (data.paymentPlans || []).filter(v => v !== 'Let the AI decide');
                    updateFormData('ecommercePayments', { paymentPlans: [...currentValues, plan] });
                  } else {
                    updateFormData('ecommercePayments', { paymentPlans: (data.paymentPlans || []).filter(v => v !== plan) });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{plan}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Number of Pricing Levels */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Number of Pricing Levels</h3>
        <p className="text-gray-600 mb-4">Select how many pricing tiers your app will have:</p>
        
        <div className="space-y-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.pricingLevels || []).includes('Let the AI decide')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { 
                      pricingLevels: ['Let the AI decide'],
                      numberOfPricingLevels: undefined 
                    });
                  } else {
                    updateFormData('ecommercePayments', { 
                      pricingLevels: removeAIDecision(data.pricingLevels),
                      numberOfPricingLevels: 1 
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {[1, 2, 3, 4].map((num) => (
            <label key={num} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="pricingLevels"
                checked={(data.numberOfPricingLevels || 1) === num && !(data.pricingLevels || []).includes('Let the AI decide')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { 
                      numberOfPricingLevels: num,
                      pricingLevels: removeAIDecision(data.pricingLevels)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{num} Level{num > 1 ? 's' : ''}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Pricing Type */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Pricing Type</h3>
        <p className="text-gray-600 mb-4">Choose your preferred pricing format:</p>
        <div className="space-y-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.pricingTypeAI || []).includes('Let the AI decide')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { 
                      pricingTypeAI: ['Let the AI decide'],
                      pricingType: undefined 
                    });
                  } else {
                    updateFormData('ecommercePayments', { 
                      pricingTypeAI: removeAIDecision(data.pricingTypeAI),
                      pricingType: 'x99' 
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="pricingType"
                checked={data.pricingType === 'x99' && !(data.pricingTypeAI || []).includes('Let the AI decide')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { 
                      pricingType: 'x99',
                      pricingTypeAI: removeAIDecision(data.pricingTypeAI)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">Use "X.99" pricing (e.g. $4.99)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="pricingType"
                checked={data.pricingType === 'rounded' && !(data.pricingTypeAI || []).includes('Let the AI decide')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { 
                      pricingType: 'rounded',
                      pricingTypeAI: removeAIDecision(data.pricingTypeAI)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">Use Rounded Pricing (e.g. $5)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Pricing Values */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Pricing Values</h3>
        <p className="text-gray-600 mb-4">Select specific pricing values for each level (up to 4):</p>
        <div className="space-y-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.pricingOptions || []).includes('Let the AI decide')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { 
                      pricingOptions: ['Let the AI decide'],
                      level1Value: undefined,
                      level2Value: undefined,
                      level3Value: undefined,
                      level4Value: undefined
                    });
                  } else {
                    updateFormData('ecommercePayments', { 
                      pricingOptions: removeAIDecision(data.pricingOptions)
                    });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {[1, 2, 3, 4].map((level) => (
            <div key={level}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level-{level}
              </label>
              <select
                value={data[`level${level}Value` as keyof EcommercePayments] as string || ''}
                onChange={(e) => {
                  if (e.target.value) {
                    updateFormData('ecommercePayments', { 
                      [`level${level}Value`]: e.target.value,
                      pricingOptions: removeAIDecision(data.pricingOptions)
                    });
                  } else {
                    updateFormData('ecommercePayments', { 
                      [`level${level}Value`]: undefined
                    });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select a pricing value for Level-{level}</option>
                {[
                  '$0.99 - or $1 (if using rounded pricing)', '$1.99 - or $2 (if using rounded pricing)', '$2.99 - or $3 (if using rounded pricing)', '$3.99 - or $4 (if using rounded pricing)', '$4.99 - or $5 (if using rounded pricing)', '$5.99 - or $6 (if using rounded pricing)', '$6.99 - or $7 (if using rounded pricing)', '$7.99 - or $8 (if using rounded pricing)', '$8.99 - or $9 (if using rounded pricing)', '$9.99 - or $10 (if using rounded pricing)', '$10.99 - or $11 (if using rounded pricing)', '$11.99 - or $12 (if using rounded pricing)', '$12.99 - or $13 (if using rounded pricing)', '$13.99 - or $14 (if using rounded pricing)', '$14.99 - or $15 (if using rounded pricing)', '$19.99 - or $20 (if using rounded pricing)', '$24.99 - or $25 (if using rounded pricing)', '$29.99 - or $30 (if using rounded pricing)', '$39.99 - or $40 (if using rounded pricing)', '$49.99 - or $50 (if using rounded pricing)', '$59.99 - or $60 (if using rounded pricing)', '$69.99 - or $70 (if using rounded pricing)', '$79.99 - or $80 (if using rounded pricing)', '$89.99 - or $90 (if using rounded pricing)', '$99.99 - or $100 (if using rounded pricing)', '$199.99 - or $200 (if using rounded pricing)', '$299.99 - or $300 (if using rounded pricing)', '$399.99 - or $400 (if using rounded pricing)', '$499.99 - or $500 (if using rounded pricing)', 'Custom Pricing (Call For Quote)'
                ].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Names */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Pricing Names</h3>
        <p className="text-gray-600 mb-4">Select names for your pricing tiers (up to 4):</p>
        <div className="space-y-4">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.pricingLevels || []).includes('Let the AI decide')}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleCheckboxChange('pricingLevels', 'Let the AI decide', true);
                  } else {
                    updateFormData('ecommercePayments', { pricingLevels: removeAIDecision(data.pricingLevels) });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          <div className="space-y-6">
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Low Tier Names</h5>
              <div className="space-y-2">
                {pricingLevelNames.low.map((level) => (
                  <label key={level} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(data.pricingLevels || []).includes(level)}
                      onChange={(e) => handleCheckboxChange('pricingLevels', level, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Mid Tier Names</h5>
              <div className="space-y-2">
                {pricingLevelNames.mid.map((level) => (
                  <label key={level} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(data.pricingLevels || []).includes(level)}
                      onChange={(e) => handleCheckboxChange('pricingLevels', level, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">High Tier Names</h5>
              <div className="space-y-2">
                {pricingLevelNames.high.map((level) => (
                  <label key={level} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(data.pricingLevels || []).includes(level)}
                      onChange={(e) => handleCheckboxChange('pricingLevels', level, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Yearly Purchase Discount */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Yearly Purchase Discount</h3>
        <p className="text-gray-600 mb-4">Choose your yearly discount option:</p>
        <div className="space-y-3">
          {/* AI Decision Radio with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="yearlyDiscount"
                checked={(data.yearlyDiscounts || []).includes('Let the AI decide')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { yearlyDiscounts: ['Let the AI decide'] });
                  } else {
                    updateFormData('ecommercePayments', { yearlyDiscounts: removeAIDecision(data.yearlyDiscounts) });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {yearlyDiscounts.map((discount) => (
            <label key={discount} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="yearlyDiscount"
                checked={(data.yearlyDiscounts || []).includes(discount) || (discount === 'No discount' && (data.yearlyDiscounts || []).length === 0)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { yearlyDiscounts: [discount] });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{discount}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Accounting Platforms */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Accounting Platforms</h3>
        <p className="text-gray-600 mb-4">Select your preferred accounting platform:</p>
        <div className="grid grid-cols-1 gap-3">
          {/* AI Decision Radio with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="accountingPlatform"
                checked={(data.accountingPlatforms || []).includes('Let the AI decide')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { accountingPlatforms: ['Let the AI decide'] });
                  } else {
                    updateFormData('ecommercePayments', { accountingPlatforms: removeAIDecision(data.accountingPlatforms) });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* NONE option */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="accountingPlatform"
              checked={(data.accountingPlatforms || []).includes('NONE') || (data.accountingPlatforms || []).length === 0}
              onChange={(e) => {
                if (e.target.checked) {
                  updateFormData('ecommercePayments', { accountingPlatforms: ['NONE'] });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-blue-600 text-sm font-medium">NONE</span>
          </label>
          
          {accountingPlatforms.map((platform) => (
            <label key={platform} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="accountingPlatform"
                checked={(data.accountingPlatforms || []).includes(platform)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { accountingPlatforms: [platform] });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{platform}</span>
            </label>
          ))}
        </div>
      </div>

      {/* E-Commerce Providers */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">E-Commerce Providers</h3>
        <p className="text-gray-600 mb-4">Select your preferred e-commerce platform:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* AI Decision Radio with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="ecommerceProviders"
                checked={(data.ecommerceProviders || []).includes('Let the AI decide')}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { ecommerceProviders: ['Let the AI decide'] });
                  } else {
                    updateFormData('ecommercePayments', { ecommerceProviders: removeAIDecision(data.ecommerceProviders) });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* NONE option */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="ecommerceProviders"
              checked={(data.ecommerceProviders || []).includes('NONE') || (data.ecommerceProviders || []).length === 0}
              onChange={(e) => {
                if (e.target.checked) {
                  updateFormData('ecommercePayments', { ecommerceProviders: ['NONE'] });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-blue-600 text-sm font-medium">NONE</span>
          </label>
          
          {ecommerceProviders.map((provider) => (
            <label key={provider} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="ecommerceProviders"
                checked={(data.ecommerceProviders || []).includes(provider)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('ecommercePayments', { ecommerceProviders: [provider] });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{provider}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}