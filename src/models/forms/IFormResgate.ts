interface IFormResgate {
  pessoa_id: number;
  endereco_id: number;
  status?: string;
  observacoes?: string;
  tipo: string;
  responsavel_id?: number;
  ultimo_visto_em: Date;
}

export default IFormResgate;