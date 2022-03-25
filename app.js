const express = require('express');

const app = express();
const request = require('request');

var port = process.env.PORT || 8080;
app.set('view engine' , 'ejs');
app.use(express.static('statics'));
app.use(express.urlencoded({extended:true}))

app.listen(port);

app.get('/' ,(req,res) =>{
    var city = 'Mumbai';
    var weather_curr = [];
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0111311c3c24b52751b3bc841e52b78e`;
    request(url,function(err,resp,body) {
        var actual_info = JSON.parse(body);
        console.log(actual_info);

        var weather_info = {
            city:city,
            temp : actual_info.main.temp,
            icon : actual_info.weather[0].icon,
        }
        console.log("City: " + weather_info.city);
        console.log("Temp: "+ weather_info.temp);
        console.log("Icon: "+ weather_info.icon);
        weather_curr.push(weather_info);
        res.render('index',{weather_curr});

    })

    //console.log("Curr city: " + curr_weather.c);
    //console.log("Curr temp: " + curr_weather.temp);

    //res.render('index',curr_weather);
    })


app.post('/' , (req,res)=>{
    var city = req.body.city;
    var weather_curr = [];
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0111311c3c24b52751b3bc841e52b78e`;
    request(url,function(err,resp,body) {
        var actual_info = JSON.parse(body);
        console.log(actual_info);
        if(actual_info.message === "city not found"){
            var weather_info = {
                city: 'City Not Found',
                temp : null,
                icon : null,
                description : null,
            }
        }
        else{
            var weather_info = {
                city:city,
                temp : actual_info.main.temp,
                icon : actual_info.weather[0].icon,
                description : actual_info.weather[0].description,
            }
        }
        console.log("City: " + weather_info.city);
        console.log("Temp: "+ weather_info.temp);
        weather_curr.push(weather_info);
        res.render('index',{weather_curr});

    })
})






