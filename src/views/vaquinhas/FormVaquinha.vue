<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column align-start"
      >
        <h1 class="label-welcome text-primary">
          <span v-if="this.mode === 'editar'">{{ 'Editar Vaquinha' }}</span>
          <span v-else-if="this.mode === 'visualizar'">{{ 'Visualizar Vaquinha' }}</span>
          <span v-else>{{ 'Adicionar Vaquinha' }}</span>
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
          <h4>Dados para recebimento da vaquinha:</h4>
        </v-col>
        <v-col cols="12" >
          <v-label
            class="text-wrap rs-help-input-label"
            for="descricao_objetivo"
          >
            Descrição: <span class="text-red">*</span>
          </v-label>
          <v-textarea
            id="descricao_objetivo"
            v-model="formData.descricao_objetivo"
            bg-color="white"
            variant="outlined"
            placeholder="Faça uma breve descrição da sua vaquinha"
            required
            class="w-100 rounded-text-area"
            color="primary"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"

          />
        </v-col>
      </v-row>
      <v-row class="pl-10 pt-0 pr-10">
        <v-col cols="12" md="6">
          <v-label
            class="rs-help-input-label"
            for="link_oficial"
          >
            Link oficial da vaquinha
          </v-label>
          <v-text-field
            id="link_oficial"
            v-model="formData.link_oficial"
            bg-color="white"
            rounded
            variant="outlined"
            placeholder="Se você tiver uma vaquinha por algum link oficial, deixe-o aqui"
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :error-messages="getErrorMessageFor('pix')"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"

          />
        </v-col>
        <v-col cols="12" md="6">
          <v-label
            class="rs-help-input-label"
            for="pix"
          >
            Pix
          </v-label>
          <v-text-field
            id="pix"
            v-model="formData.pix"
            bg-color="white"
            rounded
            variant="outlined"
            placeholder="Insira o Pix para recebimento da sua vaquinha"
            class="w-100"
            type="text"
            color="primary"
            maxlength="255"
            :error-messages="getErrorMessageFor('pix')"
            :readonly="mode === 'visualizar'"
            :disabled="mode === 'editar'"

          />
        </v-col>
        <v-col cols="12" md="6">
          <v-label
            class="rs-help-input-label"
            for="dados_bancarios"
          >
            Dados Bancários
          </v-label>
          <v-textarea
            id="dados_bancarios"
            v-model="formData.dados_bancarios"
            bg-color="white"
            variant="outlined"
            placeholder="Caso você não possua pix, informe os dados bancários para recebimento"
            required
            class="w-100 rounded-text-area"
            color="primary"
            :error-messages="getErrorMessageFor('dados_bancarios')"
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
          v-if="mode !== 'visualizar'"
          cols="12"
          :lg="'6'"
          align="end"
        >
          <!-- Botão salvar projeto -->
          <Button
            variant="flat"
            style="min-width: min-content;"
            prepend-icon="fas fa-circle-check pl-5 pr-2"
            @click="saveVaquinha"
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
import VaquinhaService from '@/services/VaquinhaService';
import IFormVaquinha from '@/models/forms/IFormVaquinha';
import PessoaService from '@/services/PessoaService';
import IPessoa from '@/models/entities/IPessoa';
import EnderecoService from '@/services/EnderecoService';
import IEndereco from '@/models/entities/IEndereco';
import UsuarioService from '@/services/UsuarioService';
import IUsuario from '@/models/entities/IUsuario';
import IFormPessoa from '@/models/forms/IFormPessoa';
import IFormEndereco from '@/models/forms/IFormEndereco';
import {cepMask, cpfMask} from '@/mixins/masks';
import DesaparecimentoService from '@/services/DesaparecimentoService';

export default {
  components: { Button },
  data(): {
    isLoading: boolean;
    snackbar: boolean;
    errorSnackbar: boolean;
    id?: number;
    mode?: string;
    formErrors: object;
    enderecos: IEndereco[];
    errorMessage: string,
    successMessage: string,
    cepMask: any;
    cpfMask: any;
    formDataPessoa: IFormPessoa,
    formDataEndereco: IFormEndereco,
    formData: IFormVaquinha
  } {
    return {
      isLoading: false,
      snackbar: false,
      errorSnackbar: false,
      id: null,
      mode: 'adicionar',
      formErrors: {},
      enderecos: [],
      errorMessage: '',
      successMessage: '',
      cepMask,
      cpfMask,
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
        descricao_objetivo: null,
        pix: null,
        dados_bancarios: null,
        endereco_itens_ajuda_id: null,
        status: null,
        responsavel_id: null,
        link_oficial: null,
        aberto_desde: null,
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
    statuses() {
      return [
        {
          id: 'Em andamento',
          nome: 'Em andamento',
        },
        {
          id: 'Finalizada',
          nome: 'Finalizada'
        }
      ]
    }
  },
  async mounted() {
    try {
      this.isLoading = true;
      await this.checkIfEditing();
    } catch (error) {
      this.errorSnackbar = true;
      this.errorMessage =
        'Erro ao buscar dados de Vaquinha. Tente novamente e em caso de persistência de erros entre em contato com o suporte.';
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    goBack() {
      this.$router.push('/vaquinhas');
    },
    async fetchCep() {
      const cleanCep = this.formDataEndereco.cep.replace(/\D/g, '');
      if (cleanCep.length === 8) {
        try {
          this.isLoading = true;
          const address = await EnderecoService.getByCep(cleanCep);
          this.formDataEndereco.logradouro = address.street;
          this.formDataEndereco.bairro = address.neighborhood;
          this.formDataEndereco.cidade = address.city;
          this.formDataEndereco.estado = address.state ?? 'RS';
          this.isLoading = false;
          console.log(address)
        } catch (e) {
          this.isLoading = false;
          console.error(e);
        }
      }
    },
    async saveVaquinha() {
      this.isLoading = true;
      this.formErrors = {};

      try {

        let response;
        if (this.id) {
          response = await VaquinhaService.update({
            pessoa_id: this.formData.pessoa_id,
            endereco_itens_ajuda_id: this.formData.endereco_itens_ajuda_id,
            descricao_objetivo: this.formData.descricao_objetivo,
            pix: this.formData.pix,
            dados_bancarios: this.formData.dados_bancarios,
            status: this.formData.status,
            link_oficial: this.formData.link_oficial,
            aberto_desde: this.formData.aberto_desde,
            responsavel_id: this.formData.responsavel_id,
          }, this.id);
        } else {
          const [pessoaResponse, enderecoResponse] = await Promise.all([
            PessoaService.save(this.formDataPessoa),
            EnderecoService.save(this.formDataEndereco)
          ]);

          this.formData.pessoa_id = pessoaResponse.id;
          this.formData.endereco_itens_ajuda_id = enderecoResponse.id;
          response = await VaquinhaService.save(this.formData);
          this.id = response.id;
        }

        this.successMessage = "Vaquinha salva com sucesso!";
        this.snackbar = true;

        this.$router.push('/vaquinhas');

        Object.assign(this.formData, response);

        this.isLoading = false;
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.formErrors = error.response.data.errors;
          this.errorSnackbar = true;
          this.errorMessage = "Houve um erro ao cadastrar sua vaquinha, valide os dados e tente novamente";

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
            this.$router.push('/vaquinhas');
            return;
          }
          const vaquinha = await VaquinhaService.getById(this.id);
          Object.assign(this.formData, vaquinha);
          Object.assign(this.formDataPessoa, vaquinha.pessoa);
          Object.assign(this.formDataEndereco, vaquinha.endereco_itens_ajuda);
          this.formDataEndereco.cidade = vaquinha.endereco_itens_ajuda.cidade.nome;
          Object.assign(this.formData, vaquinha);
        }

      } catch (error) {
        this.errorSnackbar = true;
        this.errorMessage =
          'Erro ao buscar dados de Vaquinha. Tente novamente e em caso de persistência de erros entre em contato com o suporte.';
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