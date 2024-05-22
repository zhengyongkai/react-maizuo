/**
 * @description: 合併css數組 如 ['classA','classB'] =>  'classA classB'
 * @param {string} cssArr css數組
 * @return {*} 數組字符串
 */
export function cssCb(cssArr: string[]) {
  return cssArr.join(" ");
}
