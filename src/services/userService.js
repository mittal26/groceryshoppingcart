import http from "./httpService";


export function register(user) {
    return http.post("users", {
        email: user.email,
        password: user.password,
        name: user.name
    })
}