$(".back").click(function () {
  window.history.back();
});
!(function (n) {
  var e = n.document,
    t = e.documentElement,
    i = 340,
    d = i / 10,
    o = "orientationchange" in n ? "orientationchange" : "resize",
    a = function () {
      var n = t.clientWidth || 320;
      n > 640 && (n = 640), (t.style.fontSize = n / d + "px");
    };
  e.addEventListener &&
    (n.addEventListener(o, a, !1),
    e.addEventListener("DOMContentLoaded", a, !1));
})(window);
var domain = "http://121.196.21.9/ekp";
// 全局template配置格式化url
template.defaults.imports.domain = domain;

function ajax(options) {
  options = options || {}; //调用函数时如果options没有指定，就给它赋值{},一个空的Object
  options.type = (options.type || "GET").toUpperCase(); /// 请求格式GET、POST，默认为GET
  options.dataType = options.dataType || "json"; //响应数据格式，默认json
  var params = formatParams(options.data); //options.data请求的数据
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveObject) {
    //兼容IE6以下版本
    xhr = new ActiveXobject("Microsoft.XMLHTTP");
  }
  //启动并发送一个请求
  if (options.type == "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  } else if (options.type == "POST") {
    xhr.open("post", options.url, true);

    //设置表单提交时的内容类型
    //Content-type数据请求的格式
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
  }
  //    设置有效时间
  setTimeout(function () {
    if (xhr.readyState != 4) {
      xhr.abort();
    }
  }, options.timeout);
  //    接收
  //     options.success成功之后的回调函数  options.error失败后的回调函数
  //xhr.responseText,xhr.responseXML  获得字符串形式的响应数据或者XML形式的响应数据
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if ((status >= 200 && status < 300) || status == 304) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.error && options.error(status);
      }
    }
  };
}

//格式化请求参数
function formatParams(data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  arr.push(("v=" + Math.random()).replace(".", ""));
  return arr.join("&");
}

function ajaxMothed(url, params, type) {
  var defer = $.Deferred();
  ajax({
    url: domain + url,
    type: type || "get",
    data: params,
    dataType: "json",
    timeout: 100000,
    contentType: "application/json",
    success: function (data) {
      console.log(data, 333333);
      var data = JSON.parse(data);
      if (data.success) {
        defer.resolve(data);
      } else {
        defer.reject(data);
      }
    },
    //异常处理
    error: function (e) {
      defer.reject(e);
    },
  });
  return defer;
}
// template 模版名，data元数据,isAppend,是append还是html container模版容器
function render(container, templateName, data, isAppend) {
  var html = template(templateName, {
    list: data,
  });
  if (isAppend) {
    $(container).append(html);
  } else {
    $(container).html(html);
  }
}
/**
 * [获取URL中的参数名及参数值的集合]
 * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
 * @param {[string]} urlStr [当该参数不为空的时候，则解析该url中的参数集合]
 * @return {[string]}       [参数集合]
 */
function GetRequest(urlStr) {
  if (typeof urlStr == "undefined") {
    var url = decodeURI(location.search); //获取url中"?"符后的字符串
  } else {
    var url = "?" + urlStr.split("?")[1];
  }
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
//  下拉滚动 开启
var _scrollFresh = false,
  _scrollPageNo = 1,
  _scrollTotalPage = null;
// 设置下拉滚动开关
function resetFresh() {
  _scrollFresh = false;
}
// 初始化当前页
function resetPageNo() {
  _scrollPageNo = 1;
}
// 设置加载更多的文案
function setLoadMore() {
  $(".weui-loadmore .weui-loading").hide();
  $(".weui-loadmore .weui-loadmore__tips").text("下拉加载更多");
}
// 设置加载完成文案
function setLoadFinish() {
  $(".weui-loadmore .weui-loading").hide();
  $(".weui-loadmore .weui-loadmore__tips").text("已加载完成");
}
function setScrollPage() {
  if (_scrollPageNo < _scrollTotalPage) {
    _scrollPageNo++;
    setLoadMore();
    // 开启下拉加载
    resetFresh();
  } else {
    // 加载完成
    setLoadFinish();
  }
}
/**
 * 滚动加载
 * @param {} callback
 */
function pageScroll(callback, pageNo, total) {
  $(document.body)
    .infinite()
    .on("infinite", function () {
      if (_scrollFresh) return;
      _scrollFresh = true;
      callback();
    });
}
function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
