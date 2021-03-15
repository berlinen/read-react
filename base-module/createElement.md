## jsx 语法

### JSX 的本质：JavaScript 的语法扩展

JSX 是 JavaScript 的一种语法扩展，它和模板语言很接近，但是它充分具备 JavaScript 的能力。

### JSX 语法是如何在 JavaScript 中生效的：认识 Babel

JSX 会被编译为 React.createElement()， React.createElement() 将返回一个叫作“React Element”的 JS 对象。

### 什么是 Babel 呢？

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

Babel 也具备将 JSX 语法转换为 JavaScript 代码的能力。

![avatar](/images/babelJsx.png)

可以看到，所有的 JSX 标签都被转化成了 React.createElement 调用，这也就意味着，我们写的 JSX 其实写的就是 React.createElement，虽然它看起来有点像 HTML，但也只是“看起来像”而已。JSX 的本质是React.createElement这个 JavaScript 调用的语法糖，这也就完美地呼应上了 React 官方给出的“JSX 充分具备 JavaScript 的能力”这句话。

### React 选用 JSX 语法的动机

换个角度想想，既然 JSX 等价于一次 React.createElement 调用，那么 React 官方为什么不直接引导我们用 React.createElement 来创建元素呢？

原因非常简单，我们来看一个相对复杂一些的组件的 JSX 代码和 React.createElement 调用之间的对比。它们各自的形态如下图所示，图中左侧是 JSX 代码，右侧是 React.createElement 调用：

![avatar](/images/jsx2.png)



