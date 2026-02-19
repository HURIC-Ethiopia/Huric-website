// Get references to HTML elements
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesList = document.getElementById("messages");

// Send message to Firebase Realtime Database
sendBtn.addEventListener("click", () => {
  const msg = messageInput.value.trim();
  if (!msg) return;

  database.ref("messages").push({
    text: msg,
    timestamp: Date.now()
  });

  messageInput.value = "";
});

// Listen for new messages in real-time
database.ref("messages").on("child_added", (snapshot) => {
  const message = snapshot.val();
  const li = document.createElement("li");
  li.textContent = message.text;
  messagesList.appendChild(li);
});
