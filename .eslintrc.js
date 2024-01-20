module.exports = {
  env: {
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  settings: {
    pragma: 'React',
    react: {
      version: 'detect'
    }
  },
  rules: {
    skipBlankLines: 0,
    ignoreComments: 0,
    'no-multiple-empty-lines': [0, {}],
    'no-trailing-spaces': [0, {}]
  }
}
