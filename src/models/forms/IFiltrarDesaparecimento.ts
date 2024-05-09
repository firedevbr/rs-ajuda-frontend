import TypeStatusDesaperecimento from "./TypeStatusDesaparecimento";

interface IFiltrarDesaparecimento {
  pessoa: string;
  cidade: string;
  bairro: string;
  meus: boolean;
  status: TypeStatusDesaperecimento;
  ultimo_visto_em: Date;
   page: number;
   perPage: number;
}

export default IFiltrarDesaparecimento;