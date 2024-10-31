import React from 'react';
import './styles/index.css';
import { App }from './App';
import { createRoot } from "react-dom/client";

createRoot(document.getElementById('root') as HTMLElement).render(<App />);