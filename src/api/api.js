import * as axios from 'axios';

const instanse = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '2bd7bc60-275b-4f01-a26b-0b89cbd344c9',
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});

const yandex = axios.create({
    
    baseURL: 'https://api.openweathermap.org/data/2.5/weather?appid=beeba76228d49ad90799cb083c41532c'
    
});

export const getWeather = (city) =>{
    return axios.get('https://api.openweathermap.org/data/2.5/weather?appid=beeba76228d49ad90799cb083c41532c&lang=ru&q=' + city).then(response => response.data);
}

export const getWeatherForFiveDays = city =>{
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&APPID=beeba76228d49ad90799cb083c41532c`).then(response => response.data);
}

export const getUsers = (pageSize=10,currentPage=1) =>{
    return  instanse.get(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data)
}

export const UnfollowToUser = (id=1)=>{
    return  instanse.delete(`follow/${id}`).then( response => response.data)
}

export const FollowToUser = (id=1) =>{
    return instanse.post(`follow/${id}`).then( response => response.data)
}

export const getProfile = userId =>{
    
   return instanse.get(`profile/${userId}`).then( response => response.data)
   
}

export const authMe =()=>{
    return instanse.get(`auth/me`).then( response => response.data)
}

export const getStatus = (userId) => {
    return instanse.get(`profile/status/${userId}`).then( response => response.data)
}

export const updateStatus = (status) => {
    return instanse.put(`profile/status`,{status}).then( response => response.data)
}

export const login = (email,password,rememberMe = false,captcha='') =>{
    return instanse.post(`auth/login`,{email,password,rememberMe,captcha}).then( response => response.data);
}

export const logout = () =>{
    return instanse.delete(`auth/login`).then( response => response.data);
}

export const captchaRequest = () =>{
    return instanse.get(`/security/get-captcha-url`);
}

export const setPhotoRequest = (file) =>{
    const formData = new FormData();
    formData.append('image', file);

    return instanse.put(`profile/photo`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    });
}