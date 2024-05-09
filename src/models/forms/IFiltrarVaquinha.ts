interface IFiltrarVaquinha {
  pessoa: string;
  cidade: string;
  bairro: string;
  meus: boolean;
  descricao_objetivo: string;
  pix: string;
  dados_bancarios: string;
  endereco_itens_ajuda_id: number;
  status: string;
  responsavel_id: number;
  aberto_desde: string;
  page: number;
  perPage: number;
}

export default IFiltrarVaquinha;