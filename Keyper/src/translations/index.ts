import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { Language } from '@/enums/Index';
import * as resources from '@/translations/resources/index'

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
        ...Object.entries(resources).reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: {
                    translation: value,
                },
            }),
            {}
        ),
    },
    lng: Language.english,
})

export default i18n;