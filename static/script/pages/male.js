/**
 * Created by zj on 2017/6/13.
 */

$.get('/ajax/male',function(d){
    var app = new Vue({
        el:'#app',
        data () {
            return {
                male: d.items[0].data.data,
            }
        },
        methods:{
            rout () {
                location.href = "/book"
            }
        }
    });
    console.log(app.$data.male)
},'json');