/**
 * Created by zj on 2017/6/14.
 */
var windowWidth = $(window).width();
if(windowWidth<320){
    windowWidth = 320;
}
new Vue({
    el: '#app_search',
    data(){
        return {
            search:[],
            condition:true,
            empty:false,
            screen_width:windowWidth +'px',
            double_screen_width: windowWidth*2+'px'
        }
    },
    methods: {
        doSearch: function(e) {
            var keyword = $('#search_box').val();
            var _this = this;
            $.get('/ajax/search',{
                keyword:keyword
            },function(d){
                _this.condition = false;
                _this.search = d.items;
                if(_this.search.length == 0){
                    _this.empty = true;
                }else{
                    _this.empty = false;
                }
            },'json')
        }
    }
});