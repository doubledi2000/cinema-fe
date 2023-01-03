export const VALIDATORS = {
    USERNAME: '^[A-Za-z][A-Za-z0-9_@.]{1,50}$',
    PASSWORD:
      '\\S{6,99}',
    BLANK: '(\\s){0,}\\S+.*(\\s){0,}',
    EMAIL:
      '^(\\s){0,}[a-zA-Z][a-zA-Z0-9_\\.-]{1,50}@[a-zA-Z0-9-_]{2,}(\\.[a-zA-Z0-9]{2,4}){1,2}(\\s){0,}$',
    PHONE: '^(\\+[0-9]+[\\- ]*)?(\\([0-9]+\\)[\\- ]*)?([0-9][0-9\\- ]+[0-9])$',
    CODE: '^[A-Za-z0-9_.]{4,50}$',
    CONTRACT_NUMBER_CODE: '^[A-Za-z0-9_/.]{4,50}$',
    BUILDING_CODE: '^[A-Za-z0-9_.]{0,50}$',
    NAME: /^[\p{L}\d\s]{4,50}$/u,
    NUMBER: '^[0-9]*$',
    SPACE: '^(?![\\s-])[\\S\\s-]+$',
    BUSINESS_CODE: '^[0-9-]{10,13}$',
    FLOAT_NUMBER: /^[0-9\.\,]*$/,
    NAME_FROM_0: /^[\p{L}\d\s]{0,50}$/u,
    WEBSITE:
      /(https?:\/\/)?(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
    // should not converted to string, otherwise will cause error
  };

  export const LENGTH_VALIDATOR = {
    USERNAME_MAX_LENGTH: {
      MAX: 50,
    },
    USERNAME_MIN_LENGTH: {
      MIN: 4,
    },
    NAME_MAX_LENGTH: {
      MAX: 100,
    },
    NAME_UNIT_MAX_LENGTH: {
      MAX: 100,
    },
    PASSWORD_MIN_LENGTH: {
      MIN: 3,
    },
    PASSWORD_MAX_LENGTH: {
      MAX: 99,
    },
    CODE_MAX_LENGTH: {
      MAX: 50,
    },
    PHONE_MAX_LENGTH: {
      MAX: 20,
    },
    PHONE_MIN_LENGTH: {
      MIN: 10,
    },
    EMAIL_MAX_LENGTH: {
      MAX: 50,
    },
    ENUM_MAX_LENGTH: {
      MAX: 20,
    },
    DESC_MAX_LENGTH: {
      MAX: 1000,
    },
    CONTENT_MAX_LENGTH: {
      MAX: 2000,
    },
    NOTE_MAX_LENGTH: {
      MAX: 1000,
    },
    TITLE_MAX_LENGTH: {
      MAX: 200,
    },
    ADDRESS_MAX_LENGTH: {
      MAX: 200,
    },
    ID_MIN_LENGTH: {
      MIN: 1,
    },
    ID_MAX_LENGTH: {
      MAX: 36,
    },
    VALUE_MAX_LENGTH: {
      MAX: 200,
    },
    IDS_MAX_LENGTH: {
      MAX: 500,
    },
    BIRTH_MAX_LENGTH: {
      MAX: 100,
    },
    GENDER_MAX_LENGTH: {
      MAX: 20,
    },
    STATUS_MAX_LENGTH: {
      MAX: 20,
    },
    OPINION_MAX_LENGTH: {
      MAX: 300,
    },
    LABEL_MAX_LENGTH: {
      MAX: 200,
    },
    ACCOUNT_NUMBER_LENGTH: {
      MAX: 20,
      MIN: 5,
    },
    IDENTIFY_CARD: {
      MAX: 50,
    },
    FEE_VAT: {
      MAX: 100,
    },
  };
