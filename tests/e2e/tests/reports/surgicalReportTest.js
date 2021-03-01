
module.exports = {
    tags: ['readonly', 'reports'],
    reportSurgical: function (client) {
        var report_table = client.page.cryptomedic().tableIterator('#report_table table');
        client.page.cryptomedic().authenticate('readonly');
        client.page.cryptomedic().report('surgical', { period: 'month', month: '2014-01' });
        client.myScreenshotReference();

        report_table
            .col(4).assert('Ukhia')
            .nextCol().assert('2014-104');
        client.end();
    }
};
