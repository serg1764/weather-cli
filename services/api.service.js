import https from "https";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import axios from "axios";

const getWeather = async (city) => {
    // задать env в windows можно так в командной строке $env:TOKEN = "f3054af964dee8ab0ccdb3879103d27b"
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    if(!token){
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
    }

    try {
        const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
            params: {
                'q': city,
                'limit': '1',
                'appid': token,
                'lang': 'ru',
                'units': 'metrics'
            }
        });

        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                'lat': data[0].lat,
                'lon': data[0].lon,
                'appid': token,
                'exclude': 'current',
                'lang': 'ru',
                'units': 'metrics'
            }
        });

        const data_city = response.data;
        //console.log(data_city);
        return data_city;
    } catch (error) {
        console.error('Произошла ошибка при выполнении запросов!');
        throw error;
    }
};

export { getWeather };