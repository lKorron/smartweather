<template>
  <div class="wrapper">
    <div class="app-name">Smart weather<sup>TM</sup></div>
    <div class="input-container">
      <label for="city-input">Введите название города</label>
      <input
        @keydown.enter="transferInfo"
        v-model="inputData"
        id="city-input"
        type="text"
      />
      <button class="add-button" @click="transferInfo">Добавить</button>
    </div>

    <Transition name="represent"
      ><div v-if="cityData.length > 0" class="app-representation">
        <AppFilter @onCardsCountChange="cardsCountChanged"></AppFilter>

        <InfoGrid
          :cityData="cityData"
          @onDelete="deleteCard"
          ref="infoGrid"
          :cardsCount="cardsCount"
        ></InfoGrid>
      </div>
    </Transition>
  </div>
</template>

<script>
import InfoGrid from "./components/InfoGrid.vue";
import AppFilter from "./components/AppFilter.vue";

export default {
  name: "App",
  components: {
    InfoGrid,
    AppFilter,
  },

  data() {
    return {
      cityName: "",
      inputData: "",
      cityData: [],
      isAnimationStart: false,
      cardsCount: null,
    };
  },

  created() {
    const data = localStorage.getItem("storedCityData");

    if (data !== null) {
      this.cityData = JSON.parse(data);

      this.cityData.forEach((el) => {
        this.getWeatherJson(el.name);
      });
    }
  },

  methods: {
    transferInfo() {
      if (this.inputData === "") {
        alert("Введите название города!");
        return;
      }

      this.cityName = this.inputData;
      this.inputData = "";

      if (
        this.cityData.filter(
          (el) => el.name.toLowerCase() === this.cityName.toLowerCase()
        ).length > 0
      ) {
        alert(`Город ${capitalizeFirstLetter(this.cityName)} уже добавлен`);
        return;
      }

      let obj = {
        name: this.cityName,
        data: null,
      };

      this.cityData.push(obj);

      // setInterval(() => this.getWeatherJson(this.cityName), 3000);
      this.getWeatherJson(this.cityName);

      localStorage.setItem("storedCityData", JSON.stringify(this.cityData));

      this.$refs.infoGrid?.onCityAdded();
    },
    async getWeatherJson(cityName) {
      let name = cityName.toLowerCase();

      const apiKey = "27a56a3623427766dbb120e09e9f311f";

      const getStr = `https://api.openweathermap.org/data/2.5/weather?q=${name}&lang=ru&appid=${apiKey}`;

      try {
        let response = await fetch(getStr);
        if (response.ok) {
          let json = await response.json();

          this.cityData.find((el) => el.name === cityName).data = json;
        } else {
          alert(`Город "${this.cityName}" не найден`);
          this.deleteCard(this.cityName);
        }
      } catch (err) {
        alert(err);
      }
    },
    deleteCard(name) {
      this.cityData = this.cityData.filter((el) => el.name !== name);
      localStorage.setItem("storedCityData", JSON.stringify(this.cityData));
    },
    cardsCountChanged(cardsCount) {
      this.cardsCount = cardsCount;
    },
  },
};

export function capitalizeFirstLetter(string) {
  let result = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  result = result.replace(/(-)(\S)/g, (s) => s.toUpperCase());

  return result;
}
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

.input-container {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.input-container :not(:last-child) {
  margin-bottom: 10px;
}

.input-container {
  button {
    width: 70%;
    margin: 0 auto;
  }
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
