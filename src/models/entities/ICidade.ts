import BaseRecord from '@/models/BaseRecord';
import IEstado from '@/models/entities/IEstado';

interface ICidade extends BaseRecord {
  nome: string;
  estado: IEstado;
  estado_id: number;
}

export default ICidade;