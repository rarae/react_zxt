[toc]
# 1. react与vue的区别
1. vue是MVVM框架，即model -> view和view -> model是自动的，当然这里只说表单组件，它有个v-model指令能实现双向绑定，但其实本质上还是通过监听原生事件来做的view -> model
2. react是MVC框架，虽然model->view是自动的，但是view->model是需要程序员去编写的
3. 如果要做的页面特别多表单，那用vue会比较简单

# 2. cra脚手架的一些依赖
 1. react： 框架的核心，提供了状态、属性、组件、生命周期等
 2. react-dom：把jsx语法转换成真正的dom，最后挂在到html中
 3. react-scripts：执行命令，通知webpack打包编译。包含了当前项目中webpack配置的东西 (cra把webpack的配置隐藏到了node_modules中)
    - eject 把隐藏在node_modules中的webpack配置暴露出来，用来自定义设置
        - babel-preset-react-app 用来解析JSX语法

# 3. JSX语法
    javascript & xml
    
    一般对象不能被jsx渲染
    function App({ children }) {
        return <div>{{ a: 1 }}</div>; // 报错
    }
    只有children虚拟dom才能被渲染,一般用React.Children.map(children, fn)

# 4. 虚拟dom到真实dom
    两个主要的方法React.createElement()和ReactDOM.render()
步骤：
1. 用babel-preset-react-app词法解析器将JSX转换成createElement(type, props, ...children)这种的格式，执行，返回react元素（就是虚拟dom）
    ==虚拟dom==对象格式长这样: 
    ```javascript
    {
        $$typeof: Symbol(react.element),
        type: 'div',  // 标签名或组件名
        props:{  // 除去key和ref属性
            className: 'xxx',  // 属性
            children: [] // 子元素 只有一个子元素的时候不是数组
        },
        ref: null,
        key: null，
        ...
    }
    ```
2. 执行ReactDOM.render(element, container, callback)，虚拟dom到真实dom的转变

# 5. selfJSX.js
```javascript
function createElement(type, props, ...children) {
  let vDOM = {
    type,
    props: {}, //key和ref单独放
    key: null,
    ref: null,
  };

  if (props) {
    if (props.hasOwnProperty("key")) {
      vDOM.key = props.key;
      delete props.key;
    }
    if (props.hasOwnProperty("ref")) {
      vDOM.ref = props.ref;
      delete props.ref;
    }
    vDOM.props = { ...props };
  }

  if (children.length > 0) {
    if (children.length === 1) {
      vDOM.props.children = children[0];
    } else {
      vDOM.props.children = [...children];
    }
  }

  return vDOM;
}

let example = createElement(
  "div",
  { className: "nav", id: 21 },
  "are you kidding?",
  createElement("div", {}, "yes!")
);

console.dir(example);
/**
 *{
    "type": "div",
    "props": {
      "className": "nav",
      "id": 21,
      "children": ["are you kidding?", {
        "type": "div",
        "props": {
          "children": "yes!"
        },
        "key": null,
        "ref": null
      }]
    },
    "key": null,
    "ref": null
  }
 */

function render(element, container, callback) {
  // 节点
  //key和ref是react的内容，这里就不处理了
  let { type, props, key, ref } = element;
  let { className, style, children, ...restProps } = props || {};

  const e = document.createElement(type);

  className && (e.className = className);

  if (style) {
    for (const styleKey in style) {
      e.style[styleKey] = style[styleKey]; // 这里就不做驼峰处理了
    }
  }

  for (const restKey in restProps) {
    e.setAttribute(restKey, restProps[restKey]);
  }

  if (children) {
    // 统一处理
    children = Array.isArray(children) ? children : [children];
    children.forEach((item) => {
      if (typeof item === "string") {
        e.appendChild(document.createTextNode(item));
        return;
      } else {
        render(item, e);
      }
    });
  }

  callback && callback();
  container.appendChild(e);
}

render(example, document.getElementById("selfJSX"));

export default 3;

```

# 6. 组件
## 函数式组件
    只要让函数返回JSX就行了,接收props
    特点：简单（开发简单，渲染也快）、静态组件、没有state、没有生命周期
        props.xxx = xxx是不允许的 // cannot assign to read only property

## 类组件
```javascript
class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    // 就算在constructor什么都不传,react还是会帮我们将props挂载到当前实例上
    console.log(this.props);  // 可以显示
    return <div></div>;
  }
}
```
    this.setState(partialState, callback) // 修改状态，通知视图重新渲染
    callback是渲染完成后才执行的

    this.forceUpdate(callback) // 强制渲染

    基于状态（或属性）的更新驱动视图渲染，叫做受控组件（受实例数据管控的组件）
    非受控组件：不受数据管控（直接操控dom）

```javascript
// 非受控组件用ref来操作
class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <p ref="p1"></p> // 这样写实际上就是往组件实例的refs属性添加一个原生的指向p元素的数据
        <p ref={x=>{  // 现在流行这种写法，直接挂在this实例上
          this.p2 = x;
        }}></p>
      </div>
    );
  }
  componentDidMount() {
    console.log(this.refs); // {fff: p, ff2f33: p}
  }
}
```
### 生命周期
老版本的生命周期
![react](https://img-blog.csdnimg.cn/20210708215330428.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTE4NzQ0,size_16,color_FFFFFF,t_70)

新版本的生命周期
![react](https://img-blog.csdnimg.cn/img_convert/15d9cb75ff8f0caab57622de4f378460.png)


[详情请点击](https://www.jianshu.com/p/b331d0e4b398)

## react合成事件
    react是基于事件委托把所有的事件进行代理（跨平台、跨终端）
    事件对象也因此是自己额外单独处理了

setState(partialProps, cbFn)在合成事件或者生命周期函数中都是异步操作 

如果把setState放在异步任务中，那么就是同步的了
比如放在1. 定时器 2.原生js事件 3.ajax请求

## 复合组件信息传递