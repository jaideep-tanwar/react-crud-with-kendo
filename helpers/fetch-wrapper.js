let users = require('data/users.json');
export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(url, requestOptions).then((response)=>{
      return  response.json();  
         
    });
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then((response)=>{
        return  response.text().then(text => {
              const data = text && JSON.parse(text);
      
              if (!response.ok) {
                  const error = (data && data.message) || response.statusText;
                  return Promise.reject(error);
              }
      
              return data;
          });
      });
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then((response)=>{
        return  response.text().then(text => {
              const data = text && JSON.parse(text);
      
              if (!response.ok) {
                  const error = (data && data.message) || response.statusText;
                  return Promise.reject(error);
              }
      
              return data;
          });
      });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(url, requestOptions).then((response)=>{
        return  response.text().then(text => {
              const data = text && JSON.parse(text);
      
              if (!response.ok) {
                  const error = (data && data.message) || response.statusText;
                  return Promise.reject(error);
              }
      
              return data;
          });
      });
}

// helper functions

// function handleResponse(response) {
//     return response.text().then(text => {
//         debugger;
//         const data = text && JSON.parse(text);

//         if (!response.ok) {
//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }