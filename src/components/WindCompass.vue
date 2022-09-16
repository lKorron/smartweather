<template>
  <div class="compass">
    <img class="compass__image" src="../assets/compass.png" alt="compass" />
    <div class="compass__arrow">
      <img src="../assets/compass-arrow.png" alt="compass" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rotationAngle: 30,
    };
  },

  methods: {
    rotateArrow(deg) {
      this.rotationAngle = deg;
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
  border: 1px dashed gray;
  border-radius: 10px;
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
  bottom: 3px;
  left: 15px;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: rotate(-21.8deg);
  }
}
</style>
