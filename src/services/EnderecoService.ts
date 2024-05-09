import axiosInstance, { cepAxios } from '@/lib/http';
import IEndereco from '@/models/entities/IEndereco';
import IFormEndereco from '@/models/forms/IFormEndereco';
import IFiltrarEndereco from '@/models/forms/IFiltrarEndereco';
import PagedResponse from '@/models/entities/PagedResponse';
import qs from 'qs';

class EnderecoService {

  async getById(id: number): Promise<IEndereco> {
    const result = await axiosInstance.get(`/api/enderecos/${id}`);
    return result.data;
  }

  async deleteById(id: number): Promise<void> {
    const result = await axiosInstance.delete(`/api/enderecos/${id}`);
    return;
  }

  async save(data: IFormEndereco): Promise<IEndereco> {
    const result = await axiosInstance.post(`/api/enderecos`, data);
    return result.data;
  }

  async update(data: IFormEndereco, id: number): Promise<IEndereco> {
    const result = await axiosInstance.put(`/api/enderecos/${id}`, data);
    return result.data;
  }

  async getAll(): Promise<IEndereco[]> {
    const result = await axiosInstance.get(`/api/enderecos/all`);
    return result.data;
  }

  async getByCep(cep: string): Promise<any> {
    const result = await cepAxios.get(`/get-cep/${cep}`);
    return result.data;
  }

  async filter(filtro: IFiltrarEndereco): Promise<PagedResponse<IEndereco[]>> {
    const filteredQuery = Object.fromEntries(
      Object.entries(filtro).filter(
        ([_, value]) => value !== null && value !== ''
      )
    );

    const queryString = qs.stringify(filteredQuery);

    const res = await axiosInstance.get(`/api/enderecos?${queryString}`);
    return res.data;
  }
}

export default new EnderecoService();