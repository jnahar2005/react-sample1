import {getRequest,postRequest} from "../../_Api/helper"

export const getInstituteAction = (data) => {
    return getRequest('admin/institute/list',data).then(res=>{return res.data});
}

export const instituteApprovelAction = (data) => {
    return postRequest('admin/approval',data).then(res=>{return res.data});
}