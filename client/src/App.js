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
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUwMmwZB0f_rC3YtLf9bE7RAK28dJLIqC3Ww&usqp=CAU"
              }
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
