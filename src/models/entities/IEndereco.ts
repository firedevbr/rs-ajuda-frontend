import BaseRecord from '@/models/BaseRecord';
import ICidade from '@/models/entities/ICidade';

interface IEndereco extends BaseRecord {
  logradouro: string;
  bairro: string;
  regiao: string;
  numero: string;
  cep: string;
  cidade: ICidade;
  cidade_id: number;
  ponto_de_referencia: string;
  latitude: string;
  longitude: number;
}

export default IEndereco;