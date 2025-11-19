const socket = new WebSocket("ws://localhost:3000");

const sendinput = document.querySelector(".send-input");
const sendbutton = document.querySelector(".send-button");
const messagelist = document.querySelector(".message-list");

sendbutton.addEventListener("click", (e) => {
  console.log(e);
  socket.send(
    JSON.stringify({
      type: "message",
      content: sendinput.value,
    }),
  );

  const li = document.createElement("li");
  li.innerText = sendinput.value;
  li.classList.add(...["message", "own-message"]);

  messagelist.append(li);
  sendinput.value = "";
});
socket.onmessage = (event) => {
  const data = event.data;
  console.log(`recieved message from the server ${event.data}`);
  if (data instanceof Blob) {
    data.text().then((text) => handleMessage(text));
  } else {
    handleMessage(data);
  }
};

function handleMessage(text) {
  const { type, content } = JSON.parse(text);
  console.log([`[handleMessage] type : ${type}, content : ${content} `]);
  switch (type) {
    case "message":
      let li = document.createElement("li");
      li.innerText = content;
      li.classList.add(...["message", "other-message"]);
      messagelist.append(li);
      break;
    case "server-announcement":
      let s_li = document.createElement("li");
      s_li.innerText = content;
      s_li.classList.add(...["message", "announcment"]);
      messagelist.append(s_li);
      break;
    default:
      console.log(`type : ${type} not matched to any available types`);
  }
}
