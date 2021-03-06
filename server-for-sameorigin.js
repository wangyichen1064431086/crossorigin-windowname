const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const views = require('koa-views');

const app = new Koa();
const router = new Router();

app.use(logger());

app.use(views(path.resolve(__dirname,'views'), {
  map:{
    html:'nunjucks'
  }
}));

async function showPage(pagename, data, ctx) {
  await ctx.render(pagename,data);
}
router.get('/a', showPage.bind(this,'a', {
  newLocation:'http://localhost:3000/b'
}));//思考：koa中间件的this指的是什么？
router.get('/b', showPage.bind(this,'b',{}));
app.use(router.routes());

app.listen(3000, () => {
  console.log('Serving sameorigin pages.Listening 3000');
})