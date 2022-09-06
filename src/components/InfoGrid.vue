<template>
  <div class="bordered-container" :class="{ infoBorder: isBorderActive }">
    <div class="info-grid">
      <TransitionGroup name="cards"
        ><WeatherCard
          v-for="(city, i) in paginateArray()"
          :key="i"
          class="card"
          @onClick="chooseCard"
          @onDelete="deleteCard"
          :cityData="city"
          :isStartAppearing="isAnimationStart"
        ></WeatherCard>
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
</template>

<script>
import WeatherCard from "./WeatherCard.vue";

export default {
  name: "InfoGrid",
  props: {
    cityData: Object,
    cardsCount: Number,
  },

  emits: ["onDelete", "onClick"],

  watch: {
    cardsCount() {
      this.itemsPerPage = this.cardsCount;
    },
  },

  data() {
    return {
      page: 1,
      itemsPerPage: 3,
      chosenCard: null,
    };
  },
  methods: {
    chooseCard(cityName) {
      console.log(cityName);
      this.chooseCard = this.paginateArray().filter(
        (el) => el.cityName == cityName
      )[0];
    },
    startAnimation() {
      this.isAnimationStart = true;

      setTimeout(() => {
        this.isAnimationStart = false;
      }, 300);
    },
    previousPage() {
      this.page--;
      this.startAnimation();
    },
    nextPage() {
      this.page++;
      this.startAnimation();
    },
    paginateArray() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = (this.page - 1) * this.itemsPerPage + this.itemsPerPage;

      let resultingArray = this.cityData.slice(start, end);

      if (resultingArray.length <= 0 && this.page > 1) {
        this.previousPage();
      }
      return resultingArray;
    },

    onCityAdded() {
      if (this.paginateArray().length >= this.itemsPerPage) {
        if (this.page !== this.maxPage) {
          this.page = this.maxPage;
          this.startAnimation();
        }
      }
    },

    deleteCard(name) {
      this.$emit("onDelete", name);
    },
  },
  computed: {
    isBorderActive() {
      return this.cityData.length > 0;
    },
    maxPage() {
      return Math.ceil(this.cityData.length / this.itemsPerPage);
    },
  },
  components: { WeatherCard },
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
