import React from 'react';
import {Layout } from 'antd';
import classnames from 'classnames';
import { renderRoutes } from 'react-router-config'
import './style.scss';
import Header from '../header/header';
const { Content} = Layout;

const BasicLayout = (props)=>{
  const {className,route,location} = props;
  return (
    <Layout className="layout-basic">
      <Header location={location}/>
      <Content className={classnames('main-content',className)}>
        {renderRoutes(route.routes)}
      </Content>
    </Layout>)
}
export default BasicLayout;