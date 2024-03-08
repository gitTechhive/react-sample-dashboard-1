/* MAX length Varibles*/
export const MAX_30 = 30;
export const MAX_40 = 40;
export const MAX_500 = 500;
export const MAX_1000 = 1000;
export const MAX_2000 = 2000;
export const MAX_200 = 200;
export const MAX_100 = 100;
export const MAX_60 = 60;
export const MAX_20 = 20;
export const MAX_10 = 10;
export const MAX_15 = 15;
export const MAX_4 = 4;
export const MAX_5 = 5;
export const MAX_3 = 3;
export const MAX_32 = 32;
export const MAX_50 = 50;
export const MAX_300 = 300;
export const MAX_13 = 13;
export const MAX_6 = 6;
export const MAX_7 = 7;
export const MAX_8 = 8;
export const MAX_11 = 11;
export const MAX_12 = 12;
export const MAX_25 = 25;
export const PASSWORD = 32;

/* pattern use for validation */
export const NAME = /^([a-zA-Z][a-zA-Z\s]*)$/; // use in specilstMaster and CategoryMaster
export const STATE_NAME = /^([a-zA-Z][a-zA-Z\s]*)$/;
export const CITY_NAME = /^([a-zA-Z][a-zA-Z\s]*)$/;
export const LANGUAGE_NAME = /^([a-zA-Z][a-zA-Z\s]*)$/;
export const ONLY_NUMBERS = /^[0-9]*$/;
//   export const  ONLY_NUMBERS_AND_DOT = /^[0-9.]{1,15}$/;
export const ONLY_NUMBERS_AND_DOT = /^[0-9]+(?:\.[0-9]+)?$/;
export const ONLY_ALPHABETS_AND_DOT = /^([a-zA-Z][a-zA-Z\s\.]*)$/;
export const PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DASH_DIGIT =
  /^[a-zA-Z0-9- ]*$/;
export const PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DASH = /^[a-zA-Z- ]*$/;
//   export const  PATTERN_FOR_ALPHABATES_AND_SPACE_AND_ROUND_BRACKETS = /^[a-zA-Z() ]*$/;
export const PATTERN_FOR_ALPHABATES_AND_SPACE_AND_ROUND_BRACKETS =
  /^([a-zA-Z()][a-zA-Z() ]*)/;
export const LAB_MASTER_NAME = /.*\S.*/;
//   export const  ONLY_SPACE_NOT_ALLOW = /^\S*$/;
export const ONLY_SPACE_NOT_ALLOW = /.*\S.*/;

export const LEADING_SPACE_NOT_ALLOW = /^([a-zA-Z0-9][a-zA-Z0-9\s]*)/;
export const PATTERN_FOR_USER_ROLE_NAME = /^([a-zA-Z][a-zA-Z[\_\]\s]*)$/; // added by Dhrumin
export const PATTERN_FOR_PREFIX = /^([a-zA-Z0-9][a-zA-Z0-9\s!@#$%^&*()-_]*)/;
export const STARTING_WITH_ALPHABATES_AND_DIGIT =
  /^(\w|\d)([A-z\d_@.#$=!%^)(\]:\*;\?\/\,}{ '\|<>\[&\+-]*)$/; // added by ashish
export const PATTERN_FOR_ALPHANUMERIC_DIGIT_SPECIAL_ESCAPE_CHARS = /.*\S.*/;
export const PATTERN_FOR_ONLY_ALPHABATES = /^[a-zA-Z]*$/;
export const PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DIGIT = /^[a-zA-Z0-9 ]*$/;
export const PATTERN_FOR_ALPHABATES_AND_DIGIT = /^[a-zA-Z0-9]*$/;
export const PATTERN_FOR_ALPHABATES_AND_SPACE = /^([a-zA-Z][a-zA-Z ]*)$/;
export const PATTERN_FOR_ALPHABATES_AND_ORG_NAME = /^([a-zA-Z][a-zA-Z .&$@]*)$/;
export const PATTERN_FOR_ALPHABATES_NUMBER_AND_SPACE =
  /^([a-zA-Z0-9][a-zA-Z0-9 ]*)/;
//   export const  PATTERN_FOR_EMAIL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const PATTERN_FOR_EMAIL =
  /[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,50}/; // change by ashish
export const PATTERN_EMAIL =
  /^(([^<>()[\]\.,;:!#$%^&*+={}/?\s@\"]+(\.[^<>()[\]\.,;:!#$%^&*+={}/?\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:!#$%^&*+={}/?\s@\"]+\.)+[^<>()[\]\.,;:!#$%^&*+={}/?\s@\"]{2,})$/i;
export const PATTERN_FOR_EMAIL_OR_PHONE_NO =
  /^(?:([a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})|([0-9]{10,13}))$/;
export const PATTERN_FOR_EMAIL_OR_USERNAME =
  /^(?:([a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5})|([a-zA-Z0-9]*))$/;
export const PATTERN_FOR_PHONE_NO = /^[0-9]{10}$/;
// export const PATTERN_FOR_PHONE_NO = /^[6-9]\d{9}$/;
// export const PATTERN_FOR_PHONE_NO =/^[(\()\s.\-\d\)]{10,15}$/;

export const PATTERN_FOR_NUMBER = /^[0-9]*$/;
export const PATTERN_FOR_NUMBER_COMMA = /^[0-9,]*$/;
export const PATTERN_FOR_DECIMAL_NUMBER = /^[0-9.]*$/;
// export const PATTERN_FOR_PINCODE = /^[0-9]{6}$/;
export const PATTERN_FOR_PINCODE = /^[(\()\s.\-\d\)]{0,7}$/;
export const PATTERN_FOR_LANDLINE_NO = /^[0-9]{11}$/;
// export const PATTERN_FOR_ADHARCARD_NO = /^[0-9]{12}$/;
export const PATTERN_FOR_ADHARCARD_NO = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
export const WEBSITE_PATTERN =
  /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;
export const PATTERN_FOR_HSN_CODE = /^[0-9]{8}$/;
export const PATTERN_FOR_SAC_CODE = /^[0-9]{6}$/;
export const PATTERN_FOR_PANCARD_NO = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const PATTERN_FOR_NOTARY_CERTIFICATE_NUMBER = /[A-Z]{2}\d{4}[\/]\d{4}/;
export const PATTERN_FOR_DRIVING_LICENCE_NUMBER = /[A-Z]{2}\d{13}/;

export const PATTERN_FOR_NAME_WITH_COMA_AND_SPACE = /^([a-zA-Z][a-zA-Z, ]*)$/;
export const PATTERN_FOR_NAME_WITH_DASH_SLASH_AND_SPACE =
  /^([a-zA-Z][a-zA-Z-/ ]*)$/;
export const PATTERN_FOR_NAME_WITH_COMA_CIRCLE_BRACKETS =
  /^([a-zA-Z][a-zA-Z,() ]*)$/;
export const PATTERN_FOR_NAME_WITH_EMPERSON_AND_SPACE =
  /^([a-zA-Z][a-zA-Z& ]*)$/;

//   export const PATTERN_FOR_PASSWORD = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,32}$/;
export const PATTERN_FOR_PASSWORD = /^[a-zA-Z0-9]{6,32}$/;
//   export const PATTERN_FOR_PASSWORD = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,32}$/;
export const PATTERN_FOR_PASSWORD_NEW =
  /^(?=.*[a-z])(?=.*[a-z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
export const PATTERN_FOR_BAR_COUNCIL_NO =
  /[a-zA-Z]{2}[\/]\d[0-9]{0,5}[\/][0-9]{4}/;
export const PATTERN_FOR_GST_NO =
  /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
export const PATTERN_FOR_NUMBER_PLATE =
  /^[a-zA-Z]{2}[ -][0-9]{1,2}(?: [a-zA-Z])?(?: [a-zA-Z]*)? [0-9]{4}$/;
export const PATTERN_NOT_ALLOW_SPACE = /^\S*$/;
export const PATTERN_FOR_DATE =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
export const PATTERN_FOR_IFSC_CODE = /^[A-Z]{4}0[A-Z0-9]{6}$/;
export const PATTERN_FOR_ACCOUNT_NUMBER = /^\d{9,18}$/;





/* Validation Message */
export const PASSWORD_INVALID = 'Should contains 8+ chars, 1 uppercase, 1 lowercase, 1 digit, 1 special (*,@,$)';
export const CONFIRM_PASSWORD_NOT_MATCHED = 'Password and Confirm password not equal.';


//console remove  console\.log\(.+?\);