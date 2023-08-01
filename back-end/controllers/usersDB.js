const { User } = require("../models/users.js");
const { Auth } = require("../middlewares/auth.js");
const { smtpTransport } = require("../config/email.js")
const ejs = require('ejs')
const path = require('path')
var appDir = path.dirname(require.main.filename)

function register(req, res) {
  // 회원가입할 때 필요한 정보들을
  // client에서 가져오면 그것들을 db에 넣는다.
  const user = new User(req.body);
  // 정보 저장, 에러 시 json 형식으로 전달
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
}

function idCheck(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return res.json({
        registerService: false,
        message: "중복된 이메일이 있습니다."
      })
    } else {
      return res.json({
        registerService: true,
        message: "사용 가능한 이메일입니다."
      })
    }
  })
}

function login(req, res) {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다!",
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호가 맞다면 토큰을 생성
      user.generateToken(req.body.password, (err, user) => {        
        if (err) return res.status(400).send(err);

        // 정상적이라면 토큰을 쿠키 혹은 로컬스토리지에 저장
        // 지금은 쿠키에 저장
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userid: user._id,
        });
      });
    });
  });
}

function auth(req, res) {
  // 여기까지 미들웨어(auth.js)를 통과해 왔다는 이야기는 인증이 true
  // 클라이언트에게 유저 정보를 전달
  Auth().then(
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role == 0 ? false : true, // role이 0이면 일반 유저, 그외는 관리자
      isAuth: true,
      email: req.user.email,
      role: req.user.role,
    })
  );
}

function logout(req, res) {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err)
      return res.json({
        success: false,
        err,
      });
    return res.status(200).send({
      success: true,
    });
  });
}

function mail(req, res) {
  /* min ~ max 까지 랜덤으로 숫자를 생성하는 함수 */
  var generateRandom = function (min, max) {
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min
    return ranNum
  }

  var number = generateRandom(111111, 999999)

  ejs.renderFile(appDir + '/templates/authMail.ejs', {authCode: number}, function (err, data) {
    if(err) {
      console.log(err)
    }
    emailTemplate = data
  })


  // console.log(req.body.email)

  let mailOptions = {
    from: "3BTI: 스케치북, 아이의 상상은 현실이 된다.",
    to: req.body.email,
    subject: "회원가입을 위한 인증번호를 입력해주세요.",
    html: emailTemplate
  }

  smtpTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    }
      console.log("메일이 무사히 전송되었습니다.")
      res.json({
        message: "메일이 무사히 전송되었습니다."
      })
      smtpTransport.close()
    })

}

exports.register = register;
exports.idCheck = idCheck;
exports.login = login;
exports.auth = auth;
exports.logout = logout;
exports.mail = mail;