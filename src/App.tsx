import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import moment from "moment";

// interface WeatherData {
//   name: string;
//   main: {
//     temp: number;
//     temp_min: number;
//     temp_max: number;
//     pressure: number;
//     humidity: number;
//   };
//   weather: { main: string }[];
//   sys: {
//     sunrise: number;
//     sunset: number;
//   };
// }

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Kathmandu");
  const currentDateTime = moment().format("dddd, hh:mm A");

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f285e289badaa95011d3ebc532f21895&units=metric`;

  const fetchWeather = async () => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
      console.log(response.data);
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

  const getGreeting = () => {
    const currentHour = moment().hour();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else if (currentHour >= 18 && currentHour < 22) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center justify-center p-5">
      <div className="flex w-full flex-col rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-600 to-indigo-900 p-10 shadow-xl">
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              className="w-full rounded-xl border-2 border-indigo-300 bg-transparent px-4 py-4 font-semibold tracking-wide placeholder:text-blue-100 focus:border-dashed focus:outline-none"
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
              className="rounded-xl border-2 border-blue-400 bg-blue-400 p-4 hover:border-blue-400 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              onClick={handleButtonClick}
            >
              <HiOutlineSearch size={23} />
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          {data.name && <IoLocationOutline size={40} />}

          <div>
            <p className="text-xl font-semibold">{getGreeting()}</p>
            <p className="font-semibold tracking-wide">{data.name}</p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center">
          <div>
            {/* <img className="h-w-48 w-48 " src="/icons/party-sunny.svg" alt="" /> */}
            <img className="h-w-48 w-48 " src="/icons/party-sunny.svg" alt="" />

            <div>
              {data.main && (
                <h1 className="text-8xl font-semibold">{data.main.temp.toFixed()}ºC</h1>
              )}
              {data.weather && (
                <p className="mt-5 text-center text-xl font-semibold">
                  {data.weather[0].main}
                </p>
              )}
              <p className="text-center font-semibold tracking-wide">{currentDateTime}</p>
            </div>
          </div>
        </div>

        {data.name && (
          <>
            <div className="mt-10 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <WiSunrise size={50} />

                <div>
                  <p className="font-medium tracking-wide text-indigo-300">Sunrise</p>

                  {data.sys && (
                    <p className="text-lg font-semibold">{data.sys.sunrise}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <WiSunset size={50} />

                <div>
                  <p className="font-medium tracking-wide text-indigo-300">Sunset</p>
                  {data.sys && <p className="text-lg font-semibold">{data.sys.sunset}</p>}
                </div>
              </div>
            </div>

            <div className="mt-5 border border-dashed border-white/70" />

            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <div>
                  <p className="font-medium tracking-wide text-indigo-300">Temp Min</p>
                  {data.main && (
                    <p className="text-xl tracking-wide">
                      {data.main.temp_min.toFixed()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  <p className="font-medium tracking-wide text-indigo-300">Temp Max</p>
                  {data.main && (
                    <p className="text-xl tracking-wide">
                      {data.main.temp_max.toFixed()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 border border-dashed border-white/70" />

            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <div>
                  <p className="font-medium tracking-wide text-indigo-300">Pressure</p>
                  {data.main && (
                    <p className="text-xl tracking-wide">{data.main.pressure}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  <p className="font-medium tracking-wide text-indigo-300">Humidity</p>
                  {data.main && (
                    <p className="text-xl tracking-wide">{data.main.humidity}</p>
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

export default App;
