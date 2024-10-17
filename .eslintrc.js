const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest', // Always use the latest ECMAScript version
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Ensure JSX support
    },
    project: path.resolve(__dirname, './tsconfig.json'), // Use __dirname properly
    tsconfigRootDir: __dirname, // Ensure ESLint knows the correct root
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier', 'import', 'jsx-a11y'],
  rules: {
    // ESLint rules
    'no-unused-vars': 'off',
    'func-names': 'off',
    'no-throw-literal': 'off',
    'no-bitwise': 'off',
    'no-param-reassign': 'warn',
    'no-shadow': 'off',
    'no-unused-expressions': 'off',
    'no-warning-comments': 'off',
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    // React rules
    'react/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/button-has-type': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/no-array-index-key': 'off',
    'react/no-did-update-set-state': 'off',
    'react/prop-types': 'off',
    'react/sort-comp': 'off',
    'react/state-in-constructor': 'off',
    'react-hooks/rules-of-hooks': 'error',
    // TypeScript rules
    '@typescript-eslint/adjacent-overload-signatures': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-empty-object-type': 'warn',
    '@typescript-eslint/no-unsafe-function-type': 'warn',
    '@typescript-eslint/no-wrapper-object-types': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/only-throw-error': 'error',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'private-static-field',
          'public-static-field',
          'private-constructor',
          'public-constructor',
          'private-instance-field',
          'public-instance-field',
          'protected-instance-method',
          'private-instance-method',
          'public-instance-method',
        ],
      },
    ],
    // Prettier rules
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSpacing: true,
        bracketSameLine: false,
        printWidth: 120,
        semi: true,
        singleQuote: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
    // Import rules
    'import/export': 'off',
    'import/extensions': 'off',
    'import/named': 'off',
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    // JSX-a11y rules
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-for': [
      2,
      {
        allowChildren: false,
        required: { every: ['id'] },
      },
    ],
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
  overrides: [
    {
      files: ['.eslintrc.js'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
};
