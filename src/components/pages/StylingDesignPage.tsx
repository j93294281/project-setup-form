import React from 'react';
import { MultiStageFormData, StylingDesign, ColorsFonts } from '../../types/FormTypes';

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

export default function StylingDesignPage({ formData, updateFormData, skipPage, goToPage }: Omit<Props, 'nextPage' | 'previousPage'>) {
  const data = formData.stylingDesign;
  const colorsData = formData.colorsFonts || {};

  const handleInputChange = (field: keyof StylingDesign, value: string | string[] | File) => {
    updateFormData('stylingDesign', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof StylingDesign, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    if (checked) {
      // Remove 'Let the AI decide' if user selects a non-AI option
      const filteredValues = currentValues.filter(v => v !== 'Let the AI decide');
      handleInputChange(field, [...filteredValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(v => v !== value));
    }
  };

  const handleAICheckboxChange = (field: keyof StylingDesign, value: string, checked: boolean) => {
    if (checked) {
      updateFormData('stylingDesign', { [field]: ['Let the AI decide'] });
    } else {
      updateFormData('stylingDesign', { [field]: removeAIDecision(Array.isArray(data[field]) ? data[field] as string[] : []) });
    }
  };

  const handleColorsInputChange = (field: keyof ColorsFonts, value: string | boolean) => {
    updateFormData('colorsFonts', { [field]: value });
  };

  const handleCustomColorChange = (colorType: 'primaryBackground' | 'secondaryBackground' | 'accent' | 'text' | 'heading', value: string) => {
    const currentCustomColors = colorsData.customColors || {};
    updateFormData('colorsFonts', {
      customColors: {
        ...currentCustomColors,
        [colorType]: value
      }
    });
  };

  const getColorValue = (colorType: 'primaryBackground' | 'secondaryBackground' | 'accent' | 'text' | 'heading') => {
    const customColors = colorsData.customColors || {};
    if (customColors[colorType]) {
      return customColors[colorType];
    }
    
    // Default colors if no custom colors or theme selected
    const defaultColors = {
      primaryBackground: '#FFFFFF',
      secondaryBackground: '#F8F9FA',
      accent: '#0D6EFD',
      text: '#6C757D',
      heading: '#212529'
    };
    
    return defaultColors[colorType];
  };

  const cssFrameworks = [
    'Bootstrap',
    'Bulma',
    'DaisyUI',
    'Foundation',
    'Open Props',
    'Tailwind CSS'
  ];

  const styledUILibraries = [
    'Ant Design',
    'Chakra UI',
    'Fluent UI',
    'Mantine',
    'Material-UI (MUI)',
    'NextUI',
    'Vuetify'
  ];

  const headlessUILibraries = [
    'Headless UI',
    'Radix UI'
  ];

  const recipeUILibraries = [
    'Aceternity UI',
    'Catalyst',
    'Draft UI',
    'Keep React',
    'shadcn/ui',
    'shadcn-svelte',
    'shadcn-vue'
  ];



  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Styling & Design</h2>
        <p className="text-gray-600">Choose your preferred UI/UX and design preferences</p>
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



      {/* Your App's Visual Assets */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Your App&apos;s Visual Assets</h3>
        
        {/* AI Decision Checkbox */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.aiDecision || []).includes('Let the AI create this for you')}
                              onChange={(e) => {
                  if (e.target.checked) {
                    const currentValues = (data.aiDecision || []);
                    updateFormData('stylingDesign', { aiDecision: [...currentValues, 'Let the AI create this for you'] });
                  } else {
                                         updateFormData('stylingDesign', { aiDecision: removeAIDecision(Array.isArray(data.aiDecision) ? data.aiDecision as string[] : []) });
                  }
                }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-purple-600 font-medium">Let the AI create this for you</span>
          </label>
        </div>
        
        <p className="text-gray-600 mb-4">Upload key visual elements for your application. These will help us understand your brand and design preferences.</p>
        
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              App Logo
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.bmp,.tiff"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Additional security check for file type
                  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'image/tiff'];
                  if (allowedTypes.includes(file.type)) {
                    handleInputChange('appLogo', file);
                  } else {
                    alert('Please select a valid image file (JPG, PNG, BMP, or TIFF only). SVG, GIF, ICO, and other formats are not allowed for security reasons.');
                    e.target.value = '';
                  }
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Upload your app logo (JPG, PNG, BMP, or TIFF only - SVG, GIF, ICO, and other formats not allowed for security)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              App Icon
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.bmp,.tiff"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Additional security check for file type
                  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'image/tiff'];
                  if (allowedTypes.includes(file.type)) {
                    handleInputChange('appIcon', file);
                  } else {
                    alert('Please select a valid image file (JPG, PNG, BMP, or TIFF only). SVG, GIF, ICO, and other formats are not allowed for security reasons.');
                    e.target.value = '';
                  }
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Upload your app icon (JPG, PNG, BMP, or TIFF only - SVG, GIF, ICO, and other formats not allowed for security)</p>
          </div>
        </div>
      </div>




      {/* Design Approach Selection */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Add Some Screenshots For Color and Design Inspiration</h3>
        <p className="text-gray-600 mb-6">Either upload your screenshots or choose your preferred colors and styles below.</p>
        
        {/* Radio Button Selection */}
        <div className="mb-6">
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="designApproach"
                value="screenshots"
                checked={data.designApproach === 'screenshots'}
                onChange={(e) => handleInputChange('designApproach', e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium">Upload Screenshots for Design Inspiration</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="designApproach"
                value="manual"
                checked={data.designApproach === 'manual'}
                onChange={(e) => handleInputChange('designApproach', e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium">Manually Choose Colors and Styles</span>
            </label>
          </div>
        </div>

        {/* Screenshot Upload Section */}
        {data.designApproach === 'screenshots' && (
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">Upload screenshots of your preferred design inspiration. We'll analyze these to create a matching color palette and design system.</p>
            
            {/* Home Page Screenshot */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Home Page (Banner/Index Page)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    updateFormData('stylingDesign', { homePageScreenshot: file });
                  }
                }}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Form Page Screenshot */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Form Page
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    updateFormData('stylingDesign', { formPageScreenshot: file });
                  }
                }}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Sign-up Page Screenshot */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sign-up Page
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    updateFormData('stylingDesign', { signupPageScreenshot: file });
                  }
                }}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Pricing Page Screenshot */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pricing Page
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    updateFormData('stylingDesign', { pricingPageScreenshot: file });
                  }
                }}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        )}

        {/* Manual Color Selection */}
        {data.designApproach === 'manual' && (
          <>
            {/* Color Theme Selection */}
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-800 mb-3">Color Theme</h4>
              <p className="text-gray-600 mb-4">Choose a color theme or let AI decide based on your preferences.</p>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="colorTheme"
                    value="ai"
                    checked={colorsData.aiDecide === true}
                    onChange={(e) => handleColorsInputChange('aiDecide', true)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">Let AI decide the best colors for my project</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="colorTheme"
                    value="custom"
                    checked={colorsData.aiDecide === false}
                    onChange={(e) => handleColorsInputChange('aiDecide', false)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">I want to choose custom colors</span>
                </label>
              </div>
            </div>

            {/* Custom Color Inputs */}
            {!colorsData.aiDecide && (
              <div className="bg-white p-6 rounded-lg border mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-3">Customize Colors</h4>
                <p className="text-gray-600 mb-4">Select custom colors for your website theme.</p>
                
                <div className="grid grid-cols-1 gap-4">
                  {/* Primary Background */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Background
                    </label>
                    <input
                      type="color"
                      value={getColorValue('primaryBackground')}
                      onChange={(e) => handleCustomColorChange('primaryBackground', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Secondary Background */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Secondary Background
                    </label>
                    <input
                      type="color"
                      value={getColorValue('secondaryBackground')}
                      onChange={(e) => handleCustomColorChange('secondaryBackground', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Accent Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Accent Color
                    </label>
                    <input
                      type="color"
                      value={getColorValue('accent')}
                      onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Text Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Color
                    </label>
                    <input
                      type="color"
                      value={getColorValue('text')}
                      onChange={(e) => handleCustomColorChange('text', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Heading Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heading Color
                    </label>
                    <input
                      type="color"
                      value={getColorValue('heading')}
                      onChange={(e) => handleCustomColorChange('heading', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Customize Fonts */}
            <div className="bg-white p-6 rounded-lg border">
              <h4 className="text-md font-medium text-gray-800 mb-3">Customize Fonts</h4>
              <p className="text-gray-600 mb-4">
                Select your preferred font family for the website. These are ranked by popularity and usage across the web.
              </p>
              
              <div className="space-y-3">
                {/* Arial */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fontFamily"
                    value="Arial, sans-serif"
                    checked={colorsData.fontFamily === 'Arial, sans-serif'}
                    onChange={(e) => handleColorsInputChange('fontFamily', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>Arial</span>
                  <span className="text-gray-500 text-sm">(Most popular sans-serif font)</span>
                </label>

                {/* Helvetica */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fontFamily"
                    value="Helvetica, Arial, sans-serif"
                    checked={colorsData.fontFamily === 'Helvetica, Arial, sans-serif'}
                    onChange={(e) => handleColorsInputChange('fontFamily', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Helvetica</span>
                  <span className="text-gray-500 text-sm">(Clean, professional sans-serif)</span>
                </label>

                {/* Roboto */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fontFamily"
                    value="'Roboto', sans-serif"
                    checked={colorsData.fontFamily === "'Roboto', sans-serif"}
                    onChange={(e) => handleColorsInputChange('fontFamily', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium" style={{ fontFamily: "'Roboto', sans-serif" }}>Roboto</span>
                  <span className="text-gray-500 text-sm">(Google&apos;s modern sans-serif)</span>
                </label>

                {/* Open Sans */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fontFamily"
                    value="'Open Sans', sans-serif"
                    checked={colorsData.fontFamily === "'Open Sans', sans-serif"}
                    onChange={(e) => handleColorsInputChange('fontFamily', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium" style={{ fontFamily: "'Open Sans', sans-serif" }}>Open Sans</span>
                  <span className="text-gray-500 text-sm">(Highly readable web font)</span>
                </label>

                {/* Lato */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fontFamily"
                    value="'Lato', sans-serif"
                    checked={colorsData.fontFamily === "'Lato', sans-serif"}
                    onChange={(e) => handleColorsInputChange('fontFamily', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium" style={{ fontFamily: "'Lato', sans-serif" }}>Lato</span>
                  <span className="text-gray-500 text-sm">(Friendly, modern sans-serif)</span>
                </label>

                {/* Source Sans Pro */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fontFamily"
                    value="'Source Sans Pro', sans-serif"
                    checked={colorsData.fontFamily === "'Source Sans Pro', sans-serif"}
                    onChange={(e) => handleColorsInputChange('fontFamily', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>Source Sans Pro</span>
                  <span className="text-gray-500 text-sm">(Adobe&apos;s clean sans-serif)</span>
                </label>

                {/* Inter */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fontFamily"
                    value="'Inter', sans-serif"
                    checked={colorsData.fontFamily === "'Inter', sans-serif"}
                    onChange={(e) => handleColorsInputChange('fontFamily', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>Inter</span>
                  <span className="text-gray-500 text-sm">(Modern, highly legible sans-serif)</span>
                </label>

                {/* Georgia */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fontFamily"
                    value="Georgia, serif"
                    checked={colorsData.fontFamily === 'Georgia, serif'}
                    onChange={(e) => handleColorsInputChange('fontFamily', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium" style={{ fontFamily: 'Georgia, serif' }}>Georgia</span>
                  <span className="text-gray-500 text-sm">(Elegant serif font)</span>
                </label>

                {/* Times New Roman */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fontFamily"
                    value="'Times New Roman', Times, serif"
                    checked={colorsData.fontFamily === "'Times New Roman', Times, serif"}
                    onChange={(e) => handleColorsInputChange('fontFamily', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Times New Roman</span>
                  <span className="text-gray-500 text-sm">(Classic serif font)</span>
                </label>

                {/* Courier New */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fontFamily"
                    value="'Courier New', Courier, monospace"
                    checked={colorsData.fontFamily === "'Courier New', Courier, monospace"}
                    onChange={(e) => handleColorsInputChange('fontFamily', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium" style={{ fontFamily: "'Courier New', Courier, monospace" }}>Courier New</span>
                  <span className="text-gray-500 text-sm">(Monospace font)</span>
                </label>
              </div>
            </div>
          </>
        )}
      </div>

      {/* CSS Frameworks */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">CSS Frameworks</h3>
        <p className="text-gray-600 mb-4">Select all CSS frameworks you&apos;re comfortable with:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.cssFrameworks || []).includes('Let the AI decide')}
                onChange={(e) => handleAICheckboxChange('cssFrameworks', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => updateFormData('stylingDesign', { cssFrameworks: [...cssFrameworks] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('stylingDesign', { cssFrameworks: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {cssFrameworks.map((framework) => (
            <label key={framework} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.cssFrameworks || []).includes(framework)}
                onChange={(e) => handleCheckboxChange('cssFrameworks', framework, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{framework}</span>
            </label>
          ))}
        </div>


      </div>

      {/* Styled UI Libraries (All-in-One) */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Styled UI Libraries (All-in-One)</h3>
        <p className="text-gray-600 mb-4">Choose these for a complete, ready-to-use design system you install as a dependency. Fastest way to a consistent UI.</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.styledUILibraries || []).includes('Let the AI decide')}
                onChange={(e) => handleAICheckboxChange('styledUILibraries', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => updateFormData('stylingDesign', { styledUILibraries: [...styledUILibraries] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('stylingDesign', { styledUILibraries: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {styledUILibraries.map((library) => (
            <label key={library} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.styledUILibraries || []).includes(library)}
                onChange={(e) => handleCheckboxChange('styledUILibraries', library, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{library}</span>
            </label>
          ))}
        </div>


      </div>

      {/* Headless UI Libraries */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Headless UI Libraries</h3>
        <p className="text-gray-600 mb-4">Choose these for unstyled, accessible components that you style yourself. Most flexible but requires more design work.</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.headlessUILibraries || []).includes('Let the AI decide')}
                onChange={(e) => handleAICheckboxChange('headlessUILibraries', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => updateFormData('stylingDesign', { headlessUILibraries: [...headlessUILibraries] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('stylingDesign', { headlessUILibraries: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {headlessUILibraries.map((library) => (
            <label key={library} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.headlessUILibraries || []).includes(library)}
                onChange={(e) => handleCheckboxChange('headlessUILibraries', library, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{library}</span>
            </label>
          ))}
        </div>


      </div>

      {/* Recipe UI Libraries */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Recipe UI Libraries</h3>
        <p className="text-gray-600 mb-4">Choose these for copy-paste components that you can customize. Good balance of flexibility and speed.</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* AI Decision Checkbox with separation */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.recipeUILibraries || []).includes('Let the AI decide')}
                onChange={(e) => handleAICheckboxChange('recipeUILibraries', 'Let the AI decide', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-purple-600 font-medium">Let the AI decide</span>
            </label>
          </div>
          
          {/* Select All / Deselect All buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => updateFormData('stylingDesign', { recipeUILibraries: [...recipeUILibraries] })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Select All
            </button>
            <button
              onClick={() => updateFormData('stylingDesign', { recipeUILibraries: [] })}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Deselect All
            </button>
          </div>
          
          {recipeUILibraries.map((library) => (
            <label key={library} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.recipeUILibraries || []).includes(library)}
                onChange={(e) => handleCheckboxChange('recipeUILibraries', library, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{library}</span>
            </label>
          ))}
        </div>


      </div>
    </div>
  );
} 