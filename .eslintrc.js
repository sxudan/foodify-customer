module.exports = {
  root: true,
  extends: ['@react-native', 'eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['react', 'react-native'],
  ignorePatterns: ['src/graphql/generated.tsx'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/no-unstable-nested-components': ['off'],
    'no-shadow': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'info', 'debug'] }],
    // 'react-native/no-raw-text': [
    //   2,
    //   {
    //     skip: ['AppText', 'Title'],
    //   },
    // ],
    // 'react-native/no-raw-text': 'off', // Had to disable this due to bug crashing eslint https://github.com/Intellicode/eslint-plugin-react-native/issues/270. SHouldn't be an issue as React Native would throw an error during development or testing anyway
    '@typescript-eslint/no-shadow': 'off',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 0,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react-native/sort-styles': ['error', 'asc', { ignoreClassNames: false, ignoreStyleProperties: true }],
    'jsx-quotes': ['error', 'prefer-single'],
    'prettier/prettier': 0,
    'default-case': 'error',
    curly: 'error',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'react-native/react-native': true,
  },
};
