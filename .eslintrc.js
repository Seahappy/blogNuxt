/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-11-12 12:03:07
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:38:08
 * @FilePath: \blog\blogNuxt\.eslintrc.js
 */
module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'globals': {
    'echarts': true,
    'AMap': true,
    '$nuxt': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module'
  },
  //eslint 忽略文件 用命令行启用该文件配置此配置不会生效
  'ignorePatterns': ['dist', 'plugins/qrcode.js'],
  'plugins': [
    'vue'
  ],
  'rules': {
    // 'vue/sort-keys': ['error', 'asc', {
    //   'caseSensitive': true,
    //   'ignoreChildrenOf': ['model'],
    //   'ignoreGrandchildrenOf': ['computed', 'directives', 'inject', 'props', 'watch'],
    //   'minKeys': 2,
    //   'natural': false
    // }],
    // 组件顺序
    'vue/order-in-components': ['error', {
      'order': [
        'name',
        'provide',
        'inject',
        'props',
        'data',
        'components',
        'methods'
      ]
    }],
    // 强制使用一致的缩进 <template>
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'baseIndent': 1,
      'closeBracket': 0,
      'alignAttributesVertically': true,
      'ignores': []
    }],
    // 强制 HTML 属性的引号样式
    'vue/html-quotes': ['error', 'single', { 'avoidEscape': true }],
    // 强制 HTML 自闭式
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'never',
        'normal': 'always',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
    // 在 {{}} 中插值中强制统一间距
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    // 禁止多个空格
    'vue/no-multi-spaces': ['error', {
      'ignoreProperties': false
    }],
    // 禁止使用箭头函数定义观察者
    'vue/no-arrow-functions-in-watch': 'error',
    // 禁止在data里访问computed属性
    'vue/no-computed-properties-in-data': 'error',
    // 禁止重复字段名
    'vue/no-dupe-keys': 'error',
    // 禁止改变组件 props 的值
    'vue/no-mutating-props': 'error',
    // 在 props 中需要类型定义
    'vue/attributes-order': ['error', {
      'order': [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        ['UNIQUE', 'SLOT'],
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT'
      ],
      'alphabetical': false
    }],
    'vue/require-prop-types': 'error',
    'vue/require-name-property': 'off',
    // 组件添加name属性
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    // 禁止使用v-html
    'vue/no-v-html': 'off',
    // 禁止在template里使用this
    'vue/this-in-template': ['error', 'never'],
    // 强制组件驼峰命名
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      'registeredComponentsOnly': false,
      ignores: ['/^mavon-editor/']
    }],
    // 禁止在您的组件属性中出现潜在的拼写错误
    'vue/no-potential-component-option-typo': ['error', {
      'presets': ['vue'],
      'custom': [],
      'threshold': 1
    }],
    'vue/max-attributes-per-line': ['error', {
      'singleline': {
        'max': 6
      },
      'multiline': {
        'max': 6
      }
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }],
    // 禁止静态内联style属性
    /* 'vue/no-static-inline-styles': ['error', {
      'allowBinding': false
    }], */
    'vue/no-unused-properties': ['error', {
      'groups': ['props'],
      'deepData': false,
      'ignorePublicMembers': false
    }],
    'accessor-pairs': 2,
    'arrow-spacing': ['error', { // 强制箭头函数的箭头前后使用一致的空格
      'before': true,
      'after': true
    }],
    'vue/prop-name-casing': 0, // 在Vue组件中为Prop名称不强制使用特定大小写
    'block-spacing': ['error', 'always'], // 禁止或强制在代码块中开括号前和闭括号后有空格 always:要求使用一个或多个空格 never:禁用空格
    'brace-style': ['error', '1tbs', { // 强制在代码块中使用一致的大括号风格
      'allowSingleLine': true// 允许块的开括号和闭括号在 同一行
    }],
    'camelcase': [0, { // 强制使用骆驼拼写法命名约定
      'properties': 'always'// always强制属性名称为驼峰风格never不检查属性名称
    }],
    'comma-dangle': ['error', 'never'], // never要求或禁止末尾逗号always要求使用拖尾逗号
    'comma-spacing': ['error', { // 强制在逗号前后使用一致的空格
      'before': false, // 禁止在逗号前使用空格
      'after': true// 要求在逗号后使用一个或多个空格
    }],
    'comma-style': [2, 'last'], // 强制使用一致的逗号风格
    // 'constructor-super': 2,//要求在构造函数中有 super() 的调用
    'curly': [2, 'multi-line'], // 强制所有控制语句使用一致的括号风格
    'dot-location': [2, 'property'], // 强制在点号之前和之后一致的换行
    'eol-last': 2, // 要求或禁止文件末尾存在空行
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }], // 要求使用 === 和 !==
    'generator-star-spacing': [2, { // 强制 generator 函数中 * 号周围使用一致的空格
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'], //	要求回调函数中有容错处理  该规则会报告有未处理的错误
    'indent': ['error', 2, { // 强制使用一致的缩进
      'SwitchCase': 1
    }],
    'jsx-quotes': ['error', 'prefer-single'], // 强制在 JSX 属性中一致地使用双引号或单引号
    'key-spacing': ['error', { // 强制在对象字面量的属性中键和值之间使用一致的间距
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, { // 强制在关键字前后使用一致的空格
      'before': true,
      'after': true
    }],
    'new-cap': [2, { // 要求构造函数首字母大写
      'newIsCap': true,
      'capIsNew': false
    }],
    'computed-property-spacing': 2, // 强制在计算的属性的方括号中使用一致的空格
    'new-parens': 2, // 强制括号后的新构造函数没有参数（默认）
    // 'no-array-constructor': 2,
    // 'no-caller': 2,
    'no-console': 'off', // 禁用 console
    'no-class-assign': 2, // 禁止修改类声明的变量
    'no-cond-assign': 2, // 禁止条件表达式中出现赋值操作符
    'no-const-assign': 2, // 禁止修改 const 声明的变量
    'no-control-regex': 0, // 禁止在正则表达式中使用控制字符
    'no-delete-var': 2, // 禁止删除变量  delete 的目的是删除对象的属性。使用 delete 操作删除一个变量可能会导致意外情况发生。
    'no-dupe-args': 2, // 禁止 function 定义中出现重名参数
    'no-dupe-class-members': 2, // 禁止类成员中出现重复的名称
    'no-dupe-keys': 2, // 禁止对象字面量中出现重复的 key
    'no-duplicate-case': 2, //	禁止出现重复的 case 标签
    'no-empty-character-class': 2, // 禁止在正则表达式中使用空字符集
    'no-empty-pattern': 2, // 禁止使用空解构模式
    'no-eval': 2, // 禁用 eval()
    'no-ex-assign': 2, // 禁止对 catch 子句的参数重新赋值
    'no-extend-native': 2, // 禁止扩展原生类型
    'no-extra-bind': 2, // 禁止不必要的 .bind() 调用
    'no-extra-boolean-cast': 2, // 禁止不必要的布尔转换
    'no-extra-parens': [2, 'functions'], // 禁止不必要的括号
    'no-fallthrough': 2, // 禁止 case 语句落空
    'no-floating-decimal': 2, // 禁止数字字面量中使用前导和末尾小数点
    'no-func-assign': 2, // 禁止对 function 声明重新赋值
    'no-implied-eval': 2, // 禁止使用类似 eval() 的方法
    'no-inner-declarations': [2, 'functions'], // 禁止在嵌套的块中出现变量声明或 function 声明
    'no-invalid-regexp': 2, // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'no-irregular-whitespace': 2, //	 禁止不规则的空白
    'no-iterator': 2, // 禁用 __iterator__ 属性
    'no-label-var': 2, // 不允许标签与变量同名
    'no-labels': [2, { //	禁用标签语句(忽略循环语句中的标签|忽略 switch 语句中的标签)
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2, // 禁用不必要的嵌套块
    'no-mixed-spaces-and-tabs': 2, // 禁止空格和 tab 的混合缩进
    'no-multi-spaces': 2, // 禁止使用多个空格
    'no-multi-str': 2, // 禁止使用多行字符串
    'no-multiple-empty-lines': [0, { // 禁止出现多行空行
      'max': 0
    }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2, // 禁用 Object 的构造函数
    'no-new-require': 2, // 禁止调用 require 时使用 new 操作符
    'no-new-symbol': 2, // 禁止 Symbolnew 操作符和 new 一起使用
    'no-new-wrappers': 2, // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-obj-calls': 2, // 禁止把全局对象作为函数调用
    'no-octal': 2, // 禁用八进制字面量
    'no-octal-escape': 2, // 禁止在字符串中使用八进制转义序列
    'no-path-concat': 2, // 禁止对 __dirname 和 __filename 进行字符串连接
    'no-proto': 2, // 禁用 __proto__ 属性
    'no-redeclare': 2, // 禁止多次声明同一变量
    'no-regex-spaces': 2, // 禁止正则表达式字面量中出现多个空格
    'no-return-assign': [2, 'except-parens'], // 禁止在 return 语句中使用赋值语句,，除非使用括号把它们括起来
    'no-self-assign': 2, // 禁止自我赋值
    'no-self-compare': 2, // 禁止自身比较
    'no-sequences': 2, //	禁用逗号操作符
    'no-shadow-restricted-names': 2, // 禁止将标识符定义为受限的名字
    'no-spaced-func': 2,
    'no-sparse-arrays': 2, //	禁用稀疏数组
    'no-this-before-super': 2, // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-throw-literal': 0, // 2 禁止抛出异常字面量
    'no-trailing-spaces': 2, // 禁用行尾空格
    'no-undef': 2, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef-init': 2, // 禁止将变量初始化为 undefined
    'no-unexpected-multiline': 2, // 禁止出现令人困惑的多行表达式
    'no-unmodified-loop-condition': 2, // 禁用一成不变的循环条件
    'no-unneeded-ternary': [2, { // 禁止可以在有更简单的可替代的表达式时使用三元操作符
      'defaultAssignment': false
    }],
    'no-unreachable': 2, // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unsafe-finally': 2, // 禁止在 finally 语句块中出现控制流语句
    'no-unused-vars': [2, { //	禁止出现未使用过的变量
      'vars': 'all',
      'args': 'after-used',
      'argsIgnorePattern': '^_'
    }],
    'no-useless-call': 2, // 禁止不必要的 .call() 和 .apply()
    'no-useless-computed-key': 2, // 禁止在对象中使用不必要的计算属性
    'no-useless-constructor': 2, // 禁用不必要的构造函数
    'no-useless-escape': 0, // 禁用不必要的转义字符
    'no-whitespace-before-property': 2, // 禁止属性前有空白
    'no-with': 2, // 禁用 with 语句
    'one-var': [2, { // 强制函数中的变量要么一起声明要么分开声明
      'initialized': 'never'// 要求每个作用域有多个变量声明
    }],
    'operator-linebreak': [2, 'after', { // 强制操作符使用一致的换行符
      'overrides': { // 要求把换行符放在操作符前面
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'], // 禁止块语句和类的开始或末尾有空行
    'quotes': ['error', 'single', { // 强制使用一致的反勾号、双引号或单引号
      'avoidEscape': true, // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
      'allowTemplateLiterals': true// 允许字符串使用反勾号
    }],
    'semi': [2, 'never'], // 禁止在语句末尾使用分号 (除了消除以 [、(、/、+ 或 - 开始的语句的歧义)
    'semi-spacing': [2, { // 强制分号之前不使用空格之后使用一致的空格
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'], // 强制在块之前使用一致的空格
    'space-before-function-paren': [2, 'never'], // 禁止在参数的 ( 前面有空格
    'space-in-parens': [2, 'never'], // 强制圆括号内没有空格
    'space-infix-ops': 2, // 要求操作符周围有空格
    'space-unary-ops': [2, { // 强制在一元操作符前后使用一致的空格
      'words': true, // 适用于单词类一元操作符，例如：new、delete、typeof、void、yield
      'nonwords': false// 适用于这些一元操作符: -、+、--、++、!、!!
    }],
    'spaced-comment': [2, 'always', { // 强制在注释中 // 或 /* 使用一致的空格
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'], // 禁止花括号内出现空格使用
    'use-isnan': 2, // 要求使用 isNaN() 检查 NaN
    'valid-typeof': 2, // 强制 typeof 表达式与有效的字符串进行比较
    'wrap-iife': [2, 'any'], // 要求 IIFE 使用括号括起来(强制总是包裹，但允许其它风格)
    'yield-star-spacing': [2, 'both'], // 强制在 yield* 表达式中 * 周围使用空格
    'yoda': [2, 'never'], // 比较绝不能是 Yoda 条件
    'prefer-const': 2, // 要求使用 const 声明那些声明后不再被修改的变量
    'no-debugger': 0, // 生产环境禁用 debugger
    'object-curly-spacing': [2, 'always', { // 要求花括号内有空格 (除了 {})
      objectsInObjects: false// 要求以对象元素开始或结尾的对象的花括号中有空格
    }],
    'array-bracket-spacing': [2, 'never']// 禁止在数组括号内出现空格
  }
}
