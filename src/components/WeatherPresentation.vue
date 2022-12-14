<template>
  <div class="presentation">
    <div class="presentation__body">
      <div class="presentation__numeric">
        <div class="presentation__temp temp">
          <h2 class="temp__header">Показатели темературы</h2>
          <div class="temp__average">
            <div class="temp__name">Средняя температура:</div>
            <b>{{ getCelsiusTemp(cityCard.data?.main.temp) }}°C</b>
          </div>
          <div class="temp__feelslike">
            <div class="temp__name">Ощущается как:</div>
            <b>{{ getCelsiusTemp(cityCard.data?.main.feels_like, 100) }}°C</b>
          </div>
          <div class="temp__min">
            <div class="temp__name">Минимальная температура:</div>
            <b>{{ getCelsiusTemp(cityCard.data?.main.temp_min, 100) }}°C</b>
          </div>
          <div class="temp__max">
            <div class="temp__name">Максимальная температура:</div>
            <b>{{ getCelsiusTemp(cityCard.data?.main.temp_max, 100) }}°C</b>
          </div>
        </div>
        <div class="presentation__other other">
          <h2 class="other__header">Другие показатели</h2>
          <div class="other__pressure">
            <div class="other__name">Давление:</div>
            <b>{{ getMmPressure(cityCard.data?.main.pressure) }} мм.рт.ст.</b>
          </div>
          <div class="other__humidity">
            <div class="other__name">Влажность:</div>
            <b>{{ cityCard.data?.main.humidity }} %</b>
          </div>
          <div class="other__wind">
            <div class="other__name">Скорость ветра:</div>
            <b>{{ cityCard.data?.wind.speed }} м/c</b>
          </div>
          <div v-if="cityCard.data?.wind.gust" class="other__gust">
            <div class="other__name">Скорость порывов ветра:</div>
            <b>{{ cityCard.data?.wind.gust }} м/c</b>
          </div>
        </div>
      </div>
      <div class="presentation__wind-angle wind-angle">
        <h2 class="wind-angle__header">Направление ветра</h2>
        <div class="wind-angle__value">
          <b>{{ windAngle }}°</b>
        </div>
        <wind-compass
          v-if="windAngle"
          :rotationAngle="windAngle"
        ></wind-compass>
      </div>
    </div>
  </div>
</template>

<script>
import WindCompass from "../components/WindCompass.vue";
import { capitalizeFirstLetter } from "../formatMethods.js";
export default {
  name: "WeatherPresentation",

  components: {
    WindCompass,
  },

  props: { cityCard: Object },
  data() {
    return {};
  },

  methods: {
    getCelsiusTemp(kelvinTemp, acc = 10) {
      if (kelvinTemp) {
        return Math.round((kelvinTemp - 273.15) * acc) / acc;
      }
      return "";
    },
    getMmPressure(hpaPressure, acc = 10) {
      if (hpaPressure) {
        return Math.round((hpaPressure / 1.333) * acc) / acc;
      }
      return "";
    },
  },
  computed: {
    iconSrc() {
      if (this.cityCard.data) {
        return require(`../assets/${this.cityCard.data?.weather[0].icon}.png`);
      }
      return require(`../assets/default.png`);
    },

    description() {
      if (this.cityCard.data) {
        return capitalizeFirstLetter(
          this.cityCard.data?.weather[0].description
        );
      }
      return "-";
    },

    windAngle() {
      return this.cityCard.data?.wind.deg;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";
.presentation {
  border: 1px solid gray;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 3px 3px 2px gray;

  &__numeric {
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: $md2) {
      grid-template-columns: 1fr;
    }
  }
}

.presentation__temp,
.presentation__other,
.presentation__wind-angle {
  border: 1px dashed gray;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
}

.presentation__temp,
.presentation__other {
  > div {
    display: flex;
    justify-content: center;
  }

  .temp__header,
  .other__header {
    font-size: 18px;
  }

  .temp__name,
  .other__name {
    margin-right: 10px;
  }
}

.wind-angle {
  &__value {
    font-size: 30px;
    margin-left: 15px;
  }
}
</style>
