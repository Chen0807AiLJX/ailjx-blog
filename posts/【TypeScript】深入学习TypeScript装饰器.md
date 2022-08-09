---
title: "【TypeScript】深入学习TypeScript装饰器"
date: "2022-08-08"
---

> 👉 **TypeScript 学习**：[TypeScript 从入门到精通](https://blog.csdn.net/m0_51969330/category_11929325.html)
>
> 👉 **蓝桥杯真题解析**：[蓝桥杯 Web 国赛真题解析](https://blog.csdn.net/m0_51969330/article/details/125360660?spm=1001.2014.3001.5502)
>
> 👉 个人简介：即将大三的学生，热爱前端，热爱生活 🍬
>
> 👉 你的一键三连是我更新的最大动力 ❤️！

# 前言

> 最近博主一直在创作`TypeScript`的内容，所有的`TypeScript`文章都在我的[TypeScript 从入门到精通](https://blog.csdn.net/m0_51969330/category_11929325.html)专栏里，每一篇文章都是精心打磨的优质好文，并且非常的全面和细致，期待你的订阅 ❤️

本篇文章将深入去讲解`TypeScript`中的**装饰器**，这也许会是你看过的最全面最细致的`TypeScript`教程，点赞关注收藏不迷路 🚀🚀🚀！

> **注意：** 装饰器目前是一个**实验性的功能**，在未来的版本中可能会改变。
> 要启用对装饰器的实验性支持，必须在 `tsconfig.json` 中启用`experimentalDecorators` 编译器选项

# 1、装饰器

装饰器是一种特殊的声明，可以附加到`类声明`、`方法`、`访问器`、`属性`或`参数`上

装饰器使用`@expression` 的形式，其中`expression` 必须是一个函数，该函数将在运行时被调用，并带有关于被装饰的声明的信息

例如，给定装饰器`@Ailjx`，那么我们就可以编写以下函数：

```typescript
// target接收被装饰的对象
function Ailjx(target: any) {
// 对 "target"做一些事情 ...
}
// 使用装饰器Ailjx
@Ailjx
// ....（被装饰器对象装饰的内容：类声明、方法、访问器、属性或参数）
```

**注意：** 装饰器必须写到被装饰内容的**上面**，中间不能隔行，以**类装饰器**为例：

```typescript
function Ailjx(target: any) {
    // target接收的是类A的构造函数
    const a = new target();
    console.log(a); // A { a: 1 }
}

@Ailjx // 这行不能带分号;
class A {
    a: number = 1;
}
```

## 装饰器工厂

如果我们想自定义装饰器如何应用于声明，我们可以写一个装饰器工厂，装饰器工厂实际是一个**高阶函数**，它返回将在运行时被装饰器调用的表达式：

```typescript
// value参数接收使用装饰器工厂时传递的参数
function color(value: string) {
    // 这是装饰器工厂
    // 可以做一些操作...

    // 返回的装饰器函数
    return function (target: any) {
        // target依旧为被装饰的对象
        // 这就是装饰器
        // 用 "target" 和 "value"做一些事情...
    };
}
```

使用装饰器工厂可以传参数：

```typescript
@color('Ailjx')
// ....（被装饰器对象装饰的内容）
```

# 2、装饰器组合

多个装饰器可以应用于一个声明，例如：

```typescript
@f
@g
x
```

> `@f` `@g`为两个装饰器，`x`为被装饰内容

当多个装饰器应用于单个声明时，它们的评估（计算）类似于数学中的函数组合，在这个模型中，当组合函数`f`和`g`时，得到的复合 `(f∘g)(x)` 等价于`f(g(x))`

因此，在 `TypeScript` 中对单个声明评估多个装饰器时执行以下步骤：

-   每个装饰器的表达式都是**从上到下评估**的
-   然后将结果作为函数**从下到上调用**

我们可以使用**装饰器工厂**来观察此评估（计算）顺序：

```typescript
function first() {
    console.log("first(): first装饰器工厂");
    return function (target: any) {
        console.log("first(): first装饰器函数");
    };
}

function second() {
    console.log("second(): second装饰器工厂");
    return function (target: any) {
        console.log("second(): second装饰器函数");
    };
}
@first()
@second()
class C {}
```

打印结果：

```typescript
first(): first装饰器工厂
second(): second装饰器工厂
second(): second装饰器函数
first(): first装饰器函数
```

-   先从上到下打印装饰器工厂印证了：每个装饰器的表达式都是从上到下**评估计算**的

-   再从下到上打印装饰器函数印证了：将结果作为函数从下到上**调用**

如果不使用装饰器工厂，直接使用装饰器，那么就会直接从下到上**调用**（因为从上到下评估装饰器表达式的过程已经在`TypeScript`内部执行了）：

```typescript
function first(target: any) {
    console.log("first():first装饰器函数");
}

function second(target: any) {
    console.log("second(): second装饰器函数");
}
@first
@second
class C {}
```

打印结果：

```typescript
second(): second装饰器函数
first():first装饰器函数
```

# 3、类装饰器

何为类装饰器？

-   类装饰器是在类声明之前声明的
-   类装饰器应用于类的构造函数，可用于**观察**、**修改**或**替换**类定义

-   类装饰器不能在声明文件（`.d.ts`）或任何其他环境上下文中使用（如`declare`类)

    > `declare`用来表示声明其后面的全局变量的类型，之后我会出单独的一篇文章对其详细讲解）

-   类装饰器的表达式将在运行时作为函数调用，类的构造函数将作为其**唯一**参数传入其中

-   如果类装饰器返回一个值，它将用提供的构造函数**替换**类声明：

    ```typescript
    function classDecorators(constructor: Function) {
        return class {
            constructor() {
                console.log("B");
            }
        };
    }

    @classDecorators
    class Cla {}
    new Cla(); // 打印出B
    ```

    **注意：** 如果您选择返回一个**新的构造函数**，您必须注意维护原始**原型**，因为在运行时应用装饰器的逻辑不会为您执行此操作，上面这个例子显然并没有注意到这一点，建议的做法见下方的：**通过类装饰器覆盖原先的类声明**

**通过类装饰器修改类：**

```typescript
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class BugReport {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }
}
```

> [Object.seal()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置，当前属性的值只要原来是可写的就依旧可以改变

当`@sealed` 被执行时，它将同时封闭构造函数和它的原型，因此将阻止在运行时通过访问`BugReport.prototype` 或通过定义`BugReport` 本身的属性来向该类添加或删除任何进一步的功能

> 注意：`ES2015`类实际上只是基于原型的构造函数的**语法糖**，所以其依旧具有`prototype`属性

这个装饰器并不能阻止类对`BugReport` 进行`extends`子类化扩展操作

**通过类装饰器覆盖原先的类声明：**

```typescript
function classDecorators<T extends { new (...args: any[]): {} }>(
    constructor: T
) {
    return class extends constructor {
        name = "A";
        getName() {
            console.log(this.name);
        }
    };
}

@classDecorators
class Cla {
    name: string;
    constructor(t: string) {
        this.name = t;
    }
}

const c = new Cla("Ailjx");
console.log(c.name); // 会打印A，而不是Ailjx
// 注意，装饰器不会改变TypeScript的类型
// 因此，类型系统对新的属性`reportingURL`是不可知的。
c.getName(); // ❌❌❌err：类型“C”上不存在属性“getName”
```

在这个例子中，类装饰器器返回了一个**继承于**基类`C`的新类，在这个新类中我们修改了`name`属性的默认值，并增加了`getName`方法，这个新类将覆盖原先的类`C`，并很好的维护了原始的**原型**

> 这里还使用了泛型、类型操作、构造函数签名方面的知识，如果有需要可以查看[TypeScript 从入门到精通](https://blog.csdn.net/m0_51969330/category_11929325.html)专栏中的前几篇文章

但这里仍旧存在一个问题，就是我们无法直接访问新增的这个 getName 方法，我们可以这样做：

```typescript
(c as any).getName(); // A
```

但这不够优雅！发挥我们的想象，我们完全可以利用[混入 mixin](https://blog.csdn.net/m0_51969330/article/details/126091018?spm=1001.2014.3001.5502)思想来改写一下这个例子，来实现完美的效果：

```typescript
function classDecorators() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            name = "A";
            getName() {
                console.log(this.name);
            }
        };
    };
}

const Cla = classDecorators()(
    class {
        name: string;
        constructor(t: string) {
            this.name = t;
        }
    }
);
const c = new Cla("Ailjx");
console.log(c.name); // 会打印A，而不是Ailjx
c.getName(); // A
```

这里我们放弃了类装饰器，而是使用一个**高阶函数**实现**混入**来改造这个例子，使其达到我们想要的效果

由此可见装饰器有时并不一定是最好的选择，仁者见仁智者见智

# 4、方法装饰器

什么是方法装饰器？

-   方法装饰器在方法声明之前声明
-   方法装饰器应用于方法的**属性描述符**，可用于观察、修改或替换方法定义
-   方法装饰器不能用于声明文件、**重载**或任何其他环境上下文（例如在`declare`类中）
-   如果方法装饰器返回一个值，它将替换掉该方法的**属性描述符**（注意：并不是简单的只替换该函数）
-   方法装饰器的表达式将在运行时作为函数调用，并有固定的三个参数

方法装饰器的**三个参数**：

-   第一个参数：静态成员的类的**构造函数**，或者实例成员（也就是普通成员）的类的**原型**

    -   静态成员：

        ```typescript
        function getNameDecorators(
            target: any,
            propertyKey: string,
            descriptor: PropertyDescriptor
        ) {
            console.log(target); // 将打印类cla的构造函数
        }
        class cla {
            @getNameDecorators
            static getName() {
                // 静态成员
                console.log("Ailjx");
            }
        }
        const c = new cla();
        ```

        打印结果：

        ![在这里插入图片描述](https://img-blog.csdnimg.cn/6b88963f96c94a8499781d4ff3f0fef4.png)

    -   实例成员：

        ```typescript
        function getNameDecorators(
            target: any,
            propertyKey: string,
            descriptor: PropertyDescriptor
        ) {
            console.log(target); // 将打印类cla的原型
        }
        class cla {
            @getNameDecorators
            getName() {
                // 实例成员
                console.log("Ailjx");
            }
        }
        const c = new cla();
        ```

        打印结果：

        ![在这里插入图片描述](https://img-blog.csdnimg.cn/e934bf9ae9344f94bb0389f0e9697e71.png)

-   第二个参数：该成员的名称，类型为`string`
-   第三个参数：该成员的[属性描述符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor#description)，类型固定为`PropertyDescriptor`

    > 在 `Javascript` 中， `属性` 由一个字符串类型的**名字**（`name`）和一个**属性描述符（`property descriptor`）对象** 构成

    > **注意：** 如果`tsconfig.json`中`target`小于`ES5`，属性描述符将无法定义！

示例：

```typescript
function getNameDecorators(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    // 修改属性描述符writable为false，使该属性的值不能被改变（不影响下面设置value）
    descriptor.writable = false;
    // 修改属性描述符value（该属性的值 ），设置一个新的值
    descriptor.value = function () {
        console.log("大帅哥");
    };
}

class cla {
    @getNameDecorators
    getName() {
        console.log("Ailjx");
    }
}
const c = new cla();

c.getName(); // 打印：大帅哥
c.getName = () => {
    console.log("大漂亮");
}; // ❌❌❌运行时报错，因为getName的writable属性描述为false，getName的值不能被修改
```

> 方法装饰器同样能写出装饰器工厂的形式

# 5、访问器装饰器

> 访问装饰器与方法装饰器大致相同

-   访问器装饰器在访问器（`get/set`）声明之前被声明
-   访问器装饰器被应用于访问器的属性描述符，可以用来观察、修改或替换访问器的定义
-   访问器装饰器不能在声明文件中使用，也不能在任何其他环境中使用（比如在`declare` 类中）
-   不能同时装饰单个成员的 `get` 和`set` 访问器，这是因为装饰器适用于一个属性描述符，它结合了获取和设置访问器，而不是每个单独声明

    ![在这里插入图片描述](https://img-blog.csdnimg.cn/a1873f1b1569491fb9f01d5dc878a767.png)

-   如果访问器装饰器返回一个值，它将替换掉该成员的**属性描述符**
-   访问器装饰器的表达式将在运行时作为一个函数被调用，有以下三个参数：
    1. 静态成员的类的构造函数，或者实例成员的类的原型
    2. 该成员的名称，类型为`string`
    3. 该成员的属性描述符，类型固定为`PropertyDescriptor`

示例：

```typescript
function configurable(value: boolean) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        // 属性描述符configurable：当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为 true。
        descriptor.configurable = value;
    };
}

class cla {
    private _name = "Ailjx";
    @configurable(true)
    get name() {
        return this._name;
    }
}
const c = new cla();
```

# 6、属性装饰器

-   属性装饰器在一个属性声明之前被声明
-   属性装饰器不能在声明文件中使用，也不能在任何其他环境下使用（比如在 `declare` 类中）
-   属性装饰器的表达式将在运行时作为一个函数被调用，有以下**两个参数**：
    1.  静态成员的类的构造函数，或者实例成员的类的原型
    2.  成员的名称

示例：

```typescript
function nameDecorator(target: any, propertyKey: string) {
    console.log(target, propertyKey);
}

class cla {
    @nameDecorator
    name: string = "Ailjx";
}
```

目前属性装饰器好像并没有什么用途，在官方文档中只给了一个记录有关属性元数据的例子，但装饰器元数据是一项实验性功能，可能会在未来的版本中引入重大更改，所以这里就先不多了

# 7、参数装饰器

-   参数装饰器在**参数声明之前声明**
-   参数装饰器应用于类构造**函数**或方法声明的**函数**
-   参数装饰器不能用于声明文件、重载或任何其他环境上下文（例如在`declare`类中）
-   参数装饰器的返回值被**忽略**
-   参数装饰器的表达式将在运行时作为函数调用，并带有以下三个参数：

    1.  静态成员的类的构造函数，或者实例成员的类的原型
    2.  该成员的姓名（函数的名称），类型为`string | symbol`
    3.  函数参数列表中参数的序号索引，类型为`number`

> **注意：** 参数装饰器只能用于观察已在方法上声明的参数

示例：

```typescript
function decorator(
    target: Object,
    propertyKey: string,
    parameterIndex: number
) {
    console.log(propertyKey, parameterIndex); // getName 1
}

class cla {
    // 注意@decorator的位置
    getName(name: string, @decorator age: number) {}
}
```

# 8、装饰器应用顺序

对于**类内部**各种声明的装饰器，有一个明确的**应用顺序**：

1. 先**从上到下**应用**实例成员**的装饰器，对于每个实例成员，首先是参数装饰器，然后是方法、访问器或属性装饰器
2. 然后**从上到下**应用**静态成员**的装饰器，对于每个静态成员，先是参数装饰器，然后是方法、存取器或属性装饰器。
3. 之后应用构造函数`constructor`上的参数装饰器
4. 最后应用类的类装饰器

代码演示：

```typescript
function classDec(constructor: Function) {
    console.log("类装饰器");
}

function staAttDec(target: any, propertyKey: string) {
    console.log("静态成员属性装饰器");
}

function attDec(target: any, propertyKey: string) {
    console.log("属性装饰器");
}

function conParamDec(
    target: Object,
    propertyKey: string,
    parameterIndex: number
) {
    console.log("构造函数参数装饰器");
}

function paramDec(target: Object, propertyKey: string, parameterIndex: number) {
    console.log("参数装饰器");
}

function fnDec(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    console.log("方法装饰器");
}

@classDec
class cla {
    @staAttDec
    static a = 1;

    @attDec
    name = 1;

    constructor(@conParamDec a: number) {}

    @fnDec
    fn(@paramDec a: number) {}
}
```

打印结果：

```typescript
属性装饰器;
参数装饰器;
方法装饰器;
静态成员属性装饰器;
构造函数参数装饰器;
类装饰器;
```

# 9、使用装饰器封装通用的 try catch

在`api`请求封装过程中，几乎都会使用到`try catch`来捕获错误，但对封装的每一个`api`请求函数都手动进行`try catch`的话，势必会带来很多麻烦，如：

```typescript
let info: any;

class Api {
    // 对每一个封装的api请求函数使用try catch捕获错误
    getNews() {
        try {
            return info.news;
        } catch (error) {
            console.log("获取新闻失败！");
        }
    }
    getUser() {
        try {
            return info.user;
        } catch (error) {
            console.log("获取用户失败！");
        }
    }
    //....
}

const api = new Api();
api.getNews();
api.getUser();
```

如果封装的请求比较少的话这样做还可以接受，但如果`api`请求非常多，那该怎么办？

这里给出一个使用**方法装饰器**来实现**统一**`try catch`的小案例：

```typescript
let info: any;

function apiDec(mag: string) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const fn = descriptor.value;
        try {
            fn();
        } catch (error) {
            console.log("请求错误:" + mag, error);
        }
    };
}

class Api {
    @apiDec("获取新闻失败！")
    getNews() {
        return info.news;
    }
    @apiDec("获取用户失败！")
    getUser() {
        return info.user;
    }
}

const api = new Api();
api.getNews();
api.getUser();
```

# 结语

至此，`TypeScript`**装饰器**的内容就全部结束了，关注博主下篇更精彩！

博主的[TypeScript 从入门到精通专栏](https://blog.csdn.net/m0_51969330/category_11929325.html)正在慢慢的补充之中，赶快关注订阅，与博主一起进步吧！期待你的三连支持。

> 参考资料：[TypeScript 官网](https://www.typescriptlang.org/docs/handbook/intro.html)

如果本篇文章对你有所帮助，还请客官一件四连！❤️
