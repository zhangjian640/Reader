/**
 * Created by zj on 2017/6/13.
 */
// console.log(decodeURIComponent(location.href));
var id = location.href.split('?id=').pop();
$.get('/ajax/book?id=' + id,function(d){
    var app = new Vue({
        el:'#app',
        data () {
            return {
                item:d.item
            }
        },
        methods:{
            readBook () {
                location.href = "/reader"
            }
        }
    });
    console.log(app.item)
},'json');