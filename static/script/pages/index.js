/**
 * Created by zj on 2017/6/11.
 */
$.get('/ajax/index', function (d) {
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth = 320;
    }
    var offset = $($('.swipe-tab').find('a')[0]).offset();
    var index_header_tab_width = offset.width;
   var app= new Vue({
        el: '#app',
        data () {
            return {
                screen_width: windowWidth+'px',
                double_screen_width: windowWidth*2+'px',
                index_header_tab_width: index_header_tab_width +'px',
                top: d.items[0].data.data,
                hot: d.items[1].data.data,
                recommend: d.items[2].data.data,
                female: d.items[3].data.data,
                male: d.items[4].data.data,
                free: d.items[5].data.data,
                topic: d.items[6].data.data,
                tab_1_class: 'swipe-tab_on',
                tab_2_class: '',
                showContainer: '',
                showShelf:'active'
            }
        },
        methods: {
            tabSwitch (pos) {
                if (pos == 0) {
                    this.tab_1_class = 'swipe-tab_on';
                    this.tab_2_class = '';
                    this.showContainer = '';
                    this.showShelf = 'active';
                } else {
                    this.tab_1_class = '';
                    this.tab_2_class = 'swipe-tab_on';
                    this.showContainer = 'active';
                    this.showShelf = '';
                }
            },
            getTitleHref:function(val){
                return '/book?id='+val
            }
        }
    });
   console.log(app.$data.hot[0].fiction_id)
},'json');