const channels = [
  {
    name: "Admins",
    id: "1",
    messages: [
      { user: "Dellan", message: "Hello there How are you", date: new Date() },
      { user: "Maka", message: "Im great how are you", date: new Date() },
      { user: "Malvin", message: "Hello there How are you", date: new Date() },
      { user: "Alvin", message: "Hello there How are you", date: new Date() }
    ],
    readBy: [],
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
    readBy: [],
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
    readBy: [],
    typingUsers: []
  }
];

exports.getChannels = () => channels;
