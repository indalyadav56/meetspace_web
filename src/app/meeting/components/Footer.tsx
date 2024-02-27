import { Button } from "@/components/ui/button";
import { Mic, Share, Video } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-red-400 h-14">
      <Button>
        <Video />
      </Button>
      <Button>
        <Mic />
      </Button>
      <Button>
        <Share />
      </Button>
    </div>
  );
};

export default Footer;
