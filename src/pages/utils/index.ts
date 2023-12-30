export function getQueryVariable(url: string) {
  const str = url.split('?');
  const query = str[1];
  const consts = query.split('&');
  const queryMap = new Map();
  for (let i = 0; i < consts.length; i++) {
    const pair = consts[i].split('=');
    queryMap.set(pair[0], pair[1]);
  }
  return queryMap;
}
