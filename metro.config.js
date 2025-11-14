const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Configure path alias support for @ symbol
config.resolver = {
  ...config.resolver,
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  sourceExts: [...(config.resolver?.sourceExts || []), 'cjs'],
};

module.exports = config;
