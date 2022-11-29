import { queryGetParams } from './index'

// 单井数据
const oldBaseUrl = import.meta.env.DEV ? 'http://localhost:8888/old' : 'http://101.34.38.102:8000'

// 全部作业厂
const allFactory = import.meta.env.DEV ? "src/mock/all.json" : "http://10.78.7.186:8186/control/embed/provider/org/static"

// 所有的井
const wellList = import.meta.env.DEV ? "src/mock/well.json" : "http://10.78.7.186:8186/control/embed/provider/plunger/static"

// 后端接口
const baseUrl = import.meta.env.DEV ? 'http://101.34.38.102:8186' : 'http://101.34.38.102:8186'

const request = (url, method = 'GET', data,) => {
    const uri = baseUrl + url
    const upperMethod = method.toUpperCase()
    if (upperMethod === 'GET') {
        return fetch(queryGetParams(uri, data))
    }
    if (upperMethod === "POST") {
        return fetch(uri, {
            method: "POST",
            body: JSON.stringify(data)
        })
    }

}

export { baseUrl, oldBaseUrl, allFactory, wellList }
export default request