### css

- link 和 @import 都能导入一个样式文件，它们有什么区别嘛？

  - link 是 HTML 标签，除了能导入 CSS 外，还能导入别的资源，比如图片、脚本和字体等；而 @import 是 CSS 的语法，只能用来导入 CSS；

    link 导入的样式会在页面加载时同时加载，@import 导入的样式需等页面加载完成后再加载；

    link 没有兼容性问题，@import 不兼容 ie5 以下；

    link 可以通过 JS 操作 DOM 动态引入样式表改变样式，而@import不可以。


- 盒模型；标准盒模型和IE盒模型；box-sizing；

  从内到外分别由content，padding， border和margin组成。在标准盒模型下，设置的宽高=content的宽高；在IE盒模型下，设置的宽高=content+padding+border的总和。box-sizing允许开发者指定盒子按什么标准解析：box-sizing:content-box=标准盒模型；box-sizing:border-box=IE盒模型。

- css选择器；优先级是怎样？

  基础选择器包括:ID选择器，类选择器，标签选择器，通配符选择器；属性选择器；组合选择器包括相邻兄弟选择器A+B；子选择器A>B;后代选择器A B;为类选择器：:first-child,:last-child,:nth-child(n),:nth-last-child(n),:nth-of-type(n),nth-last-of-type(n),first-of-type,last-of-type。

  为了方便记忆css声明的权重，为其分配了不同的数值。从高到底分别为

  - 10000：!important;
  - 1000：内联样式；
  - 100：ID选择器；
  - 10：类选择器，伪类选择器，属性选择器；
  - 1：标签选择器，伪元素选择器；
  - 0：通配符选择器，后代，兄弟选择器；

- css实现水平垂直居中？

  ```
  // 绝对定位+transfrom:
  .child {
    position: absolute;
    left: 50%;
    top: 50%;
    transfrom: translate(-50%,-50%);
  }
  // flex布局
  .parent {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // grid布局 {
    display: grid;
    justify-items: center;
    align-items: cetner;
  }
  ```

  ​

- 伪类和伪元素？

  伪类用于向某些选择器添加特殊的效果，方便选择；伪元素用于向元素插入某种不存在与html的虚拟元素，可以自定义其内容与样式。

  常见的伪类包括：条件伪类：:has()匹配包含指定元素的元素，:not()匹配不符合一组选择器的元素；行为伪类：:active鼠标激活的元素，:hover鼠标悬浮的元素；状态伪类：:focus聚焦的表单元素，:required必填的表单元素，:checked选项选中的表单元素；结构伪类，见上面。

  常见的伪元素包括：::before在元素前插入内容；::after在元素后插入内容。

- BFC? 如何创建一个BFC？BFC的渲染规则和应用场景

  Block Formatting Context块级格式化上下文。它是一个独立的渲染区域，规定了内部的块级盒子如何布局。它好像一个结界，这个区域与外部的区域毫不相干，互不影响。

  创建一个BFC方法

  - 根元素
  - 浮动元素
  - 绝对和固定定位元素，position为absolute或fixed
  - 非溢出的可见元素：overflow不为visible
  - 弹性盒子，栅格盒子。

  渲染规则：

  - 内部的块级盒子会在垂直方向一个接一个的放置；
  - 盒子在垂直方向的距离有margin决定，属于同一个BFC的两个相邻盒子的margin会发生的重叠；
    - 衍生问题，可以解决相邻盒子margin合并的问题。将其中一个盒子包一层并触发其BFC（overflow:hidden）使其不在同一个BFC下。


  - BFC的区域不会与float盒子重叠
    - 衍生问题，自适应两栏布局，.aside {width: 100px;float:left} .main {// 触发BFC overflow:auto}


  - BFC就是页面上的隔离的独立容器，容器里的子元素不会影响到外面。反之如此。

  - 计算BFC的高度时，浮动元素也参与其中。

- 清除浮动

  ```
  .clearfix {
    zoom: 1;
  }
  .clearfix::after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
  }
  ```

  ​

- 哪些属性具有继承性？

  - 字体相关： font-family,font-style,font-size等；
  - 文本相关：tent-align,tent-indent, line-height,color等；
  - 列表相关： list-style等；
  - 不具备继承性的属性：padding，border，margin，width，height。

- 层叠上下文？层叠等级和顺序是怎样？

  屏幕到眼睛的方向可以看成是Z轴，HTML元素依据自己定义的属性的优先级在Z轴上按照一定的顺序排列，这就是层叠上下文要描述的东西。

  符合以下任一条件的元素都产生层叠上下文

  - html文档根元素
  - 定位且z-index值不为auto的元素
  - flex容器的子元素，且z-index值不为auto
  - grid容器的子元素，且z-index值不为auto

  同一个层叠上下文中的层叠顺序，从屏幕到眼睛的方向依次为

  1. 形成层叠上下文的元素的背景和边框；
  2. z-index<0的子节点；
  3. block及的子节点；
  4. 浮动子节点；
  5. inline、inline-block级的子节点；
  6. z-index:auto/0的子节点；
  7. z-index>0的子节点。

- 单位：px,em,rem,vw,vh

  - px: css像素，设备像素比dpr=设备像素/css像素。当dpr=1:1时一个设备像素显示1个css像素；当dpr=2:1时，使用4个设备像素显示1个css像素；当dpr=3:1时，使用9个设备像素显示1个css像素。
  - em:相对单位，在font-size中使用时相对于父元素的font-size大小，父元素font-size:20px;在子元素中指定font-size:2em时，计算后为40px。在其他属性（width,height,padding,margin）中使用时是相对于自身的字体大小。
  - rem：相对于根元素的字体大小；
  - vw:视口宽度的1%；
  - vh:视口高度的1%；

- css如何实现三角形？

  ```
  .triangle {
    width: 0;
    height: 0;
    border-width: 40px;
    border-style: solid;
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: #000;
  }
  ```

  ​

- 移动端1px边框细化方案？

  ```
  .scale-1px {
    position: relative;
    border: none;
  }
  .scale-1px::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border: 1px solid #000;
    transform: scale(0.5);
    transform-origin: left top;
  }
  ```

  ​

- 消除浏览器默认样式？

  针对同一个类型的html标签，在不同的浏览器中往往有不同的表现，为了在不同的浏览器上保持一致，所以需要清除默认样式。可以手动定义，也可以引入Normalize.css，reset.css这类第三方的文件。

- 长文本处理

  ```
  // 超出部分换行
  .wrap {
    overflow-wrap: break-word;
  }
  // 字符超出位置使用连字符 
  .hyphens {
    hyphens: auto;
  }
  // 单行文本超出省略
  .ellipsis {
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  // 多行文本超出省略
  .line-clamp {
    width: 200px;
    overflow:hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  ```

  ​

- css实现左边固定右边自适应布局

  ```
  // BFC区域不会与浮动元素重叠
  .aside {
    width: 200px;
    float: left;
  }
  .main {
    overflow: auto; // 生成BFC
  }
  // flex布局
  .container {
    display: flex;
  }
  .aside {
    width: 200px;
  }
  .main {
    flex: 1;
  }
  ```

  ​

- 响应式布局？

  以移动端项目为例，在项目层面上，会采用rem布局。通过lib-flexible库和postcss-px2rem-exclude库的相关配置，实现在项目上将px自动转成rem。其中，lib-flexible会自动添加视口相关的meta标签，无需手动添加，手动添加了会采用手动添加的，所以不要手动去添加。postcss-px2rem-exclude会向vue单文件中的style中的px转换成rem,同时通过配置exclude可以将指定文件夹下的如node_modules中的第三方库去除。在页面的布局是，多采用flex布局，栅格布局或者百分比。如果确实需要写死px，则也会通过项目配置自动转换成rem。从而实现响应式布局。

- css性能优化？

  - 文件压缩
  - 去除无用的css，提取公共类，减少重复
  - 高效的利用选择器：css选择器的匹配是从右到左的，所以尽量少用id选择器或类选择器去修饰标签选择器；保持简单，不要过多嵌套；通配符选择器和属性选择器效率低，需要匹配的元素最多，尽量避免使用。
  - 小图标考虑使用雪碧图减少网络请求
  - 尽量避免使用@import，使用@import引入的css文件只有在引用它的那个css文件下载解析后才会被解析，破坏了css的并行下载。
  - 减少重排，包括改变font-size,font-family;改变元素的内外边距，通过js改变css，获取dom位置相关属性；改变窗口大小等。

- 有了解webp格式吗？

- display:none和visibility:hidden区别？

  - 前者的元素不占据任何控件，后者元素的空间保留；
  - 前者作为transition-property不会产生过渡效果，后者会有过渡效果；
  - 前者的显隐会触发重排和重绘，后者只会触发重绘；
  - 前者的后代元素皆不可见，后者的后代元素可以控制是否可见visibility:visible;

- 浏览器是怎么解析css选择器的？

  从右往左解析的。如果从左向右匹配，发现不符合规则，需要进行回溯，性能浪费在失败的查找上。而从右向左匹配，第一步就筛选掉大量不符合条件的节点，节省性能。

- 遇到的浏览器兼容性问题

  - IE浏览器会缓存网页中发起的ajax get请求。如果get请求的url是第一次请求的话，会请求服务器获取最新的数据；如果不是第一次请求的话，会直接从缓存中拿到第一次获取的数据，从而导致数据不同步。解决方案：在axios请求拦截器中设置请求头"Cache-Control":"no-cache"。或者在请求的url中增加时间戳。
  - get请求传递中文参数乱码。对get参数使用encodeURIComponent进行编码。
  - 十六进制表示颜色末尾加两位表示透明度时，IE不支持。

- style标签写在body后和body前有什么区别？

  写在body之后，由于浏览器对html文档自上而下解析，当解析到卸载尾部的样式表会导致浏览器停止之前的渲染，等待加载且解析完样式表后重新渲染，可能会导致样式失效页面闪烁的问题。

- line-height:上一行基线到下一行基线之间的距离。

- 重排（回流）和重绘区别？

  - 重排：当render tree中的一部分或全部因为元素的尺寸，布局，增删，显隐等改变需要重新构建时，触发重排；
  - 重绘：当render tree中的一些元素需要更新属性，这些属性只会只会影响外观而不会影响布局时（如颜色改变），触发重绘。重排一定会触发重绘。
  - 触发重排的条件
    - 增加或删除可见的dom元素
    - 元素的位置发生了改变
    - 元素的尺寸发生了改变，如宽高，边距
    - 元素的内容发生了改变，如图片大小，字体大小
    - 页面初始化渲染
    - 浏览器窗口尺寸发生变化。

  ​