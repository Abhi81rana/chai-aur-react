
import { Droplets, Wind, Thermometer } from "lucide-react";

function WeatherCard({ weather }) {
  const details = [
    {
      title: "Humidity",
      value: `${weather.main.humidity}%`,
      icon: Droplets,
    },
    {
      title: "Wind Speed",
      value: `${weather.wind.speed} m/s`,
      icon: Wind,
    },
    {
      title: "Feels Like",
      value: `${Math.round(weather.main.feels_like)}°C`,
      icon: Thermometer,
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">
          {weather.name}, {weather.sys.country}
        </h2>

        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="w-32 h-32 mx-auto"
        />

        <h1 className="text-7xl font-bold text-white">
          {Math.round(weather.main.temp)}°C
        </h1>

        <p className="text-xl text-sky-200 capitalize mt-3">
          {weather.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white/10 border border-white/10
              rounded-2xl p-6 text-center"
            >
              <Icon className="mx-auto text-sky-400 mb-3" size={30} />

              <p className="text-gray-300">{item.title}</p>

              <h3 className="text-2xl font-bold text-white mt-2">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherCard;
