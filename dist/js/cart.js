"use strict";var _createClass=function(){function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}$(document).ready(function(){function e(){_classCallCheck(this,e),this.$aSid=null,this.$aNum=null}var t=new(_createClass(e,[{key:"getData",value:function(){var n=this,e=document.cookie.split("; ");$(e).each(function(){var e=this.split("=");if("sid"==$(e)[0]){var t=$(e)[1].split(",");n.$aSid=t}else if("num"==$(e)[0]){var a=$(e)[1].split(",");n.$aNum=a}}),this.useAjax()}},{key:"useAjax",value:function(){var a=this;null!==a.$aSid&&$.ajax({type:"post",url:"http://10.31.157.69/TheNorthFace/php/cart.php",data:{goods:a.$aSid},dataType:"json",success:function(e){1<=e.length&&$.each(e,function(e,t){$($('\n                                <tr class="sid'+$(this).eq(0).eq(0).attr("sid")+'">\n                                <td>\n                                    <input style="margin-top:40px;" type="checkbox" class="checkout_cb" value="true" checked="checked" />\n                                </td>\n                                <td>\n                                    <div style="float:left;" class="item-pic">\n                                        <a href="#">\n                                            <img style="width:100px;height:100px;"\n                                                src="'+$(this).eq(0).eq(0).attr("url")+'"\n                                                alt="" />\n                                        </a>\n                                    </div>\n                                    <div style="float:left;width:220px;margin-left:10px;">\n                                        <div class="g-title">\n                                            <a href="http://10.31.157.69/TheNorthFace/dist/html/detail.html#'+a.$aSid[e]+'" target="_blank">'+$(this).eq(0).eq(0).attr("title")+'</a>\n                                        </div>\n                                    </div>\n                                </td>\n                                <td style="padding-top:38px;">\n                                    <p>￥'+$(this).eq(0).eq(0).attr("price")+'.00</p>\n                                </td>\n                                <td style="padding-top:50px;">\n                                    <div class="num-value border-box">\n                                        <span class="less">-</span>\n                                        <span class="value" style="width: 30px;"><input type="text" value="'+a.$aNum[e]+'"></span>\n                                        <span class="more">+</span>\n                                    </div>\n                                </td>\n                                <td style="padding-top:50px;" class="single-price">￥'+a.$aNum[e]*$(this).eq(0).eq(0).attr("price")+'.00</td>\n                                <td style="padding-top:50px;">\n                                    <a href="javascript:;" class="add-in-fav" style="color: #026eb7;">收藏&nbsp;</a>\n                                    　|　\n                                    <a href="javascript:;" class="delete" style="color: #026eb7;">&nbsp;移除</a>\n                                </td>\n                            </tr>\n                                ')).prependTo($(".cart-goods"))}),a.changePrice(),a.removeItem(),a.plus(),a.less(),a.goOn(),a.buy()}})}},{key:"changePrice",value:function(){var a=0;$.each($(".single-price"),function(e,t){a+=parseInt($(this).html().substring(1))}),$(".price b").html("￥"+a+".00")}},{key:"refreshCookie",value:function(e){var t,a=$.inArray(e,this.$aSid);console.log(e),this.$aSid.splice(a,1),this.$aNum.splice(a,1),(t=new Date).setDate(t.getDate()+30),0==this.$aSid.length?((t=new Date).setDate(t.getDate()+-1),document.cookie="sid=;expires="+t,document.cookie="num=;expires="+t):(document.cookie="sid="+this.$aSid+";expires="+t,document.cookie="num="+this.$aNum+";expires="+t)}},{key:"removeItem",value:function(){var a=this;setTimeout(function(){$(".cart-goods").on("click",function(e){if("delete"===e.target.className&&confirm("确认从购物车删除此商品？")){var t=$(e.target).parent().parent().attr("class").substring(3);a.refreshCookie(t),$(e.target).parent().parent().html(""),a.changePrice()}})},100)}},{key:"changeNum",value:function(e,t){var a=$(e).parent().parent().parent().attr("class").substring(3),n=$.inArray(a,this.$aSid);this.$aNum[n]=t;var i=new Date;return i.setDate(i.getDate()+30),document.cookie="sid="+this.$aSid+";expires="+i,document.cookie="num="+this.$aNum+";expires="+i,$("p").eq(n).html().substring(1)}},{key:"plus",value:function(){var n=this;$(".cart-goods").on("click",function(e){if("more"===e.target.className){var t=$(e.target).parent().find(".value input").val();$(e.target).parent().find(".value input").val(parseInt(t)+1),t=parseInt(t)+1;var a=n.changeNum(e.target,t);$(e.target).parent().parent().parent().find(".single-price").html("￥"+t*a+".00"),n.changePrice()}})}},{key:"less",value:function(){var i=this;$(".cart-goods").on("click",function(e){if("less"===e.target.className){var t=$(e.target).parent().find(".value input").val(),a=parseInt(t)-1;a<1&&(a=1,alert("商品最小购买数量为 1 ")),$(e.target).parent().find(".value input").val(a);var n=i.changeNum(e.target,a);$(e.target).parent().parent().parent().find(".single-price").html("￥"+a*n+".00"),i.changePrice()}})}},{key:"goOn",value:function(){$(".shopping").on("click",function(){confirm("您确认离开购物车页面吗，购物车物品将会被保留")&&(location.href="http://10.31.157.69/TheNorthFace/dist/html/main.html")})}},{key:"selectAll",value:function(){$("form table").find(".selectAll").on("click",function(e){var t=$(".checkout_cb");$(this).is(":checked")?t.each(function(){$(this).prop("checked",!0)}):t.each(function(){$(this).prop("checked",!1)});var a=0;$.each($(".checkout_cb:checked"),function(e,t){a+=parseInt($(this).parent().parent().find(".single-price").html().substring(1))}),$(".price b").html("￥"+a+".00")}),$("form table").on("click",function(e){$(e.target).hasClass("checkout_cb")&&($(".checkout_cb:checked").length!==$(".checkout_cb").length?$(".selectAll").prop("checked",!1):$(".selectAll").prop("checked",!0));var a=0;$.each($(".checkout_cb:checked"),function(e,t){a+=parseInt($(this).parent().parent().find(".single-price").html().substring(1))}),$(".price b").html("￥"+a+".00")})}},{key:"buy",value:function(){$(".purchase").on("click",function(){null!==localStorage.getItem("user")?alert("本次共需支付人民币 "+$(".price b").html()+" 元"):(alert("结算前请先登录"),location.href="http://10.31.157.69/TheNorthFace/dist/html/login.html")})}}]),e);t.getData(),t.selectAll()});