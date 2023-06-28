import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { IoLocationOutline } from "react-icons/io5";
import { weatherIcons } from "./constants/weather-icons";
import axios from "axios";
import moment from "moment";

export const App = () => {
  const [data, setData] = useState<any>("");
  const [location, setLocation] = useState<string>("Kathmandu");

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${
    import.meta.env.VITE_WEATHER_API_KEY
  }&units=metric`;

  const fetchWeather = async () => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
      // console.log(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        window.alert("City not found. Please enter a valid city name.");
      } else {
        window.alert("An error occurred while fetching the weather data.");
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  const handleButtonClick = () => {
    fetchWeather();
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // const currentDateTime = moment().format("dddd, hh:mm A");

  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center p-5">
      <div className="flex w-full flex-col rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-600 to-indigo-900 p-10 shadow-xl">
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              className="w-full rounded-xl border-2 border-indigo-300 bg-transparent p-2 font-semibold tracking-wide placeholder:text-blue-100 focus:border-dashed focus:outline-none"
              type="text"
              placeholder="Search for city names"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={(event) => event.target.select()}
            />
          </div>

          <div>
            <button
              className="rounded-xl border-2 border-blue-400 bg-blue-400 p-2 hover:border-blue-400 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              onClick={handleButtonClick}
            >
              <HiOutlineSearch size={23} />
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          {data.name && <IoLocationOutline size={30} />}

          <div>
            {/* <p className="font-semibold">Good Morning</p> */}
            <p className="font-semibold">{data.name}</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div>
            {data.weather && (
              <>
                {data.weather[0].main in weatherIcons && (
                  <img
                    className="aspect-square h-44 object-contain"
                    src={weatherIcons[data.weather[0].main]}
                    alt="current weather image"
                  />
                )}
              </>
            )}

            {/* Images Testing */}
            {/* <img
              className="aspect-square h-44 object-contain"
              src={weatherIcons["Clouds"]}
              alt="current weather image"
            /> */}

            <div>
              {data.main && (
                <h1 className="mt-5 text-7xl font-semibold">
                  {data.main.temp.toFixed()}ºC
                </h1>
              )}
              {data.weather && (
                <p className="mt-2 text-center text-lg font-semibold">
                  {data.weather[0].main}
                </p>
              )}
              {/* <p className="text-center text-sm font-semibold tracking-wide">
                {currentDateTime}
              </p> */}
            </div>
          </div>
        </div>

        {data.name && (
          <>
            <div className="mt-10 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <WiSunrise size={50} />

                <div>
                  <p className="font-medium tracking-wide text-indigo-300">
                    Sunrise
                  </p>

                  {data.sys && (
                    <p className="text-lg font-semibold">
                      {moment.unix(data.sys.sunrise).format("h:mm A")}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <WiSunset size={50} />

                <div>
                  <p className="font-medium tracking-wide text-indigo-300">
                    Sunset
                  </p>
                  {data.sys && (
                    <p className="text-lg font-semibold">
                      {moment.unix(data.sys.sunset).format("h:mm A")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 border border-dashed border-white/50" />

            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <div>
                  <p className="font-medium tracking-wide text-indigo-300">
                    Temp Min
                  </p>
                  {data.main && (
                    <p className="text-lg font-semibold tracking-wide">
                      {data.main.temp_min.toFixed()}ºC
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  <p className="font-medium tracking-wide text-indigo-300">
                    Temp Max
                  </p>
                  {data.main && (
                    <p className="text-lg font-semibold tracking-wide">
                      {data.main.temp_max.toFixed()}ºC
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 border border-dashed border-white/50" />

            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <div>
                  <p className="font-medium tracking-wide text-indigo-300">
                    Pressure
                  </p>
                  {data.main && (
                    <p className="text-lg font-semibold tracking-wide">
                      {data.main.pressure} hPa
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  <p className="font-medium tracking-wide text-indigo-300">
                    Humidity
                  </p>
                  {data.main && (
                    <p className="text-lg font-semibold tracking-wide">
                      {data.main.humidity}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
