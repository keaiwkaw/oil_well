import { queryGetParams } from './index'

const oldBaseUrl = import.meta.env.DEV ? 'http://localhost:8888/old' : 'http://101.34.38.102:8000'
const baseUrl = import.meta.env.DEV ? 'http://101.34.38.102:8186' : 'http://101.34.38.102:8186'

const request = (url, method = 'GET', data, ) => {
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

export { baseUrl, oldBaseUrl }
export default request