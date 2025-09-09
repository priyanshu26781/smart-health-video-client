import React, { useState } from "react";

function Register({ socket, setEmail }) {
  const [inputEmail, setInputEmail] = useState("");

  const handleRegister = () => {
    if (inputEmail.trim()) {
      socket.emit("register", inputEmail);
      setEmail(inputEmail);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Enter your email to register</h2>
      <input
        type="email"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
        placeholder="your@email.com"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
