const url = "wss://echo.websocket.org";
const conectar = document.getElementById("conectar");
const desconectar = document.getElementById("desconectar");
const submit = document.getElementById("submit");
const message = document.getElementById("message");
const user = document.getElementById("user");
const chat = document.getElementById("chat");
let ws = null;

const setText = (data) => {
  chat.insertAdjacentHTML("beforeend", `<p class="chat-message">${data}</p>`);
};


conectar.addEventListener('click', (e) => {
  ws = new WebSocket(url);
  ws.onopen = () => setText('Conectado');
  ws.onclose = () => setText('Desconectado');
  ws.onmessage = (e) => setText(e.data);
  ws.onerror = (e) => console.log(e);
})

desconectar.addEventListener('click', () => {
  ws ? ws.close() : console.log('No se ha conectado aun');
})

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const msg = message.value;
  message.value = "";
  ws.send(msg);
})


message.addEventListener('keyup', e => {
  if(e.keyCode === 13) {
    const msg = message.value;
    message.value = "";
    ws.send(msg);
  }
})
