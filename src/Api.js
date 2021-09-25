const axios=require("axios")
export function apiCall(method , path , data){
    return new Promise((resolve , reject) => {
        return axios[method.toLowerCase()](path, data)
         .then(res => {
              return resolve(res.data);
         }).catch(err => {
             return reject(err.response.data.error);
         });
    });
  }
  
  
  
  
  