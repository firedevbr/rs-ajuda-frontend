<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          class="d-flex flex-column"
        >
          <h1
            v-if="user"
            class="text-left"
          >
            Olá, {{ user.nome }}
          </h1>
          <h4 class="mt-5">
            Encontre abaixo as opções de navegação das funcionalidades do sistema
          </h4>
        </v-col>
      </v-row>
      <v-row
        v-if="!isLoading"
        class="mt-10"
      >
        <v-col
          class="column-spacing pr-7 mb-8"
          cols="12"
          :lg="4"
          sm="6"
          xs="12"
          md="6"
        >
          <MenuItem
            title="DESAPARECIMENTO"
            description="Consulte todos os desaparecimentos cadastrados."
            is-first-item
            icon="fa-person-shelter"
            link="/desaparecimentos"
            alternate
          />
        </v-col>
        <v-col
          class="column-spacing pr-7 mb-8"
          cols="12"
          :lg="4"
          sm="6"
          xs="12"
          md="6"
        >
          <MenuItem
            title="RESGATE"
            description="Consulte todos os resgates cadastrados."
            is-first-item
            icon="fa-house-medical-circle-exclamation"
            link="/resgates"
            alternate
          />
        </v-col>
        <v-col
          class="column-spacing pr-7 mb-8"
          cols="12"
          :lg="4"
          sm="6"
          xs="12"
          md="6"
        >
          <MenuItem
            title="VAQUINHA"
            description="Consulte todas as vaquinhas cadastradas."
            is-first-item
            icon="fa-hand-holding-dollar"
            link="/vaquinhas"
            alternate
          />
        </v-col>
        <v-col
          class="column-spacing pr-7 mb-8"
          cols="12"
          :lg="4"
          sm="6"
          xs="12"
          md="6"
        >
          <MenuItem
            title="SOBRE NÓS"
            description="Consulte nossa missão e as políticas de privacidade dos seus dados."
            is-first-item
            icon="fa-people-group"
            link="/sobre"
            alternate
          />
        </v-col>
        <v-col cols="12" class="hidden-sm-and-down-custom">
          <div class="responsive-iframe-container">
            <iframe
              title="RS Help"
              src="https://app.powerbi.com/view?r=eyJrIjoiY2Y4NDhmYjUtYTFmNS00MDFjLWFlZmItZTMwYWMxMTlkZmNhIiwidCI6IjM5NjMxOWQ2LTI2MmMtNDkwOS04NWQ0LWI2OWMwNWIzNDgyZiJ9"
              frameborder="0"
              allowfullscreen="true"
            ></iframe>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import MenuItem from '@/Components/Home/MenuItem.vue';
import AuthService from '@/services/AuthService';
import IUser from '@/models/entities/IUser';

export default {
  components: {
    MenuItem
  },
  data(): {
    isLoading: boolean
    user: IUser
  } {
    return {
      isLoading: false,
      user: null
    }
  },
  watch: {},
  async mounted() {
    this.user = AuthService.getLoggedAdminAreaUserData();
    // this.user = {
    //   full_name: "Guilherme Mallmann"
    // }
  },
  methods: {
    // Custom methods
  },
};
</script>

<style lang="scss" scoped>
.responsive-iframe-container {
  position: relative;
  overflow: hidden;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.responsive-iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
