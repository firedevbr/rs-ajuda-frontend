import axiosInstance from '@/lib/http';
import IUsuario from '@/models/entities/IUsuario';
import IFormUsuario from '@/models/forms/IFormUsuario';
import IFiltrarUsuario from '@/models/forms/IFiltrarUsuario';
import PagedResponse from '@/models/entities/PagedResponse';
import qs from 'qs';

class UsuarioService {

  async getById(id: number): Promise<IUsuario> {
    const result = await axiosInstance.get(`/api/usuarios/${id}`);
    return result.data;
  }

  async deleteById(id: number): Promise<void> {
    const result = await axiosInstance.delete(`/api/usuarios/${id}`);
    return;
  }

  async save(data: IFormUsuario): Promise<IUsuario> {
    const result = await axiosInstance.post(`/api/usuarios`, data);
    return result.data;
  }

  async update(data: IFormUsuario, id: number): Promise<IUsuario> {
    const result = await axiosInstance.put(`/api/usuarios/${id}`, data);
    return result.data;
  }

  async getAll(): Promise<IUsuario[]> {
    const result = await axiosInstance.get(`/api/usuarios/all`);
    return result.data;
  }

  async filter(filtro: IFiltrarUsuario): Promise<PagedResponse<IUsuario[]>> {
    const filteredQuery = Object.fromEntries(
      Object.entries(filtro).filter(
        ([_, value]) => value !== null && value !== ''
      )
    );

    const queryString = qs.stringify(filteredQuery);

    const res = await axiosInstance.get(`/api/usuarios?${queryString}`);
    return res.data;
  }
}

export default new UsuarioService();