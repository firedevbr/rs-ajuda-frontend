<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column align-start"
      >
        <h1 class="label-welcome text-primary">
          Estado
        </h1>
      </v-col>
    </v-row>
    <v-row
      v-if="response?.data?.length === 0 && !isLoading && filtroVazio && initialAccess"
      id="no-projects"
      align="center"
      class="my-16"
      justify="center"
    >
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="6"
        xl="4"
        class="text-center"
      >
        <v-row>
          <v-col
            cols="12"
            class="text-center"
          >
            <p class="empty-data-caption my-5">
              Ainda não há Estado cadastrados. Adicione uma Estado.
            </p>
          </v-col>
        </v-row>

        <v-row
          class="mt-3"
        >
          <v-col
            cols="12"
            class="text-center"
          >
            <Button
              variant="flat"
              full-width
              style="min-width: min-content;"
              @click="() => $router.push('/estados/cadastrar')"
            >
              <span
                class="text-wrap"
                onclick=""
              >
                clique aqui para cadastrar seu primeiro Estado
              </span>
            </Button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-container
      v-else-if="!isLoading"
      class="px-0 mt-10"
    >
      <v-expansion-panels v-model="openedPanel">
        <v-expansion-panel>
          <v-expansion-panel-title>
            <span class="help-title">Filtro</span>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <v-sheet
              width="100%"
              class="pa-10"
            >
              <v-row>
                <v-col cols="4">
        <label for="nome" class="small-label">Nome</label>
        <v-text-field id="nome" v-model="filtro.nome" bg-color="white" placeholder="Filtrar pelo Nome" rounded variant="outlined" required class="w-100 mt-5 pr-10" type="text" color="primary" />
    </v-col>
              </v-row>
              <v-row justify="end">
                <v-col
                  cols="6"
                  class="d-flex justify-end pr-13"
                >
                  <Button
                    variant="outlined"
                    color="confirmBold"
                    class="mr-5"
                    prepend-icon="fa fa-x pl-5 pr-2"
                    @click="cleanFilter"
                  >
                    Limpar
                  </Button>
                  <Button
                    variant="flat"
                    prepend-icon="fa fa-search pl-5 pr-2"
                    @click="() => {
                      filtro.page = 1;
                      filtrar();
                    }"
                  >
                    Filtrar
                  </Button>
                </v-col>
              </v-row>
            </v-sheet>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row>
        <v-col cols="12">
          <div
            class="mt-15"
          >
            <Button
              variant="flat"
              style="min-width: min-content;"
              prepend-icon="far fa-square-plus pl-5 pr-2"
              color="alternate"
              @click="() => $router.push('/estados/cadastrar')"
            >
              Adicionar Estado
            </Button>
          </div>
        </v-col>
      </v-row>
      <div
        v-if="!isLoading && response?.data?.length > 0"
        style="display: flex"
      >
        <!-- Tabela Principal (sem a coluna Ações) -->
        <div class="scroll-table-container">
          <v-table class="bg-transparent w-100 mt-16">
            <thead>
              <tr>
                <th class="bolder-primary-color font-weight-bold table-head-border">Id</th>
                <th class="bolder-primary-color font-weight-bold table-head-border">Nome</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(estado, index) in response?.data"
                :key="index"
              >
                <td class="table-foot-border table-content-text" :title="estado?.id">
                           {{ estado?.id }}
                         </td>
                <td class="table-foot-border table-content-text" :title="estado?.nome">
                           {{ estado?.nome }}
                         </td>
              </tr>
            </tbody>
            <tfoot v-if="response?.data?.length === 0">
              <tr>
                <td class="bolder-primary-color font-weight-bold table-foot-border"></td>
                <td class="bolder-primary-color font-weight-bold table-foot-border"></td>
              </tr>
            </tfoot>
          </v-table>
          <div>
            <div class="d-flex align-center justify-end">
              <!-- Linhas por página -->
              <label
                class="mr-2"
                style="font-size: 10px; line-height: 20px;"
              >Linhas por página</label>

              <!-- Select para linhas por página -->
              <v-select
                v-model="filtro.perPage"
                :items="[5, 10, 20, 50]"
                dense
                variant="underlined"
                class="ml-3 mr-5"
                style="max-width: 60px;"
                @update:model-value="handleChangePerPage"
              />

              <!-- Info: {from} - {to} de {total} -->
              <span
                class="mr-3"
                style="font-size: 10px; line-height: 20px;"
              >
                {{ response.from }} - {{ response.to }} de {{ response.total }}
              </span>

              <!-- Ícone para voltar página -->
              <v-btn
                icon
                :disabled="filtro.page === 1"
                variant="text"
                @click="handlePreviousPage"
              >
                <i class="fas fa-chevron-left" />
              </v-btn>

              <!-- Ícone para ir página -->
              <v-btn
                icon
                :disabled="filtro.page === response.last_page"
                variant="text"
                @click="handleNextPage"
              >
                <i class="fas fa-chevron-right" />
              </v-btn>
            </div>
          </div>
        </div>
        <v-table class="bg-transparent mt-16 w-25">
          <thead>
            <tr>
              <th
                class="bolder-primary-color text-center font-weight-bold table-head-border"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(estado, index) in response?.data"
              :key="index"
            >
              <td class="table-foot-border text-center table-content-text">
                <i
                  class="fas fa-search"
                  style="color: rgb(var(--v-theme-primary)); cursor: pointer"
                  @click="
                    () =>
                      $router.push(
                        `/estados/detalhes/${estado.id}`
                      )
                  "
                />
                <i
                  class="fas fa-edit ml-2"
                  style="color: rgb(var(--v-theme-primary)); cursor: pointer"
                  @click="
                    () =>
                      $router.push(
                        `/estados/editar/${estado.id}`
                      )
                  "
                />
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div
        v-else-if="!isLoading"
        class="pa-10"
      >
        <v-alert type="info">
          Nenhum Estado encontrada com a sua busca. Ajuste os filtros e tente
          novamente
        </v-alert>
      </div>
    </v-container>
  </v-container>
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
  <v-row justify="center">
    <v-snackbar
      v-model="errorSnackbar"
      :timeout="4000"
      color="error"
      location="top right"
      top
      right
    >
      <v-row>
        <v-col
          cols="2"
          class="d-flex align-center justify-center"
        >
          <v-icon
            x-large
            size="20"
          >
            fas fa-triangle-exclamation
          </v-icon>
        </v-col>
        <v-col cols="10">
          {{ errorMessage }}
        </v-col>
      </v-row>
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import Button from '@/Components/Button.vue';
import PagedResponse from '@/models/entities/PagedResponse';
import EstadoService from '@/services/EstadoService';
import IFiltrarEstado from '@/models/forms/IFiltrarEstado';
import IEstado from '@/models/entities/IEstado';

export default {
  components: {
    Button,
  },
  data(): {
    filtro: IFiltrarEstado;
    initialAccess: boolean;
    
    response: PagedResponse<IEstado>;
    openedPanel: number;
    errorSnackbar: boolean;
    errorMessage: string;
    snackbar: boolean;
    isLoading: boolean;
  } {
    return {
      filtro: {
        nome: null,
        page: 1,
        perPage: 10
      },
      initialAccess: false,
      
      response: null,
      openedPanel: null,
      errorSnackbar: false,
      errorMessage: '',
      snackbar: false,
      isLoading: false,
    };
  },
  computed: {
    filtroVazio() {
      return !this.filtro.nome;
    },
  },
  async mounted() {
    try {
      this.isLoading = true;
      
      await this.filtrar();
      this.initialAccess = true;
    } catch (error) {
      this.errorMessage = "Houve um erro ao buscar dados de Estado. Tente novamente a operação e em caso de persistência do erro entre em contato com o suporte";
      this.errorSnackbar = true;
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    
    async handleNextPage() {
      this.filtro.page = this.filtro.page + 1;
      await this.filtrar();
    },
    async handlePreviousPage() {
      this.filtro.page = this.filtro.page - 1;
      await this.filtrar();
    },
    async handleChangePerPage(perPage) {
      this.filtro.page = 1;
      this.filtro.perPage = perPage;
      await this.filtrar();
    },
    cleanFilter() {
      this.filtro = {
        nome: null,
        page: 1,
        perPage: 10
      };
    },
    async filtrar() {
      try {
        this.initialAccess = false;
        this.isLoading = true;
        this.response = await EstadoService.filter(this.filtro);
      } catch (error) {
        this.errorMessage = "Houve um erro ao buscar dados de Estado. Tente novamente a operação e em caso de persistência do erro entre em contato com o suporte";
        this.errorSnackbar = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.v-expansion-panel-title.v-expansion-panel-title--active {
  background-color: #eee!important;
}
.scroll-table-container {
  overflow-x: auto;
  white-space: nowrap;
  width: 100%; // Padrão para a maioria dos navegadores

  @supports (width: -webkit-fill-available) {
    width: -webkit-fill-available; // Chrome e outros navegadores WebKit
  }

  @supports (width: -moz-available) {
    width: -moz-available; // Firefox
  }

  @supports (width: fill-available) {
    width: fill-available; // Padrão, caso seja adotado pelos navegadores
  }
}
</style>