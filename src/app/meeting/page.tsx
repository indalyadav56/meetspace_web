"use client";

import React, { useEffect, useRef, useState } from "react";
import Footer from "./components/Footer";
import useChatRoomStore from "@/store/chatRoomStore";
import CallRoomHeader from "@/components/CallRoom/CallRoomHeader";
import Peer from "simple-peer";
import CookieService from "@/lib/cookies";
import constants from "@/constants";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4, v4 } from "uuid";

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <video playsInline autoPlay ref={ref} height={300} width={300} />;
};

const Home = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { singleRoomData, startAudioVideoCall } = useChatRoomStore();
  const [peers, setPeers] = useState([]);
  const [users, setUsers] = useState([]);

  const token = CookieService.getCookie(constants.token.ACCESS_TOKEN);
  const url = `${process.env.NEXT_PUBLIC_WS_API_BASE_URL}/v1/chat/${singleRoomData.id}?token=${token}`;

  useEffect(() => {
    startAudioVideoCall({
      room_id: singleRoomData.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newSocket = new WebSocket(url);
    setSocket(newSocket);

    newSocket.onopen = (event) => {
      console.log("audio video call :- connection open", event);
    };

    newSocket.onerror = (event) => {
      console.log("connection err:=>", event);
    };

    newSocket.onmessage = (event) => {
      console.log("on chat-messagge===>", event.data);
    };

    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        console.log("cleanup: closing socket");
        newSocket.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" }, audio: false })
      .then((stream) => {
        setUsers((u) => [...u, v4()]);
        users?.map((item) => {});
        createPeer(stream);
      });
  }, [socket]);

  // function createPeer(stream) {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on("signal", (data) => {
  //     setPeers((pre) => [...pre, peer]);

  //     peers.map((p) => {
  //       p.signal(data);
  //     });

  //     // socket?.send(
  //     //   JSON.stringify({
  //     //     EVENT: "CALL_USER",
  //     //     payload: data,
  //     //   })
  //     // );
  //   });

  //   return peer;
  // }

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      // socketRef.current.emit("sending signal", {
      //   userToSignal,
      //   callerID,
      //   signal,
      // });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      // socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  useEffect(() => {
    console.log("peers==>", peers);
  }, [peers]);

  return (
    <main className="h-screen w-screen flex flex-col">
      <video
        muted
        ref={userVideo}
        autoPlay
        playsInline
        height={300}
        width={300}
      />
      {/* <CallRoomHeader /> */}
      {/* <div className="flex-1 flex flex-wrap w-full gap-2 bg-white"> */}
      {/* {peers.map((item) => (
        <video
          key={item}
          muted
          ref={userVideo}
          autoPlay
          playsInline
          height={800}
          width={800}
        ></video>
      ))} */}
      {/* </div> */}
      {/* <Button
        onClick={() => {
          socket?.send("new user mesgs");
        }}
      >
        Send
      </Button> */}
    </main>
  );
};
export default Home;
