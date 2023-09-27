import { Languages } from './../../backend/languages/schemas/language.schema';
export enum AddressType {
    HOME = 'Home',
    OFFICE= 'Office'
}

export enum FrequencyPayment {
    HOURLY= 'Hourly',
    DAILY = 'Daily',
    WEEKLY= 'Weekly',
    MONTHLY = 'Monthly',
    ANNUALLY= 'Annually'
}

export enum WorkType {
    PERMANENT= 'Permanent',
    TEMPORARY = 'Temporary',
    CONTRACT= 'Contract',
    INTERN= 'Intern'
}

export enum NoticePeriod {
    IMMEDIATELY = 'Immediately',
    A_WEEK = 'One Week',
    TWO_WEEK = 'Two Weeks',
    FOUR_WEEK = 'Four Weeks',
    FIV_WEEK = 'Five Weeks',
    SIX_WEEK = '6 Weeks',
}

export enum GenderEnum {
    MALE= 'Male',
    FEMALE = 'Female',
    OTHER= 'Other',
}

export enum LanguageLevelEnum {
    NONE = 'None', // 0
    ELEMENTARY = 'Elementary', // 0+, 1, 1+
    LIMITED_WORKING = 'Limited Working', // 2, 2+
    FULL_PROFESSIONAL = 'Professional Working', // 4, 4+
    NATIVE = 'Native or Bilingual' // 5
}

export enum TemplateEnum {
    COVERLETTER= 'Cover Letter',
    RESUME = 'Resume',
}