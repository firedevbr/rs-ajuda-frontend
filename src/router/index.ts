import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import { useAuthStore } from '@/store/authStore';
import AuthService from '@/services/AuthService';

const authRoutes = [
// rotas de autenticação
];

const appRoutes = [
  {
    path: '/',
    name: 'BaseAdmin',
    redirect: { path: '/home' },
    meta: {
      breadcrumb: [],
      public: true
    },
    component: () => import('../views/BaseView.vue'),
    children: [
      {
        path: '/sobre',
        name: 'Sobre',
        component: () => import('../views/Sobre.vue'),
        meta: {
          permissions: "*",
          breadcrumb: [
            { name: 'Home', path: '/home' },
            { name: 'Sobre' },
          ],
          public: true
        }
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/Login.vue'),
        meta: {
          public: true
        }
      },
      {
        path: '/home',
        name: 'Home',
        meta: {
          permissions: "*",
          breadcrumb: [{ name: 'Home' }],
          public: true
        },
        component: () => import('../views/Home.vue'),
      },
      {
         path: '/pessoas',
         name: 'Pessoa',
         meta: {
           permissions: "*",
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Pessoa' },
           ],
           public: true
         },
         component: () =>
           import('../views/pessoas/ListPessoa.vue'),
       },
       {
         path: '/pessoas/cadastrar',
         name: 'Cadastrar Pessoa',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Pessoa', path: '/pessoas' },
             { name: 'Cadastrar Pessoa' },
           ],
           public: false
         },
         component: () => import('../views/pessoas/FormPessoa.vue'),
       },
       {
         path: '/pessoas/editar/:id',
         name: 'Editar Pessoa',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Pessoa', path: '/pessoas' },
             { name: 'Editar Pessoa' },
           ],
           public: false
         },
         component: () => import('../views/pessoas/FormPessoa.vue'),
         props: true,
       },
{
         path: '/desaparecimentos',
         name: 'Desaparecimento',
         meta: {
           permissions: "*",
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Desaparecimento' },
           ],
           public: true
         },
         component: () =>
           import('../views/desaparecimentos/ListDesaparecimento.vue'),
       },
       {
         path: '/desaparecimentos/cadastrar',
         name: 'Cadastrar Desaparecimento',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Desaparecimento', path: '/desaparecimentos' },
             { name: 'Cadastrar Desaparecimento' },
           ],
           public: false
         },
         component: () => import('../views/desaparecimentos/FormDesaparecimento.vue'),
       },
       {
         path: '/desaparecimentos/:acao/:id',
         name: 'Visualizar Desaparecimento',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Desaparecimento', path: '/desaparecimentos' },
             { name: 'Visualizar Desaparecimento' },
           ],
           public: true
         },
         component: () => import('../views/desaparecimentos/FormDesaparecimento.vue'),
         props: true,
       },
{
         path: '/resgates',
         name: 'Resgate',
         meta: {
           permissions: "*",
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Resgate' },
           ],
           public: true
         },
         component: () =>
           import('../views/resgates/ListResgate.vue'),
       },
       {
         path: '/resgates/cadastrar',
         name: 'Cadastrar Resgate',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Resgate', path: '/resgates' },
             { name: 'Cadastrar Resgate' },
           ],
           public: false
         },
         component: () => import('../views/resgates/FormResgate.vue'),
       },
       {
         path: '/resgates/:acao/:id',
         name: 'Visualizar Resgate',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Resgate', path: '/resgates' },
             { name: 'Visualizar Resgate' },
           ],
           public: true
         },
         component: () => import('../views/resgates/FormResgate.vue'),
         props: true,
       },
{
         path: '/vaquinhas',
         name: 'Vaquinha',
         meta: {
           permissions: "*",
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Vaquinha' },
           ],
           public: true
         },
         component: () =>
           import('../views/vaquinhas/ListVaquinha.vue'),
       },
       {
         path: '/vaquinhas/cadastrar',
         name: 'Cadastrar Vaquinha',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Vaquinha', path: '/vaquinhas' },
             { name: 'Cadastrar Vaquinha' },
           ],
           public: false
         },
         component: () => import('../views/vaquinhas/FormVaquinha.vue'),
       },
       {
         path: '/vaquinhas/:acao/:id',
         name: 'Visualizar Vaquinha',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Vaquinha', path: '/vaquinhas' },
             { name: 'Visualizar Vaquinha' },
           ],
           public: true
         },
         component: () => import('../views/vaquinhas/FormVaquinha.vue'),
         props: true,
       },
{
         path: '/cidades',
         name: 'Cidade',
         meta: {
           permissions: "*",
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Cidade' },
           ],
           public: true
         },
         component: () =>
           import('../views/cidades/ListCidade.vue'),
       },
       {
         path: '/cidades/cadastrar',
         name: 'Cadastrar Cidade',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Cidade', path: '/cidades' },
             { name: 'Cadastrar Cidade' },
           ],
           public: false
         },
         component: () => import('../views/cidades/FormCidade.vue'),
       },
       {
         path: '/cidades/editar/:id',
         name: 'Editar Cidade',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Cidade', path: '/cidades' },
             { name: 'Editar Cidade' },
           ],
           public: false
         },
         component: () => import('../views/cidades/FormCidade.vue'),
         props: true,
       },
{
         path: '/estados',
         name: 'Estado',
         meta: {
           permissions: "*",
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Estado' },
           ],
           public: false
         },
         component: () =>
           import('../views/estados/ListEstado.vue'),
       },
       {
         path: '/estados/cadastrar',
         name: 'Cadastrar Estado',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Estado', path: '/estados' },
             { name: 'Cadastrar Estado' },
           ],
           public: false
         },
         component: () => import('../views/estados/FormEstado.vue'),
       },
       {
         path: '/estados/editar/:id',
         name: 'Editar Estado',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Estado', path: '/estados' },
             { name: 'Editar Estado' },
           ],
           public: false
         },
         component: () => import('../views/estados/FormEstado.vue'),
         props: true,
       },
{
         path: '/enderecos',
         name: 'Endereco',
         meta: {
           permissions: "*",
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Endereco' },
           ],
           public: false
         },
         component: () =>
           import('../views/enderecos/ListEndereco.vue'),
       },
       {
         path: '/enderecos/cadastrar',
         name: 'Cadastrar Endereco',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Endereco', path: '/enderecos' },
             { name: 'Cadastrar Endereco' },
           ],
           public: false
         },
         component: () => import('../views/enderecos/FormEndereco.vue'),
       },
       {
         path: '/enderecos/editar/:id',
         name: 'Editar Endereco',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Endereco', path: '/enderecos' },
             { name: 'Editar Endereco' },
           ],
           public: false
         },
         component: () => import('../views/enderecos/FormEndereco.vue'),
         props: false,
       },
{
         path: '/usuarios',
         name: 'Usuario',
         meta: {
           permissions: "*",
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Usuario' },
           ],
           public: false
         },
         component: () =>
           import('../views/usuarios/ListUsuario.vue'),
       },
       {
         path: '/usuarios/cadastrar',
         name: 'Cadastrar Usuario',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Usuario', path: '/usuarios' },
             { name: 'Cadastrar Usuario' },
           ],
           public: false
         },
         component: () => import('../views/usuarios/FormUsuario.vue'),
       },
       {
         path: '/usuarios/editar/:id',
         name: 'Editar Usuario',
         meta: {
           permissions: ["administracao"],
           breadcrumb: [
             { name: 'Home', path: '/home' },
             { name: 'Usuario', path: '/usuarios' },
             { name: 'Editar Usuario' },
           ],
           public: true
         },
         component: () => import('../views/usuarios/FormUsuario.vue'),
         props: false,
       },

    ],
  },
];

const routes = [...authRoutes, ...appRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  console.log(authStore.token)

  const isAuthenticated = authStore.token != null;


  if (!to.meta.public && !isAuthenticated) {
    next({ name: 'Login' });
    return;
  }

  if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Home' });
    return;
  }

  next();
});

export default router;