var nodemailer = require('nodemailer');
var init       = require("../Config/Init");

class Mail
{
  constructor()
  {
    this.mailOptions       = null;
    this.configurationFile = init.readConfiguration();
    this.transporter       = nodemailer.createTransport({
        service: this.configurationFile.mail.service,
        auth: {
          user: this.configurationFile.mail.username,
          pass: this.configurationFile.mail.password
        }
    });
  }

  config(to,from,subject,text)
  {
    this.mailOptions = {
      from    : from,
      to      : to,
      subject : subject,
      text    : text
    };
    return this;
  }

  configHTML(to,from,subject,html)
  {
    this.mailOptions = {
      from    : from,
      to      : to,
      subject : subject,
      html    : html
    };
    return this;
  }

  send()
  {
    console.log(this.transporter);
    this.transporter.sendMail(this.mailOptions, function(error, info){
      if (error)
        throw error;
      else
        return true;
    });
  }
}

module.exports = new Mail();
