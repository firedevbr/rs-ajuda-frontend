import BaseRecord from '@/models/BaseRecord';
import IPaciente from '@/models/entities/IPaciente';

interface ISessoe extends BaseRecord {
  paciente: IPaciente;
  paciente_id: number;
  data: string;
  nota_sessao: string;
}

export default ISessoe;