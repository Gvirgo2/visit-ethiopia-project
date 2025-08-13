import { useState } from "react";
import axios from "../api/axios";

const CorsTest = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results = {};

    try {
      // Test 1: Basic connectivity
      console.log("Testing basic connectivity...");
      const response1 = await axios.get("/");
      results.basicConnectivity = {
        success: true,
        status: response1.status,
        data: response1.data,
      };
    } catch (error) {
      results.basicConnectivity = {
        success: false,
        error: error.message,
        status: error.response?.status,
      };
    }

    try {
      // Test 2: Auth test endpoint
      console.log("Testing auth test endpoint...");
      const response2 = await axios.get("/api/v1/users/test-connection");
      results.authTest = {
        success: true,
        status: response2.status,
        data: response2.data,
      };
    } catch (error) {
      results.authTest = {
        success: false,
        error: error.message,
        status: error.response?.status,
      };
    }

    try {
      // Test 3: CORS test
      console.log("Testing CORS...");
      const response3 = await axios.options("/api/v1/users/test-connection");
      results.corsTest = {
        success: true,
        status: response3.status,
        headers: response3.headers,
      };
    } catch (error) {
      results.corsTest = {
        success: false,
        error: error.message,
        status: error.response?.status,
      };
    }

    setTestResults(results);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">API Integration Test</h2>
        
        <button
          onClick={runTests}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Running Tests..." : "Run Tests"}
        </button>

        {Object.keys(testResults).length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Test Results:</h3>
            
            {Object.entries(testResults).map(([testName, result]) => (
              <div
                key={testName}
                className={`p-4 rounded border ${
                  result.success
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <h4 className="font-semibold capitalize">
                  {testName.replace(/([A-Z])/g, " $1")}:
                  <span
                    className={`ml-2 ${
                      result.success ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {result.success ? "✅ PASS" : "❌ FAIL"}
                  </span>
                </h4>
                
                {result.success ? (
                  <div className="mt-2 text-sm">
                    <p>Status: {result.status}</p>
                    {result.data && (
                      <pre className="mt-2 bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    )}
                  </div>
                ) : (
                  <div className="mt-2 text-sm text-red-600">
                    <p>Error: {result.error}</p>
                    {result.status && <p>Status: {result.status}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CorsTest; 