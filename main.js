document.addEventListener("DOMContentLoaded", function() {
    const buscarCepButton = document.getElementById("buscarCep");
    const cepInput = document.getElementById("cep");

    buscarCepButton.addEventListener("click", function() {
        const cep = cepInput.value.replace(/\D/g, ''); 
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (data.erro) {
                        alert("CEP não encontrado.");
                        return;
                    }

                    document.getElementById("endereco").innerText = data.logradouro;
                    document.getElementById("bairro").innerText = data.bairro;
                    document.getElementById("cidade").innerText = data.localidade;

                    // Preencher os campos de endereço, bairro e cidade no formulário
                    document.getElementById("endereco-input").value = data.logradouro;
                    document.getElementById("bairro-input").value = data.bairro;
                    document.getElementById("cidade-input").value = data.localidade;

                    document.getElementById("cep-info").style.display = "block";
                })
                .catch(error => console.error('Erro:', error));
        } else {
            alert("CEP inválido. Deve conter 8 dígitos.");
        }
    });
});
