$(document).ready(function () {
    class RandomNum {
        constructor() { };
        pushNumber() {
            $(".refresh").off("click");
            let _this = this;
            let $vc = Array();
            $vc.length = 4;
            $.each($vc, function (indexInArray, valueOfElement) {
                $vc.push(Math.floor(Math.random() * 10))
            });
            $(".v-code").html($vc);
            $(".refresh").on("click", function () {
                _this.pushNumber();
                $(".fast-log .v-c").val("");
                $(".fast-log .v-c").css("border", "1px solid #cccccc")
            })
        }
    }
    let $code = new RandomNum();
    $code.pushNumber();

    class SwitchPage {
        constructor() { }
        switch() {
            $(".fast").on("click", function () {
                $(".fast-log").stop(true).animate({ left: 60 });
                $(".account").stop(true).animate({ left: $(".account").width() + 130 });
            })
            $(".acc").on("click", function () {
                $(".fast-log").stop(true).animate({ left: -$(".fast-log").width() });
                $(".account").stop(true).animate({ left: 60 });
            })
        }
    }
    let $switch = new SwitchPage();
    $switch.switch();

    function checkPhone() {
        var phone = $(".phone").val();
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
            return false;
        } else {
            return true;
        }
    }
    $(".fast-log .phone").on("blur", function () {
        let result = checkPhone();
        if (result) {
            $(this).css("border", "1px solid green");
            $(this).attr("correct",1)
        } else {
            $(this).css("border", "1px solid red");
            $(this).attr("correct",0)
        }
    })
    function checkCode() {
        var code = $(".v-c").val();
        if ($(".v-code").html() !== code) {
            $(".v-c").css("border", "1px solid red");
            $(".v-c").attr("correct",0)
        } else {
            $(".v-c").css("border", "1px solid green");
            $(".v-c").attr("correct",1)
        }
    }
    $(".fast-log .v-c").on("blur", function () {
        checkCode()
    })

    $(".fast-log .pw").on("blur", function () {
        var $result = null;
        var $pw = $(".pw").val();
        if (!(/^[\w_-]{6,16}$/.test($pw))){
            $(".fast-log .pw").css("border", "1px solid red");
            $(".fast-log .pw").attr("correct",0)
        } else {
            $(".fast-log .pw").css("border", "1px solid green");
            $(".fast-log .pw").attr("correct",1)
        };
    })

    $(".fast-log .submit-btn input").on("click",function(){
        let $count = 0
        $.each($(this).parent().parent().find("input"), function (indexInArray, valueOfElement) {
                if(indexInArray<=2){
                    $count += parseInt($(this).attr("correct"));
                }
        });
        if($count!=3||$(".agree").is(":checked")!==true){
            alert("注册信息有误")
        }else{
            $.ajax({
                type: "post",
                url: "http://10.31.157.69/TheNorthFace/php/pushuser.php",
                data: {
                    username:$(".fast-log .phone").val().toString(),
                    password:$(".pw").val().toString()
                },
                success: function (data) {
                    alert("注册成功，即将跳转首页...")
                    location.href=("http://10.31.157.69/TheNorthFace/dist/html/main.html");

                }
            });
        }
    })
    $(".fast-log .phone,.fast-log .v-c,.pw").on("focus",function(){
        $(this).css("border", "1px solid #a5a5a5");
    })

    $(".account .submit-btn input").on("click",function(){
        let $ac = $(".account .phone").val();
        let $pw = $(".account .pw").val();
        console.log($ac)
        $.ajax({
            type:"post",
            url:"http://10.31.157.69/TheNorthFace/php/login.php",
            data:{
                username:$ac,
                password:$pw
            },
            success:function(d){
                if(d == "true"){
                    location.href = "http://10.31.157.69/TheNorthFace/dist/html/main.html";
                    localStorage.setItem("user",$ac);
                }else if(d == "false"){
                    alert("账号或密码不正确");
                }
            },
        });
    })

})