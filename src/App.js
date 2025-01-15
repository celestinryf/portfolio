// App.js
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './routes/Home/index.jsx'
import Projects from './routes/Projects/index.jsx';
import Experience from './routes/Experience/index.jsx';
import Skills from './routes/Skills/index.jsx';
import Blog from './routes/Blog/index.jsx';
import Contact from './routes/Contact/index.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;