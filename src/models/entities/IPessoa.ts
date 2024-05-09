import BaseRecord from '@/models/BaseRecord';


interface IPessoa extends BaseRecord {
  nome: string;
  cpf: string;
}

export default IPessoa;