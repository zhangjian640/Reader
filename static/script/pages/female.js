/**
 * Created by zj on 2017/6/13.
 */

$.get('/ajax/female',function(d){
    var app = new Vue({
        el:'#app',
        data () {
            return {
                female: d.items[0].data.data,
            }
        },
        methods:{
            rout () {
                location.href = "/book"
            }
        }
    });
},'json');