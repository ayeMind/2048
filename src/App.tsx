import './App.css';
import Field from './components/filed/field';
import Menu from './components/menu/menu';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/game/3" element={<Field size={3} />} />
        <Route path="/game/4" element={<Field size={4} />} />
        <Route path="/game/5" element={<Field size={5} />} />
        <Route path="/game/6" element={<Field size={6} />} />
        <Route path="/game/7" element={<Field size={7} />} />
        <Route path="/game/8" element={<Field size={8} />} />

        <Route path="/*" element={<Menu />} />
      </Routes>
    </Router>
  );
};

export default App;
