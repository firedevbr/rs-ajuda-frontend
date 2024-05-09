<template>
  <v-breadcrumbs class="custom-divider">
    <v-breadcrumbs-item
      v-for="(item, index) in items"
      :key="item.text"
      :disabled="item.disabled"
      :class="item.disabled ? 'disabled-breadcrumb' : 'active-breadcrumb'"
      @click="navigateToPath(item.to.path)"
    >
      {{ item.title }}
      <img
        v-if="index < items.length - 1"
        class="breadcrumb-divider"
        :src="require('@/assets/divider-icon.svg')"
      >
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script>
export default {
  props: {
    route: {
      type: Object,
      required: true
    }
  },
  computed: {
    items() {
      return this.route.meta.breadcrumb.map(route => {
        return {
          title: route.alias ?? route.name,
          to: { name: route.name, path: route.path },
          disabled: route.name === this.route.name
        };
      });
    }
  },
  methods: {
    navigateToPath(path) {
      const publicPath = process.env.VUE_APP_PUBLIC_PATH || '';
      const fullPath = `${publicPath}${path}`;

      window.location.href = fullPath.startsWith('/') ? fullPath : `/${fullPath}`;
    }
  }
};
</script>

<style scoped>
.disabled-breadcrumb {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #1c1c1c;
}

.active-breadcrumb {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: rgb(var(--v-theme-secondary));
  cursor: pointer; /* para indicar que o item é clicável */
}

.breadcrumb-divider {
  vertical-align: middle;
  margin-left: 5px;   /* Adicione margens conforme necessário */
  margin-right: 5px;  /* Adicione margens conforme necessário */
}
</style>