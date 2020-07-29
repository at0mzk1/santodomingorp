export default {
    get(endpoint, headers, parameter, done) {
        fetch([process.env.REACT_APP_API_HOSTNAME, endpoint, parameter].join(''), {
            headers: headers
        }).then((results) => results.json())
            .then(results => {
            done(results);
            });
        },
    post(endpoint, headers, parameter, body, done) {
        fetch([process.env.REACT_APP_API_HOSTNAME, endpoint, parameter].join(''), {
            headers: headers,
            method: "POST",
            body: JSON.stringify(body)
        }).then((results) => results.json())
        .then((results) => {
            done(results)
        })
    },
    getIP(done) {
        fetch('https://api.ipify.org?format=json').then((ip) => ip.json())
            .then(ip => {
                done(ip)
            });
    }
}