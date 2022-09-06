<template>
  <div class="presentation">
    <div class="presentation__name">{{ cityCard.name }}</div>
    <div class="presentation__image">
      <img :src="iconSrc" alt="preview image" />
    </div>
    <div class="card__description">
      {{ description }}
    </div>
    <div class="presentation__body">
      <div class="presentation__temp temp">
        <h2 class="temp__header">Показатели темературы</h2>
        <div class="temp__average">
          <div class="temp__name">Средняя температура</div>
          <b>{{ getCelsiusTemp(cityCard.data?.main.temp) }}°C</b>
        </div>
        <div class="temp__feelslike">
          <div class="temp__name">Ощущается как</div>
          <b>{{ getCelsiusTemp(cityCard.data?.main.feels_like, 100) }}°C</b>
        </div>
        <div class="temp__min">
          <div class="temp__name">Минимальная температура</div>
          <b>{{ getCelsiusTemp(cityCard.data?.main.temp_min, 100) }}°C</b>
        </div>
        <div class="temp__max">
          <div class="temp__name">Максимальная температура</div>
          <b>{{ getCelsiusTemp(cityCard.data?.main.temp_max, 100) }}°C</b>
        </div>
      </div>
      <div class="presentation__other other">
        <h2 class="other__head">Другие показатели</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { capitalizeFirstLetter } from "../App.vue";
export default {
  name: "WeatherPresentation",
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
  },
};
</script>

<style lang="scss" scoped>
.presentation {
  border: 1px solid gray;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 3px 3px 2px gray;

  &__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

.presentation__temp,
.presentation__other {
  border: 1px dashed gray;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
}

.presentation__temp {
  > div {
    display: flex;
  }

  .temp__name {
    margin-right: 10px;
  }
}
</style>
