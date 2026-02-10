module.exports = ({env}) => {
  // Get allowed IPs from environment variable
  const allowedIPs = env('MCP_ALLOWED_IPS');
  
  // If no env variable set, default to '*' (allow all)
  // Otherwise use the value from env (can be '*' or comma-separated IPs)
  const ipConfig = !allowedIPs 
    ? '*' 
    : allowedIPs === '*' 
      ? '*' 
      : allowedIPs.split(',').map(ip => ip.trim());
  
  return {
    // MCP Plugin Configuration
    mcp: {
      enabled: true,
      config: {
        // Session management - using memory for development
        session: {
          type: 'memory',
          max: 20, // Maximum number of sessions to keep in memory
          ttlMs: 600000, // Session timeout: 10 minutes
          updateAgeOnGet: true // Reset TTL on session access
        },
        // IP Allowlist:
        // - No MCP_ALLOWED_IPS env var = '*' (allow all IPs)
        // - MCP_ALLOWED_IPS='*' = allow all IPs
        // - MCP_ALLOWED_IPS='127.0.0.1,::1' = allow specific IPs only
        allowedIPs: ipConfig,
      }
    }
  };
};
