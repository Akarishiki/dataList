class Banner {
    constructor() { }
    getAjax() {
        $.ajax({//轮播图素材
            url: "http://10.31.157.69/TheNorthFace/php/banner.php",
            data: {
                "class": "banner"
            }
        }).done(this.createLi(data))
    }
    createLi(obj){
        let $oUl = $(".banner ul");
        console.log(obj.length)
    }
}
export {Banner};