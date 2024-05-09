import { useAuthStore } from '@/store/authStore';
import IUser from '@/models/entities/IUser';
import axiosInstance from '@/lib/http';
import router from '@/router';

class AuthService {
  async logout(): Promise<void> {
    const authStore = useAuthStore();
    authStore.clearToken();
    router.push('/login');
  }

  getLoggedAdminAreaUserData(): IUser | null {
    const authStore = useAuthStore();
    return authStore.user;
  }

  usuarioPossuiPermissao(permissoesRequeridas: string | string[]): boolean {
    return true;
  }

  async register(data): Promise<any> {
    data.cpf  = data?.cpf?.replace(/\D/g, '');
    const result = await axiosInstance.post('/api/register', data);
    this.setUserStore(result.data);
    return result.data;
  }


  async login(data): Promise<any> {
    const result = await axiosInstance.post('/api/login', data);
    this.setUserStore(result.data);
    return result.data;
  }

  setUserStore(data) {
    const authStore = useAuthStore();
    authStore.setUser(data.user);  
    authStore.setToken(data.access_token);
  }

}


export default new AuthService();
