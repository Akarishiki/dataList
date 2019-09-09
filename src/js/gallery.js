(function($){
    let $close = $("h3");
    $close.on("click",function(){//侧边栏收缩
        let $aUls = $(".left-bar ul");
        if($($aUls).eq($(this).index("h3")).hasClass("hide")){
            $($aUls).eq($(this).index("h3")).removeClass("hide");
        }else{
            $($aUls).eq($(this).index("h3")).addClass("hide");
        }
    })

    $.ajax({//商品列表渲染
        url: "http://10.31.157.69/TheNorthFace/php/banner.php",
        data: {
            "class": "goods"
        }
    }).done(function (data) {
        let $a = JSON.parse(data);
        console.log($a)
        //渲染资源
        $($a).each(function (index, value) {
            let $url = value.url;
            let $title = value.title;
            let $price = value.price;
            let $sid = value.sid;
            $(`<li><div class="goods-content"><a href="${"http://10.31.157.69/TheNorthFace/dist/html/detail.html"+"#"+$sid}" target="_blank" class="main-pic"><img style="width:215px;height:215px" src="${$url}" alt=""></a><h3 class="title">${$title}</h3><p class="price">${"￥"+$price+".00"}</p><div class="otherPics"></div></div></li>`).appendTo(".goodsList ul");
        })
    });
})(jQuery)