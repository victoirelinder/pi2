'use strict';
module.exports = function(app) {
  var mail = require('../controllers/mailController');

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.route('/mail/query')
    .get(mail.getAllMail)
    .post(mail.getMailQuery);

  app.route('/mail/add')
    .post(mail.addMail);

  app.route('/mail/delete')
    .delete(mail.deleteMail);

};
