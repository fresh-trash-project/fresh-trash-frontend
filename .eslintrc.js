module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'react-app',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-var': 'warn', // var 금지
    'no-multiple-empty-lines': 'warn', // 여러 줄 공백 금지
    'no-console': 'off', // console.log() 금지
    eqeqeq: 'warn', // 일치 연산자 사용 필수
    'dot-notation': 'warn', // 가능하다면 dot notation 사용
    'no-unused-vars': 'warn', // 사용하지 않는 변수 금지
    'react/destructuring-assignment': 'warn', // state, prop 등에 구조분해 할당 적용
    'react/jsx-pascal-case': 'warn', // 컴포넌트 이름은 PascalCase로
    'react/no-direct-mutation-state': 'warn', // state 직접 수정 금지
    'react/jsx-no-useless-fragment': 'warn', // 불필요한 fragment 금지
    'react/no-unused-state': 'warn', // 사용되지 않는 state
    'react/jsx-key': 'off', // 반복문으로 생성하는 요소에 key 강제
    'react/self-closing-comp': 'warn', // 셀프 클로징 태그 가능하면 적용
    'react/jsx-curly-brace-presence': 'off', // jsx 내 불필요한 중괄호 금지
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
