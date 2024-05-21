import axios from 'axios';

const http = axios.create({
    baseURL: "http://localhost:3000/api/v1" 
});

http.interceptors.request.use(function (config) {
    config.headers.authorization = `BEARER ${ localStorage.getItem("token") }` ; //en todas las peticiones metemos la cabecera auth
    return config;
  });

http.interceptors.response.use(
    function (response) {
    return response;
  }, 
  function (error) {  
    if (
        error.response.status === 401 && 
        location.pathname !== "/login" && 
        location.pathname !== "/register"
    ) {
        localStorage.removeItem("token");
        window.location.replace("/login"); 
    }
    return Promise.reject(error);
  });

export function createUser(data) { 
    return http.post("/users", data)
}

export function login(data) { 
    return http.post("/login", data).then((response) => {
        localStorage.setItem("token", response.data.accessToken);

        return response;
    });
}

export function getProfile() {
    return http.get("/profile");
}

export function logout() {
    localStorage.removeItem("token");
}

export function getProperties(params) {
    return http.get("/properties", { params });
}

export function getProperty(id) {
    return http.get(`/properties/${id}`)
}

export function createProperty(property) { 
    return http.post("/new-property", property)
}
