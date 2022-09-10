const API_KEY = "27a56a3623427766dbb120e09e9f311f";

const cardHandlers = new Map();

const loadWeather = (cityName) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&appid=${API_KEY}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("city not founded");
      }
    })
    .then((rawJson) => {
      cardHandlers.get(cityName).forEach((fn) => {
        fn(rawJson);
      });
    })
    .catch(() => {
      alert(`Город ${cityName} не найден`);
      cardHandlers.get(cityName).forEach((fn) => {
        fn(null);
      });
    });
};

export function subscribeToCard(cityName, callback) {
  const subscribers = cardHandlers.get(cityName) || [];
  cardHandlers.set(cityName, [...subscribers, callback]);
  loadWeather(cityName);
}

export function unsubscribeToCard(cityName) {
  cardHandlers.delete(cityName);
}
