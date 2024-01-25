"use client";

import React, { createContext, useMemo, useContext } from "react";
import CookieService from "@/lib/cookies";
import constants from "@/constants";

interface CustomWebSocket extends WebSocket {
  prototype: WebSocket;
}

const SocketContext = createContext<null | CustomWebSocket>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: any) => {
  const token = CookieService.getCookie(constants.token.ACCESS_TOKEN);

  const socket = useMemo(() => {
    if (!token) return null;
    const wsBaseUrl = process.env.NEXT_PUBLIC_WS_API_BASE_URL;
    const ws = new WebSocket(
      `${wsBaseUrl}/v1/chat?token=${token}`
    ) as CustomWebSocket;

    ws.onopen = (event) => {
      console.log("gloabl connection opened", event);
    };

    ws.onclose = () => {
      console.log("gloabl open disconnect socket");
    };

    return ws;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
