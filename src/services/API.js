import axios from 'axios';

export default () => {
  return axios.create({
    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: 'http://127.0.0.1:8000/api',

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    // timeout: 10000,

    // `transformRequest` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
    // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
    // FormData or Stream
    // You may modify the headers object.
    transformRequest: [
      (data, headers) => {
        // Do whatever you want to transform the data

        const formData = new FormData();

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const value = data[key];
            formData.append(key, value);
          }
        }

        return formData;
      }
    ]
  });
};
