import axiosInstance from '@/lib/http';
import ISessoe from '@/models/entities/ISessoe';
import IFormSessoe from '@/models/forms/IFormSessoe';
import IFiltrarSessoe from '@/models/forms/IFiltrarSessoe';
import PagedResponse from '@/models/entities/PagedResponse';
import qs from 'qs';

class SessoeService {

  async getById(id: number): Promise<ISessoe> {
    const result = await axiosInstance.get(`/api/sessoes/${id}`);
    return result.data;
  }

  async deleteById(id: number): Promise<void> {
    const result = await axiosInstance.delete(`/api/sessoes/${id}`);
    return;
  }

  async save(data: IFormSessoe): Promise<ISessoe> {
    const result = await axiosInstance.post(`/api/sessoes`, data);
    return result.data;
  }

  async update(data: IFormSessoe, id: number): Promise<ISessoe> {
    const result = await axiosInstance.put(`/api/sessoes/${id}`, data);
    return result.data;
  }

  async getAll(): Promise<ISessoe[]> {
    const result = await axiosInstance.get(`/api/sessoes/all`);
    return result.data;
  }

  async filter(filtro: IFiltrarSessoe): Promise<PagedResponse<ISessoe[]>> {
    const filteredQuery = Object.fromEntries(
      Object.entries(filtro).filter(
        ([_, value]) => value !== null && value !== ''
      )
    );

    const queryString = qs.stringify(filteredQuery);

    const res = await axiosInstance.get(`/api/sessoes?${queryString}`);
    return res.data;
  }
}

export default new SessoeService();