
const socket = new WebSocket("ws://localhost:3000");

const sendinput = document.querySelector(".send-input");
const sendbutton = document.querySelector(".send-button");

sendbutton.addEventListener("click", (e) => {
  console.log(e);
  socket.send(
    JSON.stringify({
      type: "message",
      content: sendinput.value,
    }),
  );
});
socket.onmessage = (event) => {
  const data = event.data;
  if (data instanceof Blob) {
    data.text().then((text) => handleMessage(text))
  }else {
    console.log('data type recieved : ', typeof text);
    handleMessage(text);
  }
  const { type, content } = data;
  console.log(`event type : ${type}, content : ${content}`);
};
function handleMessage(text) {
  const { type, content } = JSON.parse(text);
  console.log(type, content);
}
