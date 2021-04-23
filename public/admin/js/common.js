// 封装函数，参数为表单对象，返回值为表单中的数据，转化为对象的形式
function serializeToJson(form) {
    var result = {};
    // 1. jQuery中serializeArray()函数返回值是页面中所有表单的数据
    // 2.返回类型为数组
    //  [{name:'表单中的name',value:'对应name表单的值value'}]
    // var f = $(this).serializeArray();
    // console.log(f);
    //  [{name:'表单中的name',value:'对应name表单的值value'}]
    var f = form.serializeArray();
    f.forEach(function (items) {
        // 相当于：result.email = value
        result[items.name] = items.value;
    });
    return result;
}