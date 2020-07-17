/*
 * pluginName:pickTimer,
 * author:yangyang2010cs@163.com
 * Individual contact method:986372959(It's my QQ)
 * date:2017/09/07 18:45:00
 * */
(function ($, window, document, undefined) {
  "use strict"; //严格模式，提高效率
  var pluginName = "pickTimer", //定义插件的名字
    defaults = {}, //定义一个默认的参数
    liH, //每一个li的高度
    $list, //滑动列表
    globalThis_launchHtml,
    pluginThis; //指代指向plugin的this
  var global = {
    options: "",
  };
  function Plugin(options) {
    //创建构造函
    //this -- Plugin对象
    pluginThis = this;
    this.options = options;
    this.init(); //初始化
  }
  Plugin.prototype = {
    init: function () {
      //this -- Plugin对象
      var str =
        '<div class="pick-container touches">' +
        '<div class="row pick-m0">' +
        '<div class="col s3 center-align">' +
        '<a href="javascript:void(0)" class="pick-cancel">取消</a>' +
        "</div>" +
        '<div class="col s6 center-align pick-title">' +
        (this.options.pickType == "y:m:d" ? "设置日期" : "设置时间") +
        "</div>" +
        '<div class="col s3 center-align">' +
        '<a href="javascript:void(0)" class="pick-sure">确定</a>' +
        "</div>" +
        "</div>" +
        '<div class="row pick-m0">' +
        '<div class="col s4 pick-timer">' +
        '<div class="pick-bgTop"></div>' +
        '<ul class="list">' +
        "</ul>" +
        '<div class="current ' +
        (this.options.pickType == "y:m:d"
          ? "current-date-right"
          : "current-time") +
        '"></div>' +
        '<div class="pick-bgBottom"></div>' +
        "</div>" +
        '<div class="col s4 pick-timer">' +
        '<div class="pick-bgTop"></div>' +
        '<ul class="list">' +
        "</ul>" +
        '<div class="current ' +
        (this.options.pickType == "y:m:d"
          ? "current-date-left current-date-right"
          : "current-time") +
        '"></div>' +
        '<div class="pick-bgBottom"></div>' +
        "</div>" +
        '<div class="col s4 pick-timer">' +
        '<div class="pick-bgTop"></div>' +
        '<ul class="list">' +
        "</ul>" +
        '<div class="current ' +
        (this.options.pickType == "y:m:d" ? "current-date-left" : "") +
        '"></div>' +
        '<div class="pick-bgBottom"></div>' +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="pick-layer"></div>';
      $("body").append(str);
      $(".pick-cancel,.pick-layer").on("click", function () {
        $(".touches,.pick-layer").remove();
        $("body").unbind("touchmove"); //恢复了body的拖动事件
      });
      $(".pick-sure").on("click", function () {
        var val = "";
        $(".pick-active").each(function () {
          if (pluginThis.options.pickType == "y:m:d") {
            val += $(this).text() + "-";
          } else if (pluginThis.options.pickType == "h:m:s") {
            val += $(this).text() + ":";
          }
        });
        $(globalThis_launchHtml).html(val.substring(0, val.length - 1));
        $(".touches,.pick-layer").remove();
        $("body").unbind("touchmove"); //恢复了body的拖动事件
      });
      $("body").on("touchmove", function (e) {
        e.preventDefault();
      });
      this.render(); //渲染
    },
    render: function () {
      //this -- Plugin对象
      global.options = this.options;
      $list = $(".list");
      if (this.options.pickType == "h:m:s") {
        for (var h = 0; h < 24; h++) {
          $list.eq(0).append("<li>" + (h >= 10 ? h : "0" + h) + "</li>");
        }
        for (var m = 0; m < 60; m++) {
          $list.eq(1).append("<li>" + (m >= 10 ? m : "0" + m) + "</li>");
        }
        for (var s = 0; s < 60; s++) {
          $list.eq(2).append("<li>" + (s >= 10 ? s : "0" + s) + "</li>");
        }
        liH = $list.find("li").eq(0).height(); //li的高度
        var hour = new Date().getHours(),
          min = new Date().getMinutes(),
          sec = new Date().getSeconds();
        $list.eq(0).find("li").eq(hour).addClass("pick-active"); //一开始默认第三行选中
        $list.eq(0).css("top", (-hour + 2) * liH);
        $list.eq(1).find("li").eq(min).addClass("pick-active"); //一开始默认第三行选中
        $list.eq(1).css("top", (-min + 2) * liH);
        $list.eq(2).find("li").eq(sec).addClass("pick-active"); //一开始默认第三行选中
        $list.eq(2).css("top", (-sec + 2) * liH);
      } else if (this.options.pickType == "y:m:d") {
        var year = new Date().getFullYear(),
          month = new Date().getMonth();
        for (var _y = 0; _y < this.options.yearSize; _y++) {
          $list
            .eq(0)
            .append(
              "<li>" +
                (year - Math.floor(this.options.yearSize / 2) + _y) +
                "</li>"
            );
        }
        for (var _m = 1; _m < 13; _m++) {
          $list.eq(1).append("<li>" + (_m >= 10 ? _m : "0" + _m) + "</li>");
        }
        liH = $list.find("li").eq(0).height(); //li的高度
        $list
          .eq(0)
          .find("li")
          .eq(year - $list.eq(0).find("li").eq(0).text())
          .addClass("pick-active"); //一开始默认第三行选中
        $list
          .eq(0)
          .css(
            "top",
            (-(year - $list.eq(0).find("li").eq(0).text()) + 2) * liH
          );
        $list.eq(0).addClass("js_year");
        $list.eq(1).find("li").eq(month).addClass("pick-active"); //一开始默认第三行选中
        $list.eq(1).css("top", (-month + 2) * liH);
        $list.eq(1).addClass("js_month");
        this.createDate();
      }
      this.handleEvent(); //绑定事件
      return this;
    },
    createDate: function () {
      //创建日期选择中的天数一列
      $list.eq(2).html("");
      var createDate_year = $(".js_year").find("li.pick-active").text();
      var createDate_month = $(".js_month").find("li.pick-active").text();
      if (
        (createDate_year % 4 == 0 &&
          createDate_year % 100 != 0 &&
          createDate_month == "02") ||
        (createDate_year % 400 == 0 && createDate_month == "02")
      ) {
        //闰年 2月
        setDateFun(29);
      } else if (
        (!(createDate_year % 4 == 0 && createDate_year % 100 != 0) &&
          createDate_month == "02") ||
        (!(createDate_year % 400 == 0) && createDate_month == "02")
      ) {
        //非闰年 2月
        setDateFun(28);
      } else if (
        createDate_month == "01" ||
        createDate_month == "03" ||
        createDate_month == "05" ||
        createDate_month == "07" ||
        createDate_month == "08" ||
        createDate_month == "10" ||
        createDate_month == "12"
      ) {
        setDateFun(31);
      } else if (
        createDate_month == "04" ||
        createDate_month == "06" ||
        createDate_month == "09" ||
        createDate_month == "11"
      ) {
        setDateFun(30);
      }
      function setDateFun(len) {
        var date = new Date().getDate();
        for (var _d = 1; _d <= len; _d++) {
          $list.eq(2).append("<li>" + (_d >= 10 ? _d : "0" + _d) + "</li>");
        }
        $list
          .eq(2)
          .find("li")
          .eq(date - 1)
          .addClass("pick-active"); //一开始默认第几行选中
        $list.eq(2).css("top", (-date + 2 + 1) * liH);
        $list.eq(2).addClass("js_date");
      }
      return this;
    },
    handleEvent: function () {
      //函数绑定
      //this -- Plugin对象
      $list.each(function () {
        var startY = null, //开始的pageY
          endY = null, //结束的pageY
          distY = null, //endY - startY
          cTop = null, //currentTop
          _top = null, //ul.list的top值
          timeS = null, //滚动的开始时间
          distT = null, //每一次滚动的时间差
          speed = null; //速度
        var SE = null;
        var ME = null;
        function startCallBack(e) {
          //这里的this指向当前滑动的$list
          //这里的this指向当前滑动的$list
          if (e.originalEvent.touches) {
            SE = e.originalEvent.targetTouches[0];
            console.log(SE);
          }
          startY = SE.pageY;
          cTop = $(this).position().top;
          timeS = new Date();
        }
        function moveCallBack(e) {
          //这里的this指向当前滑动的$list
          if (e.originalEvent.touches) {
            ME = e.originalEvent.targetTouches[0];
            //console.log(ME)
          }
          var scrollSpeed = pluginThis.options.speed || 2;
          endY = ME.pageY;
          distY = scrollSpeed * (endY - startY);
          //console.log(distY);//往下滑动是正直，往上是负值
          if (cTop + distY > 88) {
            //从顶部往下滑动
            _top = 88;
          } else if (
            cTop + distY <
            $(this).parent().height() - $(this).height() - 88
          ) {
            //从底部往上滑动
            _top = $(this).parent().height() - $(this).height() - 88;
          } else {
            //中间地方滑动
            _top = cTop + distY;
          }
          _top = _top - (_top % liH); //取整
          $(this).css("top", _top);
          if (_top == 44) {
            $(this)
              .find("li")
              .eq(1)
              .addClass("pick-active")
              .siblings()
              .removeClass("pick-active");
          } else if (_top == 88) {
            $(this)
              .find("li")
              .eq(0)
              .addClass("pick-active")
              .siblings()
              .removeClass("pick-active");
          } else {
            $(this)
              .find("li")
              .eq(Math.abs(_top / liH) + 2)
              .addClass("pick-active")
              .siblings()
              .removeClass("pick-active");
          }
        }
        function endCallBack(e) {
          //这里的this指向当前滑动的$list
          var $this = $(this);
          var dir = distY < 0 ? 1 : -1; //方向 上移为1，下移为-1
          distT = new Date() - timeS;
          speed = Math.abs(distY / distT); //单位px/ms
          if (speed > 0.6) {
            /*alert(1)*/
            if (
              dir == 1 &&
              Math.abs(_top / liH) + 3 == $(this).find("li").length
            ) {
              //手指向上滑动
              if (
                $this.attr("class") != "list js_date" &&
                pluginThis.options.pickType == "y:m:d"
              ) {
                //判断闰年下，2月份天数的展示及其它月份天数的展示
                pluginThis.createDate();
              }
              return; //到底了，不能滑了
            } else if (dir == -1 && _top == 88) {
              //手指向下滑动
              if (
                $this.attr("class") != "list js_date" &&
                pluginThis.options.pickType == "y:m:d"
              ) {
                //判断闰年下，2月份天数的展示及其它月份天数的展示
                pluginThis.createDate();
              }
              return; //到顶了，不能滑了
            }
          }
          setTimeout(function () {
            $this.css("top", _top);
            if (_top == 44) {
              $(this)
                .find("li")
                .eq(1)
                .addClass("pick-active")
                .siblings()
                .removeClass("pick-active");
            } else if (_top == 88) {
              $(this)
                .find("li")
                .eq(0)
                .addClass("pick-active")
                .siblings()
                .removeClass("pick-active");
            } else {
              $(this)
                .find("li")
                .eq(Math.abs(_top / liH) + 2)
                .addClass("pick-active")
                .siblings()
                .removeClass("pick-active");
            }
            if (
              $this.attr("class") != "list js_date" &&
              pluginThis.options.pickType == "y:m:d"
            ) {
              //判断闰年下，2月份天数的展示及其它月份天数的展示
              pluginThis.createDate();
            }
          }, 50);
        }
        $(this).off("touchstart").on("touchstart", startCallBack); //下滑开始 这里的this指向plugin对象
        $(this).off("touchmove").on("touchmove", moveCallBack); //滑动的时候 这里的this指向plugin对象
        $(this).off("touchend").on("touchend", endCallBack); //滑动完了 这里的this指向plugin对象
      });
    },
  };
  $.fn[pluginName] = function (options) {
    //do someting
    $(this).click(function () {
      globalThis_launchHtml = this;
      new Plugin(options);
    });
    return this; //返回调用插件的对象，以便支持链式调用
  };
})(jQuery, window, document);
