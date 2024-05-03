import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [msg,setMsg] = useState('')

  useEffect(() => {
    const socket = new WebSocket('ws://159.223.74.41:8072/websocket?Cookie=session_id=3a25d30888a3a191ad8f5bb5dc2125c0552b0b40');

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      console.log('Message received:', event.data);
      // Handle received message here
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    // Clean up function to close the WebSocket connection when component unmounts
    return () => {
      socket.close();
    };
  }, []);



  const Login = async () => {
   await  fetch('v2/api/login',{
    method :'POST',
    credentials: 'include',
    headers : {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin":'*',
      "Access-Control-Allow-Headers": "X-Requested-With",
      "Access-Control-Allow-Methods": "PUT,GET,POST"
    },
    body : JSON.stringify({
      "jsonrpc":"2.0",
      "params":{
          "phone":"09951385842",
          "password":"admin"
      }
  })
  }).then(async(res)=>{
    console.log(res.headers.get('Cookie'),'res')
    console.log(await res.json(),'res')
  })
}
const sendMessage = async()=>{
  fetch('/api/mail/message/post',{
    method :'POST',
    headers : {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin":'*',
      "Access-Control-Allow-Headers": "X-Requested-With",
      "Access-Control-Allow-Methods": "PUT,GET,POST"
    },
    body : JSON.stringify({
      "jsonrpc":"2.0",
      "params": {
          "thread_id": 84,
          "thread_model": "mail.channel",
          "post_data": {
            "body": `${msg}`,
            "attachment_ids": [],
            "attachment_tokens": [],
            "canned_response_ids": [],
            "message_type": "comment",
            "partner_ids": [],
            "subtype_xmlid": "mail.mt_comment",
            "partner_emails": []
          }
      }
  
  })
  }).then(async(res)=>{
    console.log(await res.json(),'res')
  })
}
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <button onClick={()=> Login()}>Log in</button>

      <br />
      <br />
      <br />
      <br />
      <br />
      msg : <input type="text" onChange={(e)=> setMsg(e.target.value)}/>
      <button onClick={()=> sendMessage()}>SendMSg</button>
    </>
  )
}

export default App
