import React, { useEffect, useCallback, useState, useRef } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faPhone, faGamepad, faChalkboardTeacher, faTimes } from '@fortawesome/fontawesome-free-solid'
import { Link } from "react-router-dom";
import Board from './Board.tsx';
import Tic from './tic';
import "./room.css";

const RoomPage = () => {


  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState(5);
  const mycallRef = useRef(null);
  const clicallRef = useRef(null);
  const ynameRef = useRef(null);
  const cnameRef = useRef(null);
  const [game, setgame] = useState(false);
  const [board, setboard] = useState(false);
  const [video, setvideo] = useState(false);
  const [call, setcall] = useState(true);


  const startGame = () => {
    console.log("OK")
    if (game == false) {
      if (board == true) {
        setboard(false);
      }
      setgame(true);
    }else{
      setgame(false)
    }

  }

  const startBoard = () => {
    console.log("KO")
    if (board == false) {
      if (game == true) {
        setgame(false);
      }
      setboard(true);
    }else{
      setboard(false)
    }
  }


  // console.log(mycallRef.current.style)
  // const startGame = () => {
  //   if (game == false) {
  //     if (board == true) {
  //       setboard(false);
  //     }
  //     setgame(true);

  //     if (window.innerWidth < "1000") {
  //       mycallRef.current.style.margin = "auto 10%";
  //       clicallRef.current.style.margin = "auto 70%";
  //       mycallRef.current.style.position = "absolute";
  //       mycallRef.current.style.bottom = "170px";
  //       clicallRef.current.style.position = "absolute";
  //       clicallRef.current.style.bottom = "170px";
  //       ynameRef.current.style.top = "55px";
  //       cnameRef.current.style.top = "55px";
  //     }

  //     mycallRef.current.style.width = "20%";
  //     clicallRef.current.style.width = "20%";
  //     mycallRef.current.style.height = "7%";
  //     clicallRef.current.style.height = "7%";

  //   } else {
  //     setgame(false);
  //     if (window.innerWidth < "480") {
  //       mycallRef.current.style.width = "66%";
  //       clicallRef.current.style.width = "66%";
  //       mycallRef.current.style.margin = "auto";
  //       clicallRef.current.style.margin = "auto";
  //       mycallRef.current.style.position = "relative";
  //       mycallRef.current.style.bottom = "0";
  //       clicallRef.current.style.position = "relative";
  //       clicallRef.current.style.bottom = "0";
  //       ynameRef.current.style.top = "-1px";
  //       cnameRef.current.style.top = "-1px";
  //     } else if (window.innerWidth < "1000") {
  //       mycallRef.current.style.width = "33%";
  //       clicallRef.current.style.width = "33%";
  //       mycallRef.current.style.margin = "auto";
  //       clicallRef.current.style.margin = "auto";
  //       mycallRef.current.style.position = "relative";
  //       mycallRef.current.style.bottom = "0";
  //       clicallRef.current.style.position = "relative";
  //       clicallRef.current.style.bottom = "0";
  //       ynameRef.current.style.top = "-1px";
  //       cnameRef.current.style.top = "-1px";
  //     } else {
  //       mycallRef.current.style.width = "33%";
  //       clicallRef.current.style.width = "33%";
  //     }
  //     mycallRef.current.style.height = "70%";
  //     clicallRef.current.style.height = "70%";
  //   }
  // };


  // const startBoard = () => {
  //   // console.log(game)
  //   if (board == false) {
  //     if (game == true) {
  //       setgame(false);
  //     }
  //     setboard(true);
  //     if (window.innerWidth < "480") {
  //       mycallRef.current.style.margin = "auto 10%";
  //       clicallRef.current.style.margin = "auto 70%";
  //       mycallRef.current.style.position = "absolute";
  //       mycallRef.current.style.bottom = "170px";
  //       clicallRef.current.style.position = "absolute";
  //       clicallRef.current.style.bottom = "170px";
  //       ynameRef.current.style.top = "55px";
  //       cnameRef.current.style.top = "55px";
  //     }

  //     mycallRef.current.style.width = "20%";
  //     clicallRef.current.style.width = "20%";
  //     mycallRef.current.style.height = "7%";
  //     clicallRef.current.style.height = "7%";
  //   } else {
  //     setboard(false);
  //     if (window.innerWidth < "1000") {
  //       mycallRef.current.style.width = "66%";
  //       clicallRef.current.style.width = "66%";
  //       mycallRef.current.style.margin = "auto";
  //       clicallRef.current.style.margin = "auto";
  //       mycallRef.current.style.position = "relative";
  //       mycallRef.current.style.bottom = "0";
  //       clicallRef.current.style.position = "relative";
  //       clicallRef.current.style.bottom = "0";
  //       ynameRef.current.style.top = "-1px";
  //       cnameRef.current.style.top = "-1px";
  //     } else if (window.innerWidth < "1000") {
  //       mycallRef.current.style.width = "33%";
  //       clicallRef.current.style.width = "33%";
  //       mycallRef.current.style.margin = "auto";
  //       clicallRef.current.style.margin = "auto";
  //       mycallRef.current.style.position = "relative";
  //       mycallRef.current.style.bottom = "0";
  //       clicallRef.current.style.position = "relative";
  //       clicallRef.current.style.bottom = "0";
  //       ynameRef.current.style.top = "-1px";
  //       cnameRef.current.style.top = "-1px";
  //     } else {
  //       mycallRef.current.style.width = "33%";
  //       clicallRef.current.style.width = "33%";
  //     }
  //     mycallRef.current.style.height = "70%";
  //     clicallRef.current.style.height = "70%";
  //   }
  // };
  
  const callCut = () =>{
    window.location.reload();
    window.location.href = '../';
  }

  useEffect(() => {
    console.log("CanvasDrawing ", brushSize);
  }, [brushSize]);


  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    // console.log(`Email ${email} joined room`);
    // alert(`${email} joined the room`)
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    setcall(false);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);






  return (
    <>
      <div className="main_room">
        <div className="header">
          <div className="logo">
            Doodle <span>Connect.</span>
          </div>
        </div>
        {/* <hr /> */}

        <div className={(game || board)?"call_frame": "call_frame call_frame_non"}>


            {/* <div className="my_call" ref={mycallRef}> */}
            <div className={game || board ?"my_call":"my_call my_call_non"} ref={mycallRef}>
              {myStream && (
                <>
                  <ReactPlayer
                    className="react-player"
                    playing
                    width="100%"
                    height="auto"
                    // muted
                    url={myStream}


                  />
                </>
              )}
              {myStream && <div className="name" ref={ynameRef}>You</div>}
            </div>

            {game ? <div className={game ? "gameArea" : "gameAreaN"}>
              <Tic />
            </div> : ""}

            <div className={board ? "boardArea" : "boardAreaN"}>
              <Board brushColor={brushColor} brushSize={brushSize} />
              <div className='tools' >
                <div>
                  <span>Color: </span>
                  <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
                </div>
                <div>
                  <span>Size: </span>
                  <input type="range" color='#fac176'
                    min="1" max="100" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} />
                  <span>{brushSize}</span>
                </div>
              </div>
            </div>


            <div className={game || board?"client_call":"client_call client_call_non"} ref={clicallRef}>
              {remoteStream && (
                <>
                  <ReactPlayer
                    className="react-player"
                    playing
                    width="100%"
                    height="auto"
                    // muted
                    url={remoteStream}
                  />
                </>
              )}
              {myStream && <div className="name" ref={cnameRef}>{remoteStream ? "Client" : "Connecting ..."}</div>}



          </div>
        </div>
        <div className="call_btn">
          <h4>{remoteSocketId ? "Connected" : "Waiting for connection ..."}</h4>
          <div className="options">
            {myStream && <button onClick={startBoard} className={board ? "highlight" : ""}><FontAwesomeIcon icon={faChalkboardTeacher} /></button>}
            {myStream && <button onClick={startGame} className={game ? "highlight" : ""}><FontAwesomeIcon icon={faGamepad} /></button>}
            {myStream && <button onClick={sendStreams} className={video ? "highlight" : ""}><FontAwesomeIcon icon={faVideo} /></button>}
            {remoteSocketId && <button onClick={handleCallUser} className="pic_call_btn"><FontAwesomeIcon icon={faPhone} /></button>}
            {myStream && <button onClick={callCut} className="cut_call_btn"><FontAwesomeIcon icon={faTimes} /></button>}
          </div>
        </div>
      </div>
    </>
  );
  // return (
  //   <>

  //     <div>
  //       <h1>Room Page</h1>
  //       <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
  //       {myStream && <button onClick={sendStreams}>Send Stream</button>}
  //       {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
  //       {myStream && (
  //         <>
  //           <h1>My Stream</h1>
  //           <ReactPlayer
  //             playing
  //             muted
  //             height="100px"
  //             width="200px"
  //             url={myStream}
  //           />
  //         </>
  //       )}
  //       {remoteStream && (
  //         <>
  //           <h1>Remote Stream</h1>
  //           <ReactPlayer
  //             playing
  //             muted
  //             height="100px"
  //             width="200px"
  //             url={remoteStream}
  //           />
  //         </>
  //       )}
  //     </div>


  //     <Link to="../../tic" target="_blank" >Play game</Link>

  // <Board brushColor={brushColor} brushSize={brushSize} />
  //   <div className='tools' >
  //     <div>
  //       <span>Color: </span>
  //       <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
  //     </div>
  //     <div>
  //       <span>Size: </span>
  //       <input type="range" color='#fac176'
  //         min="1" max="100" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} />
  //       <span>{brushSize}</span>
  //     </div>
  //   </div>

  //       <Tic/>
  //   </>

  // );
};

export default RoomPage;
