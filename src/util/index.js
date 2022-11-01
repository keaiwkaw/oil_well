function queryGetParams(url, data) {
  const haveParams = url.indexOf('?') == -1 ? true : false;
  let params = [];
  Object.keys(data).forEach(key => params.push(key + '=' + data[key]))
  const p = params.join('&')
  return decodeURIComponent(url +( haveParams ? "?" : "&") + p);
}


export {
  queryGetParams
}