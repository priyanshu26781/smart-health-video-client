import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // will change to Render URL later

function App() {
  const localVideoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localVideoRef.current.srcObject = stream;
        socket.emit("join", { user: "Priyanshu" });
      })
      .catch(err => {
        console.error("Media error:", err);
      });
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Smart Health Video App</h1>
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        style={{ width: "400px", height: "300px", backgroundColor: "black" }}
      />
    </div>
  );
}

export default App;
