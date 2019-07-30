const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let channels = [
  {
    name: "Admins",
    id: "1",
    messages: [
      { user: "Dellan", message: "Hello there How are you", date: new Date() },
      { user: "Maka", message: "Im great how are you", date: new Date() },
      { user: "Malvin", message: "Hello there How are you", date: new Date() },
      { user: "Alvin", message: "Hello there How are you", date: new Date() }
    ],
    typingUsers: []
  },
  {
    name: "Frontend",
    id: "3",
    messages: [
      { user: "Dellan", message: "Hello there How are you", date: new Date() },
      { user: "Maka", message: "Im great how are you", date: new Date() },
      { user: "Malvin", message: "Hello there How are you", date: new Date() },
      { user: "Alvin", message: "Hello there How are you", date: new Date() }
    ],
    typingUsers: []
  },
  {
    name: "Managers",
    id: "2",
    messages: [
      { user: "Dellan", message: "Hello there How are you", date: new Date() },
      { user: "Maka", message: "Im great how are you", date: new Date() },
      { user: "Malvin", message: "Hello there How are you", date: new Date() },
      { user: "Alvin", message: "Hello there How are you", date: new Date() }
    ],
    typingUsers: []
  }
];

const removeTyping = (user, channel) => {
  channel.typingUsers = channel.typingUsers.filter(
    currentUser => user !== currentUser
  );
  io.emit("get-selected-channel", channel);
};

const refreshChannel = (channel, newMessage) => {
  io.emit("get-selected-channel", channel, newMessage);
};

io.on("connection", socket => {
  console.log("user connected....");
  socket.emit("load-channels", channels);

  socket.on("new-message", ({ message, channelId }) => {
    const channel = channels.find(channel => channel.id == channelId);
    message.date = Date.now();
    channel.messages = [...channel.messages, message];
    removeTyping(message.user, channel);
    refreshChannel(channel, true);
  });
  socket.on("select-channel", id => {
    const channel = channels.find(channel => channel.id == id);
    socket.emit("get-selected-channel", channel);
  });
  socket.on("create-channel", name => {
    let channel = { name, messages: [], typingUsers: [] };
    (channel.id = channels.length + 1), (channels = [...channels, channel]);
    io.emit("load-channels", channels);
    refreshChannel(channel);
  });

  socket.on("user-typing", ({ channelId, user }) => {
    let channel = channels.find(channel => channel.id == channelId);
    if (!channel.typingUsers.includes(user)) {
      channel.typingUsers = [...channel.typingUsers, user];
      refreshChannel(channel);
      setTimeout(() => {
        removeTyping(user, channel);
      }, 2000);
    }
  });
});

http.listen(8000, () => console.log("server started on port 8000"));
