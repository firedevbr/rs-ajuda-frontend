<template>
  <v-app>
    <!-- Desktop Version -->
    <v-row
      v-if="isDesktop"
      class="navbar-row"
    >
      <!-- Logo -->
      <v-col
        cols="4"
        class="logo-container"
        onclick="window.location.href = '/home'"
      >
        <img
          :src="require('@/assets/logo.png')"
          style="max-width: 233px"
          class="w-100 ml-lg-5"
          alt="Logo Firedev"
        >
      </v-col>

      <!-- Navbar -->
      <v-col
        cols="8"
        class="navbar-container"
      >
        <!-- Top Nav -->
        <v-row
          class="top-nav py-2"
        >
          <v-col
            v-if="loggedType === 'admin'"
            cols="10"
            class="menu-items-container"
          >
            <div
              v-for="menuItem in menuItems"
              :key="menuItem.id"
              :class="{'menu-item': true}"
              @click="() => $router.push(menuItem.linksTo)"
            >
              {{ menuItem.name }}
            </div>
          </v-col>
          <v-col cols="2" /> <!-- Placeholder -->
        </v-row>

        <!-- Bottom Nav -->
        <v-row v-if="user != null" class="bottom-nav">
          <v-col cols="10">
            {{ user?.full_name || user?.nome }}
          </v-col>
          <v-col cols="2" /> <!-- Placeholder -->
        </v-row>

        <!-- User Image - Positioned Absolutely -->
        <v-menu
          v-if="user != null"
          v-model="menuVisible"
          offset-y
          class="menu-usuario"
        >
          <template #activator="{ on, attrs }">
            <div
              class="user-avatar"
              v-bind="attrs"
              v-on="on"
            >
              <img
                :src="require('@/assets/user-placeholder.svg')"
                alt="Avatar do usuário logado"
                @click="toggleMenu"
              >
            </div>
          </template>

          <v-list id="menu-usuario">
            <v-list-item @click="logout">
              <template #prepend>
                <i
                  class="fas fa-sign-out-alt"
                  style="color: rgb(var(--v-theme-primary)); cursor: pointer"
                />
              </template>
              <v-list-item-title class="ml-3">
                Sair
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <!-- Mobile Version - Somente Logo -->
    <v-row
      v-else
      align="center"
      justify="center"
      class="navbar-mobile"
    >
      <img
        :src="require('@/assets/logo.png')"
        alt="Logo Firedev"
        class="logo-mobile"
        style="max-width: 150px; width: 100%;margin-top: 20px;margin-bottom: 20px"
      >
    </v-row>

    <!-- Main Content -->
    <v-main class="flex-grow-1">
      <v-container>
        <BreadcrumbComponent :route="$route" />
        <PBase>
          <transition mode="out-in">
            <router-view />
          </transition>
        </PBase>
      </v-container>
    </v-main>

    <!-- Footer -->
    <footer class="footer">
      <v-container>
        <v-row justify="end">
          v{{ getCurrentVersion() }} © 2024.
        </v-row>
      </v-container>
    </footer>

    <!-- Loading Indicator -->
    <div
      v-if="isLoading"
      class="loading-overlay"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="70"
      />
    </div>
  </v-app>
</template>

<script>
import BreadcrumbComponent from '../router/components/BreadcrumbComponent.vue';
import AuthService from '@/services/AuthService';
import { useAuthStore } from '@/store/authStore';

export default {
  components: {
    BreadcrumbComponent
  },
  setup() {
    let user = AuthService.getLoggedAdminAreaUserData();

    return {
      user,
    };
  },
  data() {
    return {
      menuVisible: false,
      isLoading: false,
      drawer: false,
      group: null,
      windowWidth: 0,

    };
  },
  computed: {
    isDesktop() {
      return this.windowWidth > 960;
    },
    menuItems() {
      let menuItens = [
          // {
          //   id: 1,
          //   name: 'Resgates',
          //   isActive: this.$route.path === '/resgates',
          //   linksTo: '/resgates'
          // },
          // {
          //   id: 2,
          //   name: 'Desaparecimentos',
          //   isActive: this.$route.path === '/desaparecimentos',
          //   linksTo: '/desaparecimentos'
          // },
          // {
          //   id: 2,
          //   name: 'Vaquinhas',
          //   isActive: this.$route.path === '/vaquinhas',
          //   linksTo: '/vaquinhas'
          // }
        ];

      return menuItens;
    }
  },
  mounted() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    navigateTo(route) {
      this.$router.push({ name: 'Home' });
    },
    updateWidth() {
      this.windowWidth = window.innerWidth;
    },
    editProfile() {
      // Código para editar perfil
    },
    getCurrentVersion() {
      return process.env.VUE_APP_VERSION
    },
    logout() {
      AuthService.logout();
      window.location.href = '/login';
    },
  },
};
</script>

<style lang="scss">
.v-application {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.flex-grow-1 {
  flex: 1 0 auto;
}

.footer {
  color: #8C8C8C;
  font-size: 15px;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
  flex-shrink: 0;
  padding-bottom: 11px;
}

.custom-navbar {
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
}

.navbar-row {
  max-height: 102px;
  display: flex;
  margin: 0;
  padding: 0;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 2rem;
  cursor: pointer;
}

.navbar-container {
  position: relative;
}

.top-nav {
  border-radius: 0px 0px 0px 8px;
  background: linear-gradient(90deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
  display: flex;
  justify-content: flex-end;
}

.menu-items-container {
  display: flex;
  justify-content: flex-end;

  .menu-item {
    font-family: var(--v-font-family-secondary);
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    letter-spacing: -0.05em;
    text-align: center;
    margin-left: 25px;
    color: white;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
    &.active {
      text-decoration: underline;
    }
  }
}

.bottom-nav {
  color: rgb(var(--v-theme-primary));
  font-size: 14px;
  font-style: italic;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: right;
}

.user-avatar {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 16.66%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar img {
  max-width: 100%;
  height: auto;
  cursor: pointer;
}
.menu-usuario > .v-overlay__content {
  top: 100px !important;
  left: auto !important;
  right: calc(1% + 10px);
}

@media (min-width: 1600px) {
  .menu-usuario > .v-overlay__content {
    right: calc(1% + (10px + 1.9vw));
  }
}
</style>
