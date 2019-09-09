
$(document).ready(function () {
    class Cart {
        constructor() {
            this.$aSid = null;
            this.$aNum = null;
        };
        getData() {
            let $this = this;
            let $aCookie = document.cookie.split("; ");
            // let $aSid = Array();
            // let $aNum = Array();
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
                        if (data.length>=1) {
                            console.log(data);
                            $.each(data, function (index, value) {
                                $($(`
                                <tr class="sid${$(this).eq(0).eq(0).attr("sid")}">
                                <td>
                                    <input style="margin-top:40px;" type="checkbox" class="checkout_cb" value="true" checked="checked" />
                                </td>
                                <td>
                                    <div style="float:left;" class="item-pic">
                                        <a href="#">
                                            <img style="width:100px;height:100px;"
                                                src="${$(this).eq(0).eq(0).attr("url")}"
                                                alt="" />
                                        </a>
                                    </div>
                                    <div style="float:left;width:220px;margin-left:10px;">
                                        <div class="g-title">
                                            <a href="http://10.31.157.69/TheNorthFace/dist/html/detail.html#${$this.$aSid[index]}" target="_blank">${$(this).eq(0).eq(0).attr("title")}</a>
                                        </div>
                                    </div>
                                </td>
                                <td style="padding-top:38px;">
                                    <p>￥${$(this).eq(0).eq(0).attr("price")}.00</p>
                                </td>
                                <td style="padding-top:50px;">
                                    <div class="num-value border-box">
                                        <span class="less">-</span>
                                        <span class="value" style="width: 30px;"><input type="text" value="${$this.$aNum[index]}" disabled></span>
                                        <span class="more">+</span>
                                    </div>
                                </td>
                                <td style="padding-top:50px;" class="single-price">￥${$this.$aNum[index] * $(this).eq(0).eq(0).attr("price")}.00</td>
                                <td style="padding-top:50px;">
                                    <a href="javascript:;" class="add-in-fav" style="color: #026eb7;">收藏&nbsp;</a>
                                    　|　
                                    <a href="javascript:;" class="delete" style="color: #026eb7;">&nbsp;移除</a>
                                </td>
                            </tr>
                                `)).prependTo($(".cart-goods"));
                            });
                        }else{
                            $this.goOn();
                            $this.buy();
                        }
                        $this.goOn();
                        $this.buy();
                        $this.changePrice();
                        $this.removeItem();
                        $this.plus();
                        $this.less();
                    }
                });
            }
        }
        changePrice() {
            let $total = 0;
            $.each($(".single-price"), function (index, value) {
                $total += parseInt($(this).html().substring(1));
            });

            $(".price b").html(`￥${$total}.00`)
        }
        refreshCookie($index) {
            let $newIndex = $.inArray($index, this.$aSid)
            console.log($index)
            this.$aSid.splice($newIndex, 1);
            this.$aNum.splice($newIndex, 1);
            var d = new Date();
            d.setDate(d.getDate() + 30);
            if (this.$aSid.length == 0) {
                var d = new Date();
                d.setDate(d.getDate() + -1);
                document.cookie = "sid" + '=' + "" + ';expires=' + d;
                document.cookie = "num" + '=' + "" + ';expires=' + d;
            } else {
                document.cookie = "sid" + '=' + this.$aSid + ';expires=' + d;
                document.cookie = "num" + '=' + this.$aNum + ';expires=' + d;
            }
        }
        removeItem() {
            let $this = this
            setTimeout(function () {
                $(".cart-goods").on("click", function (e) {
                    if (e.target.className === "delete") {
                        if(confirm("确认从购物车删除此商品？")){
                                                    //先更新cookie
                        let $index = $(e.target).parent().parent().attr("class").substring(3);
                        $this.refreshCookie($index)
                        //内容更新为空
                        $(e.target).parent().parent().html("");
                        $this.changePrice();
                        }
                    }
                    // let $index = $(e.target)[0];
                })
            }, 100)
        }
        changeNum(target, value) {
            let $index = $(target).parent().parent().parent().attr("class").substring(3);
            let $newIndex = $.inArray($index, this.$aSid)
            this.$aNum[$newIndex] = value;
            var d = new Date();
            d.setDate(d.getDate() + 30);
            document.cookie = "sid" + '=' + this.$aSid + ';expires=' + d;
            document.cookie = "num" + '=' + this.$aNum + ';expires=' + d;
            return $("p").eq($newIndex).html().substring(1)
        }
        plus() {
            let $this = this;
            $(".cart-goods").on("click", function (e) {
                if (e.target.className === "more") {
                    let $nowVal = $(e.target).parent().find(".value input").val();
                    $(e.target).parent().find(".value input").val(parseInt($nowVal) + 1);
                    $nowVal = parseInt($nowVal) + 1;
                    //找到对应sid
                    let $price = $this.changeNum(e.target, $nowVal);
                    // $("p").html()
                    $(e.target).parent().parent().parent().find(".single-price").html(`￥${$nowVal * $price}.00`)
                    $this.changePrice();
                }
            })
        }
        less() {
            let $this = this;
            $(".cart-goods").on("click", function (e) {
                if (e.target.className === "less") {
                    let $nowVal = $(e.target).parent().find(".value input").val();
                    let $result = parseInt($nowVal) - 1;
                    if($result<1){
                        $result = 1
                        alert("商品最小购买数量为 1 ")
                    }
                    $(e.target).parent().find(".value input").val($result);
                    let $price = $this.changeNum(e.target, $result);
                    $(e.target).parent().parent().parent().find(".single-price").html(`￥${$result * $price}.00`)
                    $this.changePrice();
                }
            })
        }
        goOn() {
            $(".shopping").on("click", function () {
                if (confirm("您确认离开购物车页面吗，购物车物品将会被保留")) {
                    location.href = "http://10.31.157.69/TheNorthFace/dist/html/main.html"
                }
            })
        }
        selectAll() {
            let $this = this;
            $("form table").find(".selectAll").on("click", function (e) {
                let $aInputs = $(".checkout_cb");
                if ($(this).is(":checked")) {
                    $aInputs.each(function () {
                        $(this).prop("checked", true)
                    })
                } else {
                    $aInputs.each(function () {
                        $(this).prop("checked", false)
                    })
                }


                let $total = 0;
                $.each($(".checkout_cb:checked"), function (index, value) {
                    $total += parseInt($(this).parent().parent().find(".single-price").html().substring(1));
                });
                $(".price b").html(`￥${$total}.00`)
            })


            $("form table").on("click", function (e) {
                if ($(e.target).hasClass("checkout_cb")) {
                    let $update = $(".checkout_cb:checked");
                    if ($update.length !== $(".checkout_cb").length) {
                        $(".selectAll").prop("checked", false)
                    } else {
                        $(".selectAll").prop("checked", true)
                    }
                }
                let $total = 0;
                $.each($(".checkout_cb:checked"), function (index, value) {
                    $total += parseInt($(this).parent().parent().find(".single-price").html().substring(1));
                });
                $(".price b").html(`￥${$total}.00`)
            })
        }
        buy(){
            $(".purchase").on("click",function(){
                if(localStorage.getItem("user")!==null){
                   alert(`本次共需支付人民币 ${$(".price b").html()} 元`)
                }else{
                    alert("结算前请先登录");
                    location.href = "http://10.31.157.69/TheNorthFace/dist/html/login.html";
                }
            })
        }
    }
    let cart = new Cart();
    cart.getData();
    cart.selectAll();
})