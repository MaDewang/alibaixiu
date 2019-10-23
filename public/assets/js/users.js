//表单提交时
$('#userForm').on('submit', function () {
    //获取用户提交的内容
    var formData = $(this).serialize()
    // console.log(formData);
    
    // 向服务器端发送添加用户的请求 
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success:function (response) {
            //刷新页面
            location.reload()
            
        },
        error: function (response) {
            alert('提交失败');
            console.log(response);
            
        }
    })
    
    //阻止表单提交行为
    return false
}) 
//当用户选择文件时 
$('#modifyBox').on('change','#avatar', function () {
    // 用户选择的文件
        //this.files[0]
        var formData = new FormData() 
        // 将要上传的文件 储存到 自定义属性avatat中
        formData.append('avatar',this.files[0])
        // console.log(formData);
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            //不要解析请求参数
            processData: false,
            //不要设置请求参数的类型
            contentType: false,
            success: function (response) {
                // console.log(response);
                //实现头像预览
                $('#preview').attr('src',response[0].avatar)
                //设置隐藏域的value
                $('#hiddenAvatar').val(response[0].avatar)
                
            }
        })
})
//向服务器端发送请求 索要用户列表数据
$.ajax({
    type: 'get',
    url:'/users',
    success: function (response) {
        // console.log(response);
        //拼接模板
        var html = template('userTpl',{ data: response})
        //将模板添加到盒子中 
        $('#userBox').html(html)
    }
})

//通过事件委托给编辑按钮添加点击事件
$('#userBox').on('click','.edit',function () {
    var id = $(this).attr('data-id')
    // alert(id)
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            var html = template('modifyTpl',response)
            $('#modifyBox').html(html)
        }
    })
})

//为修改表单添加表单提交事件
$('#modifyBox').on('submit','#modifyForm',function () {
    //获取用户在表单中输入的内容
    var formData = $(this).serialize()
    //获取要修改信息的用户的id
    var id = $(this).attr('data-id')
    //发送请求 修改用户信息
    $.ajax({
        type: 'put',
        url: '/users/'+ id,
        data: formData,
        success: function (response) {
        //    console.log(response);
        //修改信息成功 重新加载页面
        location.reload()
            
        }
    })
    return false

})

//为删除表单添加表单提交事件
$('#userBox').on('click','#del-user',function () {

    //获取要修改信息的用户的id
    var id = $(this).attr('data-id')
    // console.log(id);
    
    //发送请求 修改用户信息
    $.ajax({
        type: 'delete',
        url: '/users/'+ id,
        success: function (response) {
        //    console.log(response);
        //修改信息成功 重新加载页面
        location.reload()

        }
    })
    return false

})

//获取全选按钮
var selectAll = $('#selectAll')
//获取批量删除按钮
var deleteMany = $('#deleteMany')

//当全选按钮发送变化时
selectAll.on('change',function () {
    //获取到全选按钮的状态
    var status = $(this).prop('checked')
    // console.log(status);
    if(status) {
        //显示批量删除按钮
        deleteMany.show()
    }else  {
        //隐藏批量删除按钮
        deleteMany.hide()
    }
    //将所有的用户的状态和全选按钮同步
    $('#userBox').find('input').prop('checked',status)
    
})
//当用户按钮发生变化时
$('#userBox').on('change','.userStatus',function () {
    //所有用户的数量
    var num1 = $('#userBox').find('input').length
    //选中的用户数量
    var num2 = $('#userBox').find('input').filter(':checked').length
    // console.log(num1);
    // console.log(num2);
    
    //设置全选按钮的状态
    selectAll.prop('checked',num1 == num2)
    if(num2 > 0) {
        //显示批量删除按钮
        deleteMany.show()
    }
})
//为批量删除按钮添加点击事件
deleteMany.on('click',function () {
    var ids = []
    //获取选中的用户
    var checkedUser = $('#userBox').find('input').filter(':checked')
    //获取选中用户的 id
    checkedUser.each(function (index,element) {
        ids.push($(element).attr('data-id'))
    })
    if(confirm('确定要批量删除用户吗')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function () {
                location.reload()
            }
        })
    }
    
})