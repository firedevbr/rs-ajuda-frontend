import axiosInstance from '@/lib/http';
import ICidade from '@/models/entities/ICidade';
import IFormCidade from '@/models/forms/IFormCidade';
import IFiltrarCidade from '@/models/forms/IFiltrarCidade';
import PagedResponse from '@/models/entities/PagedResponse';
import qs from 'qs';

class CidadeService {

  async getById(id: number): Promise<ICidade> {
    const result = await axiosInstance.get(`/api/cidades/${id}`);
    return result.data;
  }

  async deleteById(id: number): Promise<void> {
    const result = await axiosInstance.delete(`/api/cidades/${id}`);
    return;
  }

  async save(data: IFormCidade): Promise<ICidade> {
    const result = await axiosInstance.post(`/api/cidades`, data);
    return result.data;
  }

  async update(data: IFormCidade, id: number): Promise<ICidade> {
    const result = await axiosInstance.put(`/api/cidades/${id}`, data);
    return result.data;
  }

  async getAll(): Promise<ICidade[]> {
    const result = await axiosInstance.get(`/api/cidades/all`);
    return result.data;
  }

  async filter(filtro: IFiltrarCidade): Promise<PagedResponse<ICidade[]>> {
    const filteredQuery = Object.fromEntries(
      Object.entries(filtro).filter(
        ([_, value]) => value !== null && value !== ''
      )
    );

    const queryString = qs.stringify(filteredQuery);

    const res = await axiosInstance.get(`/api/cidades?${queryString}`);
    return res.data;
  }
}

export default new CidadeService();