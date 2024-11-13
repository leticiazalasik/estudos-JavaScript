let valorConsumido = 0;
let numeroPessoas = 0;
let qualidadeServico = ' ';

function validarQualidadeServico(qualidadeServico) {
  let qualidadeServicoValida = false;

  if (qualidadeServico === 'excelente') {
    qualidadeServicoValida = true;
  } else if (qualidadeServico === 'bom') {
    qualidadeServicoValida = true;
  } else if (qualidadeServico === 'regular') {
    qualidadeServicoValida = true;
  } else {
    qualidadeServicoValida = false;
  }
}

function calcularConta(numeroPessoas, valorConsumido, qualidadeServico) {
    let gorjeta = 0;
  
    // Verificando se os parâmetros são válidos
    if (valorConsumido > 0 && numeroPessoas > 0) {
      switch (qualidadeServico) {
        case 'excelente':
          gorjeta = valorConsumido * 0.15;
          break;
        case 'bom':
          gorjeta = valorConsumido * 0.1;
          break;
        case 'regular':
          gorjeta = valorConsumido * 0.05;
          break;
        default:
          return 'Qualidade de serviço inválida.';
      }
    } else {
      return 'Valor consumido e/ou quantidade de pessoas inválido';
    }
  
    let valorTotal = valorConsumido + gorjeta; 
    // Calculando os valores da conta
    const conta = {
      consumo: valorConsumido.toFixed(2),
      gorjetaSugerida: gorjeta.toFixed(2),
      valorTotal: valorTotal.toFixed(2),
      valorPorPessoa: ((valorConsumido + gorjeta) / numeroPessoas).toFixed(2),
      numeroPessoas: numeroPessoas,
    };

    verificarValorPorPessoa(conta.valorPorPessoa);

    // **Mudança importante**: Atualiza o valorTotal com o valor retornado por verificarDescontoGrupo
    conta.valorTotal = verificarDescontoGrupo(conta.valorTotal, numeroPessoas); // Atualiza o valorTotal com desconto

    // **Mudança importante**: Recalcula valorPorPessoa com o valor total com desconto
    conta.valorPorPessoa = (parseFloat(conta.valorTotal) / numeroPessoas).toFixed(2); 
  
    // Chama a função verificarValorPorPessoa passando o valorPorPessoa da conta
    

    // Retorna a conta
    return conta;
  }
  
  function verificarDescontoGrupo(valorTotal,numeroPessoas) {
    if (parseFloat(numeroPessoas) >=5) {
        console.log("Desconto de 5% de grupo concedido.");

        // Garantir que valorTotal seja numérico
        let desconto = parseFloat(valorTotal) * 0.05;
        let valorComDesconto = parseFloat(valorTotal) - desconto;

        console.log(`Desconto aplicado: R$ ${desconto.toFixed(2)}`);
        console.log(`Novo valor total com desconto: R$ ${valorComDesconto.toFixed(2)}`);
        
        return valorComDesconto;  // Retorna o novo valor total com desconto
    }
    return valorTotal;  // Se não houver desconto, retorna o valor original
}
  
  // Função que verifica se o valor por pessoa excedeu 100
  function verificarValorPorPessoa(valorPorPessoa) {
    if (parseFloat(valorPorPessoa) > 100) {
      console.log("Valor por pessoa excedeu 100,00");
    }
  }
  
 
  // Teste da função
  console.log(calcularConta(6, 120.00, "excelente"));
  