const ajax = function (data, url, type) {
    const promise = new Promise((succ, error) => {
        $.ajax({
            url: url,
            data: data,
            type: type,
            processData: false,
            contentType: false,
            success: function (mes) {
                succ(mes);
            },
            error: function (err) {
                error(err);
            }
        })
    })
    return promise;
}
window.ajax = ajax;
