"use strict";var _createClass=function(){function a(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(t,e,i){return e&&a(t.prototype,e),i&&a(t,i),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}!function(c){function t(){_classCallCheck(this,t),this.keyWord=window.location.hash}(new(_createClass(t,[{key:"pushHash",value:function(){c.ajax({type:"post",url:"http://10.31.157.69/TheNorthFace/php/jumpDetail.php",data:{hashValue:this.keyWord.substring(1)},dataType:"json",success:function(t){c(".good-name h1").html(c(t).attr("title")),c(".price").html("￥"+c(t).attr("price")+".00"),c(".compare-price s").html("￥"+c(t).attr("price")+".00"),c(".pic-show img").attr("src",c(t).attr("url")),c(".big-f img").attr("src",c(t).attr("url"));var e=c(t).attr("angle").split(",");c(e).each(function(t,e){c("<li class='border-box'><i></i><img style='width:100%' src='"+e+"' alt=''></li>").appendTo(c(".album-list ul"))}),1<=c(t).attr("color").length&&c(c(t).attr("color").split(",")).each(function(t,e){c('<div style="  \n                            border:1px solid #cccccc;    \n                            display: inline-block;\n                            margin-right: 10px;\n                            cursor: pointer;\n                            vertical-align: top;\n                            box-sizing: border-box;\n                            margin-bottom: 15px;"><a href="javascript:;"><img src="'+e+'" alt="" style="width: 70px;height: 70px;padding: 0;"></a></div>').appendTo(c(".color-pics"))}),c(".album-list ul li").hover(function(){c(".pic-show img").attr("src",c(this).find("img").attr("src")),c(".big-f img").attr("src",c(this).find("img").attr("src"))},function(){});var i=c(t).attr("angle").split(",");c(i).each(function(t,e){c('                <div style="width: 100%">\n                        <img style="width: 100%" src="'+e+'" alt="">\n                    </div>').appendTo(c(".inner-detail"))})}}),this.scale(),this.addNum(),this.addInCart()}},{key:"scale",value:function(){c(".small-f").css({width:300,height:300}),c(".pic-show").on("mouseover",function(t){c(".small-f").show(),c(".big-f").show(),t||window.event,c(document).on("mousemove",function(t){var e=t||window.event,i=e.pageX-c(".pic-show").offset().left-150,a=e.pageY-c(".pic-show").offset().top-150;i<=0?i=0:300<=i&&(i=300),a<=0?a=0:300<=a&&(a=300),c(".small-f").css({left:i,top:a}),c(".big-f img").css({left:2*-i,top:2*-a})}),c(".pic-show").on("mouseout",function(){c(".small-f").hide(),c(".big-f").hide(),c(document).unbind("mousemove"),c(".pic-show").unbind("mouseout")})})}},{key:"addNum",value:function(){c(".less").on("click",function(){var t=c(".value input").val();t-1<=0?t=1:t-=1,c(".value input").val(t)}),c(".more").on("click",function(){var t=c(".value input").val();t=Number(t)+1,c(".value input").val(t)})}},{key:"addInCart",value:function(){c(".addIn").on("click",function(){var t=Array(window.location.hash.substring(1)),e=Array(c(".num-value input").val());if(""!==document.cookie){var i=document.cookie.split("; "),a=Array(),n=Array();if(c(i).each(function(){var t=this.split("=");if("sid"==c(t)[0]){var e=c(t)[1].split(",");a=e}else if("num"==c(t)[0]){var i=c(t)[1].split(",");n=i}}),-1!=c.inArray(t[0],a)){var s=c.inArray(t[0],a);n[s]=parseInt(e[0])+parseInt(n[s]),(o=new Date).setDate(o.getDate()+30),document.cookie="sid="+a+";expires="+o,document.cookie="num="+n+";expires="+o,c("#sub-cart .total").eq(s).html("x"+n[s]+"件"),c("#sub-cart").addClass("show"),confirm("是否确认加入购物车")&&location.reload()}else(o=new Date).setDate(o.getDate()+30),a.push(t[0]),n.push(e[0]),console.log(a),document.cookie="sid="+a+";expires="+o,document.cookie="num="+n+";expires="+o,setTimeout(function(){c('                      <div class="cartItem" style="">\n                                    <div class="pic">\n                                        <img style="width:100%" src="'+c(".pic-show img").attr("src")+'" alt="">\n                                    </div>\n                                    <div class="title">\n                                       <a href="http://10.31.157.69/TheNorthFace/dist/html/detail.html#'+t[0]+'" target="_blank">'+c(".good-name h1").html()+'</a>\n                                    </div>\n                                    <div class ="other">\n                                        <span class="total">x'+e[0]+'件</span><a href="javascript:;" class="remove '+t[0]+'">移除</a>\n                                    </div>\n                                </div>').appendTo(c("#sub-cart .item")),confirm("是否确认加入购物车")&&location.reload()})}else{var o;console.log("空"),(o=new Date).setDate(o.getDate()+30),document.cookie="sid="+t+";expires="+o,document.cookie="num="+e+";expires="+o,setTimeout(function(){c('<div class="cartItem" style="">\n                           <div class="pic">\n                           <img style="width:100%" src="'+c(".pic-show img").attr("src")+'" alt="">\n                           </div>\n                           <div class="title">\n                           <a href="http://10.31.157.69/TheNorthFace/dist/html/detail.html#'+t[0]+'" target="_blank">'+c(".good-name h1").html()+'</a>\n                           </div>\n                           <div class ="other">\n                           <span class="total">x'+e[0]+'件</span><a href="javascript:;" class="remove '+t[0]+'">移除</a>\n                           </div>\n                           </div>').prependTo(c("#sub-cart")),confirm("是否确认加入购物车")&&location.reload()})}})}}]),t)).pushHash()}(jQuery);