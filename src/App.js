
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Weather from './components/Weatherdesign/weather';
function App() {
  return (
    <Router>
    <Routes>
        <Route  path="/" element={<Weather/>} />
    </Routes>
  </Router>
  );
}

export default App;
