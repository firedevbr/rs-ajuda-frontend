export function limparNaoNumericos(valor) {
  return valor.replace(/[^0-9]/g, '');
}

export function mascara_dinheiro(valor) {
  if (valor === 0) return 'R$ 0,00'
  if (!valor) return '';
  return parseFloat(valor).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function mascara_cep(valor) {
  const numericValue = valor.replace(/\D/g, '');

  const cepWithMask = numericValue.replace(/^(\d{5})(\d{3})$/, '$1-$2');

  return cepWithMask;
}

export function mascara_cnpj(valor) {
  // Remover todos os caracteres não numéricos
  valor = valor.replace(/\D/g, '');

  // Aplicar a máscara
  const formattedCNPJ = valor.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );

  return formattedCNPJ;
}

export function parseMoneyToFloat(valor) {
  if (typeof valor !== 'string') {
    return valor;
  }
  if (valor) {
    const numeroFormatado = valor.replace(/\./g, '').replace(',', '.');
    return parseFloat(numeroFormatado);
  }
  return 0.00;
}

export function formataDataBrasileira(dataString) {
  if (!dataString) {
    return null;
  }
  const partes = dataString.split('-');
  if (partes.length !== 3) return '';

  const dia = partes[2].padStart(2, '0');
  const mes = partes[1].padStart(2, '0');
  const ano = partes[0];

  return `${dia}/${mes}/${ano}`;
}

export function formataDateTimeParaDataBrasileira(dateStr): string {
  const dateObj = new Date(dateStr);

  const day = String(dateObj.getUTCDate()).padStart(2, '0');
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // +1 porque getUTCMonth() começa de 0 para janeiro.
  const year = dateObj.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function formataDateTimeParaDataEHoraBrasileira(dateStr) {
  const dateObj = new Date(dateStr);

  const day = String(dateObj.getUTCDate()).padStart(2, '0');
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // +1 porque getUTCMonth() começa de 0 para janeiro.
  const year = dateObj.getUTCFullYear();

  // Extração das horas e minutos, usando UTC para consistência.
  const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');

  // Combinação da data e hora no formato desejado: dd/mm/yyyy HH:MM
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function formatPhoneNumber(number) {
  if (!number || number.length !== 11) {
    return number;
  }
  return `(${number.substring(0, 2)}) ${number.substring(2, 7)}-${number.substring(7, 11)}`;
}

export function formatLandlinePhoneNumber(number) {
  // Extrai os dígitos desejados usando expressão regular
  const match = number.match(/^(\d{2})(\d{4})(\d{4})$/);

  // Se o número corresponder ao padrão esperado, formata-o
  if (match) {
    return `${match[1]} ${match[2]}-${match[3]}`;
  }

  // Se não corresponder, retorna o número original
  return number;
}
export function truncateText(text, length) {
  if (text.length <= length) {
    return text;
  } else {
    return text.substring(0, length) + '...';
  }
}

export const cnpjMask = { mask: '##.###.###/####-##' };
export const cpfMask = { mask: '###.###.###-##' };
export const cepMask = { mask: '#####-###' };
export const telefoneMask = { mask: '(##) #####-####' };
export const moneyMask = {
  mask: '9.99#,##',
  reversed: true,
  tokens: {
    9: { pattern: /[0-9]/, repeated: true }
  }
};