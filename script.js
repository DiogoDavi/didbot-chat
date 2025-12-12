const ws = new WebSocket("wss://didbot-server.onrender.com");

const chat = document.getElementById("chat");

ws.onmessage = (event) => {
  addMessage(event.data, "bot");
};

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = "msg " + type;

  if (type === "bot") {
    div.innerHTML = `
      <img src="./diogo-avatar.jpeg" class="avatar" alt="Bot Avatar">
      <div>${text}</div>
    `;
  } else {
    div.innerHTML = `<div>${text}</div>`;
  }

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function send() {
  const input = document.getElementById("msg");
  const text = input.value.trim();
  if (!text) return;

  ws.send(text);
  addMessage(text, "user");
  input.value = "";
}
