import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './components/mainPage/MainPage';
import FavPage from './components/favPage/FavPage';
import FormPage from './components/formPage/Formpage';
import Home from './Home';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavPage />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
