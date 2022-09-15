<template>
  <div class="bordered-container" :class="{ infoBorder: isBorderActive }">
    <div class="info-grid">
      <TransitionGroup name="cards"
        ><weather-card
          v-for="(city, i) in paginatedArray"
          :key="i"
          class="card"
          :class="{
            card_selected: chosenCard === city,
          }"
          @card-click="chooseCard"
          @card-delete="deleteCard"
          :cityData="city"
          :isStartAppearing="isAnimationStart"
        ></weather-card>
      </TransitionGroup>
    </div>
  </div>
  <div class="pagination">
    <button :disabled="page <= 1" class="previous-button" @click="previousPage">
      &lt;
    </button>
    <div class="pagination__page">{{ page }}/{{ maxPage }}</div>
    <button :disabled="page >= maxPage" class="next-button" @click="nextPage">
      &gt;
    </button>
  </div>
  <weather-presentation
    v-if="chosenCard"
    :cityCard="chosenCard"
  ></weather-presentation>
</template>

<script>
import WeatherCard from "./WeatherCard.vue";
import WeatherPresentation from "./WeatherPresentation.vue";

export default {
  name: "InfoGrid",
  props: {
    cityData: Object,
    cardsCount: Number,
  },

  emits: {
    "card-delete": (value) => typeof value === "string",
  },

  created() {
    const windowData = Object.fromEntries(
      new URL(window.location).searchParams.entries()
    );

    if (windowData.page) {
      this.page = windowData.page;
    }
  },

  watch: {
    cardsCount() {
      this.itemsPerPage = this.cardsCount;
    },
    page() {
      window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?page=${this.page}`
      );

      this.startAnimation();
    },
    paginatedArray() {
      if (this.paginatedArray.length <= 0 && this.page > 1) {
        this.previousPage();
      }
    },

    cityDataLength(newValue, oldValue) {
      if (newValue > oldValue) {
        if (this.paginatedArray.length >= this.itemsPerPage) {
          if (this.page != this.maxPage) {
            this.page = this.maxPage;
            this.startAnimation();
          }
        }
      }
    },
  },

  data() {
    return {
      page: 1,
      itemsPerPage: 3,
      isAnimationStart: false,
      chosenCard: null,
    };
  },
  methods: {
    chooseCard(cityName, isDeleteCardClicked) {
      if (isDeleteCardClicked === false) {
        this.chosenCard = this.paginatedArray.filter(
          (el) => el.name == cityName
        )[0];
      }
    },
    startAnimation() {
      this.isAnimationStart = true;

      const animationTime = 300;

      setTimeout(() => {
        this.isAnimationStart = false;
      }, animationTime);
    },
    previousPage() {
      this.page--;
    },
    nextPage() {
      this.page++;
    },

    deleteCard(name) {
      this.$emit("card-delete", name);

      if (this.chosenCard) {
        if (this.chosenCard.name.toLowerCase() === name.toLowerCase()) {
          this.chosenCard = null;
        }
      }
    },
  },
  computed: {
    paginatedArray() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = (this.page - 1) * this.itemsPerPage + this.itemsPerPage;

      const resultingArray = this.cityData.slice(start, end);

      return resultingArray;
    },

    isBorderActive() {
      return this.cityData.length > 0;
    },
    maxPage() {
      return Math.ceil(this.cityData.length / this.itemsPerPage);
    },

    cityDataLength() {
      return this.cityData.length;
    },
  },
  components: { WeatherCard, WeatherPresentation },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";

$indent: 20px;
$animDuration: $animationDuration;

.cards-enter-active {
  animation-name: appear;
  animation-duration: $animDuration;
  animation-timing-function: $fastTimingFunction;
}

.bordered-container {
  margin: 0 auto;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin: $indent 0;
}

.infoBorder {
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: $indent;

  &__page {
    margin-left: 10px;
    margin-right: 10px;
  }

  button {
    width: 45px;

    &:disabled {
      filter: opacity(0.3);
    }
    &:disabled:hover {
      transform: scale(1);
    }
  }
}
</style>
