import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="App">
      <div className="main-wrapper d-flex flex-column justify-content-center align-items-center">
        <div className="main-content">
          <div className="mb-5 text-center">
            <img
              src={require("./assets/images/main-image.webp")}
              className="header-img"
            />
          </div>
          <Todos />
        </div>
      </div>
    </div>
  );
}

export default App;
