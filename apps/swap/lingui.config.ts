/* eslint-env node */

const linguiConfig = {
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}',
      include: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
      exclude: [
        '<rootDir>/src/**/*.d.ts',
        '<rootDir>/src/**/*.test.*',
        '<rootDir>/src/types/v3/**',
        '<rootDir>/src/abis/types/**',
        '<rootDir>/src/graphql/**/__generated__/**',
      ],
    },
  ],
  compileNamespace: 'es',
  fallbackLocales: {
    default: 'en-US',
  },
  format: 'po',
  formatOptions: {
    lineNumbers: false,
  },
  locales: ['en-US', 'zh-CN'],
  orderBy: 'messageId',
  rootDir: '.',
  runtimeConfigModule: ['@lingui/core', 'i18n'],
  sourceLocale: 'en-US',
}

export default linguiConfig
