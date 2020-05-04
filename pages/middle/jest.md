# [JEST](https://jestjs.io/)

一款 facebook 通用型 测试框架

## 安装

```bash
yarn add --dev jest
```

或者

```bash
npm install --save-dev jest
```

测试 React Apps

安装(已经使用了CreatReactApp CLI的)

```bash
yarn add --dev react-test-renderer
```



然后直接编写测试文件

```javascript
// Link.react.test.js
import React from "react";
import renderer from "react-test-renderer";
// 进行一个测试case
test("case 测试描述", () => {
  const component = renderer.create(
      // 你的组件 
  );
  // 进行断言 
});
```

## 匹配 
普通匹配 
```javascript
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```
反匹配 (使用 .not )
```javascript
test('two plus two is not five', () => {
  expect(2 + 2).not.toBe(5);
});
```
Truthiness匹配 
```javascript
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});
```
数字匹配 
```javascript
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```
字符串匹配 正则  
```javascript
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```
数组
```javascript
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});
```
异常
```javascript
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  // 正则
  expect(compileAndroidCode).toThrow(/JDK/);
});
```

[更多匹配列表](https://jestjs.io/docs/zh-Hans/expect)






## 异步 
```javascript
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

Promise 

```javascript 
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```
<hr/>

```javascript
// 通过 expect.assertions 来验证一定数量的断言被调用 
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```
.resolves / .rejects

```javascript
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```
Async/Await
```javascript 
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
// 与 resolves / rejects 结合  
test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toThrow('error');
});

```


## Setup and Teardown
为多次测试重复设置
```javascript 
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

一次性设置 , 只在这个文件开头执行一次  
```javascript 
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

作用域  (默认情况下，before 和 after 的块可以应用到文件中的每个测试。 此外可以通过 describe 块来将测试分组。 当 before 和 after 的块在 describe 块内部时，则其只适用于该 describe 块内的测试。)


**注意，顶级的 beforeEach 在 describe 块级的 beforeEach 之前被执行。 这可能有助于说明所有钩子的执行顺序。**
```javascript 
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll

```


执行顺序 
desribe和test块的执行顺序
Jest 会在所有真正的测试开始之前执行测试文件里所有的 describe 处理程序（handlers）。 这是在 before* 和 after* 处理程序里面 （而不是在 describe 块中）进行准备工作和整理工作的另一个原因。 当 describe 块运行完后,，默认情况下，Jest 会按照 test 出现的顺序（译者注：原文是in the order they were encountered in the collection phase）依次运行所有测试,，等待每一个测试完成并整理好，然后才继续往下走。
```javascript 
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```




## 通用建议
如果测试失败，第一件要检查的事就是，当仅运行这条测试时，它是否仍然失败。 To run only one test with Jest, temporarily change that test command to a test.only:

```javascript 
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});

test('this test will not run', () => {
  expect('A').toBe('A');
});
```

如果你有一个测试，当它作为一个更大的用例中的一部分时，经常运行失败，但是当你单独运行它时，并不会失败，所以最好考虑其他测试对这个测试的影响。 通常可以通过修改 beforeEach 来清除一些共享的状态来修复这种问题。 If you're not sure whether some shared state is being modified, you can also try a beforeEach that logs data.



## Mock Functions 

```javascript 
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

// 此 mock 函数被调用了两次
expect(mockCallback.mock.calls.length).toBe(2);

// 第一次调用函数时的第一个参数是 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// 第二次调用函数时的第一个参数是 1
expect(mockCallback.mock.calls[1][0]).toBe(1);

// 第一次函数调用的返回值是 42
expect(mockCallback.mock.results[0].value).toBe(42);
```

[More](https://jestjs.io/docs/zh-Hans/mock-functions)