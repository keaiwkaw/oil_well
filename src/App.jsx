import { routeConfig } from "./config/route";
import { useRoutes } from "react-router";

import './assets/less/index.less'
import './assets/less/global.less'
import 'antd/dist/antd.css';

function App() {

  const element = useRoutes(routeConfig);

  return (
    <div className="App">
      <header className="header">
        <div className="header-name">长庆油田气井智能生产管理系统</div>
      </header>
      <div className="c-container">
        {element}
      </div>
    </div >
  )
}

export default App
