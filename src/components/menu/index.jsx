import "./index.less";

import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const MenuComp = (props) => {
  const navigate = useNavigate();
  const { data } = props;
  const fakeData = [
    {
      label: "样本选择",
      key: "sample",
    },
    {
      label: "效果分析",
      key: "effect",
    },
  ];

  const handleClickMenuItem = ({ item, key, keyPath, domEvent }) => {
    navigate(`/${key}`);
  };
  return (
    <div className="c-menu">
      <Menu
        items={fakeData}
        mode="horizontal"
        defaultSelectedKeys="sample"
        onClick={handleClickMenuItem}
      />
    </div>
  );
};

export default MenuComp;
