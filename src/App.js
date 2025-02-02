import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.js';
import Counter from './components/Counter.js';
import UserList from './components/UserList.js';
import SearchBar from './components/SearchBar.js';
import VirtualList from './components/VirtualList.js';
import KanbanBoard from './components/KanbanBoard.js';
import Home from "./components/Home.js";
const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/counter" element={<Counter />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/virtual-list" element={<VirtualList />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
