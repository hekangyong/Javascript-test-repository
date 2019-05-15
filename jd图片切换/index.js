window.onload = function () {
    let lis = document.querySelectorAll("li");
    console.log(lis);
    for (let a = 0; a < lis.length; a++) {
        lis[a].onmouseover = function () {
            lis.forEach(function(el){
                el.classList.remove("on")
            })
            lis[a].classList.add("on");
        }
    }
}