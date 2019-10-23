// 发送请求 获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        var html = template('categoryTpl',{data: response})
        $('#category').html(html)
    }
})

//当管理员选择文件后
$('#feature').on('change',function () {
    //获取管理员选择的文件
    var file = this.files[0]
    var formData = new FormData()
    //将选择到的文件追加到formData对象中
    formData.append('cover',file)
    //发送请求上传文件
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉$.ajax方法不要处理data属性对应的参数
        processData: false,
        //告诉$.ajax方法不要设置参数类型
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#thumbnail').val(response[0].cover)
            $('#prev').attr('src',response[0].cover).show()
        }
    })
})

//当添加文章表单提交的时候
$('#pAdd').on('click',function () {
    //获取表单内容
    var formData = $('form').serialize()
    // console.log(formData);
    // 向服务器请求，添加文章
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            //文章添加成功 跳转到文章列表页
            location.href = '/admin/posts.html'
        }
    })
})


// 修改文章

//获取url后面的参数 
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&')
    //循环数据
    for (var i = 0 ; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=')
        if(tmp[0] == name) {
            return tmp[1]
        } 
    }
    return -1
}
var id = getUrlParams('id')
if(id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (res) {
            $('#pAdd').hide()
            $('#pEdit').show()
            $('h1').text('修改文章')
            $('#title').val(res.title)
            $('#content').val(res.content)
            $('#prev').attr('src',res.thumbnail).show()
            $('#created').val(res.createAt.substr(0,16))
            $('#thumbnail').val(res.thumbnail)
            $('#category > option').each(function(value,item) {
               if($(item).val() == res.category) {
                  $('item').prop('selected',true) 
               }
            })

        }
    })
}

//当修改文章表单提交的时候
$('#pEdit').on('click',function () {
    //获取表单内容
    var formData = $('form').serialize()
    // 向服务器请求，添加文章
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function (res) {
            //文章修改成功 跳转到文章列表页
            location.href = '/admin/posts.html'
        }
    })
})
