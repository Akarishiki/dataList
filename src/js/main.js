"use strict";

(function ($) {
    class Banner {
        constructor() { }
        useAjax() {
            let _this = this;
            $.ajax({
                //轮播图素材
                url: "http://10.31.157.69/TheNorthFace/php/banner.php",
                data: {
                    class: "banner"
                },
                success: function (data) {
                    let $a = JSON.parse(data);
                    let $url = $($a)
                        .eq(1)
                        .attr("url");
                    $(".banner")
                        .find("ul li a .last")
                        .attr("src", $url);
                    let $url2 = $($a)
                        .eq(0)
                        .attr("url");
                    $(".banner")
                        .find("ul li a .first")
                        .attr("src", $url2);
                    $(".dots ul li")
                        .eq(0)
                        .addClass("active");
                    _this.bannerMove();
                }
            });
        }
        bannerMove() {
            let _this = this;
            let $left = $(".arrow-left");
            let $right = $(".arrow-right");
            let $oUl = $(".banner ul");
            let $index = 1;
            let $distance = parseInt($(".banner ul li a").width());
            let $flag = true;
            let $autoTimer = null;
            $($left).on("click", function () {
                if ($flag === true) {
                    console.log(123);
                    $flag = false;
                    $($oUl)
                        .stop(true)
                        .animate({ left: -($index - 1) * $distance }, 500);
                    if ($index <= 1) {
                        let timer = null;
                        timer = setInterval(function () {
                            if ($($oUl).offset().left == 0) {
                                $($oUl).css("left", -1519 * 2);
                                $index = 2;
                                clearInterval(timer);
                            }
                        });
                    }
                    $index--;
                    $(".banner .dots ul li").removeClass("active");
                    $(".banner .dots ul li")
                        .eq(Math.abs($index - 1))
                        .addClass("active");
                    setTimeout(function () {
                        $flag = true;
                    }, 500);
                    return false;
                } else {
                }
            });
            $($right).on("click", function () {
                if ($flag === true) {
                    $flag = false;
                    $($oUl)
                        .stop(true)
                        .animate({ left: -($index + 1) * $distance }, 300);
                    if ($index >= 2) {
                        let timer1 = null;
                        timer1 = setInterval(function () {
                            if ($($oUl).offset().left == -4557) {
                                $($oUl).css("left", -1519);
                                $index = 1;
                                clearInterval(timer1);
                            }
                        });
                    }
                    $(".banner .dots ul li").removeClass("active");
                    $(".banner .dots ul li")
                        .eq(Math.abs($index % 2))
                        .addClass("active");
                    $index++;
                    setTimeout(function () {
                        $flag = true;
                    }, 500);
                }
            });
            $(".banner").hover(
                function () {
                    // over
                    clearInterval($autoTimer);
                },
                function () {
                    // out
                    $autoTimer = setInterval(function () {
                        $($oUl)
                            .stop(true)
                            .animate({ left: -($index + 1) * $distance }, 300);
                        if ($index >= 2) {
                            let timer1 = null;
                            timer1 = setInterval(function () {
                                if ($($oUl).offset().left == -4557) {
                                    $($oUl).css("left", -1519);
                                    $index = 1;
                                    clearInterval(timer1);
                                }
                            });
                        }
                        $(".banner .dots ul li").removeClass("active");
                        $(".banner .dots ul li")
                            .eq(Math.abs($index % 2))
                            .addClass("active");
                        $index++;
                    }, 4000);
                }
            );
            $autoTimer = setInterval(function () {
                $($oUl)
                    .stop(true)
                    .animate({ left: -($index + 1) * $distance }, 300);
                if ($index >= 2) {
                    let timer1 = null;
                    timer1 = setInterval(function () {
                        if ($($oUl).offset().left == -4557) {
                            $($oUl).css("left", -1519);
                            $index = 1;
                            clearInterval(timer1);
                        }
                    });
                }
                $(".banner .dots ul li").removeClass("active");
                $(".banner .dots ul li")
                    .eq(Math.abs($index % 2))
                    .addClass("active");
                $index++;
            }, 4000);
        }
    }
    let $banner = new Banner();
    $banner.useAjax();

    class TriInOne {
        constructor() { }
        useAjax() {
            $.ajax({
                //三合一宣传图
                url: "http://10.31.157.69/TheNorthFace/php/banner.php",
                data: {
                    class: "3in1"
                }
            }).done(function (data) {
                let $a = JSON.parse(data);
                let $imgs = $(".three-in-one").find("img");
                $($imgs).each(function (index, value) {
                    let $url = $($a)
                        .eq(index)
                        .attr("url");
                    $(this).attr("src", $url);
                });
            });
        }
    }
    let $threeIn1 = new TriInOne();
    $threeIn1.useAjax();

    class Wear {
        constructor() { }
        useAjax() {
            let $this = this;
            $.ajax({
                //穿搭搭配
                url: "http://10.31.157.69/TheNorthFace/php/banner.php",
                data: {
                    class: "4in1"
                }
            }).done(function (data) {
                let $a = JSON.parse(data);
                let $imgs = $(".likeItems").find("img");
                $($imgs).each(function (index, value) {
                    let $url = $($a)
                        .eq(0)
                        .attr("url");
                    $(this).attr("src", $url);
                });
                $(".likeNav li")
                    .eq(0)
                    .css({
                        "border-bottom": "2px solid #000000",
                        color: "#000000"
                    });
                $(".likeNav li").on("click", function () {
                    $(".likeNav li").css({
                        "border-bottom": "none",
                        color: "#787878"
                    });
                    $(this).css({
                        "border-bottom": "2px solid #000000",
                        color: "#000000"
                    });
                    if ($(".likeNav li").index($(this)) == 0) {
                        $($imgs).each(function (index, value) {
                            let $url = $($a)
                                .eq(0)
                                .attr("url");
                            $(this).attr("src", $url);
                        });
                    } else {
                        $($imgs).each(function (index, value) {
                            let $url = $($a)
                                .eq(0)
                                .attr("angle");
                            $(this).attr("src", $url);
                        });
                    }
                });
                $this.nextStep();
            });
        }
        nextStep(){
            $(".likeItems li").each(function(){
                $(this).hover(function () {
                        // over
                        $(this).find(".bg").css("display","block")
                    }, function () {
                        // out
                        $(this).find(".bg").css("display","none")
                    }
                );
            })
            $(".bg input").on("click",function(){
                alert("想多了，这么短时间怎么写得完")
            })
        }
    }
    let $wearMatch = new Wear();
    $wearMatch.useAjax();

    class DownBanner {
        constructor() { }
        useAjax() {
            $.ajax({
                //底部轮播图
                url: "http://10.31.157.69/TheNorthFace/php/banner.php",
                data: {
                    class: "banner2"
                }
            }).done(function (data) {
                let $a = JSON.parse(data);
                let $imgs = $(".sub-banner").find("img");
                $($imgs).each(function (index, value) {
                    let $url = $($a)
                        .eq(index)
                        .attr("url");
                    $(this).attr("src", $url);
                });
            });
        }
    }
    let $subBanner = new DownBanner();
    $subBanner.useAjax();

    class Goodsales {
        constructor() { }
        useAjax() {
            $.ajax({
                //畅销产品轮播
                url: "http://10.31.157.69/TheNorthFace/php/banner.php",
                data: {
                    class: "goods"
                }
            }).done(function (data) {
                let $a = JSON.parse(data);
                //渲染图片
                $.each($a, function (index, value) {
                    $(`
                <li>
                <img src="${$(this).attr("url")}" alt="" />
                <div>
                    <a href="http://10.31.157.69/TheNorthFace/dist/html/detail.html#${$(
                        this
                    ).attr("sid")}" style="display: block;">${$(this).attr(
                        "title"
                    )}</a>
                    <span>￥${$(this).attr("price")}.00</span>
                    <d>￥${$(this).attr("price")}.00</d>
                </div>
            </li>
                `).prependTo($(".recommend-wrapper ul"));
                });
            });
        }
        picMove(){
            let $aL = $(".arL");
            let $ar = $(".arR");
            let $mUl = $(".recommend-wrapper ul");
            // $($merge).prependTo($(".recommend-wrapper ul li"));
            $aL.on("click",function(){
                $($mUl).animate({left:0},300)              
            })
            $ar.on("click",function(){
                $($mUl).animate({left:-867},300)              
            })
        }
    }
    let $goods = new Goodsales();
    $goods.useAjax();
    $goods.picMove();

    function ele() {
        $(".ele").css("display", "none");
        $(".ele div").eq(0).find("a").on("click",function(){
            $("html,body").animate({ scrollTop: 1200 }, 500);
        })
        $(".ele div").eq(1).find("a").on("click",function(){
            $("html,body").animate({ scrollTop: 2400 }, 500);
        })
        $(window).on("scroll", function () {
            let $top = $(window).scrollTop();
            console.log($top)
            if ($top >= 1200 && $top < 2400) {
                $(".ele").css("display", "block");
                $(".ele div").css({background: "#ddd"}).find("a").css("color", "black");
                $(".ele div").eq(0).css({background: "black"}).find("a").css("color", "white");
            }else if($top >= 2400){
                $(".ele div").css({background: "#ddd"}).find("a").css("color", "black");
                $(".ele div").eq(1).css({background: "black"}).find("a").css("color", "white");
            }
             else {
                $(".ele").css("display", "none");
            }
        });
        $(".ele div .bt").on("click", function () {
            $("html,body").animate({ scrollTop: 0 }, 500);
        });
    }
    ele();
})(jQuery);
