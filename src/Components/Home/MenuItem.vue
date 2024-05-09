<template>
  <v-card
    :disabled="disabled"
    class="mx-auto my-2"
    elevation="2"
    :class="{'home-menu-item-hover': !disabled, 'disabled-card': disabled}"
    @click="navigateToLink"
  >
    <v-row>
     <v-col cols="3">
        <v-avatar
          class="ma-3"
          size="56"
        >
          <i
            class="fas"
             :class="['menu-icon', icon]"
          />
        </v-avatar>
      </v-col>
      <v-col
        cols="9"
        class="d-flex align-center"
      >
        <div>
          <h3 class="title">
            {{ title }}
          </h3>
          <p class="subtitle">
            {{ description }}
          </p>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>


<script lang="ts">
export default {
  props: {
    title: String,
    description: String,
    link: String,
    icon: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    navigateToLink() {
      if (!this.disabled) {
        this.$router.push(this.link);
      }
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 14px;
}

.subtitle {
  color: var(--v-theme-primary);
  font-size: 14px;
}

.home-menu-item-hover {
  transition: box-shadow 0.3s ease-in-out;
}

.home-menu-item-hover:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
}

.disabled-card {
  opacity: 0.5;
}
.menu-icon {
  font-size: 2.5rem;
  color: rgb(var(--v-theme-secondary));
}
</style>