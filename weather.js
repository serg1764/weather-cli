#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import {printHelp, printSuccess, printError, printCity, printDescription, printOther} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if(!token.length){
        printError('Не передан токен');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен Сохранен');
    }
    catch (e) {
        printError(e.message);
    }
}
const saveCity = async (city) => {
    if(!city.length){
        printError('Не передан Город');
        return;
    }

    try {
        await getWeather(city);

        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город Сохранен');
    }
    catch (e) {
        if(e.message === 'Cannot read properties of undefined (reading \'lat\')'){
            printError('Неверно указан город');
        }else
        printError(e.message);
    }
}

const getForcast  = async () => {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
    if(!city){
        throw new Error('Не задан Город, задайте его через команду -s [Город]');
    }

    try {
        const weather = await getWeather(city);
        console.log(weather);// красивый вывод погоды
        printCity(weather.name);
        printDescription(weather.weather[0].description);
        printOther(weather);

    }
    catch(e){
        if(e.message === 'Cannot read properties of undefined (reading \'lat\')'){
            printError('Неверно указан город');
        }
        else if(e?.response?.status === 401){
            printError('Неверно указан Токен');
        }
        else{
            printError(e.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    //console.log(process.env);
    if(args.h){
        printHelp();
    }
    if(args.s){
        //Сохранить город
        console.log(args.s);
        return saveCity(args.s);
    }
    if(args.t){
        //Сохранить токен
        return saveToken(args.t);
    }
    getForcast();
}

initCLI();