require('dotenv').config(); // .env 파일에서 환경변수 불러오기

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const api = require('./api');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true }).then(
    (response) => {
        console.log('Successfully connected to mongodb');
    }
).catch(e => {
    console.error(e);
});

app.use(bodyParser()); // 바디파서 적용, 라우터 적용코드보다 상단에 있어야합니다.
router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 4000; // PORT 값이 설정되어있지 않다면 4000 을 사용합니다.

app.listen(port, () => {console.log('heurm server is listening to port'+ port);});


// router.get('/', (ctx, next) => {
//   ctx.body = '홈';
// });
// router.get('/about/:name', (ctx, next) => {
//   const { name } = ctx.params; // 라우트 경로에서 :파라미터명 으로 정의된 값이 ctx.params 안에 설정됩니다.
//   console.log(ctx.params)
//   ctx.body = name + '의 소개';
// });
// router.get('/post',(ctx,next)=>{
//   const {id} = ctx.request.query;
//   if(id){
//     ctx.body = '포스트 #'+id;
//   }else{
//     ctx.body = '포스트 아이디가 없습니다.'
//   }
// })
// app.use(async (ctx, next) => {
//   console.log(1);
//   const started = new Date();
//   await next();
//   console.log(new Date() - started + 'ms');
// });

// app.use((ctx, next) => {
//   console.log(2);
//   next();
// });

// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });
