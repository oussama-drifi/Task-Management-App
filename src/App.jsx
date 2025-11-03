import { useEffect, useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import './App.css'
import '@fontsource/poppins';
// import '@fontsource/poppins/500.css';
// import '@fontsource/poppins/700.css';
// import '@fontsource/poppins/700-italic.css';

import ContactSkeleton from './components/contactSkeleton';
function Contacts() {
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
    }
  ];

  const [contacts, setContacts] = useState([]);
  const [isContentLoaded, setContentLoaded] = useState(false);

  setTimeout(() => {
    setContacts(myContacts);
    setContentLoaded(true);
  }, 1500);
  
  useEffect(() => {
    axios.get
  }, []);

  return (
    <>
      <h1>Contacts</h1>
      <div className="container">
        {
          isContentLoaded ? (
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
          ) : (
            <>
              <ContactSkeleton />
              <ContactSkeleton />
              <ContactSkeleton />
              <ContactSkeleton />
              <ContactSkeleton />
              <ContactSkeleton />
            </>
          )
        }
      </div>
    </>
  )
}





import NavBar from './components/navBar';

import Search from './components/search/search';

function App() {
  return (
    <div className='wrapper'>
      <NavBar />
      <Routes>
          <Route path='/' element={
            <div className="wrapper">
              <h1>home</h1>
            </div>
          } />
          <Route path='/about' element={<div><h1>about page</h1></div>} />
          <Route path='/contact' element={<div><h1>contact page</h1></div>} />
          <Route path='/services' element={<div><h1>services page</h1></div>} />
      </Routes>
    </div>
  )
}

export default App