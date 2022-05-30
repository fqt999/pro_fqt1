$(function () {
    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
      $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
          var htmlStr = template('tplArtCate', res)
          $('tbody').html(htmlStr)
        }
      })
    }
    var layerindex = null;
    // 为添加类别按钮绑定点击事件
$('#btnAddCate').on('click', function() {
    layerindex = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#tplAddCate').html()
    })
})
    
      // 通过代理的形式，为 form-add 表单绑定 submit 事件
  $('body').on('submit', '#form-add', function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }
        initArtCateList()
        layer.msg('新增分类成功！')
        // 根据索引，关闭对应的弹出层
        // layer.close(indexAdd)
        layer.close(layerindex)
          
      }
    })
  })
    
    
    //利用事件委托的方式给删除按钮绑定点击事件
  $('tbody').on('click', '#btnDel', function() {
    var id = $(this).attr('data-id')
    // 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          layer.close(index)
          initArtCateList()
        }
      })
    })
})
})