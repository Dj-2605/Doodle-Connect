import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import mainImage from "../assert/main.png";
import "./lobby.css";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();


  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <>
      <div className="lobby_main">
        {/* <div className="image">
          <img src={Bg} alt="" />
        </div> */}
        <div>
          <div className="lobby_header">
            <div className="lobby_logo">
              Doodle <span>Connect.</span>
            </div>
            <div className="lobby_heading">
              <h1>Enjoy your moments with your <br />friends.</h1>
              <p></p>
            </div>
          </div>
          <div className="form">
            <span></span>
            <form onSubmit={handleSubmitForm}>
              {/* <label htmlFor="email">Email ID</label> */}
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter the email"
                required
              />
              <br />
              {/* <label htmlFor="room">Room Number</label> */}
              <input
                type="text"
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Enter the Room no."
                required
              />
              <br />
              <button>Join</button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default LobbyScreen;
