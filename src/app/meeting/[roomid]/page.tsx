"use client";

import "@livekit/components-styles";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
  useParticipants,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import Call from "@/components/Call";
import useChatRoomStore from "@/store/chatRoomStore";
import { Button } from "@/components/ui/button";

export default function Page({ params }: { params: any }) {
  const room = params.roomid;
  const name = v4();
  const [token, setToken] = useState("");

  const router = useRouter();

  const { callAccept, startAudioVideoCall, setCallAccept, setCallReceiver } =
    useChatRoomStore();

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${room}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
        startAudioVideoCall({ room_id: room });
      } catch (e) {
        console.error(e);
      }
    })();

    // return () => {
    //   if (callAccept) {
    //     setCallAccept(false);
    //   }
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {}, 60000);
  }, []);

  if (token === "") {
    return <div>Getting token...</div>;
  }

  const handleCallDisconnect = () => {
    router.back();
    setCallAccept(false);
    setCallReceiver(false);
  };

  return (
    <>
      {callAccept ? (
        <LiveKitRoom
          video={true}
          audio={true}
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          data-lk-theme="default"
          style={{ height: "100dvh" }}
          onDisconnected={handleCallDisconnect}
        >
          <MyVideoConference />
          <RoomAudioRenderer />
          <ControlBar />
        </LiveKitRoom>
      ) : (
        <Call />
      )}

      {/* // */}
    </>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
