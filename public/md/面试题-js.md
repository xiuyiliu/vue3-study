#### js

- let和const命令
  - 不存在变量提升；
  - 存在暂时性死区，在使用前一定要先声明；
  - 存在块级作用域，（ES5只有全局作用域和函数作用域）考虑到环境导致的行为差异较大，应该避免在块级作用域内声明函数，如果需要，也要写成函数表达式；
  - 相同作用域下不允许重复声明。


- 顶层对象的属性

  顶层对象，在浏览器环境指的是window,在node环境下指的是global对象。ES5中顶层对象的属性和全局便令是等价的，是js最大的设计败笔之一。首先没法在编译时就报出变量为生命的错误，只有运行时才能知道。其次，容易在不知不觉间创建了全局变量；顶层对象的属性是可以到处读写的，不利于模块化变成。在ES6中，var和function声明的全局变量依旧是顶层对象的属性，let和const声明的全局变量，不属于顶层对象的属性，逐渐将全局变量与顶层对象的属性脱钩。同时定义globalThis对象为不同环境下的顶层对象。


- 变量的解构赋值

  在数组中，变量的取值由他的位置决定；在对象中，变量必须与属性同名，才能取到正确的值。

  用途：

  - 交换变量的值：[x, y] = [y, x]
  - 从函数中返回多个值


  - 提取JSON数据
  - 函数参数的默认值
  - 输入模块的指定方法


- this的指向？

  大多数情况下，在函数执行时确定this的指向，最终指向函数运行时所在的对象；箭头函数除外，箭头函数没有自己的this对象，指向定义时上层作用域中的this。

  - 全局作用域中或普通幻术中的this指向全局对象window;
  - 立即执行函数this指向window；
  - 定时器回调函数中的this指向window；
  - 事件中的this指向事件源对象；
  - 对象方法中的this谁调用指向谁；
  - 构造函数中的this指向对象实例；

- 如何改变this指向？call,apply,bind有什么区别？

  call,apply,bind都可以改变this的指向，其中传入的第一个参数就是this要指向的对象，在非严格模式下，如果传入的第一个参数是null或undefined，则指向全局对象（浏览器环境下为window）。不同点：处第一个参数相同外，call方法接受的是若干个参数列表，而apply接收的是由若干个参数组成的数组；bind返回一个新的函数，需要手动调用。

- 列出几种循环的方式并说出他们的差异

  - for循环，可遍历数组，可以使用break,continue语句终止循环或调出本轮循环。
  - forEach，可遍历数组，不可终止。
  - map，可遍历数组，操作数组中的每一项返回一个新的数组，不可终止。
  - for in循环，可遍历数组，对象，遍历对象时会遍历自身和继承的可枚举属性。
  - for of循环，可遍历所有部署Iterator接口的数据结构（数组，Set, Map,NodeList对象，arguments对象，对象不可），可以终止。

- js几种数据类型

  Null,undefined,布尔值（Boolean），字符串（String），数值（Number），对象（Object），es6后又增加大整数（BigInt），Symbol。其中，Symbol表示独一无二的值。js表示的整数范围为-2的53次方~2的53次方，超过此区间会丢失精度，所以引入大整数的类型，没有位数的限制，任何位数都可以精确表示，以满足在科学和金融领域的精确计算。

  ```
  let s = Symbol()
  let a = Symbol('foo') // 接受一个字符串是他的描述，方便区分。

  const b = 15346349309n // 后面必须添加后缀n
  ```

- new 一个对象的过程？

  - 开辟一块内存，创建一个空对象；
  - 把构造函数Object的this指向实例，执行构造函数添加属性；
  - 将实例的原型对象指向Object.prototype；
  - 返回新对象。

- 深拷贝和浅拷贝

  首先，我们知道js的数据类型分为基本数据类型（null,undefined,String,Boolean,Number,BigInt,Symbol）和引用数据类型(Object,引用类型的数据结构包括对象，数组，函数等)。基本数据类型的名值存储在栈内存中，引用数据类型的名存储在栈内存中，值存储在堆内存中，同时栈内存会提供一个引用地址指向堆内存中的值。所以如果只复制引用地址，而没有复制堆内存中的值，即为浅拷贝；如果复制了引用地址，同时又在堆内存中开辟一块新的内存复制堆内存中的值，即为深拷贝。

  ```
  // 深拷贝
  // 1) 采用递归的方式去拷贝所有层级的属性
  function deepClone(obj) {
      let objClone = Array.isArray(obj) ? [] : {};
      if (obj && typeof obj === 'object') {
          for(let key in obj) {
              if(obj.hasOwnProperty(key)) {
                 //判断ojb子元素是否为对象，如果是，递归复制
                  if (obj[key] && typeof obj[key] === 'object') {
                      objClone[key] = deepClone(obj[key])
                  } else {
                      //如果不是，简单复制
                      objClone[key] = obj[key];
                  }
              }
          }
      }
  }

  // 2)通过JSON对象来实现深拷贝
  // 缺点:无法实现对对象中方法的深拷贝，会显示为undefined;
  function deepClone2(obj) {
    let _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
    return objClone;
  }
  // lodash函数库实现深拷,lodash.cloneDeep()实现深拷贝
  ```

  ​

- 用过哪些es6新特性？

  用的比较多的：let const 定义变量；解构赋值；扩展运算符；Promise；async函数；for of循环；还有一些扩展的API。

- 谈谈promise

  Promise是异步编程的一种解决方案，解决了回调函数嵌套的弊端，使异步编程时的横向扩展改为纵向扩展。

  Promise构造函数接受一个函数作为参数，该函数有两个参数resovle和reject;resolve将Promise对象的状态由“未完成”变成“成功”，同时将异步操作的结果作为参数抛出去；reject将Promise对象的状态由“未完成”变成“失败”，同时将错误信息作为参数抛出去。Promise实例生成后，可以用then方法分别指定成功和失败状态的回调函数，同时then方法返回一个新的Promise实例，所以可以链式操作。

- 闭包

  在了解闭包前首先需要了解，在作用域链的机制下，函数作用域可以访问全局作用域下的变量，反之不可以，两个函数之间也不能访问到对方作用域下的变量。一个函数执行完毕后，其作用域内的变量内存会被释放。所以，如果想要在外部访问到函数作用域内的变量就需要闭包机制。闭包的形式就是在函数内定义一个函数，并作为返回值返回，内部函数持有外部函数作用域内的变量的依赖。以此保证访问到函数作用域内的变量，同时该变量的内存不会被释放，也容易造成内存泄漏。

  ```
  function fn() {
    var num = 3
    return function() {
      var n = 0;
      console.log(++n)
      num+=1
      console.log(num)
      return num
    }
  }
  var fn1 = fn() // 相当于fn1=function() {var n=0;....},且由于匿名函数中持有对num变量的依赖，所以fn执行完毕后并没有销毁num变量
  fn1() 1 4 // 相当于执行匿名函数，如此可以在外部访问函数作用域内的mum变量，变量n每次调用时重新创建，但是由于匿名函数中引种这fn种的变量num，所以num无法被销毁
  fn1() 1 5
  ```

- 继承

  每个对象都可以有自己的属性和方法，同时每个对象都有一个原型对象，在浏览器环境下，对象实例与它的原型对象通过\__proto__连接，形成一个原型链。当访问一个对象的属性时，会先从对象自身的属性查找，找不到时顺着原型链在原型对象上一级一级向上查找，直到找到Null为止。

- js继承的几种方式及各自的优缺点

  - 构造函数继承：在子类的构造函数中通过call方法调用父类的构造函数。优点：避免了父类引用类型属性被所有实例共享的问题。缺点：只能继承父类的实例属性和方法，不能继承原型的属性和方法；无法实现复用，每个子类都有父类实例的副本，影响性能。

  ```
  function Parent() {
    this.color=['red', 'yellow', 'blue']
  }
  function Child() {
    Parent.call(this)
  }
  const ins1 = new Child()
  ins1.color.push('black')
  const ins2 = new Child()
  ins1.color // ['red', 'yellow', 'blue', 'black']
  ins2.color // ['red', 'yellow', 'blue']
  ```

  - 原型链继承：将父类的实例作为子类的原型的对象。缺点：父类引用类型的属性会所有实例共享，相互影响。

  ```
  function Parent() {
    this.name = '诸葛亮'
  }
  Parent.prototype.getName = function() {
    console.log(this.name)
  }
  function Child() {}
  Child.prototype = new Parent()
  const ins1 = new Child()
  ins1.getName() // '诸葛亮'
  ```

  - 组合继承：构造函数加原型的方式。缺点：父类的构造函数调用的两次

  ```
  function Parent(name) {
    this.name = name
  }
  Parent.prototype.getName = function() {
    console.log(this.name)
  }
  function Child(name, age) {
    Parent.call(this,name) // 第二次调用父类
    this.age = age
  }
  Child.prototype = new Parent() // 第一次调用父类
  Child.prototype.constructor = Child
  const ins1 = new Child('李白', 27)
  ```

  - 组合继承的优化：通过Object.create()方法完成对子类原型对象的创建，比组合继承减少一次父类的调用。

  ```
  function inheritPrototype(child, parent) {
    let prototype = Object.create(parent.prototype);
    protype.constructor = child;
    child.prototype = prototype
  }
  function Parent(name) {
    this.name = name
  }
  Parent.prototype.getName = function() {
    console.log(this.name)
  }
  function Child(name, age) {
    Parent.call(this,name) // 第二次调用父类
    this.age = age
  }
  Child.prototype = inheritPrototype(Child, Parent) // 减少一次调用父类
  const ins1 = new Child('李白', 27)
  ```

  - ES6 Class的extend实现继承：

- ES5和ES6继承的原理有何不同？

  ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.call(this)）；

  ES6的继承有所不同，实质上是先创建父类的实例对象this，然后再用子类的构造函数修改this。因为子类没有自己的this对象，所以必须先调用父类的super()方法，否则新建实例报错

- js事件循环机制

  JS是单线程的，为了协调事件，交互，脚本，UI渲染，网络请求等，采用事件循环的机制。JS的任务分为同步任务和异步任务，同步任务在主线程中被立即执行，异步任务通过任务队列的机制来协调，异步任务又分为宏任务和微任务，微任务优先于红任务执行。JS的执行顺序为先将主线程中的同步任务执行完毕，再去任务队列中读取异步任务，将其推入主线程中执行，这一过程中，会先将微任务列表中的所有微任务执行完毕，再去宏任务列表中将所有宏任务执行完毕，上述过程不断重复，即为事件循环。宏任务包括：setTimeout，setInterval等定时器，requestAnimationFrame，Ajax，I/O；微任务包括：promise.then,catch,finally及node环境下的process.nextTick,

- js事件代理

  利用事件冒泡的机制，将本应注册在子元素上的事件注册在父元素上，这样点击子元素时发现没有相应事件就到父元素上寻找做出响应。event.target记录事件源，即发生事件的子元素。好处是减少DOM操作，提高性能；随时添加的子元素会自动拥有相应的处理事件。

- 防抖和节流

  防抖和节流用来解决响应跟不上触发频率的问题。如鼠标移动事件onmousemove，滚动滚动条事件onscroll，窗口大小改变事件onresize,事件高频触发，事件的回调函数较为复杂，导致响应跟不上触发。或者搜索框的实时检查，绑定onkeyup事件向服务端发起请求检查，频繁的网络请求导致响应跟不上触发。
  防抖，持续触发某个事件时，并不会立即执行handle函数，当一段时间内没有触发该事件时，才会延迟执行handle函数。可以在搜索框的实时检查时使用防抖，

  ```
  function debounce(fn,wait) {
      let timeout = null;
      return function() {
          if(timeout !== null) clearTimeout(timeout)
          timeout = setTimeout(fn,wait)
      }
  }
  ```

  节流，当持续触发某个事件时，保证一定时间段内只调用一次handle函数。一般有两种实现方式，时间戳和定时器。

  ```
  // 当高频事件触发时，第一次会立即执行，最后一次触发后，不会再执行。
  function throttle(fn,delay) {
      let prev = Date.now()
      return function() {
          let context = this;
          let args = arguments;
          let now = Date.now();
          if (now - prev >= delay) {
              fn.apply(context,args);
              prev = Date.now();
          }
      }
  }
  // 当高频事件触发时，delay后才会第一次执行，最后一次触发后delay一段时间也会触发
  function throttle(fn,delay) {
      let timer = null
      return function() {
          let context = this;
          let args = arguments;
          if (!timer) {
              timer = setTimeout(function() {
                  fn.apply(context,args);
                  timer = null;
              },delay);
          }
      }
  }
  ```

- 冒泡排序

  ```
  function bubbleSort(arr) {
    // 获取数组长度，以确定循环次数。
    let len = arr.length
    // 遍历数组len次，以确保数组被完全排序。
    for(let i = 0; i < len; i++) {
    	// 遍历数组的前len-i项，忽略后面的i项（已排序部分）。
      for(let j = 0; j < len - 1 - i; j++) {
        // 将每一项与后一项进行对比，不符合要求的就换位。
        if (arr[j] > arr[j + 1]) {
          [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
        }
      }
    }
    return arr
  }
  ```


- 手写一个Ajax

  ```
  const ajax = new XMLHttpRequest()
  ajax.open('get', 'http://localhost:3000')
  ajax.send()
  ajax.onreadystagechange = function() {
    if (ajax.readyStage === 4 && ajax.status === 200) {
      ...
    }
  }
  ```

  ​