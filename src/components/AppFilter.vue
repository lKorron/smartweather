<template>
  <div class="filter">
    <div class="filter-body">
      <div class="filter__name">Карточки {{}}</div>
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

.filter-body {
  display: flex;

  :first-child {
    margin-right: 10px;
  }
}
</style>
