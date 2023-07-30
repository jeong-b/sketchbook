const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")

// 토큰을 쿠키에 저장하기 위해 사용
app.use(cookieParser());

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      maxLength: 20,
      minLength: 8,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    auth: {
      type: String,
      default: "",
    },
    token: {
      type: String,
    },
    tokenExp: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);

// 비밀번호 암호화
userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next()
  }
});


// 로그인 - 비밀번호를 비교
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 입력된 비밀번호와 데이터베이스에 있는 암호화된 비밀번호가 같은지 확인
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch); // -> True
  });
};

//로그인 - 토큰 생성
userSchema.methods.generateToken = function (cb) {
  var user = this;
  // JWT 토큰 생성
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  // user._id + 'secretToken' = token 을 통해 토큰 생성
  // 토큰 해석을 위해 'secretToken' 입력 => user._id 가 나옴
  user.token = token;

  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
