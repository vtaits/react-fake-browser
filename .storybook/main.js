module.exports = {
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
  ],
  stories: ['../packages/**/*.stories.tsx'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
