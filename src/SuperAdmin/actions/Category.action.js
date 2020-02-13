import {getRequest,postRequest} from "../../_Api/helper";

export const getCategoryAction = (data) => {
    return getRequest('admin/category/list',data).then(res=>{return res.data});
}

export const deleteCategoryAction = (data) => {
    return getRequest('admin/category/delete',data).then(res=>{return res.data});
}

export const addEditCategoryAction = (data) => {
    return postRequest('admin/category/AddEdit',data).then(res=>{return res.data});
}