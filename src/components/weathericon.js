import clearday from './assets/icons/clear-day.svg'
import drizzle from './assets/icons/drizzle.svg'
import fog from './assets/icons/fog.svg'
import haze from './assets/icons/haze.svg'
import rain from './assets/icons/rain.svg'
import smoke from './assets/icons/smoke.svg'
import snow from './assets/icons/snow.svg'
import thunderstormsrain from './assets/icons/thunderstorms-rain.svg'

const weathericon = (icon) => {
  switch (icon) {
    case 'Thunderstorm':
        icon=thunderstormsrain
        break;    
    case 'Drizzle':
        icon=drizzle
        break;
    case 'Rain':
        icon=rain
        break;
    case 'Snow':
        icon=snow
        break;                        
    case 'Clear':
        icon=clearday
        break;
    case 'Clouds':
        icon=fog
        break;  
    case 'Fog':
        icon=fog
        break;    
    case 'Haze':
        icon=haze
        break;   
    case 'Smoke':
        icon=smoke
        break;      
    default:
        icon=clearday
}
return icon
}

export default weathericon
