<template>
  <div class="input-container">
    <label for="city-input">Введите название города</label>
    <input
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
      this.inputData = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.input-container :not(:last-child) {
  margin-bottom: 10px;
}

.input-container {
  button {
    width: 70%;
    margin: 0 auto;
  }
}
</style>
