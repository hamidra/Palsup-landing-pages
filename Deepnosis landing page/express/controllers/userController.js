//var express = require('express');
const moment = require("moment");
const fs = require("fs");
const os = require("os");
const async = require("async");
const UserRegisteration = require("../models/UserRegisteration");
const nodemailer = require("nodemailer");
const pug = require("pug");

var mailer = {
  transporter: nodemailer.createTransport({
    pool: true,
    secure: true,
    host: "smtp-relay.gmail.com",
    auth: {
      user: "yourpal@palsup.com",
      pass: ""
    }
  }),

  options: {
    from: "yourpal@palsup.com",
    to: "hamid.alipour@gmail.com",
    subject: "Sending Email using Node.js"
  },

  send: function(body, cb) {
    if (body.type === "text") {
      this.options.text = body.content;
    } else if (body.type === "html") {
      this.options.html = body.content;
    }

    this.transporter.sendMail(this.options, function(error, info) {
      if (error) {
        cb(error);
      } else {
        cb(null, info.response);
      }
    });
  }
};

exports.user_register_email = function(req, res, next) {
  var userInfo = {
    email: req.body.email,
    timestamp: moment.utc().format(),
    ip: req.ip
  };

  var userRegInfo = new UserRegisteration({
    email: userInfo.email,
    timestamp: userInfo.timestamp,
    ip: userInfo.ip
  });

  UserRegisteration.find({ email: userInfo.email }, function(err, docs) {
    if (err) {
      next(err);
    }
    if (!docs.length) {
      userRegInfo.save(function(err) {
        if (err) {
          return next(err);
        }
        saveOnDisk(req, res, next, userInfo);
      });
    } else {
      console.log("email exists: ", userInfo.email);
      res.redirect("/");
    }
  });
};

function saveOnDisk(req, res, next, userInfo) {
  fs.appendFile(
    `${__dirname}/../../HTML/reg.txt`,
    `${userInfo.email},${userInfo.timestamp},${userInfo.ip} ${os.EOL}`,
    err => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        sendRegisterationEmail(userInfo);
        res.redirect("/");
      }
    }
  );
}

function sendRegisterationEmail(userInfo) {
  body = {
    type: "html",
    content: pug.renderFile(`${__dirname}/../views/registerationEmail.pug`)
  };
  mailer.send(body, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}
