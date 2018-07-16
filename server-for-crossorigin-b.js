const path = require('path');
const Koa = require('koa');
const Subdomain = require('koa-subdomain');
const Router = require('koa-router');
const logger = require('koa-logger');
const views = require('koa-views');

const app = new Koa();
const subdomain = new Subdomain();
const router = new Router();
app.subdomainOffset = 1;
//Note: Koa has a subdomainOffset setting (2, by default), so the domain of the app is assumed to be the last two parts of the host. Here is an example when it is useful: if your app domain is localhost:3000, you need to change subdomainOffset to 1 for proper subdomain detection.

app.use(logger());

app.use(views(path.resolve(__dirname,'views'), {
  map:{
    html:'nunjucks'
  }
}));

async function showPage(pagename, data, ctx) {
  await ctx.render(pagename,data);
}


router.get('/b', showPage.bind(this,'b',{}));

subdomain.use('sub', router.routes())
app.use(subdomain.routes());

app.listen(3001, () => {
  console.log('Serving crossorigin pages. Listening 3001 with domain sub.localhost');
});