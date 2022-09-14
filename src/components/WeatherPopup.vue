<template>
  <div v-if="isOpen" class="backdrop" @click="close">
    <div class="popup" @click.stop>
      <h2 class="popup__header"><slot name="header">Заголовок</slot></h2>
      <div class="popup__content">
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
  popupController: null,

  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    open() {
      let resolve;
      let reject;

      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });

      this.$options.popupController = { resolve, reject };

      //this.$options.popupController.resolve(true);
      this.isOpen = true;

      return promise;
    },
    close() {
      this.$options.popupController.resolve(false);
      this.isOpen = false;
    },
    handleKeydown(evt) {
      if (evt.key === "Escape" && this.isOpen) {
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

.popup {
  background-color: #fff;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  border-radius: 10px;

  &__content {
    margin-bottom: 20px;

    p {
      text-align: justify;
      text-indent: 20px;
    }
  }

  button {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
