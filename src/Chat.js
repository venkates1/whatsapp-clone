import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useParams } from 'react-router-dom'
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";


function Chat() {
  const [seed, setSeed] = useState(""); //state
  const [input, setInput] = useState("");
  const { roomId } = useParams(); //hook  
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [ { user }, dispatch] = useStateValue();
  useEffect(()=> {
    if(roomId){
      db.collection('rooms')
      .doc(roomId)
      .onSnapshot(snapshot =>
        setRoomName(snapshot.data().name))

        db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data()))

        )
    }
  },[roomId])

useEffect(() => {
  
}, [])
  

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

const sendMessage = (e) => {
  e.preventDefault();
  console.log("You typed >>>", input);

  db.collection('rooms').doc(roomId).collection('messages').add({
    message: input,
    name:user.displayName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })

  setInput("");
}

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          className="chat__logo"
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        />
        <div className="chat__roomName">
          <h3>{roomName}</h3>
          <p>Last seen{" "}
          {new Date(
            messages[messages.length-1]?.timestamp?.toDate()).toLocaleString('en-IN')}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
        <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
          <span className="chat__name">{message.name}</span>
          {message.message}
          <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </p>
        ))}
      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input type="text" placeholder="Type a message" value={input} onChange={(e) => setInput(e.target.value)}/>
          <button type="submit" onClick={sendMessage}>Send</button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
