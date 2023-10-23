#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import {printHelp, printSuccess, printError} from "./services/log.service.js";
import {saveKeyValue} from "./services/storage.service.js";

const saveToken = async (token) => {
    if(!token.length){
        printError('Не передан токен');
        return;
    }

    try {
        await saveKeyValue('token', token);
        printSuccess('Токен Сохранен');
    }
    catch (e) {
        printError(e.message);
    }
}
const initCLI = () => {
    const args = getArgs(process.argv);
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
}

initCLI();