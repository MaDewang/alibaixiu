//获取热门推荐
$.ajax({
    type: 'get' ,
    url: '/posts/random',
    success: function (res) {
        var temp1 = `
            {{each data}}
            <li>
                <a href="javascript:;">
                <p class="title">{{$value.title}}</p>
                <p class="title">{{$value.content.substr(0,20)}}</p>
                <p class="reading">阅读({{$value.meta.views}})</p>
                <div class="pic">
                    <img src="{{$value.thumbnail}}">
                </div>
                </a>
            </li>
            {{/each}}
        `
        // console.log(res);
        
        var str1 = template.render(temp1,{data: res})
        $('.random').html(str1)
        
    }
})

//获取文章分类列表数据
$.ajax({
	type: 'get',
	url: '/categories',
	success: function (response) {
		var navTpl = `
			{{each data}}
			<li>
				<a href="list.html?categoryId={{$value._id}}">
					<i class="fa {{$value.className}}"></i>{{$value.title}}
				</a>
			</li>
			{{/each}}
		`;
		var html = template.render(navTpl, { data: response });
		// $('#navBox').html(html)
		// $('#topNavBox').html(html)
		$('.nav_item').html(html);
	}
})

// 实现文章搜索功能
$('.search .btn').on('click',function() {
    // console.log(111);
    var key = $('.search').find('.keys').val().replace(/\s/g,'')
    console.log(key);
    location.href = "/search.html?key=" + key

})