import * as socket_io from "socket.io";
let io = socket_io;
import usersArr from "../variables/ausersArr.js";

const connections = [];
const playingUsersArr = [];

function runSocketIo(server) {
  io = new io.Server(server);
  io.sockets.on("connection", (socket) => {
    connections.push(socket);

    socket.on("new user", (data) => {
        socket.user = data.name;
        usersArr.push(data.name);
        updateClients(null, data.name);
        if(usersArr.filter(name => name == data.name).length > 1){
          console.log("double connect");
          socket.disconnect();
        }
    });

    socket.on("disconnect", () => {
      const userIndex = usersArr.lastIndexOf(socket.user);
      usersArr.splice(userIndex, 1);
      const playingUserIndex = playingUsersArr.indexOf(socket.user);
      if(playingUserIndex >= 0) playingUsersArr.splice(playingUserIndex, 1);
      updateClients(socket.user, null);
    });

    function updateClients(disconnectedUser, connectedUser) {
      io.sockets.emit("update", {
        usersArr: usersArr,
        playingUsersArr: playingUsersArr,
        disconnectedUser: disconnectedUser,
        connectedUser: connectedUser,
      });
    }

    socket.on("invite user", (data) => {
      io.sockets.emit("invitation created", {
        invitedUserName: data.invitedUserName,
        inviterName: data.inviterName,
      });
    });

    socket.on("start game", (data) => {
      playingUsersArr.push(data.inviterName);
      playingUsersArr.push(data.respondingUserName);
      io.sockets.emit("the game has begun", {
        inviterName: data.inviterName,
        respondingUserName: data.respondingUserName,
      });
    });
    
    socket.on("dataToEnemy", (data) => {
      io.sockets.emit(`${data.enemyName}`, {
        field: [...data.field],
        currentEvent: data.currentEvent,
        gameConstants: data.gameConstants
      });
    });
  });
}

export default runSocketIo;
