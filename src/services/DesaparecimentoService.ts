import axiosInstance from '@/lib/http';
import IDesaparecimento from '@/models/entities/IDesaparecimento';
import IFormDesaparecimento from '@/models/forms/IFormDesaparecimento';
import IFiltrarDesaparecimento from '@/models/forms/IFiltrarDesaparecimento';
import PagedResponse from '@/models/entities/PagedResponse';
import qs from 'qs';

class DesaparecimentoService {

  async getById(id: number): Promise<IDesaparecimento> {
    const result = await axiosInstance.get(`/api/desaparecimentos/${id}`);
    return result.data;
  }

  async deleteById(id: number): Promise<void> {
    const result = await axiosInstance.delete(`/api/desaparecimentos/${id}`);
    return;
  }

  async save(data: IFormDesaparecimento): Promise<IDesaparecimento> {
    const result = await axiosInstance.post(`/api/desaparecimentos`, data);
    return result.data;
  }

  async update(data: IFormDesaparecimento, id: number): Promise<IDesaparecimento> {
    const result = await axiosInstance.put(`/api/desaparecimentos/${id}`, data);
    return result.data;
  }

  async getAll(): Promise<IDesaparecimento[]> {
    const result = await axiosInstance.get(`/api/desaparecimentos/all`);
    return result.data;
  }

  async filter(filtro: IFiltrarDesaparecimento): Promise<PagedResponse<IDesaparecimento[]>> {
    const filteredQuery = Object.fromEntries(
      Object.entries(filtro).filter(
        ([_, value]) => value !== null && value !== ''
      )
    );

    const queryString = qs.stringify(filteredQuery);

    const res = await axiosInstance.get(`/api/desaparecimentos?${queryString}`);
    return res.data;
  }
}

export default new DesaparecimentoService();