module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base', 
    'plugin:@typescript-eslint/recommended', 
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12, 
    sourceType: 'module', 
  },
  plugins: [
    '@typescript-eslint',
    '@stylistic/eslint-plugin-js', 
  ],
  rules: {
    'max-len': ['error', { code: 100 }],
    'no-unused-vars': 'off', 
    '@typescript-eslint/no-unused-vars': 'error',
    'eol-last': ['error', 'always'],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {

      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
  ],
};
