/* DO NOT EDIT, file generated by nestjs-i18n */
  
/* eslint-disable */
/* prettier-ignore */
import { Path } from "nestjs-i18n";
/* prettier-ignore */
export type I18nTranslations = {
    "app": {
        "errors": {
            "timeout": string;
            "internalServerError": string;
            "prismaClientError": string;
            "validation": string;
            "translatingFailed": string;
            "fallback": string;
        };
    };
    "auth": {
        "errors": {
            "unauthorized": string;
            "loginFirst": string;
            "wrongCredentials": string;
            "register": string;
            "login": string;
            "alreadyActive": string;
            "invalidSignupCode": string;
            "notActive": string;
            "changePasswordToNew": string;
        };
        "success": {
            "signup": string;
            "confirmSignup": string;
            "signin": string;
            "resetPassword": string;
            "update": string;
            "delete": string;
            "logout": string;
            "resetPasswordMailSent": string;
        };
    };
    "custom": {
        "invalidUsername": string;
        "termsAndConditionsRequired": string;
    };
    "entities": {
        "User": {
            "definite": {
                "plural": string;
                "singular": string;
            };
            "indefinite": {
                "plural": string;
                "singular": string;
            };
        };
    };
    "languages": {
        "ar": string;
        "en": string;
    };
    "properties": {
        "email": {
            "definite": string;
            "indefinite": string;
        };
        "username": {
            "definite": string;
            "indefinite": string;
        };
    };
    "shared": {
        "success": {
            "getAll": string;
            "getOne": string;
            "create": string;
            "update": string;
            "delete": string;
            "ability": {
                "getAll": string;
                "getOne": string;
                "create": string;
                "update": string;
                "delete": string;
            };
        };
        "errors": {
            "getAll": string;
            "getOne": string;
            "create": string;
            "update": string;
            "delete": string;
            "ability": {
                "getAll": string;
                "getOne": string;
                "create": string;
                "update": string;
                "delete": string;
            };
        };
    };
    "user": {
        "success": {
            "changeEmail": string;
        };
    };
    "validation": {
        "errors": {
            "uniqueProperty": string;
            "findOrThrow": string;
            "invalidFileType": string;
            "failedToUpload": string;
            "foreignKeyFailed": string;
            "fileIsRequired": string;
        };
    };
    "zod": {
        "errors": {
            "invalid_type": string;
            "invalid_type_received_undefined": string;
            "invalid_literal": string;
            "unrecognized_keys": string;
            "invalid_union": string;
            "invalid_union_discriminator": string;
            "invalid_enum_value": string;
            "invalid_arguments": string;
            "invalid_return_type": string;
            "invalid_date": string;
            "custom": string;
            "invalid_intersection_types": string;
            "not_multiple_of": string;
            "not_finite": string;
            "invalid_string": {
                "email": string;
                "url": string;
                "uuid": string;
                "cuid": string;
                "regex": string;
                "datetime": string;
                "startsWith": string;
                "endsWith": string;
            };
            "too_small": {
                "array": {
                    "exact": string;
                    "inclusive": string;
                    "not_inclusive": string;
                };
                "string": {
                    "exact": string;
                    "inclusive": string;
                    "not_inclusive": string;
                };
                "number": {
                    "exact": string;
                    "inclusive": string;
                    "not_inclusive": string;
                };
                "set": {
                    "exact": string;
                    "inclusive": string;
                    "not_inclusive": string;
                };
                "date": {
                    "exact": string;
                    "inclusive": string;
                    "not_inclusive": string;
                };
            };
            "too_big": {
                "array": {
                    "exact": string;
                    "inclusive": string;
                    "not_inclusive": string;
                };
                "string": {
                    "exact": string;
                    "inclusive": string;
                    "not_inclusive": string;
                };
                "number": {
                    "exact": string;
                    "inclusive": string;
                    "not_inclusive": string;
                };
                "set": {
                    "exact": string;
                    "inclusive": string;
                    "not_inclusive": string;
                };
                "date": {
                    "exact": string;
                    "inclusive": string;
                    "not_inclusive": string;
                };
            };
        };
        "validations": {
            "email": string;
            "url": string;
            "uuid": string;
            "cuid": string;
            "regex": string;
            "datetime": string;
        };
        "types": {
            "function": string;
            "number": string;
            "string": string;
            "nan": string;
            "integer": string;
            "float": string;
            "boolean": string;
            "date": string;
            "bigint": string;
            "undefined": string;
            "symbol": string;
            "null": string;
            "array": string;
            "object": string;
            "unknown": string;
            "promise": string;
            "void": string;
            "never": string;
            "map": string;
            "set": string;
        };
    };
};
/* prettier-ignore */
export type I18nPath = Path<I18nTranslations>;