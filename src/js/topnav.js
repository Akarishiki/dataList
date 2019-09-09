(function ($) {

    class NavCart {
        constructor() {
            this.container = $(".sub-cart");
            this.$aSid = null;
            this.$aNum = null;
        };
        getData() {
            let $this = this;
            let $aCookie = document.cookie.split("; ");
            let $aSid = Array();
            let $aNum = Array();
            $($aCookie).each(function () {
                let $oneData = this.split("=");
                if ($($oneData)[0] == "sid") {
                    let $info = $($oneData)[1].split(",");
                    $this.$aSid = $info;
                } else if ($($oneData)[0] == "num") {
                    let $info = $($oneData)[1].split(",");
                    $this.$aNum = $info;
                }
            })
            this.useAjax();
        }
        useAjax() {
            let $this = this;
            if ($this.$aSid !== null) {
                $.ajax({
                    type: "post",
                    url: "http://10.31.157.69/TheNorthFace/php/cart.php",
                    data: {
                        goods: $this.$aSid
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.length >= 1) {
                            $.each(data, function (index, value) {
                                setTimeout(function () {
                                    $(`                      <div class="cartItem" style="">
                                 <div class="pic">
                                     <img style="width:100%" src="${$(this).eq(0).eq(0).attr("url")}" alt="">
                                 </div>
                                 <div class="title">
                                    <a href="http://10.31.157.69/TheNorthFace/dist/html/detail.html#${$this.$aSid[index]}" target="_blank">${$(this).eq(0).eq(0).attr("title")}</a>
                                 </div>
                                 <div class ="other">
                                     <span class="total">x${$this.$aNum[index]}件</span><a href="javascript:;" class="remove ${$this.$aSid[index]}">移除</a>
                                 </div>
                             </div>`).appendTo($("#sub-cart .item"));
                                    $(".none").css("display", "none");
                                }.bind(this), 100)
                            });
                        } else {
                            $(".none").css("display", "block");
                        }
                        $this.delete();
                    }
                });
            }
        }
        delete() {
            let $this = this
            setTimeout(function () {
                $("#sub-cart").on("click", function (e) {
                    if (e.target.className.indexOf("remove") !== -1) {
                        $(e.target).parent().parent().hide();
                        let $index = jQuery.inArray(e.target.className.substring(7), $this.$aSid);
                        console.log(  $index,$this.$aSid)
                        $this.$aSid.splice($index, 1);
                        $this.$aNum.splice($index, 1);
                        console.log( $this.$aSid)
                        var d = new Date();
                        d.setDate(d.getDate() + 30);
                        if ($this.$aSid.length == 0) {
                            $(".none").show();
                            var d = new Date();
                            d.setDate(d.getDate() + -1);
                            document.cookie = "sid" + '=' + "" + ';expires=' + d;
                            document.cookie = "num" + '=' + "" + ';expires=' + d;
                        } else {
                            $(".none").hide();
                            document.cookie = "sid" + '=' + $this.$aSid + ';expires=' + d;
                            document.cookie = "num" + '=' + $this.$aNum + ';expires=' + d;
                        }
                    }
                })
            }, 100)
        }
    }
    let $cart = new NavCart();
    $cart.getData();
    setTimeout(function(){
        if(localStorage.getItem("user")!==null){
            $(".member-in span").show();
            $(".member-in span").css({
                'margin-left':'-30px',
                'cursor':'pointer',
                'font-size':'12px'
            })
            $(".member-in span").html(`欢迎您 ${localStorage.getItem("user")}用户`);
            $(".member-in span").on("click",function(){
                if(confirm("是否退出登录？")){
                    localStorage.removeItem("user");
                    location.reload();
                }  
            })
            $(".member-in a").hide();
        }else{
            $(".member-in span").hide();
        }
    },100)
})(jQuery)  