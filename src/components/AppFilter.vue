<template>
  <div class="filter">
    <div class="filter-body">
      <div class="filter__image">
        <img src="../assets/cards.png" alt="cards" />
      </div>
      <select v-model="cards" @change="onSelectChange" class="filter__select">
        <option value="3">3</option>
        <option value="6">6</option>
        <option value="9">9</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infoGridRef: Object,
  },

  emits: {
    onCardsCountChange: (value) => typeof value === "number",
  },

  data() {
    return {
      cards: 3,
    };
  },
  methods: {
    onSelectChange() {
      this.$emit("onCardsCountChange", parseInt(this.cards));
    },
  },
};
</script>

<style lang="scss">
.filter {
  margin-bottom: 10px;
}

.filter__image {
  $size: 18px;
  width: $size;
  height: $size;

  img {
    width: $size;
    height: $size;
  }
}

.filter-body {
  display: flex;

  :first-child {
    margin-right: 5px;
  }
}
</style>
