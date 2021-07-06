[toc]
# react与vue的区别
1. vue是MVVM框架，即model -> view和view -> model是自动的，当然这里只说表单组件，它有个v-model指令能实现双向绑定，但其实本质上还是通过监听原生事件来做的view -> model
2. react是MVC框架，虽然model->view是自动的，但是view->model是需要程序员去编写的
3. 如果要做的页面特别多表单，那用vue会比较简单

# cra脚手架的一些依赖
 1. react： 框架的核心，提供了状态、属性、组件、生命周期等
 2. react-dom：把jsx语法转换成真正的dom，最后挂在到html中
 3. react-scripts：执行命令，通知webpack打包编译。包含了当前项目中webpack配置的东西 (cra把webpack的配置隐藏到了node_modules中)
    - eject 把隐藏在node_modules中的webpack配置暴露出来，用来自定义设置
        - babel-preset-react-app 用来解析JSX语法

# JSX语法
    javascript & xml

# 虚拟dom到真实dom
    两个主要的方法React.createElement()和ReactDOM.render()
步骤：
1. 用babel-preset-react-app词法解析器将JSX转换成createElement(type, props, ...children)这种的格式，执行，返回react元素（就是虚拟dom）
    ==虚拟dom==对象格式长这样: 
    ```javascript
    {
        $$typeof：Symbol(react.element),
        type: 'div',  // 标签名或组件名
        props:{
            className: 'xxx',  // 属性
            children: [] // 子元素 只有一个子元素的时候不是数组
        },
        ref: null,
        key: null，
        ...
    }
    ```
2. 执行ReactDOM.render(element, container, callback)，虚拟dom到真实dom的转变