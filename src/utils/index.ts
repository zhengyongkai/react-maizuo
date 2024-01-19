// 获取url参数
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

export function changeToCanvas(element: HTMLDivElement) {
  const svgElems = element.querySelectorAll("svg");
  let elems: SVGElement[] = [...svgElems];
  elems.forEach((node: SVGElement) => {
    // 拿到 symbol 的 use 属性
    const childNodes: any = node.childNodes[0];
    // 除去 # 这个属性 拿到对应值
    const id = childNodes.href.baseVal.slice(1);
    // 拿到 Symbol 标签
    let symbol: any = document.getElementById(id)?.cloneNode(true);
    // 获取填充颜色
    let fill = window.getComputedStyle(node)["fill"];
    // 填充颜色
    symbol.style.fill = fill;
    // 直接把他塞到 use 中
    childNodes.appendChild(symbol);
  });
}

/**图片转base64格式 */
export function getBase64(image: HTMLImageElement) {
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  var context = canvas.getContext("2d");
  if (context) {
    context.drawImage(image, 0, 0, image.width, image.height);
    var base64 = canvas.toDataURL("image/png");
    return base64;
  }
}

// 判断是不是数组
export const isArray = (data: unknown) =>
  Object.prototype.toString.call(data) === "[object Array]";
