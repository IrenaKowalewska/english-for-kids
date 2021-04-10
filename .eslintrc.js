module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "no-param-reassign": 0,
    'import/prefer-default-export': 'off',
    "no-mixed-operators": [
      "error",
      {
          "groups": [
              ["+", "-", "*", "/", "%", "**"],
              ["&", "|", "^", "~", "<<", ">>", ">>>"],
              ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
              ["&&", "||"],
              ["in", "instanceof"]
          ],
          "allowSamePrecedence": true
      }
    ]
  },
  globals: {
    document: false
  }
};
