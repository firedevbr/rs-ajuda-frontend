import BaseRecord from '@/models/BaseRecord';


interface IPaciente extends BaseRecord {
  nome: string;
  email: string;
  data_nascimento: string;
}

export default IPaciente;