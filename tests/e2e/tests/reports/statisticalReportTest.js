module.exports = {
    tags: ['readonly', 'reports'],
    reportConsultation: function (client) {
        client.page.cryptomedic().authenticate('readonly');
        client.page.cryptomedic().report('statistical', { period: 'month', month: '2014-05' });

        const report_table = client.page.cryptomedic().tableIterator('#report_table table');
        report_table
            .row(8).col(1).assert('Club Foots')
            .nextCol().assert('5');

        client.myScreenshotReference();
        client.end();
    }
};
