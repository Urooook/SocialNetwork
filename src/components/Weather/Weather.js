import React,{useState} from 'react';
import styled from 'styled-components';
import Card from './Card';
import s from './Weather.module.css';
import Loupe from '../../assets/images/loupe.png';
import Wind from '../../assets/images/wind.png';
import Vlag from '../../assets/images/vl.png';
import Pressuare from '../../assets/images/pressure.png';

const WeatherComponent = styled.div`
    display:block;
    background-color:${({img}) => img};
`;
const ContainerForCards = styled.div`
    width:98%;
    margin: 0 auto;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    flex-wrap:wrap;
  
`;


const Weather = props =>{
    const weather = props.weather;
    const [city, setCity] = useState('');

    let FiveDaysCards = props.fiveDays.map((day,i)=><Card day={day} key={i} />) ;

    const onValChange = e =>{
        setCity(e.currentTarget.value);
    }

    const searchCity = () =>{
        props.checkCity(city);
        setCity('');
    }

    const press = 0.007500637554192;


     //console.log(props.weather);

    return(
        <WeatherComponent img={props.colors[props.currentTime]}>
        <div>
            <div className={s.searchLabel}>
            <input className={s.weatherInput} type='text' value={city} onChange={onValChange} />
            <button className={s.buttonSearch}  onClick={searchCity}><img className={s.buttonSearchImg} src={Loupe} /></button>
            </div>
            <div className={s.cityName}>{weather.name}</div>
            
                <div className={s.mainWeatherInformation}>
                    <div><span className={s.temperature}>+{Math.round(weather.main.temp - 273)}&deg;</span></div>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    <div className={s.anotherInformation}>
                    <div>{weather.weather[0].description}</div>
                    <div>Ощущается как +{Math.round(weather.main.feels_like - 273)}&#8451;</div>
                    </div>
                </div>

                <div className={s.secondInformation}>
                   
                <div className={s.centerImg}><span><img  className={s.windowIcon} src={Wind} /></span> {weather.wind.speed} м/c</div>
                <div className={s.centerImg}><span><img  className={s.windowIcon} src={Vlag} /></span> {weather.main.humidity}%</div>
                <div className={s.centerImg}><span><img  className={s.windowIcon} src={Pressuare} /></span> {Math.round(weather.main.pressure*press*100)} мм.рт.ст</div>
                </div>
                <br />
               

               <ContainerForCards>
            {FiveDaysCards}
            </ContainerForCards>
           
        </div>
        </WeatherComponent>
    )
}

export default Weather;