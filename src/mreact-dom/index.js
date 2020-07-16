function ReactDOM() {}

ReactDOM.render = function (vnode, container) {
  if (!container || !container.nodeType) {
    console.error("error: container must be an element");
    return;
  }

  container.innerHTML = "";

  return render(vnode, container);
};

// 设置属性
function setAttribute(dom, name, value) {
  // 如果是类名
  if (name === "className") name = "class";

  // 如果是事件监听事件：onxxx
  if (/on\w+/.test(name)) {
    name = name.toLowerCase();
    dom[name] = value;
  } else if (name === "style") {
    // 如果是样式，同时是字符串
    if (!value || typeof value === "string") {
      dom.style.cssText = value || "";
    } else if (value && typeof value === "object") {
      // 如果style是对象，则转换为字符串
      for (let key in value) {
        // 如果是数值则加上px单位
        dom.style[key] =
          typeof value[key] === "number" ? value[key] + "px" : value[key];
      }
    }
  } else {
    // 普通属性则直接设置
    dom[name] = value;

    if (value) {
      dom.setAttribute(name, value);
    } else {
      dom.removeAttribute(name);
    }
  }
}

// 渲染主函数
function render(vnode, container) {
  // 如果是纯文本
  if (typeof vnode === "string") {
    const textNode = document.createTextNode(vnode);
    container.appendChild(textNode);
    return;
  }

  const dom = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((attr) => {
      const value = vnode.attrs[attr];
      setAttribute(dom, attr, value); // 设置属性
    });
  }

  vnode.children &&
    vnode.children.length &&
    vnode.children.forEach((child) => render(child, dom));

  return container.appendChild(dom);
}

export default ReactDOM;
