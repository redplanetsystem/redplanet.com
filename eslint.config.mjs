import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  // Core Next.js Web Vitals & React performance best practices
  ...nextVitals,

  // Global Ignores: Exclude build artifacts, compiled outputs, and backend automation scripts from lint checks
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'next-env.d.ts',
    'scripts/automation/**',
    'public/audio/**',
  ]),

  // Custom Rules and Overrides for Enterprise Code Cleanliness
  {
    rules: {
      // Prevent console statements in production code except for intentional warnings/errors
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      
      // Enforce strict unused variable checks to keep code bundle lean
      'no-unused-vars': 'off', // Handled by TypeScript compiler rules
      
      // React 19 / Next.js modern JSX standards
      'react/no-unescaped-entities': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      
      // Allow empty catch blocks or placeholder functions during rapid ecosystem expansion
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
]);

export default eslintConfig;