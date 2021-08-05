import React,{useState} from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
    text-align:center;
    border:1px solid black;
    padding:10px;
    border-radius:5%;
    margin-bottom:15px;

`;


const Card = props =>{
    const ms = props.day.dt * 1000;
    const weekdayName = new Date(ms).toLocaleString('ru', {weekday: 'long'});

    return(
      
        <CardContainer>
           <div>{weekdayName}</div>
           <img src={`http://openweathermap.org/img/wn/${props.day.weather[0].icon}@2x.png`} />
           <div>{Math.round(props.day.main.temp)}&#8451;</div>
           <div>{props.day.weather[0].description}</div>
        </CardContainer>
       
    )
}

export default Card;