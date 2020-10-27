import BasicLayout from '@/layouts/basicLayout';
import Home from '@/pages/home';
//代理服务
import ProxyServer from '@/pages/proxyServer';
//内部网址导航
import InnerUrlNavigation from '@/pages/innerUrlNavigation';
//工具箱
import Toolbox from '@/pages/toolbox';
//邮件签名生成
import MailSign from '@/pages/mailSign';
//主机管理
import HostManagement from '@/pages/hostManagement';
//配置中心
import ConfigCenter from '@/pages/configCenter';
//配置详情
import ConfigDetail from '@/pages/configDetail';
// hosts列表
import SwitchHostsList from '@/pages/switchHosts';


import NotFound from '@/pages/exception/404';
const urlPrefix = '/page'
const routes = [
  {
    path: '/',
    component: BasicLayout,
    routes:[
      {
        path: `${urlPrefix}/home`,
        component: Home
      },
      {
        path:`${urlPrefix}/internal-url-navigation`,
        component: InnerUrlNavigation
      },
      {
        path:`${urlPrefix}/toolbox`,
        component: Toolbox
      },
      {
        path: `${urlPrefix}/proxy-server`,
        component: ProxyServer
      },
      {
        path: `${urlPrefix}/mail-sign`,
        component: MailSign
      },
      {
        path: `${urlPrefix}/host-management`,
        component: HostManagement
      },
      {
        path: `${urlPrefix}/config-center`,
        component: ConfigCenter
      },
      {
        path:`${urlPrefix}/config-detail/:id`,
        component:ConfigDetail
      },
      {
        path: `${urlPrefix}/switch-hosts-list`,
        component: SwitchHostsList
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
 
];

export default routes;
