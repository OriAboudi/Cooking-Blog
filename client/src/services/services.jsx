import axios from "axios"
import { TOKEN_KEY } from "../constant/constant";



export const apiGet = async(_url) => {
        try {
            let resp = await axios.get(_url, {
                headers: {
                    "x-api-key": localStorage[TOKEN_KEY],
                    'Content-Type': "application/json"
                }
            })
            return resp;
        } catch (err) {
            throw err;
        }
 }
export const apiPost = async(_url, _body = {}) => {
    console.log(JSON.stringify(_body));

    try {
        let resp = await axios({
            url: _url,
            method: 'POST',
            data: JSON.stringify(_body),
            headers: {
                "x-api-key": localStorage[TOKEN_KEY],
                'Content-Type': "application/json"

            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}
export const apiPut = async(_url, _body = {}) => {
    try {
        let resp = await axios({
            url: _url,
            method: 'PUT',
            data: JSON.stringify(_body),
            headers: {
                "x-api-key": localStorage[TOKEN_KEY],
                'Content-Type': "application/json"
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}
export const apiDelete = async(_url, _body = {}) => {
    try {
        let resp = await axios({
            url: _url,
            method: 'DELETE',
            data: JSON.stringify(_body),
            headers: {
                "x-api-key": localStorage[TOKEN_KEY],
                'Content-Type': "application/json"
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}

export const apiPostGPT = async (_url, _body = {}) => {
    try {
        let resp = await axios({
            url: _url,
            method: 'POST',
            data: JSON.stringify(_body),
            headers: {
                 "Content-Type": "application/json" ,
                 "Authorization": "Bearer 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" 
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}