interface IFormEndereco {
  logradouro: string;
  bairro: string;
  regiao: string;
  numero: string;
  cep: string;
  cidade_id?: number;
  ponto_de_referencia?: string;
  latitude?: string;
  longitude?: number;
  cidade?: string;
  estado?: string;
}

export default IFormEndereco;