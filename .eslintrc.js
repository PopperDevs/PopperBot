module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'no-console': 0,
    'no-empty': 0,
    'no-return-assign': 0,
    'no-cond-assign': 0,
    'operator-linebreak': 0,
    'implicit-arrow-linebreak': 0,
    'comma-dangle': 0,
    'function-paren-newline': 0,
    'no-underscore-dangle': 0,
  },
};
