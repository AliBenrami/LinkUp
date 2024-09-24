import { TextField, Button, Dialog } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Message {
  username: string;
  content: string;
  avatar: string;
}

function Settings({ setUser, user }: { setUser: any; user: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "absolute", top: "0", right: "0" }}>
      <Button onClick={() => setOpen(!open)}>
        <SettingsIcon></SettingsIcon>
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <TextField
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="UserName"
          variant="outlined"
        ></TextField>
      </Dialog>
    </div>
  );
}
function HamMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        style={{ position: "absolute", top: "0", left: "0" }}
        onClick={() => setOpen(!open)}
      >
        <MenuIcon></MenuIcon>
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Button>Settings</Button>
          <Button>Logout</Button>
          <Button>Close</Button>
        </div>
      </Dialog>
    </div>
  );
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [username, setUsername] = useState<string>("User");
  const [userAvatar, setUserAvatar] = useState<string>("");

  useEffect(() => {
    setUsername("Ali");
    setUserAvatar(
      "https://gravatar.com/avatar/2b766de09ffa5221890122dc2300968a?s=400&d=robohash&r=x"
    );
    fetch("api/api/messages/")
      .then((response) => response.json())
      .then((data) => setMessages(data));
    return () => {
      //clean up
    };
  }, []);

  console.log(messages);

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { username: username, content: input, avatar: userAvatar },
      ]);
      try {
        await axios.post("api/api/messages/", {
          username: username,
          content: input,
          avatar: userAvatar,
        });
        setInput("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#413e3e",
        borderRadius: "5px",
      }}
    >
      <HamMenu></HamMenu>
      <Settings setUser={setUsername} user={username}></Settings>
      <div
        style={{
          padding: "10px",
          width: "90%",
          height: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          overflowY: "scroll",
        }}
      >
        {messages.map((message, index) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                gap: "20px",
              }}
              key={index}
            >
              <img
                src={message.avatar}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "1cm",
                  border: "1px solid black",
                }}
              ></img>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "15px",
                }}
              >
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {message.username}
                </div>
                <div style={{ fontSize: "18px" }}>{message.content}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {" "}
        <TextField
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          variant="outlined"
          style={{
            width: "90%",
            marginRight: "10px",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
          onKeyDown={(e) => {
            {
              e.key === "Enter" ? handleSendMessage() : null;
            }
          }}
        />
        <Button
          style={{
            width: "10%",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default Chat;
