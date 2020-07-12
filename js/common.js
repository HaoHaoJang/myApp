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
var domain = "http://121.196.21.9/";
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
