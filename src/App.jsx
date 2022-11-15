import { routeConfig } from "./config/route";
import { useRoutes } from "react-router";
import MenuComp from "./components/menu";

import "./assets/less/index.less";
import "./assets/less/global.less";
import "antd/dist/antd.css";

function App() {
  const element = useRoutes(routeConfig);

  return (
    <div className="App">
      <div className="c-header-menu">
        <MenuComp />
      </div>
      <div className="c-container">{element}</div>
    </div>
  );
}

export default App;
