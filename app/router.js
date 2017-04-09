'use strict';

module.exports = app => {
  const admin = app.role.can('admin');
  const install = app.controller.site.isInstall;

  //user 
  app.get('/profile', install, app.controller.user.profile);
  app.post('/user/login', app.controller.user.login);
  app.post('/user', app.controller.user.registry);
  app.put('/user', app.controller.user.update);
  app.get('/user/islogin', app.controller.user.islogin); 
  app.get('/logout', app.controller.user.logout);

  // cart
  app.get('/cart', app.controller.cart.index);
  app.post('/cart', admin, app.controller.cart.add);
  app.delete('/cart', admin, app.controller.cart.deleteGoods);

  app.get('/paynotify', install, app.controller.bill.paynotify);
  app.get('/payreturn', install, app.controller.bill.payreturn);
  // bill
  app.get('/bill/send', app.controller.bill.send);
  app.get('/bill/pay', app.controller.bill.pay);
  app.get('/bill/confirm', app.controller.bill.confirm);
  app.get('/bill', install, app.controller.bill.find);
  app.post('/bill', admin, app.controller.bill.add);
  app.put('/bill', admin, app.controller.bill.update);
  app.delete('/bill', admin, app.controller.bill.deleteBill);

  // address
  app.get('/address', install, app.controller.address.find);
  app.post('/address', admin, app.controller.address.add);
  app.put('/address', admin, app.controller.address.update);
  app.delete('/address', admin, app.controller.address.deleteAddress);

  app.get('/', app.controller.page.home);
  app.get('/project', app.controller.project.index);
  app.get('/goods', app.controller.goods.index);
  app.get('/shop', app.controller.page.shop);
  app.get('/about', app.controller.page.about);
  app.get('/return', app.controller.page.return);
  app.get('/privacy', app.controller.page.privacy);
  app.get('/news', app.controller.news.index);
  app.get('/press', app.controller.press.index);
  app.get('/team', app.controller.team.index);
  app.get('/job', app.controller.job.index);
  app.get('/contact', app.controller.page.contact);
  //app.get('/', install, app.controller.article.index);

  app.get('/job', install, app.controller.job.find);
  app.post('/job', admin, app.controller.job.add);
  app.put('/job', admin, app.controller.job.update);
  app.delete('/job', admin, app.controller.job.deleteJob);

  app.get('/findnews', install, app.controller.news.find);
  app.post('/news', admin, app.controller.news.add);
  app.put('/news', admin, app.controller.news.update);
  app.delete('/news', admin, app.controller.news.deleteNews);


  app.get('/press', install, app.controller.press.find);
  app.post('/press', admin, app.controller.press.add);
  app.put('/press', admin, app.controller.press.update);
  app.delete('/press', admin, app.controller.press.deletePress);

  app.get('/project/info', install, app.controller.project.find);
  app.post('/project', admin, app.controller.project.add);
  app.put('/project', admin, app.controller.project.update);
  app.delete('/project', admin, app.controller.project.deleteProject);

  app.get('/goods/info', install, app.controller.goods.find);
  app.post('/goods', admin, app.controller.goods.add);
  app.put('/goods', admin, app.controller.goods.update);
  app.delete('/goods', admin, app.controller.goods.deleteGoods);


  app.get('/findteam', install, app.controller.team.find);
  app.post('/team', admin, app.controller.team.add);
  app.put('/team', admin, app.controller.team.update);
  app.delete('/team', admin, app.controller.team.deleteTeam);

  app.post('/upload', app.controller.page.upload);

  app.get('/manager', install, admin, app.controller.admin.manager);
  app.get('/editor-team', install, admin, app.controller.admin.editorTeam);
  app.get('/editor-job', install, admin, app.controller.admin.editorJob);
  app.get('/editor-press', install, admin, app.controller.admin.editorPress);
  app.get('/editor-project', install, admin, app.controller.admin.editorProject);
  app.get('/editor-news', install, admin, app.controller.admin.editorNews);
  app.get('/editor-good', install, admin, app.controller.admin.editorGoods);
  app.post('/adminLogin', app.controller.admin.login);

  app.get('/adminlogin', install, app.controller.site.adminLogin);
  app.get('/adminLogout', app.controller.site.adminLogout);
  app.get('/install', app.controller.site.startInstall);
  app.post('/install', app.controller.site.install);
  app.get('/about', install, app.controller.site.about);
  app.get('/contact', install, app.controller.site.contact);
  app.get('/500', app.controller.site.error);

  app.get('/*', app.controller.site.notFound);
};
