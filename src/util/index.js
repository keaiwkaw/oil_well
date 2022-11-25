function queryGetParams(url, data) {
  const haveParams = url.indexOf('?') == -1 ? true : false;
  let params = [];
  Object.keys(data).forEach(key => {
    if (data[key]) {
      params.push(key + '=' + data[key])
    }
  })
  const p = params.join('&')
  return decodeURIComponent(url + (haveParams ? "?" : "&") + p);
}


function arrayToTree(arr) {
  const map = {};
  const res = []
  arr.forEach((i) => {
    map[i.orgId] = i
  })
  arr.forEach((i) => {
    const parent = map[i.parentId]
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(i)
    } else {
      res.push(i)
    }
  })
  return res;
}

export {
  queryGetParams,
  arrayToTree
}
