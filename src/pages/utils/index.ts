import * as canvg from "canvg";
import { RenderingContext2D } from "canvg";

export function getQueryVariable(url: string) {
  const str = url.split("?");
  const query = str[1];
  const consts = query.split("&");
  const queryMap = new Map();
  for (let i = 0; i < consts.length; i++) {
    const pair = consts[i].split("=");
    queryMap.set(pair[0], pair[1]);
  }
  return queryMap;
}

// 将  svg 转化为 canvas
export function changeToCanvas(element: HTMLDivElement) {
  const svgElems = element.querySelectorAll("svg");
  console.log(svgElems);
  //es6语法
  let elems = [...svgElems];
  elems.forEach((node) => {
    let parentNode = node.parentNode;
    console.log(
      node,

      node.appendChild(document.getElementById("icon-order_contact")),
      node
    );
    node.childNodes[0].appendChild(
      document.getElementById("icon-order_contact")
    );
    console.log(document.getElementById("icon-order_contact"));
    let canvas = document.createElement("canvas");

    canvas.style.zIndex = "9";
    let canvasContent = canvas.getContext("2d") as RenderingContext2D;
    //处理svg转换canvas需要使用canvg组件
    if (node.tagName == "svg") {
      let svg = node.outerHTML.trim();
      // console.log(node);
      canvas.width = node.getBoundingClientRect().width;
      canvas.height = node.getBoundingClientRect().height;

      canvg.Canvg.from(canvasContent, svg);
      if (node.style.position) {
        canvas.style.position += node.style.position;
        canvas.style.left += node.style.left;
        canvas.style.top += node.style.top;
      }
    }

    // parentNode?.removeChild(node);
    parentNode?.appendChild(canvas);
  });
}
