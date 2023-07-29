const mongoose = require('mongoose')

const path = require('path')
// .env 파일 불러오기

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
exports.db = () => {
    mongoose
      .connect(process.env.DB_URL, {
        // useNewUrlPaser: true,
        // useUnifiedTofology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
      })
      .then(() => console.log("MongoDB가 연결되었습니다."))
      .catch((err) => {
        console.log(err);
      });
}