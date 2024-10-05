import {
  TextField,
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import EmojiPeople from "@mui/icons-material/EmojiPeople";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { useEffect, useState } from "react";
import "../global.css";
import UserAuth from "./UserAuth";
interface Message {
  username: string;
  content: string;
  avatar: string;
}
interface UserDM {
  Firstname: string;
  Lastname: string;
  avatar: string;
  Iteration: number;
  DMcode: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");

  const [friends, setFriends] = useState<UserDM[]>([]);
  const [selected, setSelected] = useState(0);
  const [messagesls, setmessagesls] = useState([
    [
      {
        username: "User",
        content: "hello User2",
        avatar: "",
      },

      {
        username: "User2",
        content: "hello User",
        avatar: "",
      },
    ],
    [
      {
        username: "User3",
        content: "hello User2",
        avatar: "",
      },

      {
        username: "User4",
        content: "hello User",
        avatar: "",
      },
    ],
  ]);

  useEffect(() => {
    setUsername("User");
    setUserAvatar(
      "https://gravatar.com/avatar/2b766de09ffa5221890122dc2300968a?s=400&d=robohash&r=x"
    );
    setMessages(messagesls[0]);
    //currently doing nothing had a backend working but that is scraped now
    //fetch api/api/messages/{message id}
    fetch("api/api/messages/")
      .then((response) => response.json())
      .then((data) => setMessages(data));
    return () => {
      //clean up
    };
  }, []);

  useEffect(() => {
    setFriends([
      {
        Firstname: "Ali",
        Lastname: "Benrami",
        avatar: "",
        Iteration: 0,
        DMcode: "0",
      },
      {
        Firstname: "Nova",
        Lastname: "bova",
        avatar: "",
        Iteration: 1,
        DMcode: "1",
      },
      {
        Firstname: "rayan",
        Lastname: "benrami",
        avatar: "",
        Iteration: 2,
        DMcode: "3",
      },
    ]);
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
  const changeDm = (Iteration: number) => {
    setSelected(Iteration);
    //fetch message from db
    let temp = messagesls;
    temp[selected] = messages;
    setmessagesls(temp);
    if (messagesls.length < Iteration + 1) {
      setMessages([]);
      return;
    }
    setMessages(messagesls[Iteration]);
  };
  function MessageSideBar() {
    return (
      <div className="messageSideBar">
        {/* your friends list */}
        <FriendCodeMenu></FriendCodeMenu>
        <Settings></Settings>

        {""}

        {friends.map((user) => {
          let Content = () => {
            return (
              <div style={{}}>
                <Avatar
                  style={{ margin: "5px", width: "30px", height: "30px" }}
                >
                  {user.Firstname[0] + user.Lastname[0]}
                </Avatar>
                <div>{user.Firstname}</div>
              </div>
            );
          };

          let color = user.Iteration === selected ? "gray" : "transparent";

          return (
            <Button
              onClick={() => {
                changeDm(user.Iteration);
              }}
              style={{
                borderRadius: "5px",
                backgroundColor: color,
                width: "100%",
              }}
            >
              <Content></Content>
            </Button>
          );
        })}
      </div>
    );
  }

  function FriendCodeMenu() {
    const [open, setOpen] = useState(false);
    const [code, setcode] = useState("");

    let submitFriendCode = () => {
      //send code to server/backend
      //add friend to friendlist
      setOpen(false);
      setcode("");
    };

    return (
      <>
        {" "}
        <Button
          style={{ width: "100%" }}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <EmojiPeople></EmojiPeople>
        </Button>
        {/** end */}
        <Dialog
          open={open}
          onClose={() => {
            setOpen(!open);
          }}
        >
          {""}
          <TextField
            type="outline"
            label="Friend Code"
            variant="filled"
            defaultValue={code}
            onChange={(e) => {
              setcode(e.target.value);
            }}
          ></TextField>
          <Button onClick={submitFriendCode}>
            <AddIcon></AddIcon>
          </Button>
        </Dialog>
      </>
    );
  }

  function Settings() {
    const [open, setOpen] = useState(false);
    const [localUsername, setlocalUsername] = useState("");
    return (
      <div style={{ width: "100%" }}>
        <Button onClick={() => setOpen(!open)} style={{ width: "100%" }}>
          <SettingsIcon></SettingsIcon>
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <div style={{ margin: "10px", textAlign: "center" }}>Settings</div>
          <TextField
            style={{ margin: "10px" }}
            value={localUsername}
            onChange={(e) => setlocalUsername(e.target.value)}
            placeholder="UserName"
            variant="outlined"
          ></TextField>
          <Button onClick={() => setUsername(localUsername)}>
            {" "}
            apply username{" "}
          </Button>

          <List style={{ margin: "5px" }}>
            <ListItem>
              <ListItemButton>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <UserAuth></UserAuth>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => setOpen(false)}>
                <ListItemText primary="Close" />
              </ListItemButton>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
  return (
    <>
      <MessageSideBar></MessageSideBar>

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
                {message.avatar === "" ? (
                  <Avatar>{message.username[0]}</Avatar>
                ) : (
                  <img
                    src={message.avatar}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "1cm",
                      border: "1px solid black",
                    }}
                  ></img>
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "5px",
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
