const { useCallback } = require('react');
const throttle = require('.');

module.exports = function useThrottle(func, options) {
  return useCallback(throttle(func, options));
};
