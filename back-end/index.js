// MongoDB를 사용하며, 포트는 5000번을 사용

const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const { db } = require("./module/db");

db();

app.get("/", (req, res) => res.send("안녕하세요!"));

app.listen(port, () => console.log(`${port}번에 잘 접속했습니다.`));

// 유저 API 생성
const { User } = require("./models/User.js");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.post("/register", (req, res) => {
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
});
