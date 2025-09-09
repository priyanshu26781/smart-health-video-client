import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Register from "./components/Register";
import CallDialog from "./components/CallDialog";
import OnlineList from "./components/OnlineList";

const socket = io("https://smart-health-video-server.onrender.com");

function App() {
  const [email, setEmail] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on("online-users", setOnlineUsers);
    return () => socket.off("online-users");
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      {!email ? (
        <Register socket={socket} setEmail={setEmail} />
      ) : (
        <>
          <OnlineList users={onlineUsers} />
          <CallDialog socket={socket} email={email} />
        </>
      )}
    </div>
  );
}

export default App;
