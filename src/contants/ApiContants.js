const config = require("../../package.json").projectConfig
const BACKEND_BASE_URL = config.backendApiBaseUrl

const COUNTRY_FLAG = {
    BASE_URL: `https://flagcdn.com`,
    //BASE_URL: `https://countryflagsapi.com`,
    SIZE: {16: '16', 24: '24', 32: '32', 48: '48', 64: '64'},
    STYLE: {FLAT: 'flat', SHINY: 'shiny'},
};


const STATIC_IMAGE = {
    BASE_URL: `${BACKEND_BASE_URL}/images`,
    TYPE: {POSTER: 'poster', LOGO: 'logo', GALLERY: 'gallery'},
    SIZE: {SQUARE: 'square', LANDSCAPE: 'landscape', PORTRAIT: 'portrait'},
    QUALITY: {SD: 'sd', HD: 'hd'},
};

const BACKEND_API = {
    BASE_API_URL: 'http://localhost:8000',
    REGISTER: '/v1/auth/register',
    LOGIN: '/v1/auth/login',
}

export default {COUNTRY_FLAG, BACKEND_API, STATIC_IMAGE};