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
    await axios.get(url)
        .then(response => {
            ctx.status = response.status;
            if (ctx.status === 200) {
                ctx.body = response.data;
            }          
        })
        .catch(error => {
        	ctx.status = error.response.status;
        })
    
}

app.listen(PORT);
console.log("Server started on port " + PORT);