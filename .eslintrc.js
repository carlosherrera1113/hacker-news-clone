module.exports = {
    'parser': '@typescript-eslint/parser',
    'extends': [
        'plugin:@typescript-eslint/recommended',
        'eslint-config-airbnb-base'
    ],
    'parserOptions': {
        'ecmaVersion': '2018',
        'sourceType': 'module',
    },
    'rules': {
        'semi': 1,
        'no-console': 0,
        'no-redeclare': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        'object-curly-newline': 0,
        'arrow-body-style': 0,
    },
    'settings': {
        'import/resolver': {
            'node': {
                'extensions': ['.js', '.ts']
            }
        }
    }
};
