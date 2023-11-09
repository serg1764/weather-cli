import chalk from 'chalk';
import dedent from 'dedent-js';
const printError = (error) => {
    console.log(`${chalk.bgRed(' ERROR ')} ${error}`);
}
const printSuccess = (message) => {
    console.log(`${chalk.bgGreen(' SUCCESS ')} ${message}`);
}
const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
         Без параметра - вывод погоды
         -s [CITY] для установки города
         -h для вывода справки
         -t [API_KEY] для установки токена
         `
    );
}

const printCity = (message) => {
    console.log(`${chalk.bgBlue(' '+message+' ')}`);
}

const printDescription = (message) => {
    console.log(`${chalk.bgBlueBright(' '+message+' ')}`);
}
const printOther = (message) => {
    console.log(`${chalk.bgRed(' ТЕМПЕРАТУРА МАКСИМАЛЬНАЯ ')} ${message.main.temp_max}`);
    console.log(`${chalk.bgBlueBright(' ТЕМПЕРАТУРА МИНИМАЛьНАЯ ')} ${message.main.temp_min}`);
    console.log(`${chalk.bgMagentaBright(' ВОСХОД ')} ${new Date(message.sys.sunrise * 1000)}`);
    console.log(`${chalk.bgYellowBright(' ЗАКАТ ')} ${new Date(message.sys.sunset * 1000)}`);
}

export { printError, printSuccess, printHelp, printCity, printDescription, printOther };