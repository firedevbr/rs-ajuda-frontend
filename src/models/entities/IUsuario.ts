import BaseRecord from '@/models/BaseRecord';


interface IUsuario extends BaseRecord {
  nome: string;
  email: string;
  password: string;
  cpf: string;
}

export default IUsuario;