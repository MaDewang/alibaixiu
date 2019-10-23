//向客户端请求文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        var html = template('postsTpl',response)
        $('#postsBox').html(html)
        var page = template('pageTpl',response)
        $('#pageBox').html(page)
        // console.log(response);
        
    }
})

//处理时间格式
function formateDate(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

//分页
function changepage(page) {
    // console.log(page);
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            var html = template('postsTpl',response)
            $('#postsBox').html(html)
            var page = template('pageTpl',response)
            $('#pageBox').html(page)
        }
    })
    
}

//请求分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response)
        var html = template('categoryTpl', {data: response})
        // console.log(html);
        $('#categoryBox').html(html)
        
    }
})

//提交筛选表单时
$('#fileterForm').on('submit',function () {
    //获取选择的筛选条件
    // console.log(111);
    
    var formData = $(this).serialize()
    // console.log(formData);
    
    //像服务器端发送请求 根据条件索要文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (response) {
            var html = template('postsTpl',response)
            $('#postsBox').html(html)
            var page = template('pageTpl',response)
            $('#pageBox').html(page)
        }
    })
    //阻止默认提交
    return false
})

//删除文章
$('#postsBox').on('click','.delete',function () {
    if(confirm('您真的要进行删除操作吗')){
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})