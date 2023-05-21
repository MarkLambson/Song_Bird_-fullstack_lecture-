import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from 'react-router-dom'; //link can be here as well if needed
import './App.css';
import Dash from "./components/Dash";
import Create from "./components/Create";
import Details from "./components/Details";
import Update from "./components/Update";



function App() {
  return (
    <div className="App">
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Dash />} />
        {/* Create Song Route */}
        <Route path="/create" element={<Create />} />
        {/* Song Details Route */}
        <Route path="/details/:id" element={<Details />} />
        {/* Update Song Route */}
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
