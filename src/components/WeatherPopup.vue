<template>
  <div v-if="isOpen" class="backdrop" @click="close">
    <div class="popup-body" @click.stop>
      <div class="popup-body__content">
        <slot
          >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
          reprehenderit dolor et aut nostrum quisquam, nisi earum mollitia hic,
          impedit saepe! Reiciendis ipsam atque minima ducimus doloremque omnis
          iure quos.</slot
        >
      </div>
      <button @click="close">Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  emits: {
    onClose: null,
  },

  data() {
    return {};
  },

  methods: {
    close() {
      this.$emit("onClose");
    },
    handleKeydown(evt) {
      if (evt.key === "Escape") {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss">
.backdrop {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.popup-body {
  background-color: #fff;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  border-radius: 10px;

  &__content {
    margin-bottom: 20px;
  }
}
</style>
