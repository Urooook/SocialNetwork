import { getWeather,getWeatherForFiveDays } from '../api/api';

const WEATHER_FETCHING= 'WEATHER_FETCHING';
const FIVE_DAY_WEATHER='FIVE_DAY_WEATHER';
const SET_CURRENT_TIME = 'SET_CURRENT_TIME';
const SET_ERROR = 'SET_ERROR';

let initialState = {
   weather:null,
   weatherForFiveDays:[],
   isWeatherFetching:false,
   colors:['#4ea0fc','#468ee0','#3d7a87','#2b535c'],
   currentTime:null,
   error:false,
   errorText:'Такого города нет в нашей базе((( Проверьте правильно ли вы написали название',
}

const WeatherReducer = (state = initialState,action) => {

    switch(action.type){
        case WEATHER_FETCHING:{
            
            return {...state,weather:action.weatherAnswer}
        }
        case FIVE_DAY_WEATHER:{
            
            return {...state,isWeatherFetching:true,weatherForFiveDays:action.weatherForFiveDays}
        }
        case SET_CURRENT_TIME:{
            
            return {...state, currentTime:action.currentTime}
        }
        case SET_ERROR:{
            return {...state,error:true}
        }
        default:
            return state;
    }   
}

export const setCurrentTime = () =>{
     let time =new Date().getHours();
    
     let currentTime = null;
 
     if(time>5 && time<9){
         currentTime = 0;
     }else if(time>9 && time<17){
         currentTime = 1;
     }else if(time>17 && time<22){
         currentTime = 2;
     }else{
         currentTime = 3;
     }

    return({
        type:SET_CURRENT_TIME,
        currentTime,
    })
}
export const setError = ()=>({type:SET_ERROR});
export const setWeather =  (weatherAnswer) =>({type:WEATHER_FETCHING,weatherAnswer});
export const setWeatherForFiveDays = (weatherForFiveDays) =>({type:FIVE_DAY_WEATHER,weatherForFiveDays})

export const weatherThunkCreator = (city='Щёлково') => (dispatch)=>{
    
    getWeather(city)
        .then(response=>{
            
            //console.log(response);
           
            if(response.cod ===200){
                dispatch(setWeather(response));
                getWeatherForFiveDays(city).then(response=>{
                    const list = response.list.filter(reading => reading.dt_txt.includes("15:00:00"));
                    dispatch(setCurrentTime());
                    dispatch(setWeatherForFiveDays(list));
                    
                    
                })
                
            }else{
                dispatch(setError());
            }
            

           
          
        });
    
}




export default WeatherReducer ;