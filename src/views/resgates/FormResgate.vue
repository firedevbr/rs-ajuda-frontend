<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column align-start"
      >
        <h1 class="label-welcome text-primary">
          <span v-if="this.id !== null">{{ 'Editar Resgate' }}</span>
          <span v-else>{{ 'Adicionar Resgate' }}</span>
        </h1>
      </v-col>
    </v-row>
    <v-container class="form-border pa-0 mt-10">
      <v-row
        class="pl-10 pr-10 pt-10"
      >
        <v-col cols="12">
          <h2 class="label-welcome text-primary">
            <span v-if="this.mode === 'visualizar'">{{ 'Confira as informações abaixo' }}</span>
            <span v-else>{{ 'Cadastre as informações abaixo:' }}</span>
          </h2>
        </v-col>
        <v-col cols="12" v-if="this.mode !== 'adicionar'">
          <v-label class="rs-help-input-label" for="status">
            Status <span class="text-red">*</span>
          </v-label>
          <v-select
            id="status"
            v-model="formData.status"
            :items="statuses"
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
            :readonly="mode === 'visualizar'"
            :error-messages="getErrorMessageFor('status')"
          />
        </v-col>
        <v-divider/>
        <v-col cols="12">
          <h4>Dados da pessoa beneficiada:</h4>
        </v-col>
        <v-col cols="12" md="6">
          <v-label class="rs-help-input-label" for="nome">
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
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"
            :error-messages="getErrorMessageFor('nome')"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-label class="rs-help-input-label" for="cpf">
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
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :error-messages="getErrorMessageFor('cpf')"
          />
        </v-col>
        <v-divider/>
        <v-col cols="12">
          <h4>Dados do local para recebimento de doações:</h4>
        </v-col>
        <v-col cols="12" md="3">
          <v-label class="rs-help-input-label" for="cep">
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
            @blur="fetchCep"
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"
            :error-messages="getErrorMessageFor('cep')"
          />
        </v-col>
      </v-row>
      <v-row
        class="pl-10 pr-10"
      >
        <v-col cols="12" md="6">
          <v-label class="rs-help-input-label" for="logradouro">
            Logradouro
          </v-label>
          <v-text-field
            id="logradouro"
            v-model="formDataEndereco.logradouro"
            bg-color="white"
            rounded
            variant="outlined"
            placeholder="Insira Logradouro"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :error-messages="getErrorMessageFor('logradouro')"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-label class="rs-help-input-label" for="numero">
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
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"
            :error-messages="getErrorMessageFor('numero')"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-label class="rs-help-input-label" for="bairro">
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
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"

            :error-messages="getErrorMessageFor('bairro')"
          />
        </v-col>
      </v-row>
      <v-row
        class="pl-10 pr-10"
      >
        <v-col cols="12" md="4">
          <v-label class="rs-help-input-label" for="cidade">
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
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"

            :error-messages="getErrorMessageFor('cidade')"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-label class="rs-help-input-label" for="regiao">
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
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"

            :error-messages="getErrorMessageFor('regiao')"
          />
        </v-col>

        <v-col cols="12">
          <v-label class="rs-help-input-label" for="ponto_de_referencia">
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
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"

            :error-messages="getErrorMessageFor('ponto_de_referencia')"
          />
        </v-col>
        <v-divider/>
        <v-col cols="12">
          <h4>Informações para o resgate:</h4>
        </v-col>
        <v-col cols="12" md="3">
          <v-label class="rs-help-input-label" for="tipo">
            Tipo de resgate <span class="text-red">*</span>
          </v-label>
          <v-select
            id="tipo"
            v-model="formData.tipo"
            :items="tipos"
            item-value="id"
            item-title="nome"
            bg-color="white"
            rounded
            variant="outlined"
            placeholder="Barco ou Helicóptero"
            required
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"
            :error-messages="getErrorMessageFor('status')"
          />
        </v-col>
        <v-col class="pr-lg-16" cols="12" md="3">
          <v-label class="rs-help-input-label" for="ultimo_visto_em">
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
            :disabled="this.id !== null"
            :max="getTodayDate"
          />
        </v-col>
        <v-col cols="12" >
          <v-label
            class="text-wrap rs-help-input-label"
            for="descricao_objetivo"
          >
            Observação: <span class="text-red">*</span>
          </v-label>
          <v-textarea
            id="observacoes"
            v-model="formData.observacoes"
            bg-color="white"
            variant="outlined"
            placeholder="Forneça informações úteis para ajudar na identificação do resgate"
            required
            class="w-100 rounded-text-area"
            color="primary"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"

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
          v-if="mode !== 'visualizar'"
          align="end"
        >
          <!-- Botão salvar projeto -->
          <Button
            variant="flat"
            style="min-width: min-content;"
            prepend-icon="fas fa-circle-check pl-5 pr-2"
            @click="saveResgate"
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
import ResgateService from '@/services/ResgateService';
import IFormResgate from '@/models/forms/IFormResgate';
import PessoaService from '@/services/PessoaService';
import IPessoa from '@/models/entities/IPessoa';
import EnderecoService from '@/services/EnderecoService';
import IEndereco from '@/models/entities/IEndereco';
import UsuarioService from '@/services/UsuarioService';
import IUsuario from '@/models/entities/IUsuario';
import IFormPessoa from '@/models/forms/IFormPessoa';
import IFormEndereco from '@/models/forms/IFormEndereco';
import {cepMask, cpfMask} from '@/mixins/masks';
import TypeStatusResgate from '@/models/forms/TypeStatusResgate';

export default {
  components: { Button },
  data(): {
    isLoading: boolean;
    snackbar: boolean;
    errorSnackbar: boolean;
    id?: number;
    mode?: string;
    cepMask: any;
    cpfMask: any;
    formErrors: object;
    pessoas: IPessoa[];
    enderecos: IEndereco[];
    usuarios: IUsuario[];
    status: TypeStatusResgate[];
    errorMessage: string,
    successMessage: string,
    formDataPessoa: IFormPessoa,
    formDataEndereco: IFormEndereco,
    formData: IFormResgate
  } {
    return {
      isLoading: false,
      snackbar: false,
      errorSnackbar: false,
      id: null,
      mode: "adicionar",
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
        ultimo_visto_em: null,
        observacoes: null,
        tipo: null,
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
    },
    statuses() {
      return [
        {
          id: "Aguardando Ajuda",
          nome: 'Aguardando Ajuda',
        },
        {
          id: "Ajuda Enviada",
          nome: "Ajuda Enviada",
        },
        {
          id: "Finalizado",
          nome: "Finalizado",
        }
      ]
    },
    tipos() {
      return [
        {
          id: "Barco",
          nome: 'Barco',
        },
        {
          id: "Helicóptero",
          nome: "Helicóptero",
        }
      ]
    }
  },
  async mounted() {
    try {
      this.isLoading = true;
      await this.checkIfEditing();
      this.status = [{ id: "Aguardando Ajuda", nome: "Aguardando Ajuda"}, { id: "Aguardando Enviada", nome: "Aguardando Enviada"}, { id: "Finalizado", nome: "Finalizado"}]

    } catch (error) {
      this.errorSnackbar = true;
      this.errorMessage =
        'Erro ao buscar dados de Resgate. Tente novamente e em caso de persistência de erros entre em contato com o suporte.';
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    goBack() {
      this.$router.push('/resgates');
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
    async saveResgate() {
      this.isLoading = true;
      this.formErrors = {};

      try {

        let response;
        if (this.id) {
          response = await ResgateService.update({
            pessoa_id: this.formData.pessoa_id,
            endereco_id: this.formData.endereco_id,
            status: this.formData.status,
            tipo: this.formData.tipo,
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
          response = await ResgateService.save(this.formData);
          this.id = response.id;
        }

        this.successMessage = "Resgate salvo com sucesso!";
        this.snackbar = true;

        this.$router.push('/resgates');

        Object.assign(this.formData, response);

        this.isLoading = false;
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.formErrors = error.response.data.errors;
          this.errorSnackbar = true;
          this.errorMessage = "Houve um erro ao cadastrar Resgate, valide os dados e tente novamente";

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
        if (this.$route?.params?.id) {
          this.id = this.$route?.params?.id;
          this.mode = this.$route?.params?.acao;
          if (this.mode !== "visualizar" && this.mode !== "editar") {
            this.$router.push('/resgates');
            return;
          }
          const resgate = await ResgateService.getById(this.id);
          Object.assign(this.formData, resgate);
          Object.assign(this.formDataPessoa, resgate.pessoa);
          Object.assign(this.formDataEndereco, resgate.endereco);
          this.formDataEndereco.cidade = resgate.endereco.cidade.nome;
          this.formData.ultimo_visto_em = resgate.ultimo_visto_em.split(' ')[0];
        }

      } catch (error) {
        this.errorSnackbar = true;
        this.errorMessage =
          'Erro ao buscar dados de Resgate. Tente novamente e em caso de persistência de erros entre em contato com o suporte.';
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