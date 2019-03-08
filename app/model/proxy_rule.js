module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
 
  const ProxyServer = app.model.define('proxy_rule', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    ip: INTEGER,
    target: STRING(60),
    proxy_server_id: INTEGER,
    is_delete: INTEGER,
    created_at: DATE,
    updated_at: DATE
  },{
    freezeTableName: true
  });

 
  return ProxyServer;
};
