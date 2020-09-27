module.exports = api => {
  api.cache(true);

  return {
    presets: [
      'module:metro-react-native-babel-preset',
      '@babel/preset-flow',
    ],
    retainLines: true,
    plugins: [
      [
        'module-resolver',
        {
          root: [
            './src',
          ],
          alias: {
            'package.json': './package.json',
            testData: './__tests__/data',
          },
        },
      ],
      'transform-inline-environment-variables',
    ],
  };
};
