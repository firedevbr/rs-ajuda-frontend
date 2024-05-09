<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column align-start"
      >
        <h1 class="label-welcome text-primary">
          Adicionar Endereco
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
                                 <v-label class="rs-help-input-label" for="logradouro">
                                   Logradouro 
                                 </v-label>
                                 <v-text-field
                                   id="logradouro"
                                   v-model="formData.logradouro"
                                   bg-color="white"
                                   rounded
                                   variant="outlined"
                                   placeholder="Insira Logradouro"
                                   
                                   class="w-100"
                                   type="text"
                                   color="primary"
                                   maxlength="255"
                                   :error-messages="getErrorMessageFor('logradouro')"
                                 />
                              </v-col>
<v-col cols="12">
                                 <v-label class="rs-help-input-label" for="bairro">
                                   Bairro <span class="text-red">*</span>
                                 </v-label>
                                 <v-text-field
                                   id="bairro"
                                   v-model="formData.bairro"
                                   bg-color="white"
                                   rounded
                                   variant="outlined"
                                   placeholder="Insira Bairro"
                                   required
                                   class="w-100"
                                   type="text"
                                   color="primary"
                                   maxlength="255"
                                   :error-messages="getErrorMessageFor('bairro')"
                                 />
                              </v-col>
<v-col cols="12">
                                 <v-label class="rs-help-input-label" for="regiao">
                                   Regiao 
                                 </v-label>
                                 <v-text-field
                                   id="regiao"
                                   v-model="formData.regiao"
                                   bg-color="white"
                                   rounded
                                   variant="outlined"
                                   placeholder="Insira Regiao"
                                   
                                   class="w-100"
                                   type="text"
                                   color="primary"
                                   maxlength="255"
                                   :error-messages="getErrorMessageFor('regiao')"
                                 />
                              </v-col>
<v-col cols="12">
                                 <v-label class="rs-help-input-label" for="numero">
                                   Numero 
                                 </v-label>
                                 <v-text-field
                                   id="numero"
                                   v-model="formData.numero"
                                   bg-color="white"
                                   rounded
                                   variant="outlined"
                                   placeholder="Insira Numero"
                                   
                                   class="w-100"
                                   type="text"
                                   color="primary"
                                   maxlength="255"
                                   :error-messages="getErrorMessageFor('numero')"
                                 />
                              </v-col>
<v-col cols="12">
                                 <v-label class="rs-help-input-label" for="cep">
                                   Cep 
                                 </v-label>
                                 <v-text-field
                                   id="cep"
                                   v-model="formData.cep"
                                   bg-color="white"
                                   rounded
                                   variant="outlined"
                                   placeholder="Insira Cep"
                                   
                                   class="w-100"
                                   type="text"
                                   color="primary"
                                   maxlength="255"
                                   :error-messages="getErrorMessageFor('cep')"
                                 />
                              </v-col>
<v-col cols="12">
                  <v-label class="rs-help-input-label" for="cidade_id">
                    Cidade <span class="text-red">*</span>
                  </v-label>
                  <v-select
                    id="cidade_id"
                    v-model="formData.cidade_id"
                    bg-color="white"
                    rounded
                    variant="outlined"
                    placeholder="Selecione Cidade"
                    required
                    class="w-100"
                    color="primary"
                    item-value="id"
                    item-title="nome"
                    :items="cidades"
                    :error-messages="getErrorMessageFor('cidade_id')"
                  />
                </v-col>
<v-col cols="12">
                                 <v-label class="rs-help-input-label" for="ponto_de_referencia">
                                   Ponto_de_referencia 
                                 </v-label>
                                 <v-text-field
                                   id="ponto_de_referencia"
                                   v-model="formData.ponto_de_referencia"
                                   bg-color="white"
                                   rounded
                                   variant="outlined"
                                   placeholder="Insira Ponto_de_referencia"
                                   
                                   class="w-100"
                                   type="text"
                                   color="primary"
                                   maxlength="255"
                                   :error-messages="getErrorMessageFor('ponto_de_referencia')"
                                 />
                              </v-col>
<v-col cols="12">
                                 <v-label class="rs-help-input-label" for="latitude">
                                   Latitude 
                                 </v-label>
                                 <v-text-field
                                   id="latitude"
                                   v-model="formData.latitude"
                                   bg-color="white"
                                   rounded
                                   variant="outlined"
                                   placeholder="Insira Latitude"
                                   
                                   class="w-100"
                                   type="text"
                                   color="primary"
                                   maxlength="255"
                                   :error-messages="getErrorMessageFor('latitude')"
                                 />
                              </v-col>
<v-col cols="12">
                                 <v-label class="rs-help-input-label" for="longitude">
                                   Longitude 
                                 </v-label>
                                 <v-text-field
                                   id="longitude"
                                   v-model="formData.longitude"
                                   bg-color="white"
                                   rounded
                                   variant="outlined"
                                   placeholder="Insira Longitude"
                                   
                                   class="w-100"
                                   type="text"
                                   color="primary"
                                   maxlength="255"
                                   :error-messages="getErrorMessageFor('longitude')"
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
            @click="saveEndereco"
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
import EnderecoService from '@/services/EnderecoService';
import IFormEndereco from '@/models/forms/IFormEndereco';
import CidadeService from '@/services/CidadeService';
import ICidade from '@/models/entities/ICidade';

export default {
  components: { Button },
  data(): {
    isLoading: boolean;
    snackbar: boolean;
    errorSnackbar: boolean;
    formErrors: object;
    cidades: ICidade[];
    errorMessage: string,
    successMessage: string,
    formData: IFormEndereco
  } {
    return {
      isLoading: false,
      snackbar: false,
      errorSnackbar: false,
      formErrors: {},
      cidades: [],
      errorMessage: '',
      successMessage: '',
      formData: {
        logradouro: null,
        bairro: null,
        regiao: null,
        numero: null,
        cep: null,
        cidade_id: null,
        ponto_de_referencia: null,
        latitude: null,
        longitude: null,
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
        'Erro ao buscar dados de Endereco. Tente novamente e em caso de persistência de erros entre em contato com o suporte.';
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    goBack() {
      this.$router.push('/enderecos');
    },
    async saveEndereco() {
      this.isLoading = true;
      this.formErrors = {};

      try {

        let response;
        if (this.id) {
          response = await EnderecoService.update({
            logradouro: this.formData.logradouro,
            bairro: this.formData.bairro,
            regiao: this.formData.regiao,
            numero: this.formData.numero,
            cep: this.formData.cep,
            cidade_id: this.formData.cidade_id,
            ponto_de_referencia: this.formData.ponto_de_referencia,
            latitude: this.formData.latitude,
            longitude: this.formData.longitude
          }, this.id);
        } else {
          response = await EnderecoService.save(this.formData);
          this.id = response.id;
        }

        this.successMessage = "Endereco salva com sucesso!";
        this.snackbar = true;

        Object.assign(this.formData, response);

        this.isLoading = false;
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.formErrors = error.response.data.errors;
          this.errorSnackbar = true;
          this.errorMessage = "Houve um erro ao cadastrar Endereco, valide os dados e tente novamente";

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
        this.cidades = await CidadeService.getAll();
        if (this.$route?.params?.id) {
          this.id = this.$route?.params?.id;
          const endereco = await EnderecoService.getById(this.id);
          Object.assign(this.formData, endereco);
        }

      } catch (error) {
        this.errorSnackbar = true;
        this.errorMessage =
          'Erro ao buscar dados de Endereco. Tente novamente e em caso de persistência de erros entre em contato com o suporte.';
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