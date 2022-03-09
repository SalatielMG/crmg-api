import { lang } from 'moment-timezone';
import { esTranslate } from './es';

type language = 'es' | 'en';

export const translate = (attribute: attributesTranslate, lan: language = 'es') => {
    switch (lan) {
        case 'es': return esTranslate[attribute];
        default: return '';
    }
}

export type attributesTranslate = 
'CONTRACT_STATUS' |
''
;