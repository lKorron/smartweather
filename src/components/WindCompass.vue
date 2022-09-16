<template>
  <div class="compass">
    <img class="compass__image" src="../assets/compass.png" alt="compass" />
    <div
      class="compass__arrow"
      :style="`transform: rotate(${rotationAngle}deg);`"
    >
      <img src="../assets/compass-arrow.png" alt="compass" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rotationAngle: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "../scss/mixins.scss";

.compass {
  @include sizeImgContainer($size: 300px);
  position: relative;
  margin: 0 auto;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.compass__arrow {
  @include sizeImgContainer($size: 80px);
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 3.3px;
  left: 8px;
  text-align: center;
  transition: transform 0.4s;
}
</style>
