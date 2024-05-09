import axiosInstance from '@/lib/http';
import IPaciente from '@/models/entities/IPaciente';
import IFormPaciente from '@/models/forms/IFormPaciente';
import IFiltrarPaciente from '@/models/forms/IFiltrarPaciente';
import PagedResponse from '@/models/entities/PagedResponse';
import qs from 'qs';

class PacienteService {

  async getById(id: number): Promise<IPaciente> {
    const result = await axiosInstance.get(`/api/pacientes/${id}`);
    return result.data;
  }

  async deleteById(id: number): Promise<void> {
    const result = await axiosInstance.delete(`/api/pacientes/${id}`);
    return;
  }

  async save(data: IFormPaciente): Promise<IPaciente> {
    const result = await axiosInstance.post(`/api/pacientes`, data);
    return result.data;
  }

  async update(data: IFormPaciente, id: number): Promise<IPaciente> {
    const result = await axiosInstance.put(`/api/pacientes/${id}`, data);
    return result.data;
  }

  async getAll(): Promise<IPaciente[]> {
    const result = await axiosInstance.get(`/api/pacientes/all`);
    return result.data;
  }

  async filter(filtro: IFiltrarPaciente): Promise<PagedResponse<IPaciente[]>> {
    const filteredQuery = Object.fromEntries(
      Object.entries(filtro).filter(
        ([_, value]) => value !== null && value !== ''
      )
    );

    const queryString = qs.stringify(filteredQuery);

    const res = await axiosInstance.get(`/api/pacientes?${queryString}`);
    return res.data;
  }
}

export default new PacienteService();