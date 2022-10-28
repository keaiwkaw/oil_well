import './index.less'

import { Menu } from 'antd'

const MenuComp = (props) => {
  const { data } = props;
  const fakeData = [
    {
      label: "菜单一", key: 1, children: [{ label: '菜单1-1', key: '1-1', children: [{ label: '菜单1-1-1', key: '1-1-1' }], }],

    },
    {
      label: "菜单二", key: 2, children: [{ label: '菜单2-2', key: '2-2', children: [{ label: '菜单2-2-2', key: '2-2-2' }] }]
    },
    {
      label: "菜单三", key: 3, children: [{ label: '菜单3-3', key: '3-3', children: [{ label: '菜单3-3-3', key: '3-3-3' }] }]
    },
    {
      label: "菜单四", key: 4, children: [{ label: '菜单4-4', key: '4-4', children: [{ label: '菜单4-4-4', key: '4-4-4' }] }]
    },
  ]
  return <div className="c-menu">
    <Menu items={fakeData} mode="inline"/>
  </div>
}

export default MenuComp