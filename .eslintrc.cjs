module.exports = {
  root: true,
  // Определяет среду выполнения.
  // Например, browser для браузерных приложений, node для Node.js.
  env: {
    browser: true,
    node: true,
    es2021: true, // Добавляем поддержку глобальных переменных ES2021
  },
  // Расширяет другие конфигурации ESLint.
  // 'airbnb-base' для JS, 'airbnb' для React.
  // Мы также добавляем плагин TypeScript.
  extends: [
    'airbnb-base', // Или 'airbnb' если вы используете React
    'plugin:@typescript-eslint/recommended', // Рекомендуемые правила для TypeScript
  ],
  // Парсер, который ESLint будет использовать для анализа кода.
  // @typescript-eslint/parser позволяет ESLint понимать TypeScript.
  parser: '@typescript-eslint/parser',
  // Опции для парсера.
  parserOptions: {
    ecmaVersion: 12, // Разрешает синтаксис ECMAScript 2021 (ES12)
    sourceType: 'module', // Разрешает использование import/export
    // Проект TypeScript для корректного разрешения типов, если требуется.
    // Если у вас есть tsconfig.json в корне проекта, это часто не нужно.
    // project: './tsconfig.json',
  },
  // Плагины, которые предоставляют дополнительные правила.
  plugins: [
    '@typescript-eslint',
    '@stylistic/eslint-plugin-js', // Обратите внимание, что в v8 это, вероятно, будет просто '@stylistic/js' или 'eslint-plugin-js'
  ],
  // Правила ESLint.
  rules: {
    // Пользовательские правила.
    'max-len': ['error', { code: 100 }],
    'no-unused-vars': 'off', // Отключаем стандартное правило, так как @typescript-eslint/no-unused-vars будет использоваться
    '@typescript-eslint/no-unused-vars': 'error',
    // Пример правила @stylistic/js. В v8 это может быть просто 'eol-last' в базовых правилах,
    // но если вы используете плагин @stylistic, то так:
    'eol-last': ['error', 'always'], // Это правило обычно есть в airbnb-base
    // Если вам нужно правило именно из @stylistic/js, это может быть что-то вроде:
    // '@stylistic/js/indent': ['error', 2] // Пример
  },
  // Настройки, которые применяются только к определенным файлам.
  // В данном случае, к файлам TypeScript.
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        // Здесь можно добавить правила, специфичные для TS/TSX.
        // Например, если airbnb-base конфликтует с чем-то в TS.
      },
    },
  ],
  // Игнорируемые файлы и директории.
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
  ],
};
