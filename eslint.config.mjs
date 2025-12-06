import { defineConfig } from 'eslint/config';
import eslintPlugin from '@eslint/js';
import { configs as tseslintConfigs } from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nextPlugin from '@next/eslint-plugin-next';

const ignoresConfig = defineConfig([
    {
        name: 'project/ignores',
        ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts']
    },
]);

const eslintConfig = defineConfig([
    {
        name: 'project/javascript-recommended',
        files: ['**/*.{js,mjs,ts,tsx}'],
        ...eslintPlugin.configs.recommended,
    },
]);

const typescriptConfig = defineConfig([
    {
        name: 'project/typescript-strict',
        files: ['**/*.{ts,tsx,mjs}'],
        extends: [
            ...tseslintConfigs.strictTypeChecked,
            ...tseslintConfigs.stylisticTypeChecked,
        ],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: {
                    jsx: true,
                },
                warnOnUnsupportedTypeScriptVersion: true,
            },
        },
        rules: {
            '@typescript-eslint/triple-slash-reference': 'off',
            // TODO remove all these rules (one by one and fix errors)
            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unnecessary-type-assertion': 'off',
            '@typescript-eslint/no-unnecessary-condition': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/restrict-plus-operands': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            '@typescript-eslint/prefer-optional-chain': 'off',
        },
    },
    {
        name: 'project/javascript-disable-type-check',
        files: ['**/*.{js,mjs,cjs}'],
        ...tseslintConfigs.disableTypeChecked,
    }
]);

const reactConfig = defineConfig([
    {
        name: 'project/react-next',
        files: ['**/*.{jsx,js,mjs,tsx,ts}'],
        plugins: {
            'react': reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
            '@next/next': nextPlugin,
        },
        rules: {
            'brace-style': [2, 'stroustrup'],
            'comma-style': [2, 'last'],
            'curly': [2, 'all'],
            'eol-last': ['error', 'always'],
            'func-call-spacing': [2, 'never'],
            'indent': ['error', 4, { 'SwitchCase': 1 }],
            'keyword-spacing': [2, {}],
            'max-len': [2, 120],
            'max-params': [2, 7],
            'no-dupe-else-if': 2,
            'no-else-return': 2,
            'no-empty-function': [2, { 'allow': ['constructors'] }],
            'no-eq-null': 2,
            'no-eval': 2,
            'no-lone-blocks': 2,
            'no-lonely-if': 2,
            'no-loop-func': 2,
            'no-extra-semi': 1,
            'no-mixed-spaces-and-tabs': 2,
            'no-negated-condition': 2,
            'no-trailing-spaces': 2,
            'no-undef': 'off',
            'no-unused-expressions': 2,
            'no-unused-vars': [2, {'vars': 'local', 'args': 'after-used'}],
            'prefer-const': [2, {'destructuring': 'all'}],
            'prefer-destructuring': [1, {'object': true, 'array': false}],
            'quotes': [2, 'single', { 'avoidEscape': true }],
            'semi': [2, 'always'],
        },
        settings: {
            react: {
                version: 'detect',
            },
        }
    }
]);

export default defineConfig([
    ...ignoresConfig,
    ...eslintConfig,
    ...typescriptConfig,
    ...reactConfig,
]);
