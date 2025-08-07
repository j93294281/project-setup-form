import React from 'react';
import { MultiStageFormData, DeveloperInfo } from '../../types/FormTypes';

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

export default function DeveloperInfoPage({ formData, updateFormData }: Omit<Props, 'nextPage' | 'previousPage' | 'skipPage'>) {
  const data = formData.developerInfo;

  const handleInputChange = (field: keyof DeveloperInfo, value: string | File) => {
    updateFormData('developerInfo', { [field]: value });
  };

  const handleCheckboxChange = (field: keyof DeveloperInfo, value: string, checked: boolean) => {
    const currentValues = (data[field] as string[]) || [];
    if (checked) {
      updateFormData('developerInfo', { [field]: [...currentValues, value] });
    } else {
      updateFormData('developerInfo', { [field]: currentValues.filter(v => v !== value) });
    }
  };

  const developerEnvironments = [
    'Claude Code',
    'Cursor AI',
    'Gemini Code',
    'JetBrains IDEs',
    'Jupyter',
    'Notepad++',
    'Spyder',
    'Sublime Text',
    'Vim/Emacs',
    'Visual Studio',
    'Visual Studio Code',
    'Windsurf'
  ];

  const designTools = [
    'Adobe XD',
    'Figma',
    'Sketch'
  ];

  // Comprehensive international country list
  const countries = [
    { code: 'US', name: 'United States', phone: '+1' },
    { code: 'AF', name: 'Afghanistan', phone: '+93' },
    { code: 'AL', name: 'Albania', phone: '+355' },
    { code: 'DZ', name: 'Algeria', phone: '+213' },
    { code: 'AD', name: 'Andorra', phone: '+376' },
    { code: 'AO', name: 'Angola', phone: '+244' },
    { code: 'AR', name: 'Argentina', phone: '+54' },
    { code: 'AM', name: 'Armenia', phone: '+374' },
    { code: 'AU', name: 'Australia', phone: '+61' },
    { code: 'AT', name: 'Austria', phone: '+43' },
    { code: 'AZ', name: 'Azerbaijan', phone: '+994' },
    { code: 'BH', name: 'Bahrain', phone: '+973' },
    { code: 'BD', name: 'Bangladesh', phone: '+880' },
    { code: 'BY', name: 'Belarus', phone: '+375' },
    { code: 'BE', name: 'Belgium', phone: '+32' },
    { code: 'BZ', name: 'Belize', phone: '+501' },
    { code: 'BJ', name: 'Benin', phone: '+229' },
    { code: 'BT', name: 'Bhutan', phone: '+975' },
    { code: 'BO', name: 'Bolivia', phone: '+591' },
    { code: 'BA', name: 'Bosnia and Herzegovina', phone: '+387' },
    { code: 'BW', name: 'Botswana', phone: '+267' },
    { code: 'BR', name: 'Brazil', phone: '+55' },
    { code: 'BN', name: 'Brunei', phone: '+673' },
    { code: 'BG', name: 'Bulgaria', phone: '+359' },
    { code: 'BF', name: 'Burkina Faso', phone: '+226' },
    { code: 'BI', name: 'Burundi', phone: '+257' },
    { code: 'KH', name: 'Cambodia', phone: '+855' },
    { code: 'CM', name: 'Cameroon', phone: '+237' },
    { code: 'CA', name: 'Canada', phone: '+1' },
    { code: 'CV', name: 'Cape Verde', phone: '+238' },
    { code: 'CF', name: 'Central African Republic', phone: '+236' },
    { code: 'TD', name: 'Chad', phone: '+235' },
    { code: 'CL', name: 'Chile', phone: '+56' },
    { code: 'CN', name: 'China', phone: '+86' },
    { code: 'CO', name: 'Colombia', phone: '+57' },
    { code: 'KM', name: 'Comoros', phone: '+269' },
    { code: 'CG', name: 'Congo', phone: '+242' },
    { code: 'CR', name: 'Costa Rica', phone: '+506' },
    { code: 'HR', name: 'Croatia', phone: '+385' },
    { code: 'CU', name: 'Cuba', phone: '+53' },
    { code: 'CY', name: 'Cyprus', phone: '+357' },
    { code: 'CZ', name: 'Czech Republic', phone: '+420' },
    { code: 'CD', name: 'Democratic Republic of the Congo', phone: '+243' },
    { code: 'DK', name: 'Denmark', phone: '+45' },
    { code: 'DJ', name: 'Djibouti', phone: '+253' },
    { code: 'DO', name: 'Dominican Republic', phone: '+1' },
    { code: 'EC', name: 'Ecuador', phone: '+593' },
    { code: 'EG', name: 'Egypt', phone: '+20' },
    { code: 'SV', name: 'El Salvador', phone: '+503' },
    { code: 'GQ', name: 'Equatorial Guinea', phone: '+240' },
    { code: 'ER', name: 'Eritrea', phone: '+291' },
    { code: 'EE', name: 'Estonia', phone: '+372' },
    { code: 'ET', name: 'Ethiopia', phone: '+251' },
    { code: 'FJ', name: 'Fiji', phone: '+679' },
    { code: 'FI', name: 'Finland', phone: '+358' },
    { code: 'FR', name: 'France', phone: '+33' },
    { code: 'GA', name: 'Gabon', phone: '+241' },
    { code: 'GM', name: 'Gambia', phone: '+220' },
    { code: 'GE', name: 'Georgia', phone: '+995' },
    { code: 'DE', name: 'Germany', phone: '+49' },
    { code: 'GH', name: 'Ghana', phone: '+233' },
    { code: 'GR', name: 'Greece', phone: '+30' },
    { code: 'GT', name: 'Guatemala', phone: '+502' },
    { code: 'GN', name: 'Guinea', phone: '+224' },
    { code: 'GW', name: 'Guinea-Bissau', phone: '+245' },
    { code: 'GY', name: 'Guyana', phone: '+592' },
    { code: 'HT', name: 'Haiti', phone: '+509' },
    { code: 'HN', name: 'Honduras', phone: '+504' },
    { code: 'HK', name: 'Hong Kong', phone: '+852' },
    { code: 'HU', name: 'Hungary', phone: '+36' },
    { code: 'IS', name: 'Iceland', phone: '+354' },
    { code: 'IN', name: 'India', phone: '+91' },
    { code: 'ID', name: 'Indonesia', phone: '+62' },
    { code: 'IR', name: 'Iran', phone: '+98' },
    { code: 'IQ', name: 'Iraq', phone: '+964' },
    { code: 'IE', name: 'Ireland', phone: '+353' },
    { code: 'IL', name: 'Israel', phone: '+972' },
    { code: 'IT', name: 'Italy', phone: '+39' },
    { code: 'CI', name: 'Ivory Coast', phone: '+225' },
    { code: 'JM', name: 'Jamaica', phone: '+1' },
    { code: 'JP', name: 'Japan', phone: '+81' },
    { code: 'JO', name: 'Jordan', phone: '+962' },
    { code: 'KZ', name: 'Kazakhstan', phone: '+7' },
    { code: 'KE', name: 'Kenya', phone: '+254' },
    { code: 'KW', name: 'Kuwait', phone: '+965' },
    { code: 'KG', name: 'Kyrgyzstan', phone: '+996' },
    { code: 'LA', name: 'Laos', phone: '+856' },
    { code: 'LV', name: 'Latvia', phone: '+371' },
    { code: 'LB', name: 'Lebanon', phone: '+961' },
    { code: 'LS', name: 'Lesotho', phone: '+266' },
    { code: 'LR', name: 'Liberia', phone: '+231' },
    { code: 'LY', name: 'Libya', phone: '+218' },
    { code: 'LT', name: 'Lithuania', phone: '+370' },
    { code: 'LU', name: 'Luxembourg', phone: '+352' },
    { code: 'MO', name: 'Macau', phone: '+853' },
    { code: 'MK', name: 'Macedonia', phone: '+389' },
    { code: 'MG', name: 'Madagascar', phone: '+261' },
    { code: 'MW', name: 'Malawi', phone: '+265' },
    { code: 'MY', name: 'Malaysia', phone: '+60' },
    { code: 'MV', name: 'Maldives', phone: '+960' },
    { code: 'ML', name: 'Mali', phone: '+223' },
    { code: 'MT', name: 'Malta', phone: '+356' },
    { code: 'MR', name: 'Mauritania', phone: '+222' },
    { code: 'MU', name: 'Mauritius', phone: '+230' },
    { code: 'MX', name: 'Mexico', phone: '+52' },
    { code: 'MD', name: 'Moldova', phone: '+373' },
    { code: 'MC', name: 'Monaco', phone: '+377' },
    { code: 'MN', name: 'Mongolia', phone: '+976' },
    { code: 'ME', name: 'Montenegro', phone: '+382' },
    { code: 'MA', name: 'Morocco', phone: '+212' },
    { code: 'MZ', name: 'Mozambique', phone: '+258' },
    { code: 'MM', name: 'Myanmar', phone: '+95' },
    { code: 'NA', name: 'Namibia', phone: '+264' },
    { code: 'NP', name: 'Nepal', phone: '+977' },
    { code: 'NL', name: 'Netherlands', phone: '+31' },
    { code: 'NZ', name: 'New Zealand', phone: '+64' },
    { code: 'NI', name: 'Nicaragua', phone: '+505' },
    { code: 'NE', name: 'Niger', phone: '+227' },
    { code: 'NG', name: 'Nigeria', phone: '+234' },
    { code: 'NO', name: 'Norway', phone: '+47' },
    { code: 'OM', name: 'Oman', phone: '+968' },
    { code: 'PK', name: 'Pakistan', phone: '+92' },
    { code: 'PA', name: 'Panama', phone: '+507' },
    { code: 'PG', name: 'Papua New Guinea', phone: '+675' },
    { code: 'PY', name: 'Paraguay', phone: '+595' },
    { code: 'PE', name: 'Peru', phone: '+51' },
    { code: 'PH', name: 'Philippines', phone: '+63' },
    { code: 'PL', name: 'Poland', phone: '+48' },
    { code: 'PT', name: 'Portugal', phone: '+351' },
    { code: 'QA', name: 'Qatar', phone: '+974' },
    { code: 'RO', name: 'Romania', phone: '+40' },
    { code: 'RU', name: 'Russia', phone: '+7' },
    { code: 'RW', name: 'Rwanda', phone: '+250' },
    { code: 'SA', name: 'Saudi Arabia', phone: '+966' },
    { code: 'SN', name: 'Senegal', phone: '+221' },
    { code: 'RS', name: 'Serbia', phone: '+381' },
    { code: 'SG', name: 'Singapore', phone: '+65' },
    { code: 'SK', name: 'Slovakia', phone: '+421' },
    { code: 'SI', name: 'Slovenia', phone: '+386' },
    { code: 'SO', name: 'Somalia', phone: '+252' },
    { code: 'ZA', name: 'South Africa', phone: '+27' },
    { code: 'KR', name: 'South Korea', phone: '+82' },
    { code: 'ES', name: 'Spain', phone: '+34' },
    { code: 'LK', name: 'Sri Lanka', phone: '+94' },
    { code: 'SD', name: 'Sudan', phone: '+249' },
    { code: 'SR', name: 'Suriname', phone: '+597' },
    { code: 'SE', name: 'Sweden', phone: '+46' },
    { code: 'CH', name: 'Switzerland', phone: '+41' },
    { code: 'SY', name: 'Syria', phone: '+963' },
    { code: 'TW', name: 'Taiwan', phone: '+886' },
    { code: 'TJ', name: 'Tajikistan', phone: '+992' },
    { code: 'TZ', name: 'Tanzania', phone: '+255' },
    { code: 'TH', name: 'Thailand', phone: '+66' },
    { code: 'TL', name: 'Timor-Leste', phone: '+670' },
    { code: 'TG', name: 'Togo', phone: '+228' },
    { code: 'TN', name: 'Tunisia', phone: '+216' },
    { code: 'TR', name: 'Turkey', phone: '+90' },
    { code: 'TM', name: 'Turkmenistan', phone: '+993' },
    { code: 'UG', name: 'Uganda', phone: '+256' },
    { code: 'UA', name: 'Ukraine', phone: '+380' },
    { code: 'AE', name: 'United Arab Emirates', phone: '+971' },
    { code: 'GB', name: 'United Kingdom', phone: '+44' },
    { code: 'UY', name: 'Uruguay', phone: '+598' },
    { code: 'UZ', name: 'Uzbekistan', phone: '+998' },
    { code: 'VE', name: 'Venezuela', phone: '+58' },
    { code: 'VN', name: 'Vietnam', phone: '+84' },
    { code: 'YE', name: 'Yemen', phone: '+967' },
    { code: 'ZM', name: 'Zambia', phone: '+260' },
    { code: 'ZW', name: 'Zimbabwe', phone: '+263' }
  ];



  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Developer Information</h2>
        <p className="text-gray-600">Please provide your personal developer details</p>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        
        <div className="grid grid-cols-1 gap-6 items-start">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address (where we send your info) *
            </label>
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={data.fullName || ''}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              value={data.streetAddress || ''}
              onChange={(e) => handleInputChange('streetAddress', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="123 Developer Street, Apt 4B"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              value={data.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Tech City"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State/Province/Region *
            </label>
            <input
              type="text"
              value={data.stateProvince || ''}
              onChange={(e) => handleInputChange('stateProvince', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="California / Ontario / Bavaria"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postal Code *
            </label>
            <input
              type="text"
              value={data.postalCode || ''}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="12345 / A1B 2C3 / 12345-678"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <select
              value={data.country || ''}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            >
              <option value="">Select your country</option>
              {countries.map(country => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="flex w-full">
              <select
                value={data.countryCode || '+1'}
                onChange={(e) => handleInputChange('countryCode', e.target.value)}
                className="w-3/5 px-1 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-xs"
              >
                {countries.map(country => (
                  <option key={country.code} value={country.phone}>
                    {country.name} {country.phone}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={data.phoneNumber || ''}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="w-2/5 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Developer Operating System */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Developer Operating System</h3>
        <p className="text-gray-600 mb-4">Select the operating systems you use for development:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Windows */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.operatingSystem || []).includes('Windows')}
              onChange={(e) => handleCheckboxChange('operatingSystem', 'Windows', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 text-sm">Windows</span>
          </label>
          
          {/* Linux */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.operatingSystem || []).includes('Linux')}
              onChange={(e) => handleCheckboxChange('operatingSystem', 'Linux', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 text-sm">Linux</span>
          </label>
          
          {/* Apple */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.operatingSystem || []).includes('Apple')}
              onChange={(e) => handleCheckboxChange('operatingSystem', 'Apple', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 text-sm">Apple</span>
          </label>
        </div>
      </div>

      {/* Developer Environment */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Developer Environment</h3>
        <p className="text-gray-600 mb-4">Select the development environments and editors you use:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* NONE option */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(data.developerEnvironment || []).includes('NONE') || (data.developerEnvironment || []).length === 0}
              onChange={(e) => {
                if (e.target.checked) {
                  updateFormData('developerInfo', { developerEnvironment: ['NONE'] });
                } else {
                  updateFormData('developerInfo', { developerEnvironment: [] });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-blue-600 text-sm font-medium">NONE</span>
          </label>
          
          {developerEnvironments.map((environment) => (
            <label key={environment} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data.developerEnvironment || []).includes(environment)}
                onChange={(e) => handleCheckboxChange('developerEnvironment', environment, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{environment}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Design & Prototyping Tools */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Design & Prototyping Tools</h3>
        <p className="text-gray-600 mb-4">Select the design tool you will use for this app:</p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* NONE option */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="designTools"
              checked={(data.designTools || []).includes('NONE') || (data.designTools || []).length === 0}
              onChange={(e) => {
                if (e.target.checked) {
                  updateFormData('developerInfo', { designTools: ['NONE'] });
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-blue-600 text-sm font-medium">NONE</span>
          </label>
          
          {designTools.map((tool) => (
            <label key={tool} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="designTools"
                checked={(data.designTools || []).includes(tool)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('developerInfo', { designTools: [tool] });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{tool}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Social Media & Online Presence */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Social Media & Online Presence</h3>
        <p className="text-gray-600 mb-4">Enter just your username/handle without @ symbol (e.g., "johndoe" not "@johndoe" or "https://twitter.com/johndoe"):</p>
        
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn Username
            </label>
            <input
              type="text"
              value={data.developerLinkedin || ''}
              onChange={(e) => handleInputChange('developerLinkedin', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="yourprofile"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              X/Twitter Username
            </label>
            <input
              type="text"
              value={data.developerTwitter || ''}
              onChange={(e) => handleInputChange('developerTwitter', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="yourusername"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook Username
            </label>
            <input
              type="text"
              value={data.developerFacebook || ''}
              onChange={(e) => handleInputChange('developerFacebook', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="yourprofile"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram Username
            </label>
            <input
              type="text"
              value={data.developerInstagram || ''}
              onChange={(e) => handleInputChange('developerInstagram', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="yourusername"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Username
            </label>
            <input
              type="text"
              value={data.developerYoutube || ''}
              onChange={(e) => handleInputChange('developerYoutube', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="yourchannel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub Username
            </label>
            <input
              type="text"
              value={data.developerGithub || ''}
              onChange={(e) => handleInputChange('developerGithub', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="yourusername"
            />
          </div>
        </div>
      </div>

      {/* Developer Assets */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Developer Assets</h3>
        
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo
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
                    handleInputChange('developerLogo', file);
                  } else {
                    alert('Please select a valid image file (JPG, PNG, BMP, or TIFF only). SVG, GIF, ICO, and other formats are not allowed for security reasons.');
                    e.target.value = '';
                  }
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Upload your developer logo (JPG, PNG, BMP, or TIFF only - SVG, GIF, ICO, and other formats not allowed for security)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar
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
                    handleInputChange('developerAvatar', file);
                  } else {
                    alert('Please select a valid image file (JPG, PNG, BMP, or TIFF only). SVG, GIF, ICO, and other formats are not allowed for security reasons.');
                    e.target.value = '';
                  }
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Upload your profile avatar (JPG, PNG, BMP, or TIFF only - SVG, GIF, ICO, and other formats not allowed for security)</p>
          </div>
        </div>
      </div>
    </div>
  );
}