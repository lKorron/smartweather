<template>
  <div
    @click="cardClick"
    class="card"
    :class="{ appearingCard: isStartAppearing }"
  >
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
import { capitalizeFirstLetter } from "../formatMethods.js";

export default {
  name: "WeatherCard",
  props: {
    cityData: Object,
    isStartAppearing: Boolean,
  },

  emits: {
    "card-click": (value1, value2) => {
      return typeof value1 === "string" && typeof value2 === "boolean";
    },
    "card-delete": (value) => typeof value === "string",
  },

  data() {
    return {};
  },

  methods: {
    cardClick(evt) {
      const deleteButtonClass = "card__delete-button";

      const isDeleteButtonClicked =
        evt.target.classList.contains(deleteButtonClass);
      this.$emit("card-click", this.cityData.name, isDeleteButtonClicked);
    },
    deleteCard() {
      this.$emit("card-delete", this.cityData.name);
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
@import "../scss/variables.scss";

$hoverColor: rgb(42, 99, 204);
$appearDuration: $animationDuration;

.card {
  position: relative;
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

  &:active {
    outline: solid $darkGray;
    border-color: $darkGray;
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

  &__more {
    $size: 16px;
    position: absolute;
    top: 10px;
    right: 10px;
    width: $size;
    height: $size;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }

    img {
      width: $size;
      height: $size;
    }
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
    outline: solid $darkGray;
    color: black;
    background-color: transparent;
    width: 145px;
    margin: 0 auto;
    transition: all 0.3s;
    width: 30%;

    &:hover {
      background-color: $darkGray;
      color: white;
      transform: scale(1);
    }
  }
}

.card_selected {
  outline: solid $darkGray;
  border-color: $darkGray;
}

.appearingCard {
  animation-name: appear;
  animation-duration: $appearDuration;
  animation-timing-function: $fastTimingFunction;
}

.disappearingCard {
  animation-name: disappear;
  animation-duration: $appearDuration;
  animation-timing-function: $fastTimingFunction;
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
