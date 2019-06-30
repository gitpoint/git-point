module.exports = {
  extends: 'eslint-config-airbnb',
  plugins: ['jsx-a11y', 'import', 'react', 'react-native', 'flowtype'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    __DEV__: true,
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        root: ['./src'],
        alias: {
          testData: './__tests__/data',
        },
      },
    },
  },
  rules: {
    'global-require': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'arrow-body-style': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'always-multiline'],
    indent: 'off',
    'padding-line-between-statements': [
      2,
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['var', 'let', 'const'], next: '*' },
      {
        blankLine: 'any',
        prev: ['var', 'let', 'const'],
        next: ['var', 'let', 'const'],
      },
    ],
    'newline-per-chained-call': 'off',
    'no-confusing-arrow': 'off',
    'no-else-return': [
      'error',
      {
        allowElseIf: true,
      },
    ],
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ],
    'no-underscore-dangle': 'off',
    'max-len': 'off',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'wrap-iife': [
      'error',
      'inside',
      {
        functionPrototypeMethods: false,
      },
    ],
    'flowtype/define-flow-type': 1,
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-curly-spacing': [
      'error',
      'never',
      {
        allowMultiline: true,
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-no-bind': 'error',
    'react/no-multi-comp': 'off',
    'react/prefer-stateless-function': 'off',
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-methods',
          'lifecycle',
          '/^on.+$/',
          '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
          'everything-else',
          '/^render.+$/',
          'render',
        ],
        groups: {
          lifecycle: [
            'displayName',
            'props',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'state',
            'constructor',
            'getDefaultProps',
            'getInitialState',
            'getChildContext',
            'componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
          ],
        },
      },
    ],
    // disable temporarily in order to not modify current codes
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'lines-between-class-members': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'prefer-destructuring': 'off',
    'import/named': 'off',
    'import/no-cycle': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-restricted-globals': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/no-this-in-sfc': 'off',
    'react/no-unused-state': 'off',
    'react/require-default-props': 'off',
  },
};
