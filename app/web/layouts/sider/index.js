import React,{useState} from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';
import './style.scss';
const {Sider } = Layout;
const SubMenu = Menu.SubMenu;

const navMenuList = [{
  name:'配置中心',
  path:'/page/config-center',
  icon:'setting'
},{
  name:'主机管理',
  path:'/page/host-management',
  icon:'desktop'
}]
const SiderComponent = (props)=>{
  const {location} = props;
  const {pathname} = location;
  const [collapsed,setCollapsed] = useState(false);
  const handleCollapseChange = ()=>{
    setCollapsed(!collapsed)
  }
  return (
    <Sider
      trigger={null} 
      collapsible 
      className="left-container"
      collapsed={collapsed}
      style={{height:'100%',background:'#262E36'}}
    >
      <div className="collapsed-wrap">
        <LegacyIcon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={handleCollapseChange}
        />
      </div>
      <Menu
        mode="inline"
        theme="dark"
        style={{background:'#262E36'}}
        selectedKeys={[pathname]}
      >
        {
          navMenuList.map((nav)=>{
            const {children,name,path,icon} = nav;
            if(Array.isArray(children)&&children.length>0){
              return <SubMenu key={name} title={<span><LegacyIcon type={icon} /><span>Navigation Two</span></span>}>{children.map((navChild)=><Menu.Item key={navChild.path}><Link to={navChild.path}><LegacyIcon type={navChild.icon} /><span>{navChild.name}</span></Link></Menu.Item>)}</SubMenu>;
            }else{
              return <Menu.Item key={path}><Link to={path}><LegacyIcon type={icon} /><span>{name}</span></Link></Menu.Item>;
            }
          })
        }
      </Menu>
    </Sider>
  );
}
export default SiderComponent;