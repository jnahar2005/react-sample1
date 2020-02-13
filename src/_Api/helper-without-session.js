import axios from "axios"
import { appConstants } from '../_constants';
export const request = (path, data, method) => {
      return axios({
        method: method,
        url: `${appConstants.WEB_SERVICE_URL}/${path}`,
          headers: {
            'crossDomain': true,
            "X-Parse-Application-Id": appConstants.APPLICATION_Id,
            "X-Parse-REST-API-Key": appConstants.REST_API_KEY,
            "authorization":"Key@123"           
          },
        data:data
      })
}
export const post = (path, data) => request(path, data, "POST");
