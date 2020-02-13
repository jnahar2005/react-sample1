import axios from "axios"
import { appConstants } from '../_Constants';

export const request = (path, data, method) => {
	var options = { 
		method: method,
		url: `${appConstants.WEB_SERVICE_URL}/${path}`,
		headers: {
			"Content-Type":"application/json",
		},
		dataType: 'json',
	};

	let jwtToken = localStorage.getItem("jwtToken");
	if(jwtToken){
		options.headers["Authorization"] = jwtToken;
	}

	if(method==="GET"){
		options["params"] = data;
	}
	else{
		options["data"] = data;
	}

	return axios(options);
}

export const postRequest = (path, data) => request(path, data, "POST")
export const putRequest = (path, data) => request(path, data, "PUT")
export const getRequest = (path, data) => request(path, data, "GET")