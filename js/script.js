const saida = document.getElementById("saida");
const startBtn = document.getElementById("startBtn");

    const somar = (numeros) => numeros.reduce((a, b) => a + b, 0);

    const subtrair = function(numeros) {
    return numeros.reduce((a, b) => a - b);
    };
    
    function multiplicar(numeros = [1]) {
        return numeros.reduce((a, b) => a * b, 1);
    };
    function dividir(numeros) {
        return numeros.reduce((a, b) => a / b);
    };

    function mostrar(mensagem) {
        saida.innerHTML = `<pre>${mensagem}</pre>`;
    };

    function iniciarCalculadora() {
        let opcao;

        do {
            opcao = prompt("Escolha uma operação:\n1 - Somar\n2 - Subtrair\n3 - Multiplicar\n4 - Dividir\n5 - Sair");

            if (opcao === "5") {
                mostrar("👋 Obrigado por usar a calculadora");
                break;
            }

            if (!["1", "2", "3", "4"].includes(opcao)) {
                alert("❌ Opção inválida. Tente novamente.");
                continue;
            }

            let entrada = prompt("Digite os números da operação, separados por espaço:");
            let numeros = entrada.split(" ").map(Number);

            if (numeros.length < 2 || numeros.some(isNaN)) {
                alert("❌ Entrada inválida. Insira pelo menos dois números válidos.");
                continue;
            }

            let resultado;
            switch (opcao) {
                case "1":
                    resultado = somar(numeros);
                    alert(numeros.join(" + ") + " = " + resultado);
                    break;
                case "2":
                    resultado = subtrair(numeros);
                    alert(numeros.join(" - ") + " = " + resultado);
                    break;
                case "3":
                    resultado = multiplicar(numeros);
                    alert(numeros.join(" * ") + " = " + resultado);
                    break;
                case "4":
                    if (numeros.slice(1).includes(0)) {
                        alert("Indefinido");
                    } else {
                        resultado = dividir(numeros);
                        alert(numeros.join(" / ") + " = " + resultado);
                    }
                    break;
                }
            } while (opcao !== "5");
        }

    startBtn.addEventListener("click", iniciarCalculadora);