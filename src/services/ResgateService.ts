import axiosInstance from '@/lib/http';
import IResgate from '@/models/entities/IResgate';
import IFormResgate from '@/models/forms/IFormResgate';
import IFiltrarResgate from '@/models/forms/IFiltrarResgate';
import PagedResponse from '@/models/entities/PagedResponse';
import qs from 'qs';

class ResgateService {

  async getById(id: number): Promise<IResgate> {
    const result = await axiosInstance.get(`/api/resgates/${id}`);
    return result.data;
  }

  async deleteById(id: number): Promise<void> {
    const result = await axiosInstance.delete(`/api/resgates/${id}`);
    return;
  }

  async save(data: IFormResgate): Promise<IResgate> {
    const result = await axiosInstance.post(`/api/resgates`, data);
    return result.data;
  }

  async update(data: IFormResgate, id: number): Promise<IResgate> {
    const result = await axiosInstance.put(`/api/resgates/${id}`, data);
    return result.data;
  }

  async getAll(): Promise<IResgate[]> {
    const result = await axiosInstance.get(`/api/resgates/all`);
    return result.data;
  }

  async filter(filtro: IFiltrarResgate): Promise<PagedResponse<IResgate[]>> {
    const filteredQuery = Object.fromEntries(
      Object.entries(filtro).filter(
        ([_, value]) => value !== null && value !== ''
      )
    );

    const queryString = qs.stringify(filteredQuery);

    const res = await axiosInstance.get(`/api/resgates?${queryString}`);
    return res.data;
  }
}

export default new ResgateService();