import React from 'react';
import { connect } from 'react-redux';
import  { weatherThunkCreator } from '../../redux/weather-reducer';
import Preloader from '../common/Preloader/Preloader';
import Weather from './Weather';

class WeatherContainer extends React.Component{
    componentDidMount(){
        this.props.weatherThunkCreator();
    }
    render(){
        if(!this.props.isWeatherFetching){
            return <Preloader />
        }
        return(
            <Weather 
            weather={this.props.weather} 
            checkCity={this.props.weatherThunkCreator} 
            fiveDays={this.props.weatherForFiveDays}
            colors={this.props.colors}
            currentTime={this.props.currentTime}
             />
        )
    }
}

const mapStateToProps = state =>{
    return{
        weather:state.Weather.weather,
        weatherForFiveDays:state.Weather. weatherForFiveDays,
        isWeatherFetching:state.Weather.isWeatherFetching,
        colors:state.Weather.colors,
        currentTime:state.Weather.currentTime,
    }
}

export default connect(mapStateToProps,{weatherThunkCreator})(WeatherContainer);