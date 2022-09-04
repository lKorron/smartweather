<template>
  <div class="bordered-container" :class="{ infoBorder: isBorderActive }">
    <div class="info-grid">
      <TransitionGroup name="cards"
        ><WeatherCard
          v-for="(city, i) in paginateArray()"
          :key="i"
          class="card"
          @onDelete="deleteCard"
          :cityData="city"
          :isStartAppearing="isAnimationStart"
        ></WeatherCard>
      </TransitionGroup>
    </div>
  </div>
  <div class="pagination">
    <button :disabled="page <= 1" class="previous-button" @click="previousPage">
      Назад
    </button>
    <div class="pagination__page">{{ page }}/{{ maxPage }}</div>
    <button :disabled="page >= maxPage" class="next-button" @click="nextPage">
      Вперед
    </button>
  </div>
</template>

<script>
import WeatherCard from "./WeatherCard.vue";

export default {
  name: "InfoGrid",
  props: {
    cityData: Object,
  },

  emits: ["onDelete"],

  data() {
    return {
      page: 1,
      itemsPerPage: 6,
      isAnimationStart: false,
    };
  },
  methods: {
    previousPage() {
      this.page--;
      this.isAnimationStart = true;

      setTimeout(() => {
        this.isAnimationStart = false;
      }, 300);
    },
    nextPage() {
      this.page++;
      this.isAnimationStart = true;

      setTimeout(() => {
        this.isAnimationStart = false;
      }, 300);
    },
    paginateArray() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = (this.page - 1) * this.itemsPerPage + this.itemsPerPage;

      let resultingArray = this.cityData.slice(start, end);

      if (resultingArray.length > this.itemsPerPage) {
        console.log(resultingArray.length);
        this.nextPage();
      }

      if (resultingArray.length <= 0 && this.page > 1) {
        this.previousPage();
      }
      return resultingArray;
    },

    onCityAdded() {
      if (this.paginateArray().length >= this.itemsPerPage) {
        this.nextPage();
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
$indent: 20px;
$animDuration: 0.4s;

.cards-enter-active {
  animation-name: appear;
  animation-duration: $animDuration;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
}

.bordered-container {
  max-width: 60%;
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
}
</style>
