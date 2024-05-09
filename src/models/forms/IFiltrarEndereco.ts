interface IFiltrarEndereco {
  logradouro: string;
  bairro: string;
  regiao: string;
  numero: string;
  cep: string;
  cidade_id: number;
  ponto_de_referencia: string;
  latitude: string;
  longitude: number;
   page: number;
   perPage: number;
}

export default IFiltrarEndereco;