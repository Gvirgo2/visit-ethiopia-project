// API Configuration
export const API_CONFIG = {
  // Production API URL
  PRODUCTION_URL: 'https://visit-ethiopia-backend-ku5l.vercel.app',
  
  // Development API URL (for local development)
  DEVELOPMENT_URL: 'http://localhost:5000',
  
  // Get the appropriate URL based on environment
  getBaseURL: () => {
    const env = import.meta.env.MODE;
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    
    if (envUrl) {
      return envUrl;
    }
    
    return env === 'development' 
      ? API_CONFIG.DEVELOPMENT_URL 
      : API_CONFIG.PRODUCTION_URL;
  }
};

export default API_CONFIG; 