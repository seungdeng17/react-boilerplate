const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, '../', 'src/'),
      '@asset': path.resolve(__dirname, '../', 'src/asset/'),
      '@components': path.resolve(__dirname, '../', 'src/components/'),
      '@constant': path.resolve(__dirname, '../', 'src/constant/'),
      '@hook': path.resolve(__dirname, '../', 'src/hook/'),
      '@page': path.resolve(__dirname, '../', 'src/page/'),
      '@store': path.resolve(__dirname, '../', 'src/store/'),
      '@style': path.resolve(__dirname, '../', 'src/style/'),
      '@util': path.resolve(__dirname, '../', 'src/util/'),
    };

    return config;
  },
};
