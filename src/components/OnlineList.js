import React from "react";

function OnlineList({ users }) {
  return (
    <div style={{ padding: "1rem" }}>
      <h3>Online Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default OnlineList;
