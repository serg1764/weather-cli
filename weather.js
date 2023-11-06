#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import {printHelp, printSuccess, printError} from "./services/log.service.js";
import {saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
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

const getForcast  = async () => {
    try {
        const weather = await getWeather('мерсин');
        console.log(weather);// красивый вывод погоды
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
    }
    if(args.t){
        //Сохранить токен
        return saveToken(args.t);
    }
    getForcast();
}

initCLI();