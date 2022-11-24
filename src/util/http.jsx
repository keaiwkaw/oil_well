import { queryGetParams } from './index'


const baseUrl = import.meta.env.DEV ? 'http://localhost:8888' : 'http://101.34.38.102:8186'

const request = (url, method = 'GET', data) => {
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

export { baseUrl }
export default request