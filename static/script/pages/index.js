/**
 * Created by zj on 2017/6/11.
 */
$.get('/ajax/index', function (d) {
    new Vue({
        el: '#app',
        data () {
            return {
                top: d.items[0].data.data,
                hot: d.items[1].data.data,
                recommend: d.items[2].data.data,
                female: d.items[3].data.data,
                male: d.items[4].data.data,
                free: d.items[5].data.data,
                topic: d.items[6].data.data
            }
        }
    })
},'json');