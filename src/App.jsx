import { useEffect, useRef, useState } from 'react'
import './App.css'



function App() {

  const myContacts = [
    {
      image: "avatar1.png",
      name: "arther mitchel",
      lastMsg: "how's it going"
    },
    {
      image: "avatar2.png",
      name: "lana roze",
      lastMsg: "can u take a day off?"
    },
    {
      image: "avatar6.png",
      name: "alex grant",
      lastMsg: "i'm kinna busy now"
    },
    {
      image: "avatar4.png",
      name: "oscar shales",
      lastMsg: "i'll pick you up in 20"
    },
    {
      image: "avatar5.png",
      name: "darlyne roze",
      lastMsg: "i'm off duty today"
    },
    {
      image: "avatar3.png",
      name: "rick grimes",
      lastMsg: "are u in today?"
    },
  ];
  const [contacts, setContacts] = useState([]);
  const [isContentLoaded, setContentLoaded] = useState(false);

  // ======= this is for offline test
  setTimeout(() => {
    setContacts(prev => myContacts);
    setContentLoaded(prev => true);
  }, 1500);
  
  return (
    <>
      <h1>Contacts</h1>
      <div className="container">
          <div className={`skeleton ${isContentLoaded ? "done-loading" : "" }`}>
            <div className="profile-image"></div>
            <div className="content">
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={`skeleton ${isContentLoaded ? "done-loading" : "" }`}>
            <div className="profile-image"></div>
            <div className="content">
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={`skeleton ${isContentLoaded ? "done-loading" : "" }`}>
            <div className="profile-image"></div>
            <div className="content">
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={`skeleton ${isContentLoaded ? "done-loading" : "" }`}>
            <div className="profile-image">
              
            </div>
            <div className="content">
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={`skeleton ${isContentLoaded ? "done-loading" : "" }`}>
            <div className="profile-image">
              
            </div>
            <div className="content">
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={`skeleton ${isContentLoaded ? "done-loading" : "" }`}>
            <div className="profile-image">
              
            </div>
            <div className="content">
              <span></span>
              <span></span>
            </div>
          </div>
          {
            isContentLoaded && (
                contacts.map(contact => (
                  <div key={contact.name} className="contact">
                    <div className="profile-image">
                      <img src={new URL(`../public/images/${contact.image}`, import.meta.url).href} alt="not found" />
                    </div>
                    <div className="content">
                      <span className='name'>{contact.name}</span>
                      <span className='last-message'>{contact.lastMsg}</span>
                    </div>
                  </div>
                ))
            )
          }
      </div>
    </>
  )
}

export default App