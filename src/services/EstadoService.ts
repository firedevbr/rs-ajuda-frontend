import axiosInstance from '@/lib/http';
import IEstado from '@/models/entities/IEstado';
import IFormEstado from '@/models/forms/IFormEstado';
import IFiltrarEstado from '@/models/forms/IFiltrarEstado';
import PagedResponse from '@/models/entities/PagedResponse';
import qs from 'qs';

class EstadoService {

  async getById(id: number): Promise<IEstado> {
    const result = await axiosInstance.get(`/api/estados/${id}`);
    return result.data;
  }

  async deleteById(id: number): Promise<void> {
    const result = await axiosInstance.delete(`/api/estados/${id}`);
    return;
  }

  async save(data: IFormEstado): Promise<IEstado> {
    const result = await axiosInstance.post(`/api/estados`, data);
    return result.data;
  }

  async update(data: IFormEstado, id: number): Promise<IEstado> {
    const result = await axiosInstance.put(`/api/estados/${id}`, data);
    return result.data;
  }

  async getAll(): Promise<IEstado[]> {
    const result = await axiosInstance.get(`/api/estados/all`);
    return result.data;
  }

  async filter(filtro: IFiltrarEstado): Promise<PagedResponse<IEstado[]>> {
    const filteredQuery = Object.fromEntries(
      Object.entries(filtro).filter(
        ([_, value]) => value !== null && value !== ''
      )
    );

    const queryString = qs.stringify(filteredQuery);

    const res = await axiosInstance.get(`/api/estados?${queryString}`);
    return res.data;
  }
}

export default new EstadoService();