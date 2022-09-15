<template>
  <div class="filter">
    <div class="filter-body">
      <div class="filter-body__count-filter">
        <div class="filter__image">
          <img src="../assets/cards.png" alt="cards" />
        </div>
        <select v-model="cards" @change="selectChange" class="filter__select">
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="9">9</option>
        </select>
      </div>

      <div class="info-icon" @click="infoClick">
        <img src="../assets/info.png" alt="info" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infoGridRef: Object,
  },

  emits: {
    "сards-сount-change": (value) => typeof value === "number",
    "info-click": null,
  },

  data() {
    return {
      cards: 3,
    };
  },
  methods: {
    selectChange() {
      this.$emit("сards-сount-change", parseInt(this.cards));
    },
    infoClick() {
      this.$emit("info-click");
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

.info-icon {
  $size: 18px;
  width: $size;
  height: $size;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }

  img {
    width: $size;
    height: $size;
  }
}

.filter-body {
  display: flex;
  justify-content: space-between;

  &__count-filter {
    display: flex;
    :first-child {
      margin-right: 5px;
    }
  }
}
</style>
