//import { DEV_BACKEND_URL, PROD_BACKEND_URL } from '@env'
const devEnviromentVariables = {
    BACKEND_URL: "http://169.197.183.233:3000"
};
const prodEnviromentVariables = {
    BACKEND_URL: "http://169.197.183.233:3000"
};
export default __DEV__ ? devEnviromentVariables : prodEnviromentVariables
