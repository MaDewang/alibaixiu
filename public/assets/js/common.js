
     $('#logout').on('click',function () {
      var isConfirm = confirm('您真的要退出吗')
      if(isConfirm) {
        // alert('111')
        $.ajax({
          type: 'post',
          url: '/logout',
          success: function () {
            location.href = 'login.html'
          },
          error: function () {
            alert('退出失败')
          }

        })
      }

    })


     // 索取用户信息 显示用户头像 用户名
     $.ajax({
      type: 'get',
      url: '/users/' + userId,
      success: function (res) {
        $('.avatar').attr('src',res.avatar)
        $('.name').html(res.nickName)
        // console.log(res.avatar);
        // console.log(res);
        
        
      }
    })