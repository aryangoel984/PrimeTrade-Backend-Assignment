// This middleware checks if the user's role matches the required role
const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    
    // Safety check: Ensure the auth middleware ran first
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: 'Unauthorized: No role found' });
    }

    // Check if the user has the required role
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    next(); // If they pass the check, allow them to hit the API controller
  };
};

module.exports = authorizeRole;