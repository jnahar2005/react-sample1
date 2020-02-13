import {getRequest,postRequest} from "../../_Api/helper"

export const userLoginAction = (data) => {    
    return postRequest('login',data).then(res=>{return res.data});
}