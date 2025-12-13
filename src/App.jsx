import { useCallback, useEffect, useMemo, useRef, useState, createContext, useContext } from 'react'
import 
      { Routes, Route, Outlet, useParams, useNavigate, Navigate, useSearchParams, Link }
from 'react-router-dom'
import axios from 'axios'
import './App.css'
import '@fontsource/poppins';
// import '@fontsource/poppins/500.css';
// import '@fontsource/poppins/700.css';
// import '@fontsource/poppins/700-italic.css';

import Header from './components/header'
import Overview from './components/overview';
import Task from './components/task';

export default function App() {
  return (
    <>
    <Header />
    <Overview />
    <Task />
    </>
  )
}