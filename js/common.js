$(".back").click(function() {
    window.history.back();
});
!(function(n) {
    var e = n.document,
        t = e.documentElement,
        i = 340,
        d = i / 10,
        o = "orientationchange" in n ? "orientationchange" : "resize",
        a = function() {
            var n = t.clientWidth || 320;
            n > 640 && (n = 640), (t.style.fontSize = n / d + "px");
        };
    e.addEventListener &&
        (n.addEventListener(o, a, !1),
            e.addEventListener("DOMContentLoaded", a, !1));
})(window);
$(function() {
    window.onscroll = function() {};
});