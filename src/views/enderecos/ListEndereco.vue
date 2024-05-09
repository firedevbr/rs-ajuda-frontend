<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column align-start"
      >
        <h1 class="label-welcome text-primary">
          Endereco
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
              Ainda não há Endereco cadastrados. Adicione uma Endereco.
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
              @click="() => $router.push('/enderecos/cadastrar')"
            >
              <span
                class="text-wrap"
                onclick=""
              >
                clique aqui para cadastrar seu primeiro Endereco
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
        <label for="logradouro" class="small-label">Logradouro</label>
        <v-text-field id="logradouro" v-model="filtro.logradouro" bg-color="white" placeholder="Filtrar pelo Logradouro" rounded variant="outlined" required class="w-100 mt-5 pr-10" type="text" color="primary" />
    </v-col>
<v-col cols="4">
        <label for="bairro" class="small-label">Bairro</label>
        <v-text-field id="bairro" v-model="filtro.bairro" bg-color="white" placeholder="Filtrar pelo Bairro" rounded variant="outlined" required class="w-100 mt-5 pr-10" type="text" color="primary" />
    </v-col>
<v-col cols="4">
        <label for="regiao" class="small-label">Regiao</label>
        <v-text-field id="regiao" v-model="filtro.regiao" bg-color="white" placeholder="Filtrar pelo Regiao" rounded variant="outlined" required class="w-100 mt-5 pr-10" type="text" color="primary" />
    </v-col>
<v-col cols="4">
        <label for="numero" class="small-label">Numero</label>
        <v-text-field id="numero" v-model="filtro.numero" bg-color="white" placeholder="Filtrar pelo Numero" rounded variant="outlined" required class="w-100 mt-5 pr-10" type="text" color="primary" />
    </v-col>
<v-col cols="4">
        <label for="cep" class="small-label">Cep</label>
        <v-text-field id="cep" v-model="filtro.cep" bg-color="white" placeholder="Filtrar pelo Cep" rounded variant="outlined" required class="w-100 mt-5 pr-10" type="text" color="primary" />
    </v-col>
<v-col cols="4">
                <label for="cidade_id" class="small-label">Cidade</label>
                <v-select id="cidade_id" v-model="filtro.cidade_id" bg-color="white" rounded variant="outlined" placeholder="Filtrar por Cidade" required class="w-100 mt-5 pr-10" color="primary" item-value="id" item-title="nome" :items="cidades" />
              </v-col>
<v-col cols="4">
        <label for="ponto_de_referencia" class="small-label">Ponto_de_referencia</label>
        <v-text-field id="ponto_de_referencia" v-model="filtro.ponto_de_referencia" bg-color="white" placeholder="Filtrar pelo Ponto_de_referencia" rounded variant="outlined" required class="w-100 mt-5 pr-10" type="text" color="primary" />
    </v-col>
<v-col cols="4">
        <label for="latitude" class="small-label">Latitude</label>
        <v-text-field id="latitude" v-model="filtro.latitude" bg-color="white" placeholder="Filtrar pelo Latitude" rounded variant="outlined" required class="w-100 mt-5 pr-10" type="text" color="primary" />
    </v-col>
<v-col cols="4">
        <label for="longitude" class="small-label">Longitude</label>
        <v-text-field id="longitude" v-model="filtro.longitude" bg-color="white" placeholder="Filtrar pelo Longitude" rounded variant="outlined" required class="w-100 mt-5 pr-10" type="text" color="primary" />
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
              @click="() => $router.push('/enderecos/cadastrar')"
            >
              Adicionar Endereco
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
                <th class="bolder-primary-color font-weight-bold table-head-border">Logradouro</th>
                <th class="bolder-primary-color font-weight-bold table-head-border">Bairro</th>
                <th class="bolder-primary-color font-weight-bold table-head-border">Regiao</th>
                <th class="bolder-primary-color font-weight-bold table-head-border">Numero</th>
                <th class="bolder-primary-color font-weight-bold table-head-border">Cep</th>
                <th class="bolder-primary-color font-weight-bold table-head-border">Cidade</th>
                <th class="bolder-primary-color font-weight-bold table-head-border">Ponto_de_referencia</th>
                <th class="bolder-primary-color font-weight-bold table-head-border">Latitude</th>
                <th class="bolder-primary-color font-weight-bold table-head-border">Longitude</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(endereco, index) in response?.data"
                :key="index"
              >
                <td class="table-foot-border table-content-text" :title="endereco?.id">
                           {{ endereco?.id }}
                         </td>
                <td class="table-foot-border table-content-text" :title="endereco?.logradouro">
                           {{ endereco?.logradouro }}
                         </td>
                <td class="table-foot-border table-content-text" :title="endereco?.bairro">
                           {{ endereco?.bairro }}
                         </td>
                <td class="table-foot-border table-content-text" :title="endereco?.regiao">
                           {{ endereco?.regiao }}
                         </td>
                <td class="table-foot-border table-content-text" :title="endereco?.numero">
                           {{ endereco?.numero }}
                         </td>
                <td class="table-foot-border table-content-text" :title="endereco?.cep">
                           {{ endereco?.cep }}
                         </td>
                <td class="table-foot-border table-content-text" :title="endereco?.cidade_id">
                           {{ endereco?.cidade?.nome }}
                         </td>
                <td class="table-foot-border table-content-text" :title="endereco?.ponto_de_referencia">
                           {{ endereco?.ponto_de_referencia }}
                         </td>
                <td class="table-foot-border table-content-text" :title="endereco?.latitude">
                           {{ endereco?.latitude }}
                         </td>
                <td class="table-foot-border table-content-text" :title="endereco?.longitude">
                           {{ endereco?.longitude }}
                         </td>
              </tr>
            </tbody>
            <tfoot v-if="response?.data?.length === 0">
              <tr>
                <td class="bolder-primary-color font-weight-bold table-foot-border"></td>
                <td class="bolder-primary-color font-weight-bold table-foot-border"></td>
                <td class="bolder-primary-color font-weight-bold table-foot-border"></td>
                <td class="bolder-primary-color font-weight-bold table-foot-border"></td>
                <td class="bolder-primary-color font-weight-bold table-foot-border"></td>
                <td class="bolder-primary-color font-weight-bold table-foot-border"></td>
                <td class="bolder-primary-color font-weight-bold table-foot-border"></td>
                <td class="bolder-primary-color font-weight-bold table-foot-border"></td>
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
              v-for="(endereco, index) in response?.data"
              :key="index"
            >
              <td class="table-foot-border text-center table-content-text">
                <i
                  class="fas fa-search"
                  style="color: rgb(var(--v-theme-primary)); cursor: pointer"
                  @click="
                    () =>
                      $router.push(
                        `/enderecos/detalhes/${endereco.id}`
                      )
                  "
                />
                <i
                  class="fas fa-edit ml-2"
                  style="color: rgb(var(--v-theme-primary)); cursor: pointer"
                  @click="
                    () =>
                      $router.push(
                        `/enderecos/editar/${endereco.id}`
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
          Nenhum Endereco encontrada com a sua busca. Ajuste os filtros e tente
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
import EnderecoService from '@/services/EnderecoService';
import IFiltrarEndereco from '@/models/forms/IFiltrarEndereco';
import IEndereco from '@/models/entities/IEndereco';
import CidadeService from '@/services/CidadeService';
import ICidade from '@/models/entities/ICidade';

export default {
  components: {
    Button,
  },
  data(): {
    filtro: IFiltrarEndereco;
    initialAccess: boolean;
    cidades: ICidade[];
    response: PagedResponse<IEndereco>;
    openedPanel: number;
    errorSnackbar: boolean;
    errorMessage: string;
    snackbar: boolean;
    isLoading: boolean;
  } {
    return {
      filtro: {
        logradouro: null,
        bairro: null,
        regiao: null,
        numero: null,
        cep: null,
        cidade_id: null,
        ponto_de_referencia: null,
        latitude: null,
        longitude: null,
        page: 1,
        perPage: 10
      },
      initialAccess: false,
      cidades: [],
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
      return !this.filtro.logradouro && !this.filtro.bairro && !this.filtro.regiao && !this.filtro.numero && !this.filtro.cep && !this.filtro.cidade_id && !this.filtro.ponto_de_referencia && !this.filtro.latitude && !this.filtro.longitude;
    },
  },
  async mounted() {
    try {
      this.isLoading = true;
      this.cidades = await CidadeService.getAll();
      await this.filtrar();
      this.initialAccess = true;
    } catch (error) {
      this.errorMessage = "Houve um erro ao buscar dados de Endereco. Tente novamente a operação e em caso de persistência do erro entre em contato com o suporte";
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
        logradouro: null,
        bairro: null,
        regiao: null,
        numero: null,
        cep: null,
        cidade_id: null,
        ponto_de_referencia: null,
        latitude: null,
        longitude: null,
        page: 1,
        perPage: 10
      };
    },
    async filtrar() {
      try {
        this.initialAccess = false;
        this.isLoading = true;
        this.response = await EnderecoService.filter(this.filtro);
      } catch (error) {
        this.errorMessage = "Houve um erro ao buscar dados de Endereco. Tente novamente a operação e em caso de persistência do erro entre em contato com o suporte";
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