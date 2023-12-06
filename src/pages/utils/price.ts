export function formatPrice(price: number) {
  const decimal = String(price).slice(-2);
  // console.log(price, decimal);
  const interger = String(price).slice(0, -2);
  if (price) {
    return "￥" + interger + "." + decimal;
  } else {
    return "￥" + 0;
  }
}
