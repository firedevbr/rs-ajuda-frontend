import BaseRecord from '@/models/BaseRecord';
import IPessoa from '@/models/entities/IPessoa';
import IEndereco from '@/models/entities/IEndereco';
import IUsuario from '@/models/entities/IUsuario';

interface IDesaparecimento extends BaseRecord {
  pessoa: IPessoa;
  pessoa_id: number;
  endereco: IEndereco;
  endereco_id: number;
  status: string;
  responsavel: IUsuario;
  responsavel_id: number;
  ultimo_visto_em: string;
}

export default IDesaparecimento;