// 当添加分类表单发生提交行为时
$('#addCategory').on('submit',function () {
    //获取用户在表单中输入的内容
    var formData = $(this).serialize()
    console.log(formData);
    //向服务器发送请求 添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data:formData,
        success: function () {
            location.reload()
        }
    })
    //阻止表单默认提交行为
    return false
})

//发送请求 获取服务端所有分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        var html = template('categoryTpl',{data: response})
        // console.log(html);
        $('#categoryBox').html(html)

    }
})

//为编辑按钮添加点击事件
$('#categoryBox').on('click','.edit', function() {
    //获取此次点击的id
    var id = $(this).attr('data-id')
    // console.log(id);
    //请求
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response){
            var html = template('modifyTpl',response)
            $('#modifyBox').html(html)
        }
    })
})

//当点击修改按钮 表单发生提交时 
$('#modifyBox').on('submit','#modify',function () {
    //获取表单内的数据
    var formData = $(this).serialize()
    //获取id
    var id = $(this).attr('data-id')
    console.log(formData);
    console.log(id);
    //发送请求 修改分类数据
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function (response) {
            location.reload()
        }
    })
    //阻止表单默认提交行为
    return false
})

//当删除按钮被点击时
$('#categoryBox').on('click','.delete',function () {
    if(confirm('您真的要删除此分类吗')) {
        //获取 id
        var id = $(this).attr('data-id')
        //发送请求 删除数据
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})