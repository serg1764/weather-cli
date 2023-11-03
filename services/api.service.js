import https from "https";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import axios from "axios";

const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    if(!token){
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
    }

    const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct',{
        params : {
            'q': city,
            'limit': '1',
            'appid': token,
            'lang': 'ru',
            'units': 'metrics'
        }
    });

    //console.log(data);
    return data;

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