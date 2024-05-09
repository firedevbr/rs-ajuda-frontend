<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-tabs v-model="activeTab" grow>
          <v-tab value="login">Login</v-tab>
          <v-tab value="register">Cadastro</v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <!-- Conteúdo do Login -->
          <v-window-item value="login">
            <v-card>
              <v-card-title>Login</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field v-model="loginForm.email" label="E-mail" required></v-text-field>
                  <v-text-field v-model="loginForm.password" label="Senha" type="password" required></v-text-field>
                  <v-btn type="submit" color="primary">Entrar</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-window-item>

          <!-- Conteúdo do Cadastro -->
          <v-window-item value="register">
            <v-card>
              <v-card-title>Cadastro</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="register">
                  <v-text-field v-model="registerForm.nome" label="Nome" required></v-text-field>
                  <v-text-field v-model="registerForm.email" label="E-mail" required></v-text-field>
                  <v-text-field v-model="registerForm.cpf" label="CPF"  v-maska:[cpfMask]></v-text-field>
                  <v-text-field v-model="registerForm.password" label="Senha" type="password"                
                  :rules="[
                      (v) => !!v || 'Campo obrigatório',
                      (v) => (v && v.length >= 8) || 'A senha deve ter no mínimo 8 caracteres',
                    ]"
                    required
                    >
                    </v-text-field>
                  <v-btn type="submit" color="primary">Cadastrar</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import AuthService from '@/services/AuthService';
import { useRouter } from 'vue-router'; 
import { ref } from 'vue';
import {cpfMask} from '@/mixins/masks';


const router = useRouter();

const activeTab = ref('login');
const loginForm = ref({
  email: '',
  password: '',
});
const registerForm = ref({
  nome: '',
  cpf: null,
  email: '',
  password: '',
});

function register() {
  AuthService.register(registerForm.value)
    .then(() => {
      alert('Usuário cadastrado com sucesso!');
      router.push('/');
    })
    .catch((error) => {
      alert('Erro ao cadastrar usuário. Verifique os campos e tente novamente.');
      console.error('Erro ao cadastrar usuário:', error);
    });
}

function login() {
  AuthService.login(loginForm.value)
    .then(() => {
      alert('Login efetuado com sucesso!');
      window.location.href = '/'
    })
    .catch((error) => {
      alert('Erro ao fazer login. Verifique os campos e tente novamente.');
      console.error('Erro ao fazer login:', error);
    });
}
</script>

<style scoped>
/* Personalize os estilos se necessário */
</style>
