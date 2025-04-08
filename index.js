const body = document.querySelector("body");
const historico = document.querySelector(".historico");

let horas = 0;
let minutos = 0;
let segundos = 0;
let milissegundos = 0;
let intervalo = 0;
let contador = 0;
let captura = "";

const tempo = document.getElementById("tempo");
const temMili = document.getElementById("mili");
const iniciar = document.getElementById("iniciar");
const pausar = document.getElementById("pausar");
const zerar = document.getElementById("zerar");

iniciar.addEventListener("click", function () {
  body.style.background =
    "linear-gradient(to right,rgb(1, 230, 134),rgb(2, 189, 164),rgb(0, 211, 141))";
  clearInterval(intervalo);
  intervalo = setInterval(atualizarContador, 10);
});

pausar.addEventListener("click", function () {
  body.style.background =
    "linear-gradient(to right,rgb(230, 112, 1),rgb(189, 92, 2),rgb(236, 126, 0))";
  pausarCronometro();
});

zerar.addEventListener("click", function () {
  salvarHitorico();
  body.style.background =
    "linear-gradient(to right, #0000cd, #1e90ff, #00008b)";

  zerarCronometro();
});

function atualizarContador() {
  milissegundos += 10;
  if (milissegundos === 1000) {
    segundos++;
    milissegundos = 0;
  }

  if (segundos === 60) {
    minutos++;
    segundos = 0;
  }

  if (minutos === 60) {
    horas++;
    minutos = 0;
  }
  let milisseg = milissegundos < 100 ? "0" + milissegundos : milissegundos;

  let cronometro =
    (horas < 10 ? "0" + horas : horas) +
    ":" +
    (minutos < 10 ? "0" + minutos : minutos) +
    ":" +
    (segundos < 10 ? "0" + segundos : segundos);

  tempo.textContent = cronometro;
  temMili.textContent = milisseg;
}

function pausarCronometro() {
  clearInterval(intervalo);
}

function zerarCronometro() {
  horas = 0;
  minutos = 0;
  segundos = 0;
  milissegundos = 0;
  clearInterval(intervalo);
  tempo.textContent = "00:00:00";
  temMili.textContent = "00";
}

function salvarHitorico() {
  contador++;
  const liHitorico = document.createElement("li");
  liHitorico.innerHTML = `<p>#${contador}: ${tempo.textContent}:${milissegundos}</p> <button class="remove"><i class="bi bi-trash-fill"></i></button>`;

  historico.appendChild(liHitorico);
}

historico.addEventListener("click", function (e) {
  const botao = e.target.closest(".remove");
  if (botao) {
    const li = botao.closest("li");
    if (li) {
      historico.removeChild(li);
    }
  }
});
