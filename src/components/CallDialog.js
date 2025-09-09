import React, { useState, useEffect } from "react";

function CallDialog({ socket, email }) {
  const [peerEmail, setPeerEmail] = useState("");
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    socket.on("incoming-call", ({ from }) => {
      setIncomingCall(from);
    });

    socket.on("call-failed", (msg) => {
      alert(msg);
    });

    socket.on("call-accepted", ({ to }) => {
      alert(`Call accepted by ${to}`);
    });

    socket.on("call-declined", ({ to }) => {
      alert(`${to} declined your call`);
    });

    socket.on("call-ended", () => {
      alert("Call ended");
      setIncomingCall(null);
    });

    return () => {
      socket.off("incoming-call");
      socket.off("call-failed");
      socket.off("call-accepted");
      socket.off("call-declined");
      socket.off("call-ended");
    };
  }, [socket]);

  const callUser = () => {
    if (peerEmail.trim()) {
      socket.emit("call-user", { from: email, to: peerEmail });
    }
  };

  const respondToCall = (accepted) => {
    socket.emit("call-response", { from: incomingCall, to: email, accepted });
    setIncomingCall(null);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Call a user by email</h3>
      <input
        type="email"
        value={peerEmail}
        onChange={(e) => setPeerEmail(e.target.value)}
        placeholder="peer@email.com"
      />
      <button onClick={callUser}>Call</button>

      {incomingCall && (
        <div style={{ marginTop: "1rem" }}>
          <p>Incoming call from: {incomingCall}</p>
          <button onClick={() => respondToCall(true)}>Accept</button>
          <button onClick={() => respondToCall(false)}>Decline</button>
        </div>
      )}
    </div>
  );
}

export default CallDialog;
