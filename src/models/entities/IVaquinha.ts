import BaseRecord from '@/models/BaseRecord';
import IPessoa from '@/models/entities/IPessoa';
import IEndereco from '@/models/entities/IEndereco';
import IUsuario from '@/models/entities/IUsuario';

interface IVaquinha extends BaseRecord {
  pessoa: IPessoa;
  pessoa_id: number;
  descricao_objetivo: string;
  pix: string;
  dados_bancarios: string;
  endereco_itens_ajuda: IEndereco;
  endereco_itens_ajuda_id: number;
  status: string;
  responsavel: IUsuario;
  responsavel_id?: number;
  aberto_desde?: string;
  link_oficial: string;
}

export default IVaquinha;