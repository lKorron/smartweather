const API_KEY = "27a56a3623427766dbb120e09e9f311f";

export const loadWeather = (cityName) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&appid=${API_KEY}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("city not founden");
      }
    })
    .catch((err) => {
      alert(`Город ${cityName} не найден`);
      throw new Error(err);
    });
