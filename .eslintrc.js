module.exports = {
  root: true,
  globals: {
    'window': false,
    'document': false,
    'THREE': true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  plugins: [
    'html'
  ],
  'rules': {
    'import/no-unresolved': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': 0,
    'no-plusplus': 0,
    'no-var': 0,
    'one-var': 0,
    'no-continue': 0,
    'func-names': 0,
    'no-mixed-operators': 0,
    'no-floating-decimal': 0,
    'array-callback-return': 0,
    'consistent-return': 0,
    'arrow-parens': 0,
    'no-shadow': 0,
  }
}
