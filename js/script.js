const visor = document.getElementById("visor");
let expressao = "";

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const valor = btn.dataset.valor;

    if (valor === "C") {
      expressao = "";
      visor.textContent = "0";
      return;
    }

    if (valor === "=") {
      try {
        expressao = eval(expressao).toString();
        visor.textContent = expressao;
      } catch {
        visor.textContent = "Erro";
        expressao = "";
      }
      return;
    }

    expressao += valor;
    visor.textContent = expressao;
  });
});
