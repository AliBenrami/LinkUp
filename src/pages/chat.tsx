import {
  TextField,
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Drawer,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import EmojiPeople from "@mui/icons-material/EmojiPeople";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { useEffect, useState } from "react";
import "../global.css";
interface Message {
  username: string;
  content: string;
  avatar: string;
}

function DmList({ setUser, user }: { setUser: any; user: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* your friends list */}

      <Button
        onClick={() => {
          setOpen(!open);
        }}
      >
        <EmojiPeople></EmojiPeople>
      </Button>
      <Settings setUser={setUser} user={user}></Settings>

      {""}

      {["a", "b", "c", "d", "e", "f", "g"].map((x: string) => {
        return (
          <Button>
            <Avatar style={{ margin: "5px" }}>{x}</Avatar>
          </Button>
        );
      })}
    </div>
  );
}

function Settings({ setUser, user }: { setUser: any; user: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{}}>
      <Button onClick={() => setOpen(!open)}>
        <SettingsIcon></SettingsIcon>
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div style={{ margin: "10px", textAlign: "center" }}>username</div>
        <TextField
          style={{ margin: "10px" }}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="UserName"
          variant="outlined"
        ></TextField>

        <List style={{ margin: "5px" }}>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Close" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");

  useEffect(() => {
    setUsername("User");
    setUserAvatar(
      "https://gravatar.com/avatar/2b766de09ffa5221890122dc2300968a?s=400&d=robohash&r=x"
    );
    setMessages([
      {
        username: "User",
        content: "hello User2",
        avatar: userAvatar,
      },

      {
        username: "User2",
        content: "hello User",
        avatar: userAvatar,
      },
    ]);
    //currently doing nothing had a backend working but that is scraped now
    fetch("api/api/messages/")
      .then((response) => response.json())
      .then((data) => setMessages(data));
    return () => {
      //clean up
    };
  }, []);

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
      } catch (error) {
        console.error(error);
      }
      setInput("");
    }
  };

  return (
    <>
      <DmList setUser={setUsername} user={username}></DmList>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#413e3e",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            padding: "10px",
            width: "90%",
            height: "90%",
            overflowY: "scroll",
            scrollbarWidth: "none",
            backgroundColor: "#413e3f",
            borderRadius: "1cm",
            marginInline: "auto",
          }}
        >
          {" "}
          {messages.map((message, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
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

        <div className="textbox">
          <TextField
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            variant="outlined"
            style={{
              flex: 1,
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
              width: "5%",
              minHeight: "1.5cm",
              borderRadius: "5px",
              backgroundColor: "white",
            }}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
}

export default Chat;
