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
