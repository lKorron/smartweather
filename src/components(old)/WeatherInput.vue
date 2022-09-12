<template>
  <div class="input-container">
    <label for="city-input">Введите название города</label>
    <input
      @keydown.enter="transferInfo"
      v-model="inputData"
      id="city-input"
      type="text"
    />
    <button @click="transferInfo">Добавить</button>
  </div>
</template>

<script>
export default {
  name: "WeatherInput",

  data() {
    return {
      inputData: "",
    };
  },

  methods: {
    transferInfo() {
      if (this.inputData === "") {
        alert("Введите название города!");
        return;
      }
      this.$emit("transferInfo", this?.inputData);
      this.inputData = "";
    },
  },
};
</script>

<style scoped>
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

.input-container button {
  width: 70%;
  margin: 0 auto;
}
</style>
