import axiosInstance from '@/lib/http';
import IVaquinha from '@/models/entities/IVaquinha';
import IFormVaquinha from '@/models/forms/IFormVaquinha';
import IFiltrarVaquinha from '@/models/forms/IFiltrarVaquinha';
import PagedResponse from '@/models/entities/PagedResponse';
import qs from 'qs';

class VaquinhaService {

  async getById(id: number): Promise<IVaquinha> {
    const result = await axiosInstance.get(`/api/vaquinhas/${id}`);
    return result.data;
  }

  async deleteById(id: number): Promise<void> {
    const result = await axiosInstance.delete(`/api/vaquinhas/${id}`);
    return;
  }

  async save(data: IFormVaquinha): Promise<IVaquinha> {
    const result = await axiosInstance.post(`/api/vaquinhas`, data);
    return result.data;
  }

  async update(data: IFormVaquinha, id: number): Promise<IVaquinha> {
    const result = await axiosInstance.put(`/api/vaquinhas/${id}`, data);
    return result.data;
  }

  async getAll(): Promise<IVaquinha[]> {
    const result = await axiosInstance.get(`/api/vaquinhas/all`);
    return result.data;
  }

  async filter(filtro: IFiltrarVaquinha): Promise<PagedResponse<IVaquinha[]>> {
    const filteredQuery = Object.fromEntries(
      Object.entries(filtro).filter(
        ([_, value]) => value !== null && value !== ''
      )
    );

    const queryString = qs.stringify(filteredQuery);

    const res = await axiosInstance.get(`/api/vaquinhas?${queryString}`);
    return res.data;
  }
}

export default new VaquinhaService();