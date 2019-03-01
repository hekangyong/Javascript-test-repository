$(function () {
    var datatr = $("#jobsList").first();
    console.log(datatr);
    var createtable = $("<table><tbody></tbody></tbody>");
    $("#pagewraper").append(createtable);
    createtable.css({
        'position': 'absolute',
        'left': 1,
        'top': datatr.offset().top,
        'width': Math.round(datatr.find("td").first().outerWidth()),
        'height': Math.round(datatr.find("td").first().outerHeight()),
        'border-color': datatr.css("border-color"),
        'border-style': datatr.css("border-style"),
        'overflow': 'hidden',
        'border-collapse': datatr.css("border-collapse")
    });
    var datatr_o = datatr.find("tr");
    var new_data_body = createtable.find("tbody")
    datatr_o.each(function (i) {
        var firsttd = datatr_o.eq(i).find("td").first();
        var newtd = $("<tr><td>" + firsttd.html() + "</td></tr>")
        newtd.css({
            'background-color': firsttd.css("backgroundColor")
        })
        newtd.find("td").css({
            "font-weight": firsttd.css("font-weight"),
            "font-size": firsttd.css("font-size"),
            "color": firsttd.css("color"),
            "background-color": firsttd.css("backgrondColor"),
            "padding": firsttd.css("padding"),
            "margin": firsttd.css("margin"),
            "height": parseInt( firsttd.css("height")) + 2,
            "overflow": "hidden",
            "border-color": firsttd.css("border-color"),
            "border-style": firsttd.css("border-style"),
            "border-width": firsttd.css("border-width")
        })
        new_data_body.append(newtd)
    })
})