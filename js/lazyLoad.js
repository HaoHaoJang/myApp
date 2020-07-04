function lazyRender () {
    $('.container img').each(function () {
        if (checkShow($(this)) && !isLoaded($(this)) ){
            loadImg($(this));
        }
    })
}
// 先进行一次检查
lazyRender();

//为了不在滚轮滚动过程中就一直判定，设置个setTimeout,等停止滚动后再去判定是否出现在视野中。
var clock; //这里的clock为timeID，
$(window).on('scroll',function () {
    if (clock) { // 如果在300毫秒内进行scroll的话，都会被clearTimeout掉，setTimeout不会执行。
        //如果有300毫秒外的操作，会得到一个新的timeID即clock，会执行一次setTimeout,然后保存这次setTimeout的ID，
        //对于300毫秒内的scroll事件，不会生成新的timeID值，所以会一直被clearTimeout掉，不会执行setTimeout.
        clearTimeout(clock);
    }
    clock = setTimeout(function () {
        console.log('运行了一次');
        lazyRender();
    },300)
})

function checkShow($img) { // 传入一个img的jq对象
    var scrollTop = $(window).scrollTop();  //即页面向上滚动的距离
    var windowHeight = $(window).height(); // 浏览器自身的高度
    var offsetTop = $img.offset().top;  //目标标签img相对于document顶部的位置

    if (offsetTop < (scrollTop + windowHeight) && offsetTop > scrollTop) { //在2个临界状态之间的就为出现在视野中的
        return true;
    }
    return false;
}
function isLoaded ($img) {
    return $img.attr('data-src') === $img.attr('src'); //如果data-src和src相等那么就是已经加载过了
}
function loadImg ($img) {
    $img.attr('src',$img.attr('data-src')); // 加载就是把自定义属性中存放的真实的src地址赋给src属性
}
