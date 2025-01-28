var Setting = {
    HomeAnnouncementApi: '/HomeAnnouncement/GetHomeAnnouncements',
    HomeSliderApi: '/HomeSlider/GetHomeSliders',
    StatisticHomePageApi: '/StatisticHomePage/GetAllStatisticHomePageCategories'
};

const months = {
    "1": "Ocak",
    "2": "Şubat",
    "3": "Mart",
    "4": "Nisan",
    "5": "Mayıs",
    "6": "Haziran",
    "7": "Temmuz",
    "8": "Ağustos",
    "9": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
};

$(document).ready(function () {
    LoadStatisticHomePageCategorys();
    LoadHomeAnnouncement();
    LoadSlider();
    GetStatisticVideo();
});

function LoadHomeAnnouncement() {
    var textUrl = "/tr/AnasayfaDuyuru/";
    Ajax.Get(Setting.HomeAnnouncementApi, null, function (result) {
        var html = "";
        $.each(result, function (i, data) {

            var image = '/content/AnnouncementCategoryIcons/diger-icon.png';
            if (data.AnnouncementCategory != null)
                image = data.AnnouncementCategory.ImagePath;

            switch (data.ProcessType) {
                case 1:
                    html += '<div class="col-md-6 col-xl-12">';
                    html += '<a class="d-flex w-100 py-2 border-top" href="' + textUrl + '' + data.Id + '">';
                    html += '<i class="bi bi-megaphone mr-2"></i>';
                    html += '<span class="flex-grow-1">';
                    html += data.Title
                    html += '</span>';
                    html += '</a>';
                    html += '</div>';
                    break;
                case 2:

                    html += '<div class="col-md-6 col-xl-12">';
                    html += '<a class="d-flex w-100 py-2 border-top" href="' + data.Url + '">';
                    html += '<i class="bi bi-megaphone mr-2"></i>';
                    html += '<span class="flex-grow-1">';
                    html += data.Title
                    html += '</span>';
                    html += '</a>';
                    html += '</div>';

                    break;
                case 3:
                    html += '<div class="col-md-6 col-xl-12">';
                    if (data.HtmlContent == null || data.HtmlContent=="") 
                        html += '<a class="d-flex w-100 py-2 border-top" href="' + data.FilePath + '">';
                    else
                        html += '<a class="d-flex w-100 py-2 border-top" href="' + textUrl + '' + data.Id + '">';
                    html += '<i class="bi bi-megaphone mr-2"></i>';
                    html += '<span class="flex-grow-1">';
                    html += data.Title
                    html += '</span>';
                    html += '</a>';
                    html += '</div>';
                    break;
            }
        })
        $("#announcementText").append(html);
    })
}

function LoadSlider() {
    var textUrl = "/tr/AnasayfaSlider/";

    Ajax.Get(Setting.HomeSliderApi, null, function (result) {
        var htmlSlider = "";
        var sliderDot = "";
        var sliderAnnouncement = 0;
        $.each(result, function (i, data) {
            if (sliderAnnouncement < 8) {
                if (sliderAnnouncement == 0) {
                    sliderDot += '<li data-target="#myCarousel" data-slide-to="' + sliderAnnouncement + '" class="false svelte-150xhlj active"></li>'
                    htmlSlider += '<a class="carousel-item active" href="' + textUrl + '' + data.Id + '" style="cursor: pointer">';
                }
                else {
                    sliderDot += '<li data-target="#myCarousel" data-slide-to="' + sliderAnnouncement + '" class="false svelte-150xhlj"></li>'

                    htmlSlider += '<a class="carousel-item" href="' + textUrl + '' + data.Id + '" style="cursor: pointer">';
                }
                htmlSlider += '<img class="image svelte-150xhlj" src="' + data.FilePath + '" alt="' + data.SubTitle + '">';
                htmlSlider += '<div class="banner-text-container svelte-150xhlj">';
                htmlSlider += '<div class="info-text d-flex align-items-center px-1 px-2 py-1 svelte-150xhlj">';
                htmlSlider += '<p class="text-style svelte-150xhlj">' + data.SubTitle + '</p>';
                htmlSlider += '</div>'
                htmlSlider += '</div>'
                htmlSlider += '</a>'
                sliderAnnouncement++;
            }
        })
        $("#homeSlider").append(htmlSlider);
        $("#homeSliderDot").append(sliderDot);
    })
}


//var lang = window.location.pathname.substring(1, 3);
//var readText = lang == "en" ? "READ" : "OKU";
//var textUrl = lang == "en" ? "/en/homepageAnnouncement/" : "/tr/AnasayfaDuyuru/";

//$.ajax({
//    url: '/HomeAnnouncement/GetHomeAnnouncements',
//    type: 'GET',
//    async: false,
//    contentType: 'application/json;charset=UTF-8',
//    success: function (data) {
//        var html = "";
//        var htmlSlider = "";
//        var sliderDot = "";
//        var textAnnouncement = 0;
//        var sliderAnnouncement = 0;

//        for (var i = 0; i < data.length; i++) {
//            if (data[i].FilePath == null) {
//                if (textAnnouncement < 5) {
//                    html += '<div class="col-md-6 col-lg-12 col-xl-12 d-flex" style="padding-bottom: 20px;" >'
//                    html += '<div class="col-12 d-flex flex-row mr-0 mr-md-1 mr-lg-0 px-0 py-3 py-lg-0 news-announcements-item align-items-center" style="cursor: pointer;">'
//                    html += '<img class="icon pr-2" src="/img/duyuru-icon.png" alt=""> ';
//                    html += ' <a href="' + textUrl + '' + data[i].Id + '" class="news-announcements-content news-announcements-content-size svelte-150xhlj">';
//                    html += data[i].Title;
//                    html += '</a></div></div>';

//                    textAnnouncement++;
//                }
//            }
//            else {
//                if (sliderAnnouncement < 8) {
//                    if (sliderAnnouncement == 0) {
//                        sliderDot += '<li data-target="#myCarousel" data-slide-to="' + sliderAnnouncement + '" class="false svelte-150xhlj active"></li>'
//                        htmlSlider += '<a class="carousel-item active" href="' + textUrl + '' + data[i].Id + '" style="cursor: pointer">';
//                    }
//                    else {
//                        sliderDot += '<li data-target="#myCarousel" data-slide-to="' + sliderAnnouncement + '" class="false svelte-150xhlj"></li>'

//                        htmlSlider += '<a class="carousel-item" href="' + textUrl + '' + data[i].Id + '" style="cursor: pointer">';
//                    }
//                    htmlSlider += '<img class="image svelte-150xhlj" src="../content/AnnouncementHomePage/' + data[i].FilePath + '" alt="' + data[i].SubTitle + '">';
//                    htmlSlider += '<div class="banner-text-container svelte-150xhlj">';
//                    htmlSlider += '<div class="info-text d-flex align-items-center px-1 px-2 py-1 svelte-150xhlj">';
//                    htmlSlider += '<p class="text-style svelte-150xhlj">' + data[i].SubTitle + '</p>';
//                    htmlSlider += '</div>'
//                    htmlSlider += '</div>'
//                    htmlSlider += '</a>'
//                    sliderAnnouncement++;
//                }
//            }

//        }
//        $("#announcementText").append(html);
//        $("#announcementSlider").append(htmlSlider);
//        $("#sliderDot").append(sliderDot);

//    }
//});
//}



function LoadStatisticHomePageCategorys() {
    Ajax.Get(Setting.StatisticHomePageApi, null, function (result) {
        $.each(result, function (i, data) {
            BindPeriodHtml(data, i);

        });
    })
    return;
}


function StatisticGraphic(data, title) {
    var valueData = data.split(',');
    var numberArray = valueData.map(Number);


    let values = numberArray;
    let titles = numberArray;

    let kanvas = document.getElementById('EnPeriod' + title);

    let grafik = new Chart(kanvas, {
        type: 'line',
        data: {
            labels: titles,
            datasets: [{
                label: '',
                data: values,
                backgroundColor: [
                    "rgba(4, 66, 115, 1)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)"
                ],
                borderColor: [
                    "rgba(23, 164, 219, 1)",
                ],
                borderWidth: 1
            }],

        },
        options: {
            legend: { display: false },
            title: {
                display: false,
            }, elements: {
                point: {
                    radius: 0
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        display: false
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: false
                    }
                }]
            }
        }
    });
}

function BindPeriodHtml(data, i) {
    var trendImage = '';
    if (data.Trend == 1) {
        trendImage = '<img src="./img/down.png" alt="TSB Hayat Dışı Prim Üretimi Değişimi" heigh="19" width="16">';
    }
    else {
        trendImage = '<img src="./img/up.png" alt="TSB Hayat Dışı Prim Üretimi Değişimi" heigh="19" width="16">';
    }

    var html = '<div class="col-md-4 col-xl-12" data-aos="fade-up" data-aos-delay="100">' +
        '<div class="card position-relative text-light card_item svelte-145kp4i">' +
        '<h6 class="mb-0" id="EnPeriodDate' + i + '">' + data.StartYear + ' ' + months[data.StartMonth] + ' - ' + data.EndYear + ' ' + months[data.EndMonth] + '</h6>' +
        '<div class="d-flex flex-row align-items-center justify-content-center">' +
        '<h3 class="mb-0 mr-0 m-2" id="EnPeriodPercent' + i + '">' + (data.Trend == 1 ? '-' : '+') + data.Percent + '%' + '</h3>' +
        '<div id="EnPeriodImg' + i + '">' +
        trendImage +
        '</div>' +
        '<div class="d-flex m-2 flex-column min-vh-1 align-items-center">' +
        '<canvas id="EnPeriod' + i + '" width="120" height="55" style="display: block;"></canvas>' +

        '</div>' +

        '</div>' +
        '<div class="mt-lg-1" style="height: 44px;">' +
        '<span class="text-center" id="EnPeriodTitle' + i + '">' + data.Title + '</span>' +
        '</div>' +
        '</div>' +
        '</div>';

    $('#statisticHomePageContent').append(html);
    StatisticGraphic(data.Value, i);
}


function GetStatisticVideo() {
    $.ajax({
        url: '/Video/GetStatisticVideo',
        type: 'GET',
        async: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result.length > 0) {
                if (result[0].VideoType == 1) {
                    //$("#VideoBody").append(
                    //    "<iframe allowscriptaccess='always' src = ' " + result[0].Url + "' title = 'YouTube video player' frameborder = '0' allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen = '' class= 'embedded' style = 'left: auto; top: auto; width: 100%; height: 100%' ></iframe > ");
                    $("#VideoBody").append("<video id='vid-tsb' loop='' controls='' style='max-width:100%;' poster='../img/yatirimlariniz-katlanarak-buyuyor.jpg'>" +
                        " <source src='" + result[0].Url + "' autostart='false' type='video/mp4'>" +
                        "</video>");
                }
                else {
                    $("#VideoBody").append(
                        "<video id='vid-tsb' loop='' controls='' style='max-width:100%;' poster='../img/yatirimlariniz-katlanarak-buyuyor.jpg'>" +
                        " <source src='" + result[0].FilePath + "' autostart='false' type='video/mp4'>" +
                        "</video>");
                }

            }
        },
        error: function (result) {

        }
    });
}
