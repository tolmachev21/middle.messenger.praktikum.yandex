import airbnb from 'eslint-config-airbnb'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'

export default [
  {
    ignores: ["node_modules", "dist", "build"]
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin
    },
    rules: {
      'max-len': ['error', { code: 100 }],
      '@typescript-eslint/no-unused-vars': 'error',
    },
    ...airbnb
  }
]
