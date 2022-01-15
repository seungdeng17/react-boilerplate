const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, '../', 'src/'),
      '@assets': path.resolve(__dirname, '../', 'src/assets/'),
      '@components': path.resolve(__dirname, '../', 'src/components/'),
      '@constants': path.resolve(__dirname, '../', 'src/constants/'),
      '@hooks': path.resolve(__dirname, '../', 'src/hooks/'),
      '@pages': path.resolve(__dirname, '../', 'src/pages/'),
      '@state': path.resolve(__dirname, '../', 'src/state/'),
      '@styles': path.resolve(__dirname, '../', 'src/styles/'),
      '@utils': path.resolve(__dirname, '../', 'src/utils/'),
    };

    return config;
  },
};
