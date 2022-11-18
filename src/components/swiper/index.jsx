import { useState } from "react";
import { Button } from "antd";


import Single from "./single";
import AllSingle from "./allSingle";

import "./index.less"

const Index = () => {
  const [active, setActive] = useState(1)

  return (
    <div className="s-container">
      <div className='s-menu'>
        <Button type="primary" style={{
          marginRight: "20px"
        }}
          className={!active && "s-active"}
          onClick={() => { setActive(0) }}
        >总体效果</Button>
        
        <Button type="primary"
          className={active && "s-active"}
          onClick={() => { setActive(1) }}
        >单井效果</Button>
      </div>
      {active === 1 ? <Single></Single> : <AllSingle />}
    </div>
  )

}


export default Index