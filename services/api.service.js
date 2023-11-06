import https from "https";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import axios from "axios";

const getWeather = async (city) => {
    // задать env в windows можно так в командной строке $env:TOKEN = "f3054af964dee8ab0ccdb3879103d27b"
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    if(!token){
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
    }

    let { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct',{
        params : {
            'q': city,
            'limit': '1',
            'appid': token,
            'lang': 'ru',
            'units': 'metrics'
        }
    });

//https://openweathermap.org/current тут бесплатное апи
    //https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}
    axios.get('https://api.openweathermap.org/data/2.5/weather',{
        params : {
            'lat': data[0].lat,
            'lon': data[0].lon,
            'appid': token,
            'exclude': 'current',
            'lang': 'ru',
            'units': 'metrics'
        }
    })
    .then((response) => {
        const data_city = response.data;
        console.log(data);
        console.log(data[0].lat);
        console.log(data[0].lon);
        console.log(data_city);
        // Здесь вы можете продолжить работу с data_city
        return data_city;
    })
    .catch((error) => {
        console.error('Произошла ошибка при выполнении второго запроса:', error);
    });
    //return data_city;

    //const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`;
    /*const url = new URL ('https://api.openweathermap.org/geo/1.0/direct');
    url.searchParams.append('q', city);
    url.searchParams.append('limit', '1');
    url.searchParams.append('appid', token);
    url.searchParams.append('lang', 'ru');
    url.searchParams.append('units', 'metrics');
    //`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`;

    https.get(url, (response) =>{
        let res = '';
        response.on('data', chunk => {
            res += chunk;
        });

        response.on('end', () => {
            console.log(res);
        });

        response.on('error', (error) => {
            //console.log(res);
        });

    });*/
};

export { getWeather };