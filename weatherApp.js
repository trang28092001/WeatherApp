function starTime() {
    document.getElementById("city").defaultValue = "Ha Noi";
    getInfo();
    time();
}

function time(){
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var year = today.getFullYear();
    var month = today.getMonth();
    month += 1;
    var daym = today.getDate();
    var day = today.getDay();
    var dayArray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")

    document.getElementById('time-txt').innerHTML = h + ":" + m + ":" + s;
    document.getElementById('date-txt').innerHTML = dayArray[day] + ", " + daym + "/" + month + "/" + year + " ";
    setTimeout(time, 1000);
}

function weather(main) {

    switch (main) {
        case "Snow":
            document.getElementById("app").style.backgroundImage = "url('https://i.gifer.com/Dv9E.gif')";
            break;
        case "Clouds":
            document.getElementById("app").style.backgroundImage = "url('https://thumbs.gfycat.com/EverlastingTightIrishterrier-size_restricted.gif')";
            break;
        case "Fog":
            document.getElementById("app").style.backgroundImage = "url('https://c.tenor.com/5ImWLS5QAJgAAAAC/foggy-fog.gif')";
            break;
        case "Rain":
            document.getElementById("app").style.backgroundImage = "url('https://64.media.tumblr.com/e270163c00d4047db69348dc2789ec56/tumblr_oiuiq07PWw1u6fkwvo1_500.gifv')";
            break;
        case "Clear":
            document.getElementById("app").style.backgroundImage = "url('https://thumbs.gfycat.com/CookedCrazyCrayfish-max-1mb.gif')";
            break;
        case "Thunderstorm":
            document.getElementById("app").style.backgroundImage = "url('https://www.thisiscolossal.com/wp-content/uploads/2015/01/storm-3.gif')";
            break;
        default:
            document.getElementById("app").style.backgroundImage = "url('https://c.tenor.com/AXST3pQh5r8AAAAd/sunny-day-when-sharks-attack.gif')";
            break;
    }
}


let begin = "https://api.openweathermap.org/data/2.5/forecast?q=";
let beginCurrent = "https://api.openweathermap.org/data/2.5/weather?q=";

let end = "&appid=473839be60e2bf91d5636cb47544c59e&units=metric";

function tempOfCity(city){
    $.ajax({
        url: beginCurrent + city + end,
        type: 'GET',
    }).done((data) => {
        const newCity = document.getElementById("city");
        newCity.value = city;
        document.getElementById("name").innerHTML = data.name + ", " + data.sys.country;
        let main = document.getElementById("weatherMain").innerHTML = data.weather[0].main;
        document.getElementById("tt").innerHTML = data.main.temp ;
        weather(main);
    })

    $.ajax({
        url: begin + city + end,
        type: 'GET',
    }).done((data) => {
        for (let i = 0; i < 5; i++) {
            document.getElementById("hour" + (i + 1)).innerHTML = Number(data.list[i].main.temp).toFixed(1);
            document.getElementById("weatherhour" + (i + 1)).innerHTML = data.list[i].weather[0].description;
            document.getElementById("image" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
            document.getElementById("h" + (i + 1)).innerHTML = data.list[i].dt_txt;


            document.getElementById("day" + (i + 1)).innerHTML = Number(data.list[i * 8].main.temp).toFixed(1);
            document.getElementById("weather" + (i + 1)).innerHTML = data.list[i * 8].weather[0].description;
            document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i * 8].weather[0].icon + ".png";
            document.getElementById("d" + (i + 1)).innerHTML = data.list[i * 8].dt_txt;
        }
    })
} 

function getInfo() {
    const newCity = document.getElementById("city");
    tempOfCity(newCity.value);
    setTimeout(getInfo, 600000);
}

$('.address').click(
    function(){
        var city = $(this).html();
        tempOfCity(city);
    }
);

$('.tempcol').click(
    function(){
        var temp = $(this).html();
        if (temp ==='°C'){
            end = "&appid=473839be60e2bf91d5636cb47544c59e&units=metric";
        }else{
            end = "&appid=473839be60e2bf91d5636cb47544c59e&units=imperial"; 
        }
        getInfo();
            document.getElementById("now").innerHTML = temp;
            for (i = 0; i < 5; i++) {
                document.getElementById("tt" + (i + 1)).innerHTML = temp;  
                document.getElementById("daily" + (i + 1)).innerHTML = temp;  
            } 
        
    }
);

var items = document.querySelectorAll('.item');
function handleIndicator(el) {
    items.forEach(function (item) {
        item.classList.remove('tempcol');
        item.removeAttribute('style');
    });
    el.classList.add('tempcol');
    el.style.backgroundColor = '#C6E2FF' ;
}
items.forEach(function (item) {
    item.addEventListener('click', function (e) {
        handleIndicator(e.target);
    });
    item.classList.contains('tempcol') && handleIndicator(item);
});