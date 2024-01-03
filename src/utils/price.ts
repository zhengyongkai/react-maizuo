export function formatPrice(price: number, setPrefix: boolean = true) {
  const decimal = String(price).slice(-2);
  // console.log(price, decimal);
  const interger = String(price).slice(0, -2);
  let prefix = setPrefix ? '￥' : '';

  if (price) {
    return prefix + interger + '.' + decimal;
  } else {
    return prefix + 0;
  }
}
