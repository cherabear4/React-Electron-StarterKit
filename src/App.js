import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Box from './components/Box'
import Panel from './components/Panel'


const fs = window.require('fs')
const pathModule = window.require('path')
const { app } = window.require('@electron/remote')
const { Client, Authenticator } = require('minecraft-launcher-core');
const { ipcRenderer } = window.require('electron');



function App() {

  const [postOne, setPostOne] = useState('')
  const [postTwo, setPostTwo] = useState('')
  const [postThree, setPostThree] = useState('')

  useEffect(() => {

    getPostOne();
    getPostTwo();
    getPostThree();
  }, []);

  async function getPostOne() {
    const response = await fetch('https://iconic-api.herokuapp.com/posts/0');
    const rp = await response.json();
    setPostOne(rp);
  }
  async function getPostTwo() {
    const response = await fetch('https://iconic-api.herokuapp.com/posts/1');
    const rptwo = await response.json();
    setPostTwo(rptwo);
  }

  async function getPostThree() {
    const response = await fetch('https://iconic-api.herokuapp.com/posts/2');
    const rpthree = await response.json();
    setPostThree(rpthree);
  }

  async function close(){
    app.quit();
  }

  function Launch(){
    ipcRenderer.send("app/launch");
  }

  function LaunchCracked(){
    ipcRenderer.send("app/cracked");
  }

  function Minimize(){
    ipcRenderer.send("app/minimize");
  }



  return (
    <div className="App">

    <div className="opacity"></div>
        
      <Navbar min={Minimize} close={close} />
      <main className="boxes">
        <Box header={postOne.title} content={postOne.content} background={postOne.image}/>
        <Box header={postTwo.title} content={postTwo.content} background={postTwo.image}/>
        <Box header={postThree.title} content={postThree.content} background={postThree.image}/>
        <Box/>
      </main>

      <Panel title="Launch Client" content="You can sign in with microsoft" buttonText="Launch" button={Launch} />
      <Panel title="Launch Client" content="You can sign in with cracked auth" buttonText="Launch" button={LaunchCracked} />

    </div>
  )
}

export default App
