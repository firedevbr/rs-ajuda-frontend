import TypeStatusDesaperecimento from "./TypeStatusDesaparecimento";

interface IFormDesaparecimento {
  pessoa_id: number;
  endereco_id: number;
  status?: TypeStatusDesaperecimento;
  observacoes: string;
  responsavel_id?: number;
  ultimo_visto_em: Date;
}

export default IFormDesaparecimento;