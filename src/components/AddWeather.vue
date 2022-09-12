<template>
  <div class="input-container">
    <label for="city-input">Введите название города</label>
    <input
      ref="input"
      @keydown.enter="addCity"
      v-model="inputData"
      id="city-input"
      type="text"
    />
    <button class="add-button" @click="addCity">Добавить</button>
  </div>
</template>

<script>
export default {
  emits: {
    "add-city": (value) => typeof value === "string",
  },

  data() {
    return {
      inputData: "",
    };
  },
  methods: {
    addCity() {
      if (this.inputData === "") {
        alert("Введите название города!");
        return;
      }
      this.$emit("add-city", this.inputData);
    },
  },
};
</script>

<style></style>
