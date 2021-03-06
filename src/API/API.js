import * as axios  from "axios";



const instance = axios.create({
    withCredentials: true,
    headers: {
            "API-KEY" : "b788c743-6630-4688-be5a-c490943ec5f7" },
    baseURL:  'https://social-network.samuraijs.com/api/1.0/'       
});

export const usersAPI = {
    requestUsers(currentPage = 1, pageSize = 5) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`,)
    .then(response => {
        return response.data
    });
  },
 follow(userId) {
    return instance.post(`follow/${userId}`)
 },
 unfollow(userId) {
    return instance.delete(`follow/${userId}`)
},
getProfile(userId) {
    console.warn('OBsolete method. Use profileAPI in the way to avoid warnings')
    return profileAPI.getProfile(userId)
}
};   

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId )
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status : status})
    }
}
 
export const authAPI = {
me () {
    return instance.get(`auth/me`,)
},

login (email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe})
},
logout () {
    return instance.delete(`auth/login`)
}
}


