module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:vue/vue3-recommended', // Use 'plugin:vue/strongly-recommended' for less strict rules
    ],
    plugins: ['@typescript-eslint', 'vue'],
    rules: {
        'vue/multi-word-component-names': 'warn',
    },
  };
  