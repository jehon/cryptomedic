module.exports = {
    tags: ['readonly', 'reports'],
    reportConsultation: function (client) {
        var report_table = client.page.cryptomedic().tableIterator('#report_table table');
        client.page.cryptomedic().authenticate('readonly');
        client.page.cryptomedic().report('consultations', { day: '2015-04-28' });
        client.myScreenshotReference();

        report_table.assert('Chakaria Disability Center')
            .col(2).assert('2001-1');
        client.end();
    }
};
