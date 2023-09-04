import axios from "axios";
import cookies from "cookies-js"

const request=axios.create({
    baseURL:"http://121.41.123.128:50000",
})

request.interceptors.request.use(
    (config)=>{
        config.headers.token=cookies.get("token")
        config.headers.username=cookies.get("username")
        console.log(config);
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

request.interceptors.response.use(
    (response)=>{
        console.log(response);
        return response
    },
    (err)=>{
        console.log(err);
        return Promise.reject(err);
    }
)

export default request;