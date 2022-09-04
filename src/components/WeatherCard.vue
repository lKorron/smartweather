<template>
  <div class="card" :class="{ appearingCard: isStartAppearing }">
    <div class="card__name">{{ name }}</div>

    <div class="card__image">
      <img :src="iconSrc" alt="preview image" />
    </div>
    <div class="card__temperature">
      <b>{{ temp }}°C</b>
    </div>
    <div class="card__description">
      {{ description }}
    </div>
    <button @click="deleteCard" class="card__delete-button">Удалить</button>
  </div>
</template>

<script>
import { capitalizeFirstLetter } from "../App.vue";

export default {
  name: "WeatherCard",
  props: {
    cityData: Object,
    id: Number,
    isStartAppearing: Boolean,
  },

  data() {
    return {};
  },

  methods: {
    deleteCard() {
      //this.isDisappearing = true;

      setTimeout(() => {
        this.$emit("onDelete", this.cityData.name);
      }, 0);
    },
  },
  computed: {
    temp() {
      if (this.cityData?.data) {
        return Math.round((this.cityData.data.main.temp - 273.15) * 10) / 10;
      }
      return "";
    },
    name() {
      return capitalizeFirstLetter(this.cityData.name);
    },

    description() {
      if (this.cityData.data) {
        return capitalizeFirstLetter(
          this.cityData.data?.weather[0].description
        );
      }
      return "-";
    },
    iconSrc() {
      if (this.cityData.data) {
        return require(`../assets/${this.cityData.data?.weather[0].icon}.png`);
      }
      return require(`../assets/default.png`);
    },
  },
};
</script>

<style lang="scss">
$hoverColor: rgb(42, 99, 204);
$appearDuration: 0.4s;

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 3px 3px 2px gray;

  &:hover {
    outline: solid $hoverColor;
    border-color: $hoverColor;
  }

  > :first-child {
    padding-top: 10px;
  }

  > :last-child {
    margin-bottom: 10px;
  }

  > :nth-last-child(2) {
    margin-bottom: 10px;
  }

  &__name {
    font-size: 18px;
  }

  &__image {
    width: 100px;
    margin: 0 auto;
    img {
      width: 100px;
    }
  }

  &__temperature {
    font-size: 30px;
  }

  &__delete-button {
    width: 145px;
    margin: 0 auto;
  }
}

.appearingCard {
  animation-name: appear;
  animation-duration: $appearDuration;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
}

.disappearingCard {
  animation-name: disappear;
  animation-duration: $appearDuration;
}

@keyframes appear {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

@keyframes nextAppear {
}

@keyframes disappear {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(0);
  }
}
</style>
