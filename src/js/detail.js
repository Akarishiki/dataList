(function ($) {
    class requestInfo {
        constructor() {
            this.keyWord = window.location.hash;
        };
        pushHash() {
            $.ajax({
                type: "post",
                url: "http://10.31.157.69/TheNorthFace/php/jumpDetail.php",
                data: {
                    hashValue: this.keyWord.substring(1)
                },
                dataType: "json",
                success: function (data) {
                    $(".good-name h1").html($(data).attr("title"));
                    $(".price").html("￥" + $(data).attr("price") + ".00");
                    $(".compare-price s").html("￥" + $(data).attr("price") + ".00");
                    $(".pic-show img").attr("src", $(data).attr("url"));
                    $(".big-f img").attr("src", $(data).attr("url"));
                    let $anglepics = $(data).attr("angle").split(",");
                    $($anglepics).each(function (index, value) {
                        $(`<li class='border-box'><i></i><img style='width:100%' src='${value}' alt=''></li>`).appendTo($(".album-list ul"));
                    })
                    if ($(data).attr("color").length >= 1) {
                        $($(data).attr("color").split(",")).each(function (index, value) {
                            $(`<div style="  
                            border:1px solid #cccccc;    
                            display: inline-block;
                            margin-right: 10px;
                            cursor: pointer;
                            vertical-align: top;
                            box-sizing: border-box;
                            margin-bottom: 15px;"><a href="javascript:;"><img src="${value}" alt="" style="width: 70px;height: 70px;padding: 0;"></a></div>`).appendTo($(".color-pics"))
                        })
                    }

                    $(".album-list ul li").hover(function () {
                        // over
                        $(".pic-show img").attr("src", $(this).find("img").attr("src"));
                        $(".big-f img").attr("src", $(this).find("img").attr("src"));
                    }, function () {
                        // out
                        // $(".pic-show img").attr("src", $(data).attr("url"));
                    });
                    let $detailInfo = $(data).attr("angle").split(",");
                    $($detailInfo).each(function(index,value){
                        $(`                <div style="width: 100%">
                        <img style="width: 100%" src="${value}" alt="">
                    </div>`).appendTo($(".inner-detail"))
                    })
                }
            });
            this.scale();
            this.addNum();
            this.addInCart();
        }
        scale() {
            $(".small-f").css({
                width: 300,
                height: 300
            });
            $(".pic-show").on("mouseover", function (e) {
                $(".small-f").show();
                $(".big-f").show();
                let $e = e || window.event;
                $(document).on("mousemove", function (e) {
                    let $e = e || window.event;
                    let $goLeft = $e.pageX - $(".pic-show").offset().left - 150;
                    let $goTop = $e.pageY - $(".pic-show").offset().top - 150;
                    if ($goLeft <= 0) {
                        $goLeft = 0
                    } else if ($goLeft >= 300) {
                        $goLeft = 300
                    }
                    if ($goTop <= 0) {
                        $goTop = 0
                    } else if ($goTop >= 300) {
                        $goTop = 300
                    }
                    $(".small-f").css({
                        left: $goLeft,
                        top: $goTop
                    })
                    $(".big-f img").css({
                        left: -$goLeft * 2,
                        top: -$goTop * 2
                    })
                })
                $(".pic-show").on("mouseout", function () {
                    $(".small-f").hide();
                    $(".big-f").hide();
                    $(document).unbind("mousemove");
                    $(".pic-show").unbind("mouseout");
                })

            })
        }
        addNum() {
            $(".less").on("click", function () {
                let $nowValue = $(".value input").val();
                if ($nowValue - 1 <= 0) {
                    $nowValue = 1;
                } else {
                    $nowValue = $nowValue - 1
                }
                $(".value input").val($nowValue)
            })
            $(".more").on("click", function () {
                let $nowValue = $(".value input").val();
                $nowValue = Number($nowValue) + 1
                $(".value input").val($nowValue)
            })
        }
        addInCart() {
            $(".addIn").on("click", function () {
                //当前产品的sid和购买数量
                let $sid = Array(window.location.hash.substring(1));
                let $num = Array($(".num-value input").val());
                //抽取cookie数据查看是否是初次选择
                if (document.cookie !== "") {
                    let $aCookie = document.cookie.split("; ");
                    let $aSid = Array();
                    let $aNum = Array();
                    $($aCookie).each(function () {
                        let $oneData = this.split("=");
                        if ($($oneData)[0] == "sid") {
                            let $info = $($oneData)[1].split(",");
                            $aSid = $info;
                        } else if ($($oneData)[0] == "num") {
                            let $info = $($oneData)[1].split(",");
                            $aNum = $info;
                        }
                    })
                    if ($.inArray($sid[0], $aSid) != -1) {
                        //     //产品列表已存在购物车，获取当前存储的数量叠加当前数量
                        let $index = $.inArray($sid[0], $aSid);
                        $aNum[$index] = parseInt($num[0]) + parseInt($aNum[$index]);
                        var d = new Date();
                        d.setDate(d.getDate() + 30);
                        document.cookie = "sid" + '=' + $aSid + ';expires=' + d;
                        document.cookie = "num" + '=' + $aNum + ';expires=' + d;
                        //重新渲染数量
                        $("#sub-cart .total").eq($index).html("x" + $aNum[$index] + "件");
                        $("#sub-cart").addClass("show");
                        if(confirm("是否确认加入购物车")){
                            location.reload()
                        }
                        // setTimeout(function () {
                        //     $("#sub-cart").removeClass("show")
                        // }, 5000);
                    } else {
                        //     //产品列表不存在购物车，添加进cookie
                        var d = new Date();
                        d.setDate(d.getDate() + 30);
                        $aSid.push($sid[0]);
                        $aNum.push($num[0])
                        console.log($aSid)
                        document.cookie = "sid" + '=' + $aSid + ';expires=' + d;
                        document.cookie = "num" + '=' + $aNum + ';expires=' + d;
                        //渲染进列表
                        setTimeout(function () {
                            $(`                      <div class="cartItem" style="">
                                    <div class="pic">
                                        <img style="width:100%" src="${$(".pic-show img").attr("src")}" alt="">
                                    </div>
                                    <div class="title">
                                       <a href="http://10.31.157.69/TheNorthFace/dist/html/detail.html#${$sid[0]}" target="_blank">${$(".good-name h1").html()}</a>
                                    </div>
                                    <div class ="other">
                                        <span class="total">x${$num[0]}件</span><a href="javascript:;" class="remove ${$sid[0]}">移除</a>
                                    </div>
                                </div>`).appendTo($("#sub-cart .item"))
                                if(confirm("是否确认加入购物车")){
                                    location.reload()
                                }
                        })
                        // $("#sub-cart").addClass("show");
                        // setTimeout(function () {
                        //     $("#sub-cart").removeClass("show")
                        // }, 5000);
                    }
                } else {
                    console.log("空")
                    var d = new Date();
                    d.setDate(d.getDate() + 30);
                    document.cookie = "sid" + '=' + $sid + ';expires=' + d;
                    document.cookie = "num" + '=' + $num + ';expires=' + d;
                    //渲染进列表
                    setTimeout(function () {
                        $(`<div class="cartItem" style="">
                           <div class="pic">
                           <img style="width:100%" src="${$(".pic-show img").attr("src")}" alt="">
                           </div>
                           <div class="title">
                           <a href="http://10.31.157.69/TheNorthFace/dist/html/detail.html#${$sid[0]}" target="_blank">${$(".good-name h1").html()}</a>
                           </div>
                           <div class ="other">
                           <span class="total">x${$num[0]}件</span><a href="javascript:;" class="remove ${$sid[0]}">移除</a>
                           </div>
                           </div>`).prependTo($("#sub-cart"))
                           if(confirm("是否确认加入购物车")){
                            location.reload()
                        }
                    })
                    // $(".none").css("display","none");
                    // $("#sub-cart").addClass("show");
                    // setTimeout(function () {
                    //     $("#sub-cart").removeClass("show")
                    // }, 5000);
                }
            })
        }
    }
    let test = new requestInfo();
    test.pushHash();
})(jQuery)