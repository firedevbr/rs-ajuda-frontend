<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column align-start"
      >
        <h1 class="label-welcome text-primary">
          Adicionar Cidade
        </h1>
      </v-col>
    </v-row>
    <v-container class="form-border pa-0 mt-10">
      <v-row
        id="form-step-content"
        class="pa-10"
      >
        <v-col cols="12">
          <h2 class="label-welcome text-primary">
            Cadastre as informações abaixo:
          </h2>
        </v-col>
        <v-col cols="12">
                                 <v-label class="rs-help-input-label" for="nome">
                                   Nome <span class="text-red">*</span>
                                 </v-label>
                                 <v-text-field
                                   id="nome"
                                   v-model="formData.nome"
                                   bg-color="white"
                                   rounded
                                   variant="outlined"
                                   placeholder="Insira Nome"
                                   required
                                   class="w-100"
                                   type="text"
                                   color="primary"
                                   maxlength="255"
                                   :error-messages="getErrorMessageFor('nome')"
                                 />
                              </v-col>
<v-col cols="12">
                  <v-label class="rs-help-input-label" for="estado_id">
                    Estado <span class="text-red">*</span>
                  </v-label>
                  <v-select
                    id="estado_id"
                    v-model="formData.estado_id"
                    bg-color="white"
                    rounded
                    variant="outlined"
                    placeholder="Selecione Estado"
                    required
                    class="w-100"
                    color="primary"
                    item-value="id"
                    item-title="nome"
                    :items="estados"
                    :error-messages="getErrorMessageFor('estado_id')"
                  />
                </v-col>
      </v-row>
      <v-row
        id="form-navigation-footer"
        justify="space-between"
        class="pa-10"
      >
        <!-- Botão voltar -->
        <v-col
          cols="12"
          lg="2"
          class="pl-0"
        >
          <Button
            variant="flat"
            color="confirm"
            style="min-width: min-content;"
            prepend-icon="fas fa-arrow-left pl-5 pr-2"
            @click="goBack"
          >
            Voltar
          </Button>
        </v-col>
        <v-col
          cols="12"
          :lg="'6'"
          align="end"
        >
          <!-- Botão salvar projeto -->
          <Button
            variant="flat"
            style="min-width: min-content;"
            prepend-icon="fas fa-circle-check pl-5 pr-2"
            @click="saveCidade"
          >
            Salvar
          </Button>
        </v-col>
        <v-snackbar
          v-model="snackbar"
          :timeout="2000"
          color="success"
        >
          {{ successMessage }}
        </v-snackbar>
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
              {{
                errorMessage ?
                  errorMessage :
                  "Não foi possível realizar a ação, entre em contato com o suporte para mais informações."
              }}
            </v-col>
          </v-row>
        </v-snackbar>
      </v-row>
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
</template>

<script lang="ts">
import Button from '@/Components/Button.vue';
import CidadeService from '@/services/CidadeService';
import IFormCidade from '@/models/forms/IFormCidade';
import EstadoService from '@/services/EstadoService';
import IEstado from '@/models/entities/IEstado';

export default {
  components: { Button },
  data(): {
    isLoading: boolean;
    snackbar: boolean;
    errorSnackbar: boolean;
    formErrors: object;
    estados: IEstado[];
    errorMessage: string,
    successMessage: string,
    formData: IFormCidade
  } {
    return {
      isLoading: false,
      snackbar: false,
      errorSnackbar: false,
      formErrors: {},
      estados: [],
      errorMessage: '',
      successMessage: '',
      formData: {
        nome: null,
        estado_id: null,
      }
    };
  },
  computed: {
    getErrorMessageFor() {
      return (fieldName) => {
        // Se tem erro diretamente em "errors", retorne ele
        if (this.formErrors[fieldName]) {
          return this.formErrors[fieldName][0];
        }

        return '';
      };
    },
  },
  async mounted() {
    try {
      this.isLoading = true;
      await this.checkIfEditing();
    } catch (error) {
      this.errorSnackbar = true;
      this.errorMessage =
        'Erro ao buscar dados de Cidade. Tente novamente e em caso de persistência de erros entre em contato com o suporte.';
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    goBack() {
      this.$router.push('/cidades');
    },
    async saveCidade() {
      this.isLoading = true;
      this.formErrors = {};

      try {

        let response;
        if (this.id) {
          response = await CidadeService.update({
            nome: this.formData.nome,
            estado_id: this.formData.estado_id
          }, this.id);
        } else {
          response = await CidadeService.save(this.formData);
          this.id = response.id;
        }

        this.successMessage = "Cidade salva com sucesso!";
        this.snackbar = true;

        Object.assign(this.formData, response);

        this.isLoading = false;
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.formErrors = error.response.data.errors;
          this.errorSnackbar = true;
          this.errorMessage = "Houve um erro ao cadastrar Cidade, valide os dados e tente novamente";

        } else if (error.response && error.response.status === 500) {
          this.errorMessage =
            'Erro no servidor, entre em contato com o suporte';
        }
        this.isLoading = false
      }
    },
    async checkIfEditing() {
      try {
        this.isLoading = true;
        this.estados = await EstadoService.getAll();
        if (this.$route?.params?.id) {
          this.id = this.$route?.params?.id;
          const cidade = await CidadeService.getById(this.id);
          Object.assign(this.formData, cidade);
        }

      } catch (error) {
        this.errorSnackbar = true;
        this.errorMessage =
          'Erro ao buscar dados de Cidade. Tente novamente e em caso de persistência de erros entre em contato com o suporte.';
      } finally {
        this.isLoading = false;
      }
    },
  }
};
</script>

<style scoped lang="scss">
.default-tabs {
  color: #64c832;
}
</style>