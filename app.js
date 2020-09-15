const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const axios = require('axios');

const PORT = 3000;
const app = new Koa();
const router = new Router();

app.use(koaBody());

router.post('/url', postUrl);
app.use(router.routes());

async function postUrl(ctx) {
    const url = 'https://tinyurl.com/api-create.php?url=' + ctx.request.body.url;
    const tinyUrl = await axios.get(url)
        .then(function (response) {
            return response.data;            
        })
        .catch(function (error) {
            console.log(error);
        })
    ctx.body = tinyUrl;
}

app.listen(PORT);
console.log("Server started on port " + PORT);