var d = new Date();
let month = d.getMonth() + 1;
let today = d.getDate() + '-' + month + '-' + d.getFullYear();

function getCountry($city) {
    let countries = {
        "Mostaganem": "Algeria",
        "Madrid": "Spain",
        "New York": "United State"
    }

    return countries[$city];
}

function translation(city) {
    let location = {
        "Mostaganem": "الجزائر، مستغانم",
        "Madrid": "اسبانيا، مدريد",
        "New York": "امريكا، نيويورك"
    }

    return location[city];
}

function getCityTimings() {
    let city = document.getElementById("cities").value;
    (city == "") ? city = "Mostaganem" : city = document.getElementById("cities").value;
    let country = getCountry(city);
    document.getElementById('location-en').innerHTML = country + ',' + ' ' + city;
    document.getElementById('location-ar').innerHTML = translation(city);

    axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`)
        .then(function (response) {
            // handle success
            let timings = response.data.data.timings;
            document.getElementById('salat1').innerHTML = timings.Dhuhr;
            document.getElementById('salat2').innerHTML = timings.Asr;
            document.getElementById('salat3').innerHTML = timings.Maghrib;
            document.getElementById('salat4').innerHTML = timings.Isha;
            document.getElementById('salat5').innerHTML = timings.Fajr;
            document.getElementById('sunrise').innerHTML = timings.Sunrise;
            document.getElementById('today').innerHTML = today;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

getCityTimings();