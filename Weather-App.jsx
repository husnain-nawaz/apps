
import './App.css'
import { useState } from "react";


export default function WeatherApp(){

  const [city, setcity] = useState("");
  const [weather, setweather] = useState(null);
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("")

  const weathercodes = {
    0: "Clear Sky", 1: "Mainly clear", 3: "Overcast",
    45: "Fog", 48: "Depositioning", 
    51: "Light drizzle", 53: "Drizzle", 55: "Dense drizzle",
    61: "Slight drizzle", 63: "Rain", 65: "Heavy Rain",
    71: "Slight snow", 73: "Snow", 75: "Heavy Snow",
    80: "Rain showers", 95: "Thunderstorm",
  };
  const getweather = async ()=>{
    if (!city.trim()) return;
    setloading(true);
    seterror("");
    setweather(null);

    try{
      const geores = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`)
      console.log(geores)
      const geoData = await geores.json();
      console.log(geoData)
      if(!geoData.results || geoData.results.length === 0){
        seterror("City not found - sahi naam likho");
        setloading(false);
        return;
      }
      const {latitude, longitude, name, country} = geoData.results[0];
      // Weather fetch data on base of geo location - latitude or longitude
      const weatherres = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
      const weatherdata = await weatherres.json();
        console.log(weatherdata)
      setweather({
        city: name,
        country: country,
        temp: weatherdata.current.temperature_2m,
        humidity: weatherdata.current.relative_humidity_2m,
        wind: weatherdata.current.wind_speed_10m,
        code: weatherdata.current.weather_code,
        maxTemp: weatherdata.daily.temperature_2m_max[0],
        minTemp: weatherdata.daily.temperature_2m_min[0],
      })}
      catch(err){
        seterror("Kuxh problem ha. Dobara try kro")
      }
      finally{
        setloading(false);
      }
  }

  const handlekeydown = (e) => {
    if(e.key === "Enter") getweather();
  }


  return(
   <div className='min-h-screen bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center p-4'>
    <div className='bg-amber-700 rounded-2xl shadow-xl p-6 w-full max-w-sm'>
      <h1 className='text-2xl font-bold text-center text-green-700 mb-4'>Weather App</h1>

    <div className='flex gap-2 mb-4'>
        <input onKeyDown={handlekeydown} value={city} onChange={(e)=> setcity(e.target.value)} type="text" placeholder='Enter the city name...' className='flex-1 border border-gray-950 rounded-lg px-3 py-2 placeholder-black outline-none focus:border-blue-500' />
      <button onClick={getweather} className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'>Search</button>
    </div>


    {loading && <p className='text-center text-gray-700'>Loading....</p>}
    {error && <p className='text-center text-red-500'>{error}</p>}
    
    { weather && (
    <div className='text-center mt-4'>
      <h2 className='text-xl font-semibold text-gray-800'>{weather.city}, {weather.country}</h2>
      <p className='text-5xl font-bold text-blue-600 my-3'>{weather.temp} °C</p>
      <p className='text-gray-600 mb-2'>{weathercodes[weather.code] || "Unknown"}</p>

      <div className='grid grid-cols-2 gap-3 mt-4 text-sm'>
        <div className='bg-blue-50 rounded-lg p-2'>
          <p className='text-gray-500 font-bold'>Humidity</p>
          <p className='font-semibold'>{weather.humidity}%</p>
        </div>
        <div className='bg-blue-50 rounded-lg p-2'>
          <p className='text-gray-500'>Wind</p>
          <p className='font-semibold'>{weather.wind} km/h</p>
        </div>
        <div className='rounded-lg bg-amber-50 p-2'>
          <p className='text-gray-600'>Max Temp</p>
          <p className='font-semibold'>{weather.maxTemp}</p>
        </div>
        <div className='rounded-lg bg-amber-50 p-2'>
          <p className='text-gray-600'>Min Temp</p>
          <p className='font-semibold'>{Math.round(weather.minTemp)}</p>
        </div>
      </div>
    </div>
  )}
    </div>
   </div> 
  )
}



















