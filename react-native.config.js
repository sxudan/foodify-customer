module.exports = {
  project: {
    ios: {
      automaticPodsInstallation: false,
    },
    android: {},
  },
  assets: ['./assets'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};
