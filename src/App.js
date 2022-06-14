import React, { useEffect, useState } from "react";
import axios from "axios";
import ClothesView from "./ClothesView";

const App = () => {
    const { naver } = window;
    const WEATHER_API_KEY = "8e7520d1d2a6bd32ad7c1ad010c77aa1";
    const [curAddress, setCurAddress] = useState("");
    const [position, setPosition] = useState({
        lat: "",
        lon: "",
    });
    const { lat, lon } = position;
    const [weatherInfo, setWeatherInfo] = useState({
        temp: 0,
        feels_like: 0,
        humidity: 0,
        clouds: 0,
        desc: "",
    });

    let map = null;

    //Clouds, Clear, Atmosphere, Snow, Rain, Drizzle 이슬비, Thunderstorm 천둥번개
    const weatherKorean = (param) => {
        switch (param) {
            case "few clouds":
                return "구름이 매우 조금 껴요";
            case "scattered clouds":
                return "구름이 조금 껴요";
            case "broken clouds":
                return "구름이 많이 껴요";
            case "overcast clouds":
                return "구름이 매우 많이 껴요";
            case "clear sky":
                return "하늘이 맑아요";
            case "light snow":
                return "눈이 약간 내려요";
            case "Snow":
                return "눈이 내려요";
            case "Heavy snow":
                return "눈이 많이 내려요";
            case "Sleet":
            case "Light shower sleet":
            case "Shower sleet":
                return "진눈깨비가 날려요";
            case "Light rain and snow":
            case "Rain and snow":
                return "비와 눈이 내려요";
            case "Light shower snow":
            case "Shower snow":
            case "Heavy shower snow":
                return "눈이 잠깐 내려요";
            case "light rain":
            case "light intensity drizzle":
            case "light intensity drizzle rain":
                return "비가 약간 내려요";
            case "moderate rain":
            case "freezing rain":
            case "drizzle":
            case "drizzle rain":
                return "비가 내려요";
            case "heavy intensity rain":
            case "very heavy rain":
            case "extreme rain":
            case "heavy intensity drizzle":
            case "heavy intensity drizzle rain":
                return "비가 많이 내려요";
            case "light intensity shower rain":
            case "shower rain":
            case "heavy intensity shower rain":
            case "ragged shower rain":
            case "shower rain and drizzle":
            case "heavy shower rain and drizzle":
            case "shower drizzle":
                return "소나기가 내려요";
            case "thunderstorm with light rain":
            case "thunderstorm with rain":
            case "thunderstorm with heavy rain":
            case "light thunderstorm":
            case "thunderstorm":
            case "heavy thunderstorm":
            case "ragged thunderstorm":
            case "thunderstorm with light drizzle":
            case "thunderstorm with drizzle":
            case "thunderstorm with heavy drizzle":
                return "천둥 번개가 쳐요";
            case "dust":
                return "먼지가 떠다녀요";
            case "sand":
                return "황사가 있어요";
            case "fog":
                return "안개가 껴요";
            case "mist":
                return "날이 습해요";
            case "Haze":
                return "안개가 조금 껴요";
            default:
                break;
        }
    };

    const initMap = () => {
        //네이버 지도 불러오는 함수
        const mapOptions = {
            center: new naver.maps.LatLng(lat, lon),
            zoom: 15,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        };
        map = new naver.maps.Map("map", mapOptions);

        naver.maps.Service.reverseGeocode(
            {
                coords: new naver.maps.LatLng(lat, lon),
            },
            function (status, response) {
                if (status !== naver.maps.Service.Status.OK) {
                    return alert("error!");
                }

                const result = response.v2,
                    address = result.address;

                setCurAddress(address.jibunAddress);
            }
        );

        naver.maps.Event.addListener(map, "click", (e) => {
            //지도에서 특정 위치 클릭 시 그 위치의 날씨 알려줌
            setPosition({
                lat: e.coord.lat(),
                lon: e.coord.lng(),
            });
        });
    }; //end initMap

    const fetchWeather = () => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
            )
            .then((res) => {
                const { main } = res.data;
                const temp = (main.temp - 273.15).toFixed(1);
                const feels_like = (main.feels_like - 273.15).toFixed(1);
                const humidity = main.humidity;
                const clouds = res.data.clouds.all;
                const desc = res.data.weather[0].description;
                setWeatherInfo({ temp, feels_like, humidity, clouds, desc });
            })
            .catch((e) => {
                console.log(e);
            });
    }; //end fetchWeather

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setPosition({ lat: latitude, lon: longitude }); //사용자의 현재 위치 설정
            },
            (e) => {
                console.log("getCurrentPosition error :>> ", e);
            }
        );
    }, []);

    useEffect(() => {
        if (position.lat !== "" && position.lon !== "") {
            initMap(); // 네이버 지도 불러오는 함수
            fetchWeather(); //해당 위치의 날씨 불러오는 함수
        }
    }, [position]);

    return (
        <div>
            <h1>{curAddress}의 날씨</h1>
            <h2>
                현재 온도 : {weatherInfo.temp}℃(체감 {weatherInfo.feels_like}℃)
            </h2>
            <h3>구름 : {weatherInfo.clouds}%</h3>
            <h3>습도 : {weatherInfo.humidity}%</h3>
            <h2>{weatherKorean(weatherInfo.desc)}</h2>
            <div style={{ display: "flex", width: "100%" }}>
                <div id="map" style={{ width: "80%", height: 600 }}></div>
                <div style={{ width: "20%" }}>
                    <ClothesView temp={weatherInfo.temp} />
                </div>
            </div>
        </div>
    );
};

export default App;
