import React, { useState } from 'react'
import "../../App.css";
import { gql, useQuery } from '@apollo/client';
const GET_WEATHER_BY_CITY = gql`
query GetWeatherByCity($city: String!) {
  getWeatherByCity(city: $city) {
    name
    icon
    region
    clouds
    humidity
    temperature
    description
  }
}
`;
export default function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_WEATHER_BY_CITY, {

    skip: city === "", // Skip the query if city is empty
  });
  console.log("error", error);
  const name = data?.getWeatherByCity?.name
  const country = data?.getWeatherByCity?.region
  const icon = data?.getWeatherByCity?.icon
  const clouds = data?.getWeatherByCity?.clouds
  const humidity = data?.getWeatherByCity?.humidity
  const temperature = data?.getWeatherByCity?.temperature;
  const description = data?.getWeatherByCity?.description;
  console.log("temperature", data)

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch({ city })

  };
  return (
    <div className="app flex flex-col items-center">
      <h1 className="py-4 text-5xl text-white font-serif">Search Weather</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name or zip"
            className="px-4 py-3"
            value={city}
            autoComplete='off'
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="px-4 py-3 bg-purple-500 text-white">
            Search
          </button>
        </form>
      </div>
      {data &&  (
        <div>
        {!loading && !error && data && data.getWeatherByCity && data.getWeatherByCity.name ?  (
          <>
          <div className="card bg-purple-500 text-white w-[220px] h-[350px] flex flex-col justify-center items-center mt-10">
          <h4 className="text-2xl">{name}{`,${country}`}</h4>
          <img
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt=""
            className="w-[150px]"
          />
          <p>{description}</p>
          <h2 className="text-5xl font-bold mb-2">{temperature}&deg;</h2>
          <p>Cloud - {clouds}</p>
          <h5>Humidity - {humidity}%</h5>

        </div>
                  </>
        ) : ""  }
        </div>
       
      )} {
        error && (
          <div>
            {error.networkError?.statusCode === 400 ? "" : (
              <>
                <div className="card bg-purple-500 text-white w-[220px] h-[350px] flex flex-col justify-center items-center mt-10">
                  <h4 className="text-2xl">No Data</h4><img
                    src="./error.png"
                    alt=""
                    className="w-[150px]" /><p className="text-sm font-light ">valid Zip code or city Name enter</p>
                </div>
              </>
            )}



          </div>
        )
      }
    </div>
  )
}
