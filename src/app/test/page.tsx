"use client";
import { Button } from "@/components/ui/button";

const ExamplePage = () => {
  const handleOnClick = () => {
    const Notification =
      window.Notification ||
      window.mozNotification ||
      window.webkitNotification;

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        // Show notification
        const notification = new Notification("My Title", {
          body: "You have received a new chat message",
          icon: "chat-icon.png",
          tag: "message",
          badge: "https://example.com/badge.png",
          vibrate: [500, 100, 500],
          renotify: true,
        });
      } else {
        // Handle denied permission
      }
    });
  };

  return (
    <div>
      <h1>ExamplePage</h1>
      <Button onClick={handleOnClick}>Send Notification</Button>
    </div>
  );
};

export default ExamplePage;
