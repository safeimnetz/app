module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react-native/no-inline-styles': 'off',
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'react-native-gesture-handler',
                importNames: [
                  'TouchableOpacity',
                  'TouchableNativeFeedback',
                  'TouchableHighlight',
                  'TouchableWithoutFeedback',
                ],
                message: "Please import it from 'react-native' instead.",
              },
            ],
          },
        ],
      },
    },
  ],
};
