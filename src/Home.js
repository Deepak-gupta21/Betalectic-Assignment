// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/mainPage/MainPage';
import FavPage from './components/favPage/FavPage';


function Home() {
    const localStorageData = JSON.parse(localStorage.getItem("formData"));

  return (
    // <BrowserRouter>
      <div className="Home">
        {/* <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<FavPage />} />
          <Route path="/form" element={<FormPage />} />
        </Routes> */
        }
        {localStorageData == [] ? <FavPage /> : <MainPage />}
      </div>
    // </BrowserRouter>
  );
}

export default Home;
