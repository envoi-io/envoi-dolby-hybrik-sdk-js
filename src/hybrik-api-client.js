const axios = require('axios');

class HybrikAPI {
    constructor(api_url, compliance_date, oapi_key, oapi_secret, user_key, user_secret) {
        if (!api_url || api_url.indexOf('http') !== 0 || api_url.indexOf(':') < 0 || api_url.indexOf('//') < 0)
            throw new Error('HybrikAPI requires a valid API url');

        if (!user_key)
            throw new Error('HybrikAPI requires a user_key');
        if (!user_secret)
            throw new Error('HybrikAPI requires a user_secret');
        if (!compliance_date || !/^\d{8}$/.test(compliance_date))
            throw new Error('HybrikAPI requires a compliance date in "YYYYMMDD" format.');

        this.user_key = user_key;
        this.user_secret = user_secret;
        this.compliance_date = compliance_date;

        var url_parts = api_url.split('//');
        if (url_parts.length !== 2)
            throw new Error('HybrikAPI requires a valid API url');

        // this.oapi_url = url_parts[0] + '//' + oapi_key + ':' + oapi_secret + '@' + url_parts[1];

        // this.oapi_url = url_parts[0] + '//' + oapi_key + ':' + oapi_secret + '@' + url_parts[1];
        this.oapi_url = api_url

        if (this.oapi_url[this.oapi_url.length - 2] === '/')
        this.oapi_url = this.oapi_url.substring(0, this.oapi_url.length - 1);

        this.httpClient = axios.create({
            baseURL: this.oapi_url,
            auth: {
                username: oapi_key,
                password: oapi_secret
            }
        })


    }

    async connect() {
        const response = await this.httpClient.post('/login', {
            auth_key: this.user_key,
            auth_secret: this.user_secret
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Hybrik-Compliance': this.compliance_date
            }
        });
        console.debug('Hybrik.connect Response', response)
        this.login_data = response.data;
        return true;
    }

    async callApi(http_method, api_method, url_params, body_params) {
        const request_options = {
            method: http_method,
            url: this.oapi_url + (api_method[0] === '/' ? api_method : api_method.substring(1)),
            headers: {
                'X-Hybrik-Sapiauth': this.login_data.token,
                'X-Hybrik-Compliance': this.compliance_date
            }
        };

        if (url_params) {
            request_options.params = url_params;
        }
        if (body_params) {
            request_options.headers['Content-Type'] = 'application/json';
            request_options.data = body_params;
        }

        const response = await this.httpClient.request(request_options);
        return response.data;
    }
}

module.exports = HybrikAPI;