import "./MainPage.css";
import { Button } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  function handleAddFav() {
    navigate("./form");
  }
  return (
    <div className="mainContainer">
      <div1 className="textHeading">Welcome to Your favorite NPM Packages</div1>

      <div className="mainBox">
        <div className="containerBox">
          <text>You dont have any fav,please add!</text>
          <Button label="Add" onClick={handleAddFav} variant="success" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
