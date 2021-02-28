module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    import/no-extraneous-dependencies: 'off',
    import/no-unresolved: ['error', { ignore: ['^react$', '^react-dom$'] }],
    import/extensions: 'off',
    react/react-in-jsx-scope: 'off',
    no-underscore-dangle: 'off',
    react/no-danger: 'off',
    no-unused-vars: ['error', { varsIgnorePattern: 'React' }],
    react/require-default-props: 'off',
    function-paren-newline: 'off',
    import/no-named-as-default: 'off',
    object-curly-newline: 'off',
    jest/no-focused-tests: 'error',
  }
};
