# Typescript 

## 基本类型 

boolean  

number 

string 

array   

```typescript
let list:number [] = [1,2,3]  // 一个只能是number 类型的 数组 
let list:Array<number> = [1,2,3] // 同上
```

元祖 

```typescript
let x [string , number , string ] ;  // 定义一个只能 是 [string , number , string ] 的数组 
// 如  ['ABC' , 123 , 'CDE']
```

枚举

```typescript
enum ResponseStatus  {success:1 , error:0} 
// 大多用于判断 
if (responseStatus === ResponseStatus.success) {}
```

any  任意类型 

void 没有任何类型,通常用于方法 

```typescript
function loadDataTable ():void {} // 表示该方法没有返回值 
```

null 和 undefined 

```typescript

```

never 该`never`类型表示从未发生的值的类型

```typescript
function infiniteLoop () :never {
  while (true) {//.... code block }
}
```

object 只能是原始的object  即等于 {}

```typescript
function create (o : object | null ):void {}

create({}) // OK 
create("111") // Error 
```

 断言 , 可两种方法来断定类型

```typescript
let someValue:any = "123456" ; // 表示当前变量可以属于任何类型 
someValue.length(); // Error 因为不是所有对象都拥有length() 方法 
// 1 .  <>
(<string>someValue).length() ; // OK 断定someValue这个变量为string类型,所以TS编译通过  
// 2 . as 
(someValue as string ).length () ; // 同上 
```

## Interface 

> 接口相当于约束 

例   

```typescript
function loadResult1 (res : {success:number , msg : string  }) { 
  // code block 
}
function loadResult2 (res : {success:number , msg : string  }) { 
  // code block 
}
function loadResult3 (res : {success:number , msg : string  }) { 
  // code block 
}
```

当我们多次定义这样的方法时,我们可以进行改造  , 将这个 res 参数固定成另外一种类型 

例如 : 

```typescript
interface ResponseEntry {
    success: number,  
    msg : string 
}
function loadResult1(res:ResponseEntry) { }
function loadResult2(res:ResponseEntry) { }
function loadResult3(res:ResponseEntry) { }
// 可以进行统一管理, 并且方便 
```

> 注意 , 使用这种接口时表示此对象必须拥有此接口的所有属性 , 当然也可以使用可选参数来表示这个参数可有可不有 

```typescript
interface ResponseEntry {
  success : number  ;  
  msg : string  ; 
  status ?: number  ;  // 表示这个对象中的status 这个属性可有,可没有 
}
```

只读属性 

当这个对象只能在初始化时赋值的属性,并且不能更改,  我们就可以使用 readonly 来表示这个属性

```typescript 
interface ResponseEntry {
  readonly success : number ;  
  readonly msg : string ; 
  readonly status : number;  
}
ResponseEntry re = {
  success : 1 ,  
  msg : '当前请求成功' , 
  status : 1 
}
// ERROR 
re.msg = `当前请求失败` ;  
```

 索引签名 : 

```typescript
// 表示这个接口 可以拥有任意的属性  , 但是 color 和 width 的属性必须是对应的类型 
// 其他属性的类型任意 
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

Function Types (用来规定一个函数)

```typescript
// 规定这个函数 必须是以下格式 
/*
	function xxx (source : string , subString :string ) : boolean {
		// code block  
		return true | false ; 
	}
	
*/
interface SearchFunc {
    (source: string, subString: string): boolean;
}
```

Indexable Types 用来规定一个数组 

```typescript
interface StringArray {
    [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
```

## Typescript 小案例
将两个类型进行合并 

```typescript
interface IRouters {
    push ():void ;
    pop ():void ;  
}
// routers 类型必须为 IRouters 和 包含remove 方法的对象 
function initRouters  (routers : IRouters & {
    remove ():void , 
}){ 
   console.log(routers) 
}
initRouters({
    push ():void {

    },
    pop (): void {

    },
    remove ():void {
        
    }
})
```

枚举

```typescript
enum responseStatus  {
    success = 200 , 
    notAuthor = 405 
}


const code = 200 ; 
if (code === responseStatus.success){
    // 如果服务器响应成功
    console.log('服务器响应成功')
}else if(code === responseStatus.notAuthor) {
    // 没有权限 
    console.log('对不清, 你没有对应权限 ')
}else {
    // 请求失败, 或者服务器错误 
    console.log('不好意思, 出现异常了')
}
```

接口

1.用接口来代表数组类型

```typescript
interface IRouters {
    [index:number] : string | number 
}
let routers:IRouters = ['1' , '2' , '3' , 1 , 2 ] ;  
console.log(routers)
```

2.用接口来代表函数 

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let replace: SearchFunc;
// 当这个函数要成为SearchFunc类型时, 返回值必须与对应的接口相同, 但是参数可以有所区别, 
// 这里的区别是, 可以选择接口定义的参数列表中的参数, 但是类型必须定义 
// 以下是正常, 可以编译通过的 
replace = function(abc: string) {
  return true;
};
// 编译不通过的 
/*
	错误信息
	不能将类型“(abc: string, bec: number) => true”分配给类型“SearchFunc”。
  	参数“bec”和“subString” 的类型不兼容。
    不能将类型“string”分配给类型“number”。
*/ 
let replace: SearchFunc;
replace = function(abc: string , bec : number) {
  return true;
};

```

这个数组中的value 只能是 a,b,c 其中的一个

```typescript
type RouterNames = Array<'a' | 'b' | 'c'> ;
// 这个数组只能包含为  'a','b','c'
let arr:RouterNames = ['a', 'b' , 'c'] ; 
```

控制方法中的类型 

```typescript
function preloadRouter (routerName : string | number | boolean ) :boolean {
    if (typeof routerName === 'string'){
        routerName.substr(1)
    }
    return (routerName as boolean) ;  
}
```

使用接口控制属性

```typescript
interface ITreeParent {
    name : "张萨姆"
}
interface ITreeChild {
    age : 13 
}
function generatorDomTree (domTree : ITreeParent & ITreeChild) {

}
generatorDomTree({
    name : "张萨姆" ,
    age : 13
})
```

多态this, 在一个类的方法中返回另一个this , 就可以使用链式调用 

```typescript
class Computed {
    private age:number = 1 ; 
    constructor () {
    }
    public addAge ():this {
        this.age ++ ; 
        return this ; 
    }
    public subAge ():this {
        this.age -- ; 
        return this ; 
    }
    public getAge () :number {
        return this.age ; 
    }
}

let com:Computed = new  Computed() ; 
com.addAge().subAge().addAge() ;
console.log(com.getAge()) // 2 
```

函数重载

```typescript
type sn = string | number ; 
function add (num1:string , num2:string ):string ; 
function add (num1:number , num2:number) : number ; 
function add (num1:sn , num2:sn) :any {
   
}

console.log(add(1 , 2))
console.log(add('1' , '2'))
```

模块 

```typescript
// navigator.ts 
export default class Navigator {
    target (t:string ) :void{

    }
}
// demo.ts 
import Nav from './navigator';


let nav:Nav = new Nav () ; 
nav.target('aaa') ;  
```

命名空间

```typescript
//首先定义一个 namespace ， 并且导出  
// namespace.ts
export namespace Validation {
    export class StringValidation {
        public static checkPhone (phone : string ):boolean {
            return /\d{11}/.test(phone)
        }
    }
}
// demo.ts , 引入并且使用
import  {Validation} from  './namespace';
let flag:boolean = Validation.StringValidation.checkPhone('15022113044');
console.log(flag) // true 
```

## 装饰器 (Decorators) 

### 类装饰器

当 使用了类装饰器之后 , 这个类每次实例化一次都会执行这个sealed装饰器函数, 方法入参为constructor = 这个类的构造函数, 并且可以使用constructor.prototype 来进行访问这个类的原型 

```typescript
@sealed // 使用sealed 装饰器 
class Person {
    constructor ( name : string ) { }
}
function sealed (constructor : Function ) {
  console.log(constructor) ; 
}
let p : Person = new Person('key --- > ') ; 
console.log(p)
```



### 装饰器执行顺序 

```typescript
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}
class C {
    @f()
    @g()
    method() {}
}

```

执行结果

```typescript 
f(): evaluated
g(): evaluated
g(): called
f(): called
```





