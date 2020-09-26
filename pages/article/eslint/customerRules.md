



## 饿了么的自定义规则

关于ElementUI 的话,他们使用的eslint 规范是用的自己团队的一个eslint config , 在 element-ui 中
的 .eslintrc 中 extends 继承了 eslint config 
```json
{
  "extends": "elemefe",
}
```
在 elementfe 属于一个另外的项目 , 这一点在package.json 中也可以看到 
```json
{
  "devDependencies" : {
    "eslint-config-elemefe": "0.1.1",
  }  
}
```

在可以在github中可以查看到elementfe 自己定义的eslint config 项目 [Doc](https://github.com/ElemeFE/eslint-config-elemefe)

在package.json 中描述 main 为 index.js , 但是他同时提供了react config , 也就是 react.js 中 相同的是他们都采用的是同一份 rule 

也就是rules.js  

```js
module.exports = {
  'accessor-pairs': 2,
  'array-bracket-spacing': 0,
  'block-scoped-var': 0,
  'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
  'camelcase': 0,
  'comma-dangle': [2, 'never'],
   // more ... 
}
``` 

在这里定义了所有规则 

0.表示关闭 
1.表示警告
2.表示报错

之后的话就是各个规则的options 配置 


## 参考 
如果需要整理出自己的一套eslint config ,那需要eslint的rules 非常熟悉 , 以及一些plguins 等等 


## 遗留 
也希望多做一些参考,争取自己弄一套规范  









