const CDP = require('chrome-remote-interface');
async function example() {
    let client;
    try {
        // connect to endpoint  
        client = await CDP({
            port: 8000,
            local: true
        });
        const {
            Network, Page, Runtime
        } = client;
        // setup handlers   
        Network.requestWillBeSent((params) => {});
        Network.responseReceived((params) => {})
            // enable events then start!  
        await Network.enable();
        await Page.enable();
        Page.navigate({
            url: 'chrome://version'
        }).then((res) => {});
        await Page.loadEventFired();
    } catch (err) {
        console.error(err);
    } finally {
        if (client) {
            await client.close();
        }
    }
}
example();