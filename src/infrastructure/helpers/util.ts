import { request } from 'https';
import { exec } from 'child_process'
import * as dnsService from  'dns';
import * as moment from "moment-timezone";

export async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export function intervalCheckInternet () {
    setInterval(() => {
        dnsService.lookup('facebook.com',function(err) {
            let dateTime = moment.tz(new Date(), process.env.SITE_TIME_ZONE).format('DD-MM-YYYY hh:mm:ss');
            console.log('err', err);
            if (err && (err.code == "ENOTFOUND" ||  err.code == 'EAI_AGAIN')) {
                console.error(`error connection: ${ dateTime }`, err);
            } else {
                console.log(`success connection: ${ dateTime }`);
                exec(`rundll32 user32.dll,MessageBeep`)
            }
        })
    }, 2000)
}

export const randomNumbers = (length) => {
    let text = '';
    let possible = '0123456789';
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
