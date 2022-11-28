function queryGetParams(url, data = {}) {
    const haveParams = url.indexOf("?") == -1 ? true : false;
    let params = [];
    Object.keys(data).forEach((key) => {
        if (data[key]) {
            params.push(key + "=" + data[key]);
        }
    });
    const p = params.join("&");
    return decodeURIComponent(url + (haveParams ? "?" : "&") + p);
}

function arrayToTree(arr) {
    const map = {};
    const res = [];
    arr.forEach((i) => {
        map[i.orgId] = i;
    });
    arr.forEach((i) => {
        const parent = map[i.parentId];
        if (parent) {
            parent.children = parent.children || [];
            parent.children.push(i);
        } else {
            res.push(i);
        }
    });
    return res;
}

function arrayToTreeFlat(arr) {
    const res = [];
    const map = {};
    arr.forEach((item) => {
        if (item.parentId && item.parentId == 0) {
            map[item.orgId] = item;
        }
    });
    arr.forEach((item) => {
        if (item.wellId) {
            const parent = map[item.factoryId];
            parent.children = parent.children || [];
            parent.children.push({
                value: JSON.stringify(item),
                title: item.wellName,
                factoryName: item.factoryName,
                workZoneName: item.workZoneName,
                stationName: item.stationName,
            });
        }
        if (item.parentId && item.parentId == 0) {
            res.push(item);
        }
    });
    return res;
}
export { queryGetParams, arrayToTree, arrayToTreeFlat };
