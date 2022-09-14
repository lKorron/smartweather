<template>
  <div class="wrapper">
    <div class="app-name">Smart weather<sup>TM</sup></div>
    <add-weather @add-city="addCity"></add-weather>

    <Transition name="represent"
      ><div v-if="cityData.length > 0" class="app-representation">
        <app-filter @onCardsCountChange="cardsCountChanged"></app-filter>

        <info-grid
          :cityData="cityData"
          :cardsCount="cardsCount"
          @onDelete="deleteCard"
          @onExpand="openPopup"
        ></info-grid>
      </div>
    </Transition>
  </div>
  <weather-popup ref="weatherPopup">
    <template v-slot:header>city name</template>
    city description
  </weather-popup>
</template>

<script>
import InfoGrid from "./components/InfoGrid.vue";
import AppFilter from "./components/AppFilter.vue";
import AddWeather from "./components/AddWeather.vue";
import WeatherPopup from "./components/WeatherPopup.vue";
import { capitalizeFirstLetter } from "./formatMethods.js";
import { subscribeToCard, unsubscribeToCard } from "./api.js";

export default {
  name: "App",
  components: {
    InfoGrid,
    AppFilter,
    AddWeather,
    WeatherPopup,
  },

  watch: {
    cityDataLength() {
      localStorage.setItem("storedCityData", JSON.stringify(this.cityData));
    },
  },

  data() {
    return {
      cityData: [],
      cardsCount: null,
    };
  },

  created() {
    const data = localStorage.getItem("storedCityData");
    if (data !== null) {
      this.cityData = JSON.parse(data);

      this.cityData.forEach((el) => {
        subscribeToCard(el.name, (data) => {
          this.updateCard(el.name, data);
        });
      });
    }
  },

  methods: {
    addCity(inputData) {
      const cityName = inputData;

      if (
        this.cityData.filter(
          (el) => el.name.toLowerCase() === cityName.toLowerCase()
        ).length > 0
      ) {
        alert(`Город ${capitalizeFirstLetter(cityName)} уже добавлен`);
        return;
      }

      const cityObject = {
        name: cityName,
        data: null,
      };

      this.cityData.push(cityObject);

      subscribeToCard(cityName, (data) => {
        if (data === null) {
          setTimeout(() => {
            this.deleteCard(cityName);
          }, 100);
          return;
        }
        this.updateCard(cityName, data);
      });
    },

    updateCard(cityName, cityData) {
      this.cityData.find((el) => el.name === cityName).data = cityData;
    },
    deleteCard(name) {
      this.cityData = this.cityData.filter((el) => el.name !== name);
      unsubscribeToCard(name);
    },
    cardsCountChanged(cardsCount) {
      this.cardsCount = cardsCount;
    },
    async openPopup() {
      const popupResult = await this.$refs.weatherPopup.open();

      if (popupResult) {
        // logic when resolved
      }
    },
  },

  computed: {
    cityDataLength() {
      return this.cityData.length;
    },
  },
};
</script>

<style lang="scss">
@import "scss/variables.scss";

.represent-enter-active,
.represent-leave-active {
  animation-duration: $animationDuration;
  animation-timing-function: $fastTimingFunction;
}

.represent-enter-active {
  animation-name: appear;
}

.represent-leave-active {
  animation-name: disappear;
}

.wrapper {
  margin-right: auto; /* 1 */
  margin-left: auto; /* 1 */

  max-width: 1000px; /* 2 */

  padding-right: 10px; /* 3 */
  padding-left: 10px; /* 3 */
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

sup {
  font-size: 7px;
}

.app-name {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

button {
  border-radius: 10px;
  border: none;
  padding: 5px 5px;
  color: #fff;
  background-color: #48484a;
  transition: transform 0.2s;

  &:hover {
    // outline: solid rgb(42, 99, 204);
    transform: scale(1.05);
  }
}
</style>
