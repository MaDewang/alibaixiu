//获取热门推荐
$.ajax({
    type: 'get' ,
    url: '/posts/recommend',
    success: function (res) {
        // console.log(res);
        var temp = `
            {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                    <img src="{{$value.thumbnail}}" alt="">
                    <span>{{$value.title}}</span>
                </a>
            </li>
            {{/each}}
        `
        var str = template.render(temp,{data: res})
        $('#homeBox').html(str)
        
    }
})