import axiosInstance from '@/lib/http';
import IPessoa from '@/models/entities/IPessoa';
import IFormPessoa from '@/models/forms/IFormPessoa';
import IFiltrarPessoa from '@/models/forms/IFiltrarPessoa';
import PagedResponse from '@/models/entities/PagedResponse';
import qs from 'qs';

class PessoaService {

  async getById(id: number): Promise<IPessoa> {
    const result = await axiosInstance.get(`/api/pessoas/${id}`);
    return result.data;
  }

  async deleteById(id: number): Promise<void> {
    const result = await axiosInstance.delete(`/api/pessoas/${id}`);
    return;
  }

  async save(data: IFormPessoa): Promise<IPessoa> {
    const result = await axiosInstance.post(`/api/pessoas`, data);
    return result.data;
  }

  async update(data: IFormPessoa, id: number): Promise<IPessoa> {
    const result = await axiosInstance.put(`/api/pessoas/${id}`, data);
    return result.data;
  }

  async getAll(): Promise<IPessoa[]> {
    const result = await axiosInstance.get(`/api/pessoas/all`);
    return result.data;
  }

  async filter(filtro: IFiltrarPessoa): Promise<PagedResponse<IPessoa[]>> {
    const filteredQuery = Object.fromEntries(
      Object.entries(filtro).filter(
        ([_, value]) => value !== null && value !== ''
      )
    );

    const queryString = qs.stringify(filteredQuery);

    const res = await axiosInstance.get(`/api/pessoas?${queryString}`);
    return res.data;
  }
}

export default new PessoaService();