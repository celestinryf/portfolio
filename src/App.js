import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './routes/Home.jsx'
// import Blog from './routes/Blog.js';
import Projects from './routes/Projects.jsx';
import Contact from './routes/Contact.jsx';

function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<Home />} />
       {/* <Route path="/about" element={<About />} />  */}
       {/* <Route path="/blog" element={<Blog />} /> */}
       <Route path="/projects" element={<Projects />} />
       <Route path="/contact" element={<Contact />} />
    </Routes>
    </>
  );
}

export default App;
