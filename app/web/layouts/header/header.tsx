import React, { useState, useEffect } from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../asset/images/logo.png';
import './style.scss';

const { Header } = Layout;
const navMenuList: any = [{
    name: '应用中心',
    path: '/page/toolbox',
    icon: 'appstore',
    routers: ['toolbox', 'switch-hosts-list', 'switch-hosts-edit']
}, {
    name: '代理服务',
    path: '/page/proxy-server',
    icon: 'cloud',
    routers: ['proxy-server']
}, {
    name: '主机管理',
    path: '/page/host-management',
    icon: 'desktop',
    routers: ['host-management']
}, {
    name: '配置中心',
    path: '/page/config-center',
    icon: 'setting',
    routers: ['config-center', 'config-detail']
}, {
    name: '标签管理',
    path: '/page/tags',
    icon: 'tag',
    routers: ['tags']
}]
const HeaderComponent = (props: any) => {
    const { location } = props;
    const { localIp } = useSelector((state: any) => state.global);
    const { pathname } = location;
    const [selectedKeys, setSelectedKeys] = useState([pathname]);
    const handleSelectedKeys = (e: any) => {
        setSelectedKeys(e.key);
    }
    useEffect(() => {
        let current = navMenuList.filter(item => item.routers.some((ele) => pathname.indexOf(ele) > -1))
        current.length && setSelectedKeys([current[0].path])
    }, [pathname])
    return (
        <Header className="dt-layout-header header_component">
            <div className="dt-header-log-wrapper logo">
                <Link to='/page/toolbox'>
                    <img className="logo_img" src={logo} />
                    <span className="system-title">Doraemon</span>
                </Link>
            </div>
            <div className="menu_content">
                <Menu
                    mode="horizontal"
                    theme="dark"
                    onClick={handleSelectedKeys}
                    selectedKeys={selectedKeys}>
                    {
                        navMenuList.map((nav: any) => {
                            const { children, name, path, icon } = nav;
                            if (Array.isArray(children) && children.length > 0) {
                                return <SubMenu key={name} title={<span><LegacyIcon type={icon} /><span>Navigation Two</span></span>}>{children.map((navChild: any) => <Menu.Item key={navChild.path}><Link to={navChild.path}><LegacyIcon type={navChild.icon} /><span>{navChild.name}</span></Link></Menu.Item>)}</SubMenu>;
                            } else {
                                return <Menu.Item key={path}><Link to={path}><LegacyIcon type={icon} /><span>{name}</span></Link></Menu.Item>;
                            }
                        })
                    }
                </Menu>
                <div><span className="local-ip">{`本机IP: ${localIp}`}</span></div>
            </div>
        </Header>
    );
}
export default HeaderComponent;