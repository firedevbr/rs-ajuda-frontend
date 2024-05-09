<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column align-start"
      >
        <h1 class="label-welcome text-primary">
          Resgate
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
              Ainda não há Resgate cadastrados. Adicione uma Resgate.
            </p>
          </v-col>
        </v-row>

        <v-row
          class="mt-3"
        >
          <v-col
            cols="5"
            class="text-center"
          >
            <Button
              variant="flat"
              style="min-width: min-content;"
              @click="() => $router.push('/resgates/cadastrar')"
            >
              <span
                class="span-class"
              >
                clique aqui para cadastrar seu primeiro Resgate
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
            <v-spacer></v-spacer>
            <i class="fas fa-chevron-down" style="font-size: 16px"></i>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <v-sheet
              width="100%"
              class="py-10"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <label
                    for="cidade"
                    class="small-label"
                  >Cidade</label>
                  <v-text-field
                    id="cidade"
                    v-model="filtro.cidade"
                    bg-color="white"
                    placeholder="Filtrar pela cidade"
                    rounded
                    variant="outlined"
                    required
                    class="w-100 mt-5 pr-10"
                    type="text"
                    color="primary"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <label
                    for="bairro"
                    class="small-label"
                  >Bairro</label>
                  <v-text-field
                    id="bairro"
                    v-model="filtro.bairro"
                    bg-color="white"
                    placeholder="Filtrar pelo Bairro"
                    rounded
                    variant="outlined"
                    required
                    class="w-100 mt-5 pr-10"
                    type="text"
                    color="primary"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <label
                    for="status"
                    class="small-label"
                  >Status</label>
                  <v-select
                    id="status"
                    v-model="filtro.status"
                    bg-color="white"
                    rounded
                    variant="outlined"
                    placeholder="Filtrar por status"
                    required
                    class="w-100 mt-5 pr-10"
                    color="primary"
                    item-value="id"
                    item-title="nome"
                    :items="status"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <label
                    for="status"
                    class="small-label"
                  >Tipo de resgate</label>
                  <v-select
                    id="status"
                    v-model="filtro.tipo"
                    bg-color="white"
                    rounded
                    variant="outlined"
                    placeholder="Filtrar por Barco ou Helicóptero"
                    required
                    class="w-100 mt-5 pr-10"
                    color="primary"
                    item-value="id"
                    item-title="nome"
                    :items="tipos"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <label
                    for="pessoa"
                    class="small-label"
                  >Pessoa</label>
                  <v-text-field
                    id="pessoa"
                    v-model="filtro.pessoa"
                    bg-color="white"
                    placeholder="Filtrar pelo nome da pessoa"
                    rounded
                    variant="outlined"
                    required
                    class="w-100 mt-5 pr-10"
                    type="text"
                    color="primary"
                  />
                </v-col>
                <!-- Switch Meus Cadastros -->
                <v-col v-if="user != null" cols="12" md="4">
                  <v-switch
                    v-model="filtro.meus"
                    color="primary"
                    size="sm"
                    label="Meus Cadastros"
                    inset
                    class="mt-md-10 pr-10"
                  />
                </v-col>
              </v-row>
              <v-row justify="end">
                <!-- Linha única para dispositivos `md` e acima -->
                <v-col
                  cols="12"
                  md="6"
                  class="d-flex justify-end pr-13 hidden-sm-and-down-custom"
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
                <v-row>
                <!-- Duas colunas separadas para dispositivos móveis (sm e abaixo) -->
                <v-col
                  cols="12"
                  class="d-flex justify-center hidden-md-and-up-custom"
                >
                  <Button
                    variant="outlined"
                    color="confirmBold"
                    prepend-icon="fa fa-x pl-5 pr-2"
                    @click="cleanFilter"
                  >
                    Limpar
                  </Button>
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-center hidden-md-and-up-custom"
                >
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
              @click="() => $router.push('/resgates/cadastrar')"
            >
              Adicionar Resgate
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
                <th class="bolder-primary-color font-weight-bold table-head-border">
                  Id
                </th>
                <th class="bolder-primary-color font-weight-bold table-head-border">
                  Pessoa
                </th>
                <th class="bolder-primary-color font-weight-bold table-head-border">
                  Endereço
                </th>
                <th class="bolder-primary-color font-weight-bold table-head-border">
                  Status
                </th>
                <th class="bolder-primary-color font-weight-bold table-head-border">
                  Visto por último em
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(resgate, index) in response?.data"
                :key="index"
              >
                <td class="table-foot-border table-content-text">
                  {{ resgate?.id }}
                </td>
                <td class="table-foot-border table-content-text">
                  {{ resgate?.pessoa?.nome }}
                </td>
                <td class="table-foot-border table-content-text">
                  {{ `${resgate?.endereco?.logradouro} - ${resgate?.endereco?.bairro} - ${resgate?.endereco?.cidade?.nome}` }}
                </td>
                <td class="table-foot-border table-content-text">
                  {{ resgate?.status }}
                </td>
                <td class="table-foot-border table-content-text">
                  {{ formataDateTimeParaDataBrasileira(resgate?.ultimo_visto_em) }}
                </td>
              </tr>
            </tbody>
            <tfoot v-if="response?.data?.length === 0">
              <tr>
                <td class="bolder-primary-color font-weight-bold table-foot-border" />
                <td class="bolder-primary-color font-weight-bold table-foot-border" />
                <td class="bolder-primary-color font-weight-bold table-foot-border" />
                <td class="bolder-primary-color font-weight-bold table-foot-border" />
                <td class="bolder-primary-color font-weight-bold table-foot-border" />
                <td class="bolder-primary-color font-weight-bold table-foot-border" />
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
              v-for="(resgate, index) in response?.data"
              :key="index"
            >
              <td class="table-foot-border text-center table-content-text">
                <i
                  class="fas fa-search"
                  style="color: rgb(var(--v-theme-primary)); cursor: pointer"
                  @click="
                    () =>
                      $router.push(
                        `/resgates/visualizar/${resgate.id}`
                      )
                  "
                />
                <i
                  v-if="shouldShowEdit(resgate)"
                  class="fas fa-edit ml-2"
                  style="color: rgb(var(--v-theme-primary)); cursor: pointer"
                  @click="
                    () =>
                      $router.push(
                        `/resgates/editar/${resgate.id}`
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
          Nenhum Resgate encontrada com a sua busca. Ajuste os filtros e tente
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
import ResgateService from '@/services/ResgateService';
import IFiltrarResgate from '@/models/forms/IFiltrarResgate';
import IResgate from '@/models/entities/IResgate';
import PessoaService from '@/services/PessoaService';
import IPessoa from '@/models/entities/IPessoa';
import EnderecoService from '@/services/EnderecoService';
import IEndereco from '@/models/entities/IEndereco';
import IUsuario from '@/models/entities/IUsuario';
import { formataDateTimeParaDataBrasileira } from '@/mixins/masks';
import TypeStatusDesaperecimento from '@/models/forms/TypeStatusResgate';
import AuthService from '@/services/AuthService';

export default {
  components: {
    Button,
  },
  data(): {
    filtro: IFiltrarResgate;
    initialAccess: boolean;
    pessoas: IPessoa[];
    enderecos: IEndereco[];
    status: TypeStatusDesaperecimento[];
    usuarios: IUsuario[];
    user: IUsuario;
    response: PagedResponse<IResgate>;
    openedPanel: number;
    errorSnackbar: boolean;
    errorMessage: string;
    snackbar: boolean;
    isLoading: boolean;
  } {
    return {
      filtro: {
        pessoa: null,
        status: null,
        tipo: null,
        cidade: null,
        meus: null,
        bairro: null,
        page: 1,
        perPage: 10
      },
      user: null,
      initialAccess: false,
      pessoas: [],
      enderecos: [],
      usuarios: [],
      status: [],
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
      return !this.filtro.pessoa && !this.filtro.cidade && !this.filtro.bairro && !this.filtro.status && !this.filtro.tipo;
    },
    shouldShowEdit() {
      return (model) => {
        if (this.user === null) return false;
        return this.user.id === model.responsavel_id
      }
    },
    tipos() {
      return [
        {
          id: 'Barco',
          nome: 'Barco',
        },
        {
          id: 'Helicóptero',
          nome: 'Helicóptero'
        }
      ]
    }
  },
  async mounted() {
    try {
      this.user = AuthService.getLoggedAdminAreaUserData();
      this.isLoading = true;
      this.pessoas = await PessoaService.getAll();
      this.enderecos = await EnderecoService.getAll();
      this.status = [{ id: "Aguardando Ajuda", nome: "Aguardando Ajuda"}, { id: "Ajuda Enviada", nome: "Ajuda Enviada"}, { id: "Finalizado", nome: "Finalizado"}]
      await this.filtrar();
      this.initialAccess = true;
    } catch (error) {
      this.errorMessage = "Houve um erro ao buscar dados de Resgate. Tente novamente a operação e em caso de persistência do erro entre em contato com o suporte";
      this.errorSnackbar = true;
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
        formataDateTimeParaDataBrasileira,
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
        pessoa: null,
        endereco_id: null,
        status: null,
        ultimo_visto_em: null,
        page: 1,
        perPage: 10
      };
    },
    async filtrar() {
      try {
        this.initialAccess = false;
        this.isLoading = true;
        this.response = await ResgateService.filter(this.filtro);
      } catch (error) {
        this.errorMessage = "Houve um erro ao buscar dados de Resgate. Tente novamente a operação e em caso de persistência do erro entre em contato com o suporte";
        this.errorSnackbar = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">
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
@media (max-width: 450px) {
  .span-class{
    white-space: wrap;
    min-width: 300px;
    min-height: 50px;
    padding-right: 15px;
  }
} 
 
</style>