// MongoDB를 사용하며, 포트는 5000번을 사용

const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { User } = require("./models/User.js");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbAddress = process.env.DB_URL;
console.log(dbAddress)

mongoose
  .connect(dbAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("데이터베이스가 연결되었습니다."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/register", (req, res) => {
    // 회원가입을 할 때 필요
    // post로 넘어온 데이터를 받아서 DB에 저장
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err});
        return res.status(200).json({ success: true });
    })
})

app.listen(port, () => console.log(`listening on port ${port}`));
