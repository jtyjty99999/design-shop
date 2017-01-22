'use strict';

module.exports = app => {
  const admin = app.role.can('admin');
  const install = app.controller.site.isInstall;

  app.get('/', app.controller.page.home);
  app.get('/project', app.controller.project.index);
  app.get('/shop', app.controller.page.shop);
  app.get('/about', app.controller.page.about);
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

  app.get('/news', install, app.controller.news.find);
  app.post('/news', admin, app.controller.news.add);
  app.put('/news', admin, app.controller.news.update);
  app.delete('/news', admin, app.controller.news.deleteNews);

  app.get('/press', install, app.controller.press.find);
  app.post('/press', admin, app.controller.press.add);
  app.put('/press', admin, app.controller.press.update);
  app.delete('/press', admin, app.controller.press.deletePress);

  app.get('/project', install, app.controller.project.find);
  app.post('/project', admin, app.controller.project.add);
  app.put('/project', admin, app.controller.project.update);
  app.delete('/project', admin, app.controller.project.deleteProject);

  app.get('/team', install, app.controller.team.find);
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
  app.post('/login', app.controller.admin.login);

  app.get('/login', install, app.controller.site.login);
  app.get('/logout', app.controller.site.logout);
  app.get('/install', app.controller.site.startInstall);
  app.post('/install', app.controller.site.install);
  app.get('/about', install, app.controller.site.about);
  app.get('/contact', install, app.controller.site.contact);
  app.get('/500', app.controller.site.error);

  app.get('/*', app.controller.site.notFound);
};
