<template>
  <v-btn
    :class="['custom-btn', computedTextColor, 'pr-4', buttonClass, { 'w-100': fullWidth }]"
    :color="computedColor"
    :text-color="computedTextColor"
    v-bind="$attrs"
    :variant="variant"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "CustomButton",
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: "confirm",
      validator: (value) => ["confirm", "cancel", "alternate"].includes(value)
    },
    variant: {
      type: String,
      default: "",
      validator: (value) => ["outlined", ""].includes(value)
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedColor() {
      const colors = {
        confirm: "rgb(var(--v-theme-primary))",
        cancel: "#E60050!important",
        alternate: "rgb(var(--v-theme-secondary))"
      };
      return colors[this.color];
    },
    computedTextColor() {
      if (this.variant === "outlined") {
        return this.computedColor;
      } else {
        const textColors = {
          confirm: "text-white",
          cancel: "text-white",
          alternate: "text-white"
        };
        return textColors[this.color];
      }
    },
    buttonClass() {
      return {
        outlined: this.variant === "outlined"
      };
    }
  }
};
</script>

<style scoped>

.custom-btn {
  font-size: 15px;
  font-style: italic;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 0.065em;
  text-align: center;
  border-radius: 0px 20px 20px 20px;
}

@media (max-width: 960px) {
  .v-btn.v-btn--density-default {
    height: inherit;
  }
}

</style>