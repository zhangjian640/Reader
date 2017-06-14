var koa = require('koa');
var controller = require('koa-route');
var querystring = require('querystring');
var app = new koa();

var views = require('co-views');
var render = views('./view', {
    map: {html: 'ejs'}
});

var koa_static = require('koa-static-server');
var service = require('./service/webAppService');

app.use(koa_static({
    rootDir: './static/', // 静态文件目录
    rootPath: '/static/', // 路由路径
    maxage: 0             // 不缓存
}));

// 静态文件访问例子
app.use(controller.get('/route_test', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = 'hello koa';
}));

// 模板渲染例子
app.use(controller.get('/ejs_test', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('test', {title: 'title'});
}));

// 首页
app.use(controller.get('/', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index', {title: '书城首页'});
}));

// 男生频道
app.use(controller.get('/male', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('male', {title: '男生频道'});
}));

// 女生频道
app.use(controller.get('/female', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('female', {title: '女生频道'});
}));

// 分类
app.use(controller.get('/category', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('category', {title: '分类'});
}));

// 排行
app.use(controller.get('/rank', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('rank', {title: '排行'});
}));

// 阅读
app.use(controller.get('/reader', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('reader');
}));

// 搜索
app.use(controller.get('/search', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('search', {nav: '搜索'});
}));

// book
app.use(controller.get('/book', function *() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render('book',{nav:'书籍详情',bookId:bookId});
}));

// api 例子
app.use(controller.get('/api_test', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_test_data();
}));

// 搜索接口(线上)
app.use(controller.get('/ajax/search', function *() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query); // 参数转化为obj
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_search_data(start, end, keyword);
}));

// 首页
app.use(controller.get('/ajax/index', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_index_data();
}));

// 排行榜
app.use(controller.get('/ajax/rank', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_rank_data();
}));

//
app.use(controller.get('/ajax/bookbacket', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_bookbacket_data();
}));

// 分类
app.use(controller.get('/ajax/category', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_category_data();
}));

// 男
app.use(controller.get('/ajax/male', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_male_data();
}));

// 女
app.use(controller.get('/ajax/female', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_female_data();
}));

// 分类
app.use(controller.get('/ajax/category', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_category_data();
}));

// reader
app.use(controller.get('/ajax/reader', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_reader_data();
}));

// 书
app.use(controller.get('/ajax/book', function *() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query); // 参数转化为obj
    var id = params.id;
    if(!id){
        id = "";
    }
    this.body = service.get_book_data(id);
}));

// 阅读
app.use(controller.get('/ajax/chapter_data', function *() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query); // 参数转化为obj
    var id = params.id;
    if(!id){
        id = "";
    }
    this.body = service.get_chapter_content_data(id);
}));

// 章节
app.use(controller.get('/ajax/chapter', function *() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_chapter_data();
}));


app.listen(3001);
console.log('koa start at 3001');