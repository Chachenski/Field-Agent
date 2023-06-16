import Hero from './components/Hero';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotFound from './components/NotFound';
import Agents from './components/Agents';
import AgentsForm from './components/AgentsForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/add" element={<AgentsForm />} />
          <Route path="/agents/edit/:id" element={<AgentsForm />} />
          {/* <Route path="/agents/delete/:id" element={<DeleteAgent />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
