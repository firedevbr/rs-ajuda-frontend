<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column align-start"
      >
        <h1 class="label-welcome text-primary">
          {{ capitalizeFirstLetter(mode) }} Desaparecimento
        </h1>
      </v-col>
    </v-row>
    <v-container class="form-border pa-0 mt-10">
      <v-row
        id="form-step-content"
        class="pl-10 pr-10 pt-10"
      >
        <v-col cols="12">
          <h2 class="label-welcome text-primary">
            Confira as informações abaixo:
          </h2>
        </v-col>
        
        <v-col
          v-if="id !== null"
          cols="12"
        >
          <v-label
            class="rs-help-input-label"
            for="status"
          >
            Status <span class="text-red">*</span>
          </v-label>
          <v-select
            id="status"
            v-model="formData.status"
            :items="status"
            item-value="id" 
            item-title="nome" 
            bg-color="white"
            rounded
            variant="outlined"
            placeholder="Insira status"
            required
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :error-messages="getErrorMessageFor('status')"
            :readonly="mode === 'visualizar'"
          />
        </v-col>
        <v-divider />
        <v-col cols="12">
          <h4>Dados da pessoa beneficiada:</h4>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-label
            class="rs-help-input-label"
            for="nome"
          >
            Nome <span class="text-red">*</span>
          </v-label>
          <v-text-field
            id="nome"
            v-model="formDataPessoa.nome"
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
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-label
            class="rs-help-input-label"
            for="cpf"
          >
            CPF 
          </v-label>
          <v-text-field
            id="cpf"
            v-model="formDataPessoa.cpf"
            v-maska:[cpfMask]
            bg-color="white"
            rounded
            variant="outlined"
            placeholder="Insira Cpf"
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :error-messages="getErrorMessageFor('cpf')"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"
          />
        </v-col>
        <v-divider />
        <v-col cols="12">
          <h4>Dados do local para recebimento de doações:</h4>
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-label
            class="rs-help-input-label"
            for="cep"
          >
            CEP 
          </v-label>
          <v-text-field
            id="cep"
            v-model="formDataEndereco.cep"
            v-maska:[cepMask]
            bg-color="white"
            rounded
            variant="outlined"
            placeholder="Insira Cep"
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :error-messages="getErrorMessageFor('cep')"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"
            @blur="fetchCep" 
          />
        </v-col>
      </v-row>
      <v-row
        class="pl-10 pr-10"
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-label
            class="rs-help-input-label"
            for="logradouro"
          >
            Logradouro 
          </v-label>
          <v-text-field
            id="logradouro"
            v-model="formDataEndereco.logradouro"
            bg-color="white"
            rounded
            variant="outlined"
            placeholder="Insira Logradouro"
                                   
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :error-messages="getErrorMessageFor('logradouro')"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-label
            class="rs-help-input-label"
            for="numero"
          >
            Numero 
          </v-label>
          <v-text-field
            id="numero"
            v-model="formDataEndereco.numero"
            bg-color="white"
            rounded
            variant="outlined"
            placeholder="Insira Numero"
                                   
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :error-messages="getErrorMessageFor('numero')"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-label
            class="rs-help-input-label"
            for="bairro"
          >
            Bairro
          </v-label>
          <v-text-field
            id="bairro"
            v-model="formDataEndereco.bairro"
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
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'" 
          />
        </v-col>
      </v-row>
      <v-row
        class="pl-10 pr-10"
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label
            class="rs-help-input-label"
            for="cidade"
          >
            Cidade 
          </v-label>
          <v-text-field
            id="cidade"
            v-model="formDataEndereco.cidade"
            bg-color="white"
            rounded
            variant="outlined"
            placeholder="Insira cidade"
                                   
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :error-messages="getErrorMessageFor('cidade')"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-label
            class="rs-help-input-label"
            for="regiao"
          >
            Regiao 
          </v-label>
          <v-text-field
            id="regiao"
            v-model="formDataEndereco.regiao"
            bg-color="white"
            rounded
            variant="outlined"
            placeholder="Insira Regiao"
                                   
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :error-messages="getErrorMessageFor('regiao')"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"
          />
        </v-col>
        
        <v-col cols="12" md="6">
          <v-label
            class="rs-help-input-label"
            for="ponto_de_referencia"
          >
            Ponto de referencia 
          </v-label>
          <v-text-field
            id="ponto_de_referencia"
            v-model="formDataEndereco.ponto_de_referencia"
            bg-color="white"
            rounded
            variant="outlined"
            placeholder="Insira Ponto de referencia "
                                   
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :error-messages="getErrorMessageFor('ponto_de_referencia')"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'" 
          />
        </v-col>
        <v-divider />
        <v-col cols="12">
          <h4>Detalhes:</h4>
        </v-col>
        <v-row
          class="pl-3 pr-10"
        >
          <v-col
            cols="12"
            md="4"
          >
            <v-label
              class="rs-help-input-label"
              for="ultimo_visto_em"
            >
              Última vez visto <span class="text-red">*</span>
            </v-label>
            <v-text-field
              id="ultimo_visto_em"
              v-model="formData.ultimo_visto_em"
              bg-color="white"
              rounded
              variant="outlined"
              placeholder="Ex: 19/11/2023"
              required
              class="w-100"
              type="date"
              color="primary"
              :max="getTodayDate"
              :readonly="mode === 'visualizar'"
              :disabled="mode === 'editar'" 
            />
          </v-col>
          <v-col cols="12" >
            <v-label
              class="text-wrap rs-help-input-label"
              for="descricao_objetivo"
            >
              Observação:
            </v-label>
            <v-textarea
              id="observacoes"
              v-model="formData.observacoes"
              bg-color="white"
              variant="outlined"
              placeholder="Forneça informações úteis para ajudar na identificação"
              required
              class="w-100 rounded-text-area"
              color="primary"
              :readonly="mode === 'visualizar'"
              :disabled="mode === 'editar'"

            />
          </v-col>
        </v-row>
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
          v-if="mode !== 'visualizar'"
          cols="12"
          :lg="'6'"
          align="end"
        >
          <Button
            variant="flat"
            style="min-width: min-content;"
            prepend-icon="fas fa-circle-check pl-5 pr-2"
            @click="saveDesaparecimento"
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
import DesaparecimentoService from '@/services/DesaparecimentoService';
import IFormDesaparecimento from '@/models/forms/IFormDesaparecimento';
import PessoaService from '@/services/PessoaService';
import IPessoa from '@/models/entities/IPessoa';
import EnderecoService from '@/services/EnderecoService';
import IEndereco from '@/models/entities/IEndereco';
import IUsuario from '@/models/entities/IUsuario';
import IFormPessoa from '@/models/forms/IFormPessoa';
import IFormEndereco from '@/models/forms/IFormEndereco';
import {cepMask, cpfMask} from '@/mixins/masks';
import TypeStatusDesaperecimento from '@/models/forms/TypeStatusDesaparecimento';

export default {
  components: { Button },
  data(): {
    isLoading: boolean;
    snackbar: boolean;
    errorSnackbar: boolean;
    id?: number;
    mode: string;
    cepMask: any;
    cpfMask: any;
    formErrors: object;
    pessoas: IPessoa[];
    enderecos: IEndereco[];
    usuarios: IUsuario[];
    status: TypeStatusDesaperecimento[];
    errorMessage: string,
    successMessage: string,
    formDataPessoa: IFormPessoa,
    formDataEndereco: IFormEndereco,
    formData: IFormDesaparecimento
  } {
    return {
      isLoading: false,
      snackbar: false,
      errorSnackbar: false,
      mode: 'adicionar',
      id: null,
      cepMask,
      cpfMask,
      formErrors: {},
      pessoas: [],
      status: [],
      enderecos: [],
      usuarios: [],
      errorMessage: '',
      successMessage: '',
      formDataPessoa: {
        nome: null,
        cpf: null,
      },
      formDataEndereco: {
        logradouro: null,
        bairro: null,
        regiao: null,
        numero: null,
        cep: null,
        cidade: null,
        ponto_de_referencia: null,
        estado: null,
      },
      formData: {
        pessoa_id: null,
        endereco_id: null,
        observacoes: null,
        ultimo_visto_em: null,
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
    getTodayDate() {
      // Obtém a data atual no formato `YYYY-MM-DD`
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0') // +1 porque os meses começam em 0
      const day = String(today.getDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    }
  },
  async mounted() {
    try {
      this.isLoading = true;
      await this.checkIfEditing();
      this.status = [{ id: "Aguardando Ajuda", nome: "Aguardando Ajuda"}, { id: "Ajuda Enviada", nome: "Ajuda Enviada"}, { id: "Finalizado", nome: "Finalizado"}]

    } catch (error) {
      this.errorSnackbar = true;
      this.errorMessage =
        'Erro ao buscar dados de Desaparecimento. Tente novamente e em caso de persistência de erros entre em contato com o suporte.';
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    goBack() {
      this.$router.push('/desaparecimentos');
    },
    capitalizeFirstLetter(text) {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
    async fetchCep() {
      const cleanCep = this.formDataEndereco.cep.replace(/\D/g, '');
      if (cleanCep.length === 8) {
        try {
          const address = await EnderecoService.getByCep(cleanCep);
          this.formDataEndereco.logradouro = address.street;
          this.formDataEndereco.bairro = address.neighborhood;
          this.formDataEndereco.cidade = address.city;
          this.formDataEndereco.estado = address.state ?? 'RS';
          console.log(address)
        } catch (e) {
          console.error(e);
        }
      }
    },
    async saveDesaparecimento() {
      this.isLoading = true;
      this.formErrors = {};

      try {

        let response;
        if (this.id) {
          response = await DesaparecimentoService.update({
            pessoa_id: this.formData.pessoa_id,
            endereco_id: this.formData.endereco_id,
            status: this.formData.status,
            observacoes: this.formData.observacoes,
            responsavel_id: this.formData.responsavel_id,
            ultimo_visto_em: this.formData.ultimo_visto_em
          }, this.id);
        } else {
          const [pessoaResponse, enderecoResponse] = await Promise.all([
            PessoaService.save(this.formDataPessoa),
            EnderecoService.save(this.formDataEndereco)
          ]);

          this.formData.pessoa_id = pessoaResponse.id;
          this.formData.endereco_id = enderecoResponse.id;
          response = await DesaparecimentoService.save(this.formData);
          this.id = response.id;
        }

        this.successMessage = "Desaparecimento salva com sucesso!";
        this.snackbar = true;

        this.$router.push('/desaparecimentos');

        Object.assign(this.formData, response);

        this.isLoading = false;
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.formErrors = error.response.data.errors;
          this.errorSnackbar = true;
          this.errorMessage = "Houve um erro ao cadastrar Desaparecimento, valide os dados e tente novamente";

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
        this.pessoas = await PessoaService.getAll();
        this.enderecos = await EnderecoService.getAll();
        
        

        if (this.$route?.params?.id) {
          this.id = this.$route?.params?.id;
          this.mode = this.$route?.params?.acao;
          if (this.mode !== "visualizar" && this.mode !== "editar") {
            this.$router.push('/desaparecimentos');
            return;
          }
          const desaparecimento = await DesaparecimentoService.getById(this.id);
          Object.assign(this.formData, desaparecimento);
          Object.assign(this.formDataPessoa, desaparecimento.pessoa);
          Object.assign(this.formDataEndereco, desaparecimento.endereco);
          this.formDataEndereco.cidade = desaparecimento.endereco.cidade.nome;
          this.formData.ultimo_visto_em = desaparecimento.ultimo_visto_em.split(' ')[0];

        }

      } catch (error) {
        this.errorSnackbar = true;
        this.errorMessage =
          'Erro ao buscar dados de Desaparecimento. Tente novamente e em caso de persistência de erros entre em contato com o suporte.';
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