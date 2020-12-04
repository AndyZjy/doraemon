const Controller = require('egg').Controller;
const _ = require('lodash');
const moment  = require('moment');

class AppCentersController extends Controller {
  async getAppCenterList(){
    const {app,ctx} = this;
    const result = await app.model.AppCenters.findAndCountAll({
      attributes: ['id','appName','appDesc','appUrl', 'clickCount','created_at','updated_at'],
      order: [['clickCount','DESC']],
      where:{
        status:1
      }
    });
    ctx.body = app.utils.response(true,{data:result.rows,count:result.count});
  }

  async updateApplications () {
    const { app , ctx } = this;
    const { appName, appUrl, appDesc, id } = ctx.request.body;

    if(_.isNil(appName)) throw new Error('缺少必要参数appName');
    if(_.isNil(appUrl)) throw new Error('缺少必要参数appUrl');
    if(_.isNil(appDesc)) throw new Error('缺少必要参数appDesc');

    const result = await ctx.service.appCenters.updateApplications({
      appName,
      appUrl,
      appDesc,
      id,
      updated_at: moment().format('YYYY-MM-DD')
    })

    if (id) {
      ctx.body = app.utils.response(true, null)
      return
    }
    ctx.body = app.utils.response(true, result.get({
      plain: true
    }));
  }

  async getApplicationById () {
    const { app, ctx } = this;
    const { id } = ctx.request.query
    const result = await app.model.AppCenters.findOne({
      attributes: ['id', 'appName', 'appDesc', 'appUrl', 'created_at', 'updated_at'],
      where: {
        id
      }
    });
    ctx.body = app.utils.response(true, result);
  }

  async clickApplications () {
    const { app, ctx } = this;
    const { params } = ctx.request.body
    const result = await ctx.service.appCenters.clickApplications({
      ...params
    })
    ctx.body = app.utils.response(true, result);
  }

  async deleteApplications () {
    const { app , ctx } = this;
    const { id } = ctx.request.body;
    if(_.isNil(id)) throw new Error('缺少必要参数id');
    const result = await ctx.service.appCenters.deleteApplications(id);
    ctx.body = app.utils.response(true, result);
  }
}
module.exports = AppCentersController;