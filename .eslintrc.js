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
        'no-console': 0
    },
};
