export const FormError=(errors)=>{
    let formatedErrors = {};
    for(let x in errors){
        formatedErrors[errors[x].param] = errors[x].msg;
    }

    return formatedErrors;
}

export const ShowFormErrors=(hookError,formError,field)=>{
    if(hookError[field] && hookError[field].message){
        return hookError[field].message;
    }
    else if(formError[field]){
        return formError[field];
    }
}