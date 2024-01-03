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
    let symbol = document.getElementById("icon-order_contact") as HTMLElement;
    // 获取填充颜色
    let fill = window.getComputedStyle(node)["fill"];
    symbol.style.fill = fill;
    node.childNodes[0].appendChild(symbol);
  });
}
