import React from 'react';
import { MultiStageFormData } from '../../types/FormTypes';

interface Props {
  formData: MultiStageFormData;
  updateFormData: <K extends keyof MultiStageFormData>(
    section: K,
    data: Partial<MultiStageFormData[K]>
  ) => void;
  nextPage: () => void;
  previousPage: () => void;
  skipPage: () => void;
  canSkip?: boolean;
}

interface PageTemplateProps extends Props {
  title: string;
  description: string;
}

export default function PageTemplate({ 
  title, 
  description, 
  canSkip = false, 
  skipPage 
}: PageTemplateProps) {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-700 text-sm">
            This page is under construction. The form structure and fields will be implemented based on the comprehensive requirements.
          </p>
          {canSkip && (
            <button
              onClick={skipPage}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Skip This Page for Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Create page components for all the new sections
export const ProjectManagementPage = (props: Props) => (
  <PageTemplate 
    title="�� Project Management" 
    description="Workflow and documentation tools"
    canSkip={true}
    {...props}
  />
);

export const VersionControlPage = (props: Props) => (
  <PageTemplate 
    title="🔧 Version Control & Code Hosting" 
    description="Code repository and collaboration"
    canSkip={false}
    {...props}
  />
);

export const DevelopmentEnvironmentPage = (props: Props) => (
  <PageTemplate 
    title="💻 Development Environment" 
    description="IDE and development tools"
    canSkip={true}
    {...props}
  />
);

export const PackageManagementPage = (props: Props) => (
  <PageTemplate 
    title="📦 Package Management" 
    description="Dependency and monorepo management"
    canSkip={false}
    {...props}
  />
);

export const BuildBundlingPage = (props: Props) => (
  <PageTemplate 
    title="🔨 Build & Bundling" 
    description="Build tools and transpilers"
    canSkip={false}
    {...props}
  />
);

export const StateManagementPage = (props: Props) => (
  <PageTemplate 
    title="💾 State Management & Data Fetching" 
    description="Client-side state and API data"
    canSkip={true}
    {...props}
  />
);

export const BackendAPIPage = (props: Props) => (
  <PageTemplate 
    title="🌐 Backend & API" 
    description="Server-side frameworks and API design"
    canSkip={false}
    {...props}
  />
);

export const HeadlessCMSPage = (props: Props) => (
  <PageTemplate 
    title="📝 Headless CMS" 
    description="Content management systems"
    canSkip={true}
    {...props}
  />
);

export const SearchPlatformsPage = (props: Props) => (
  <PageTemplate 
    title="🔍 Search Platforms" 
    description="Search and discovery services"
    canSkip={true}
    {...props}
  />
);

export const DatabasesStoragePage = (props: Props) => (
  <PageTemplate 
    title="🗄️ Databases & Storage" 
    description="Data storage and management"
    canSkip={false}
    {...props}
  />
);

export const TestingCodeQualityPage = (props: Props) => (
  <PageTemplate 
    title="✅ Testing & Code Quality" 
    description="Testing frameworks and quality tools"
    canSkip={false}
    {...props}
  />
);

export const DeploymentCICDPage = (props: Props) => (
  <PageTemplate 
    title="🚀 Deployment & CI/CD" 
    description="Deployment and continuous integration"
    canSkip={false}
    {...props}
  />
);

export const AnalyticsMonitoringPage = (props: Props) => (
  <PageTemplate 
    title="📊 Analytics & Monitoring" 
    description="Performance and user analytics"
    canSkip={true}
    {...props}
  />
);

export const MobileDesktopPage = (props: Props) => (
  <PageTemplate 
    title="📱 Mobile & Desktop" 
    description="Cross-platform development"
    canSkip={true}
    {...props}
  />
);

export const FileStorageEmailPage = (props: Omit<Props, 'title' | 'description'>) => (
  <PageTemplate 
    {...props} 
    title="File Storage & Email" 
    description="Configure file storage and email service preferences" 
  />
);

export const MapsGeolocationPage = (props: Omit<Props, 'title' | 'description' | 'canSkip'>) => (
  <PageTemplate 
    {...props} 
    title="Maps & Geolocation" 
    description="Set up mapping and location services" 
    canSkip={true}
  />
);

export const SecurityAuthPage = (props: Omit<Props, 'title' | 'description'>) => (
  <PageTemplate 
    {...props} 
    title="Security & Authentication" 
    description="Configure authentication and security preferences" 
  />
);

export const CommunicationAPIsPage = (props: Omit<Props, 'title' | 'description' | 'canSkip'>) => (
  <PageTemplate 
    {...props} 
    title="Communication & APIs" 
    description="Set up communication services and API integrations" 
    canSkip={true}
  />
);

export const DnsConfigurationPage = (props: Omit<Props, 'title' | 'description'>) => (
  <PageTemplate 
    {...props} 
    title="DNS, CDN & SSL" 
    description="Configure domain, CDN, and SSL preferences" 
  />
);

export const TechStackPage = (props: Omit<Props, 'title' | 'description'>) => (
  <PageTemplate 
    {...props} 
    title="Tech Stack & Languages" 
    description="Choose programming languages, frameworks, and databases" 
  />
);

export const CloudInfrastructurePage = (props: Omit<Props, 'title' | 'description'>) => (
  <PageTemplate 
    {...props} 
    title="Cloud & Infrastructure" 
    description="Select hosting and deployment platforms" 
  />
);

export const StylingDesignPage = (props: Omit<Props, 'title' | 'description'>) => (
  <PageTemplate 
    {...props} 
    title="Styling & Design" 
    description="Choose UI frameworks and design preferences" 
  />
);

export const FinancialAPIsPage = (props: Omit<Props, 'title' | 'description' | 'canSkip'>) => (
  <PageTemplate 
    {...props} 
    title="Financial APIs" 
    description="Configure banking and investment services (if applicable)" 
    canSkip={true}
  />
);

export const AIIntegrationPage = (props: Omit<Props, 'title' | 'description' | 'canSkip'>) => (
  <PageTemplate 
    {...props} 
    title="AI & MCPs" 
    description="Set up AI services and tools" 
    canSkip={true}
  />
);

export const AppConfigurationPage = (props: Omit<Props, 'title' | 'description'>) => (
  <PageTemplate 
    {...props} 
    title="App Configuration" 
    description="Define your app details and target audience" 
  />
);