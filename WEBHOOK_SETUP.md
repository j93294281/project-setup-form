# Webhook Setup Instructions

The multi-stage form now submits data to a webhook endpoint instead of downloading a file.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Both Form and Webhook Server
```bash
npm run dev
```
This will start:
- React form on http://localhost:3000
- Webhook server on http://localhost:3001

### 3. Alternative: Start Individually

#### Start Webhook Server Only:
```bash
npm run webhook
```

#### Start React App Only:
```bash
npm start
```

## Webhook Configuration

### Default Endpoint
- **URL**: `https://peterallenschuh.app.n8n.cloud/form/0615e0eb-d7cf-4ddb-8ee4-f31e7698be22`
- **Method**: POST
- **Content-Type**: application/json

### Data Format Sent to Webhook
```json
{
  "generatedAt": "2025-01-20T...",
  "formVersion": "1.0.0",
  "totalPages": 29,
  "completedPages": 12,
  "configuration": {
    "developerInfo": { ... },
    "companyInfo": { ... },
    "defaultPreferences": { ... },
    "projectManagement": { ... },
    "versionControl": { ... },
    "developmentEnvironment": { ... },
    "packageManagement": { ... },
    "buildBundling": { ... },
    "ecommercePayments": { ... },
    "fileStorageEmail": { ... },
    "mapsGeolocation": { ... },
    "securityAuth": { ... },
    "communicationAPIs": { ... },
    "dnsConfiguration": { ... },
    "techStack": { ... },
    "stateManagement": { ... },
    "backendAPI": { ... },
    "headlessCMS": { ... },
    "searchPlatforms": { ... },
    "databasesStorage": { ... },
    "cloudInfrastructure": { ... },
    "stylingDesign": { ... },
    "testingCodeQuality": { ... },
    "deploymentCICD": { ... },
    "analyticsMonitoring": { ... },
    "financialAPIs": { ... },
    "aiIntegration": { ... },
    "mobileDesktop": { ... },
    "appConfiguration": { ... }
  }
}
```

## Webhook Response Format

### Success Response (200)
```json
{
  "success": true,
  "message": "Configuration received and processed successfully",
  "timestamp": "2025-01-20T...",
  "dataReceived": {
    "totalPages": 15,
    "completedPages": 12,
    "sectionsReceived": 15
  },
  "savedAs": "form-submission-2025-01-20T....json"
}
```

### Error Response (500)
```json
{
  "success": false,
  "message": "Failed to process configuration",
  "error": "Error details..."
}
```

## Error Handling

If the webhook is not available:
1. Form will attempt to POST to `https://encinitaseyes.app.n8n.cloud/form/0615e0eb-d7cf-4ddb-8ee4-f31e7698be22`
2. If it fails, user gets an error message with details
3. No file download occurs - webhook submission is required

## Customizing Webhook URL

To change the webhook URL, edit `src/components/MultiStageForm.tsx`:
```typescript
const response = await fetch('https://peterallenschuh.app.n8n.cloud/form/0615e0eb-d7cf-4ddb-8ee4-f31e7698be22', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(configData)
});
```

## Testing the Webhook

### Health Check
```bash
curl http://localhost:3001/health
```

### Manual Test
```bash
curl -X POST https://peterallenschuh.app.n8n.cloud/form/0615e0eb-d7cf-4ddb-8ee4-f31e7698be22 \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## Data Storage

The webhook server automatically:
- Logs all submissions to console
- Saves submissions to `webhook-data/` directory
- Creates timestamped JSON files for each submission

## Production Deployment

For production use:
1. Replace `http://localhost:3001/webhook` with your production webhook URL
2. Add proper authentication if needed
3. Implement proper error handling and retry logic
4. Consider using HTTPS for secure data transmission

## Troubleshooting

### "Webhook submission failed" Error
1. Make sure webhook server is running: `npm run webhook`
2. Check if port 3001 is available
3. Verify CORS is properly configured
4. Check browser console for detailed error messages
5. **Note**: No file download fallback - webhook must be working

### Port Already in Use
If port 3001 is busy, edit `webhook-server.js` and change:
```javascript
const PORT = 3002; // or any available port
```

Then update the fetch URL in `MultiStageForm.tsx` accordingly.