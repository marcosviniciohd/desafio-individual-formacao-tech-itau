/**  Função para validação do CPF **/

function validarCpf(cpf) {

  // Primeiramente eliminamos entradas com menos de 11 dígitos ou com os 11 dígitos repetidos
  if ((cpf = cpf.replace(/[^\d]/g, "")).length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999") {
      return false; // Caso atenda alguma dessas condições, o CPF é inválido
  }

   // Criadas as variáveis para soma e resto
   let resto;
   let soma = 0;

   // Realizamos a checagem do primeiro dígito verificador utilizando os 9 primeiros dígitos do CPF
   for (i = 1; i <= 9; i++) {

       // Multiplicamos cada um dos 9 dígitos por uma sequência decrescente de 10 a 2 e somamos todos os resultados
       soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
   }

   // Multiplicamos o resultado da soma por 10 e extraimos o resto da divisão por 11
   resto = (soma * 10) % 11;

   // Se o resto da divisão for igual a 10 ou 11, resto recebe 0
   if ((resto == 10) || (resto == 11)) {
       resto = 0; // neste caso, o primeiro dígito verificador deve ser igual ao resto para ser válido e continuar a validação
   }
   // Se o resto for um número entre 1 e 9, este deve ser igual ao primeiro dígito verificador para ser válido
   // Caso não seja
   if (resto != parseInt(cpf.substring(9, 10))) {
       return false; // A validação é interrompida e os próximos passos não são executados
   }

   // Se o primeiro dígito verificador for validado
   soma = 0;

   // Realizamos a checagem do segundo dígito verificador utilizando os 10 primeiros dígitos do CPF
   for (i = 1; i <= 10; i++) {

       // Multiplicamos cada um dos 10 dígitos por uma sequência decrescente de 11 a 2 e somamos todos os resultados
       soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
   }

   // Multiplicamos o resultado da soma por 10 e extraimos o resto da divisão por 11
   resto = (soma * 10) % 11;

   // Se o resto da divisão for igual a 10 ou 11, resto recebe 0
   if ((resto == 10) || (resto == 11)) {
       resto = 0; // Neste caso, o segundo dígito verificador deve ser igual ao resto para o cPF ser válido
   }
   // Se o resto for um número entre 1 e 9, este deve ser igual ao segundo dígito verificador para que o CPF seja validado
   // Caso não seja
   if (resto != parseInt(cpf.substring(10, 11))) {
       return false; // CPF inválido
   } else {
       return true; // CPF Válido
   }
}

/** Função emite um alerta caso o CPF seja inválido **/

function verificarCpf(cpf) {

   // Se o input do CPF não estiver vazio
   if (cpf.value != "") {

       // Se a validação anterior não for bem sucedida
       if (!validarCpf(cpf.value)) {
           alert("CPF inválido, digite o número do seu CPF corretamente!");
           cpf.value = ""; // Limpa o input do CPF
       }
   }
}

// Função para validar o CEP
// Função começa limpando os campos a serem preenchidos
function limpa_formulário_cep() {

  // Um valor em branco é inserido em cada input
  document.getElementById("logradouro").value = ("");
  document.getElementById("bairro").value = ("");
  document.getElementById("cidade").value = ("");
  document.getElementById("estado").value = ("");
}


// Função para receber os dados de endereço
function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {

      // Atualiza os campos com os valores disponíveis
      document.getElementById("logradouro").value = (conteudo.logradouro);
      document.getElementById("bairro").value = (conteudo.bairro);
      document.getElementById("cidade").value = (conteudo.localidade);
      document.getElementById("estado").value = (conteudo.uf);
  } else {

      // Se o CEP não for encontrado
      limpa_formulário_cep();
      alert("CEP não encontrado ou inválido!\nTente novamente!");
      cep.value = ""; // Limpa o input do CEP
  }
}

// Função para pesquisar o CEP
function pesquisacep(valor) {

  // Nova variável cep recebe somente dígitos
  let cep = valor.replace(/\D/g, '');

  // Verifica se o input do CEP não está vazio
  if (cep != "") {

      // Nova variável validacep recebe o CEP dígitado com 8 números
      let validacep = /^[0-9]{8}$/;

      // Executa a validação do CEP
      if (validacep.test(cep)) {

          // Preenche os campos com reticências enquanto a consulta no webservice é realizada
          document.getElementById("logradouro").value = "...";
          document.getElementById("bairro").value = "...";
          document.getElementById("cidade").value = "...";
          document.getElementById("estado").value = "...";

          // Cria um elemento JavaScript
          let script = document.createElement('script');

          // Faz uma sincronização com o callback
          script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

          // Insere o novo script no documento e carrega o conteúdo
          document.body.appendChild(script);
      }

      // Se o CEP é inválido, limpa o formulário e emite um alerta
      else {
          limpa_formulário_cep();
          alert("O formato do CEP é inválido.\nVerifique o número e tente novamente.");
          cep.value = ""; // Limpa o input do CEP
      }
  }
  // Com CEP sem valor, o formulário é limpo
  else {
      limpa_formulário_cep();
  }
};


/** Máscaras */


// Máscaras para os campos de CPF, celular, telefone, CEP e número do endereço
function mascaraInputsNumericos(input, mascaraInput) {
  thisInput = input;
  thisMascara = mascaraInput;
  setTimeout("aplicarMascara()", 1);
}

function aplicarMascara() {
  thisInput.value = thisMascara(thisInput.value);
}

// Máscara para o CPF
function mascaraCpf(cpf) {
  cpf = cpf.replace(/\D/g, ""); // Permite somente a digitação de números
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona um separador de milhar após o 3º dígito
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona um separador de milhar após o 6º dígito
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona um hífen após o 9º dígito
  return cpf;
}

// Máscara para o celular
function mascaraCelular(celular) {
  celular = celular.replace(/\D/g, ""); // Permite somente a digitação de números
  celular = celular.replace(/^(\d)/, "($1"); // Adiciona o parêntese esquerdo após digitar o primeiro dígito do DDD
  celular = celular.replace(/(.{3})(\d)/, "$1) $2"); // Adiciona o parêntese direito após o segundo dígito do DDD quando o primeiro dígito do celular é informado
  celular = celular.replace(/(.{10})(\d)/, "$1-$2"); // Adiciona o hífen após o 10º caractér do input para separar os 4 últimos números do celular
  return celular;
}

// Máscara para o telefone
function mascaraTelefone(telefone) {
  telefone = telefone.replace(/\D/g, ""); // Permite somente a digitação de números
  telefone = telefone.replace(/^(\d)/, "($1"); // Adiciona o parêntese esquerdo após digitar o primeiro dígito do DDD
  telefone = telefone.replace(/(.{3})(\d)/, "$1) $2"); // Adiciona o parêntese direito após o segundo dígito do DDD quando o primeiro dígito do celular é informado
  telefone = telefone.replace(/(.{9})(\d)/, "$1-$2"); // Adiciona o hífen após o 9º caractér do input para separar os 4 últimos números do celular
  return telefone;
}

// Máscara para o CEP
function mascaraCep(cep) {
  cep = cep.replace(/\D/g, ""); // Permite somente a digitação de números
  cep = cep.replace(/^(\d{5})(\d)/, "$1-$2"); // Adiciona o hífen após a digitação do 6º número do CEP
  return cep;
}

// Máscara para número do endereço
function mascaraNumero(numero) {
  numero = numero.replace(/\D/g, ""); // Permite somente a digitação de números
  numero = numero.replace(/^(\d{3})(\d{3})/, "$1.$2"); // Mantém o separador de milhar com 3 números à esquerda do ponto
  numero = numero.replace(/^(\d{2})(\d{3})/, "$1.$2"); // Mantém o separador de milhar com 2 números à esquerda do ponto
  numero = numero.replace(/^(\d{1})(\d{3})/, "$1.$2"); // Adiciona um separador de milhar quando o 4º número for digitado
  return numero;
}

function exibePopup(){
  alert("Cadastro realizado com SUCESSO!")
}


