import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "./firebase";
import "./SidebarChat.css";


function SidebarChat({ addNewChat, id, name }) {
  const [messages, setMessages] = useState("");
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if(id) {
      db
      .collection('rooms')
      .doc(id)
      .collection('messages')
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => 
      setMessages(snapshot.docs.map((doc) => doc.data())))
    }
  }, [id])

  const createChat = () => {
    const roomName = prompt("Please enter the room name for chat");
    if (roomName) {
      // do some clever db stuff..
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarchat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarchat__info">
          <h4>{name}</h4>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarchat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
