import { useEffect, useState } from 'react'
import 
      { Routes, Route, Outlet, NavLink, Link, useParams, useNavigate, Navigate }
from 'react-router-dom'
import NavBar from './components/navBar';
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
            </>
          )
        }
      </div>
    </>
  )
}



function About() {

  const links = [
    {
      content: "blogs",
      path: "/about/blogs",
      icon: "bi bi-layout-text-sidebar"
    }, {
      content: "posts",
      path: "/about/posts",
      icon: "bi bi-grid"
    }
  ]



  return (
    <div className='about-wrapper'>
      <h1>about page</h1>
      <NavBar links={links}/>
      <Outlet />
    </div>
  )
}

function Post({posts}) {
  const { id } = useParams();

  const [ post ] = posts.filter(post => post.id == id);

  return (
    <div className='post'>
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <button>see more</button>
    </div>
  )
}


function Posts({posts}) {

  return (
    <div className='posts-wrapper'>
      <NavBar links={posts}/>
      <div className='posts'>
        <Outlet />
      </div>
    </div>
  )
}



function App() {

  const links = [
    {
      content: "home",
      path: "/",
      icon: "bi bi-house"
    },
    {
      content: "services",
      path: "/services",
      icon: "bi bi-easel2"
    },
    {
      content: "about",
      path: "/about",
      icon: "bi bi-card-text"
    },
    {
      content: "contact",
      path: "/contact",
      icon: "bi bi-envelope-at"
    }
  ]

  const posts = [
    {
      id: 1,
      icon: "",
      content: "post1",
      path: "/about/posts/1",
      title: "best 10 movies in 2025",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est quisquam nisi officia id amet, ullam ab commodi nihil imped"
    },
    {
      id: 2,
      icon: "",
      content: "post2",
      path: "/about/posts/2",
      title: "ferrari's 10 best selling cars in 2024",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est quisquam nisi officia id amet, ullam ab commodi nihil imped"
    },
    {
      id: 3,
      icon: "",
      content: "post3",
      path: "/about/posts/3",
      title: "how to make up to 100k $ quickly",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est quisquam nisi officia id amet, ullam ab commodi nihil imped"
    },
  ]

  return (
    <div className='wrapper'>
      <Contacts />
      <NavBar links={links}/>
      <Routes>
          <Route path='/' element={
            <div className="wrapper">
              <h1>home</h1>
            </div>
          } />
          <Route path='/about' element={<About />} >
            {/* default route */}
            <Route index element={<Navigate to="blogs" replace />}></Route>
            {/* blogs route */}
            <Route path='/about/blogs' element={<h2>blogs</h2>}></Route>
            {/* posts route */}
            <Route path='/about/posts' element={<Posts posts={posts} />} >
              <Route index element={<Navigate to="/about/posts/1" replace />}></Route>
              <Route path='/about/posts/:id' element={<Post posts={posts} />}></Route>
            </Route>
          </Route>
          <Route path='/contact' element={<div><h1>contact page</h1></div>} />
          <Route path='/services' element={<div><h1>services page</h1></div>} />
      </Routes>
    </div>
  )
}

export default App