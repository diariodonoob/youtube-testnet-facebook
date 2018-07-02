const speedTest = require('speedtest-net');
const test = speedTest({ maxTime: 5000 })

const FB = require('fb');
FB.setAccessToken('');

test.on('testserver', (server) => {
    pingTime = server.bestPing;
})

test.on('data', (data) => {
    if (parseFloat(data.speeds.download) < 10) {
        const body = `A internet ${data.client.isp} não está me dando a taxa adequado de download contratada, o que vem é ${data.speeds.download} e upload de ${data.speeds.upload}, não recomendo... #internetLixo`
        FB.api('me/feed', 'post', { message: body }, function (res) {
            if (!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }
            console.log('Post Id: ' + res.id);
        });
    }
})

test.on('error', (data) => console.log(data))

