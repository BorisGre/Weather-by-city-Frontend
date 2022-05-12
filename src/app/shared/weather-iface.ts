export interface Weather { 
      main: string,
      desc: string ,
      temp: number ,
      humidity: number ,
      pressure: number ,
      visibility: number ,
      wind: {speed: number , deg: number },
      clouds: number ,
     /// rain: number ,
     // snow: number ,
      precipitation: number ,
      sunrise: number ,
      sunset: number ,
      currentDayTime: number  
}