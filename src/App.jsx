import { useCallback, useEffect, useMemo, useRef, useState, createContext, useContext } from 'react'
import 
      { Routes, Route, Outlet, useParams, useNavigate, Navigate, useSearchParams, Link }
from 'react-router-dom'
import axios from 'axios'
import NavBar from './components/navBar';
import './App.css'
import '@fontsource/poppins';
// import '@fontsource/poppins/500.css';
// import '@fontsource/poppins/700.css';
// import '@fontsource/poppins/700-italic.css';

function PostSkeleton () {
  return (
    <div className="skeleton">
        <div className="post-title"></div>
        <div className="post-author"></div>
    </div>
  )
}
function PostItem({title, author}) {
  return (
    <div className="post-item">
      <div>{title}</div>
      <span>by {author}</span>
    </div>
  )
}



function About() {

  const links = [
    {
      content: "blogs",
      path: "/dashboard/about/blogs",
      icon: "bi bi-layout-text-sidebar"
    }, {
      content: "posts",
      path: "/dashboard/about/posts",
      icon: "bi bi-grid"
    }
  ]



  return (
    <div className='about-wrapper'>
      <h1>about section</h1>
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
function Search() {

  const fetchPosts = (param) => {
    axios.get(param ? `/api/posts?title=${param}` : "/api/posts").then(res => {
      if (!res.data.posts.length) {
        setPosts([{id: 1, title: "ooops! no posts found", author: "__"}]);
      } else {
        setPosts(res.data.posts);
      }
    });
  }

  let timeoutRef = useRef(null);

  const [ , setSearchParams ] = useSearchParams();

  const [posts, setPosts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;

    setSearchQuery(val);
    setPosts([]);
    
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSearchParams(val ? {title: val} : {});
      fetchPosts(val);
    }, 300);
  }

  const handleBlur = () => {
    if (!searchQuery.length) {
      setSearchParams({});
      fetchPosts();
    }
  }

  // fetch all posts
  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className='search-wrapper'>
      <input onBlur={handleBlur} id='search-bar' type="text" value={searchQuery} onChange={handleChange} placeholder='search for post'/>
      <div className='posts-container' >
        {
          posts.length ? (
            posts.map(p => (<PostItem key={p.id} title={p.title} author={p.author}/>))
          ) : (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )
        }
      </div>
    </div>
  )
}

function App() {

  const posts = [
    {
      id: 1,
      icon: "",
      content: "post 1",
      path: "1",
      title: "best 10 movies in 2025",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est quisquam nisi officia id amet, ullam ab commodi nihil imped"
    },
    {
      id: 2,
      icon: "",
      content: "post 2",
      path: "2",
      title: "ferrari's 10 best selling cars in 2024",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est quisquam nisi officia id amet, ullam ab commodi nihil imped"
    },
    {
      id: 3,
      icon: "",
      content: "post 3",
      path: "3",
      title: "how to get rich quickly",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est quisquam nisi officia id amet, ullam ab commodi nihil imped"
    },
  ]

  return (
      <>
      <Routes>
        <Route path='/' element={<Layout />} />
          <Route path='/dashboard' element={<Dashboard />} >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path='overview' element={<div><h1>overview section</h1></div>} />
            <Route path='contact' element={<div><h1>contact section</h1></div>} />
            <Route path='services' element={<div><h1>services section</h1></div>} />
            <Route path='about' element={<About />} >
              {/* default route */}
              <Route index element={<Navigate to="blogs" replace />}></Route>
              {/* blogs route */}
              <Route path='blogs' element={<h2>blogs</h2>}></Route>
              {/* posts route */}
              <Route path='posts' element={<Posts posts={posts} />} >
                <Route index element={<Navigate to="1" replace />}></Route>
                <Route path=':id' element={<Post posts={posts} />}></Route>
              </Route>
            </Route>
            <Route path='search' element={<Search />} />
          </Route>
      </Routes>
      </>
  )
}

export default App

function Dashboard() {

  const links = [
    {
      content: "overview",
      path: "/dashboard/overview",
      icon: "bi bi-columns-gap"
    },
    {
      content: "services",
      path: "/dashboard/services",
      icon: "bi bi-easel2"
    },
    {
      content: "about",
      path: "/dashboard/about",
      icon: "bi bi-card-text"
    },
    {
      content: "contact",
      path: "/dashboard/contact",
      icon: "bi bi-envelope-at"
    },
    {
      content: "search",
      path: "/dashboard/search",
      icon: "bi bi-search"
    }
  ]

  return (
    <div className='wrapper'>
      <h1>Dashboard</h1>
      <NavBar links={links}/>
      <Outlet />
    </div>
  )
}




function Layout () {


  return (
    <div className="card-container">
      <Card />
    </div>
  )


  // return (<p>login to <Link to='/dashboard'>Dashboard</Link></p>)
}


import { CountProvider, useCount, useSetCount } from './CountContextProvider';

function Card () {
  // the entire context is wrapped up inside CountProvider
  return (
    <CountProvider>
      <CardHeader />
      <CardBody />
      <CardFooter />
    </CountProvider>
  )
}

function CardHeader() {
  return (<h1>card header</h1>)
}
function CardBody() {

  return (<p>card body <TestComp /></p>)
}
function CardFooter() {
  return (
    <div>
      <span>card footer</span>
      <InnerComp />
    </div>
  )
}
function InnerComp () {
  const setCount = useSetCount();
  return <button onClick={() => setCount(prev => prev + 1)}>increment</button>
}
function TestComp() {
  const count = useCount();
  return (<span>the count is : {count}</span>)
}