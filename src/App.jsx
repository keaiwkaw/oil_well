
import { routeConfig } from "./config/route";
import { useRoutes } from "react-router";
import MenuComp from './components/menu'

import './assets/less/index.less'
import './assets/less/global.less'
import 'antd/dist/antd.css';

function App() {

  const element = useRoutes(routeConfig);

  return (
    <div className="App">
      <header className="header">
        <div className="header-name">长庆油田气井智能生产管理系统</div>
        <div className="header-item">菜单一</div>
        <div className="header-item">菜单二</div>
      </header>
      <div className="c-container">
        <MenuComp />
        <div className="c-route">{element}</div>
      </div>
    </div >
  )
}

export default App
