module.exports = {
  'tags': [ 'readonly', 'reports' ],
  'reportMonthlyActivity': function(client) {
    var report_table = client.page.cryptomedic().tableIterator('#report_table table');
    client
      .page.cryptomedic().authenticate('readonly')
      .page.cryptomedic().report('monthlyActivity', { 'month': '2014-05' })
      ;
    report_table.assert('1')
        .nextCol().assert('2014-05')
        .nextCol().assert('Ershad')
        .nextCol().assert('RA') // Ramu (codage)
        .nextCol().assert('2014-103')
        .nextCol().assert('OSMAN')
        .nextCol().assert('5y4m')
        .nextCol().assert('Male')
        .nextCol().assert('Old')
        .nextCol().assert('4500')
        .nextCol().assert('9')
        .nextCol().assert('500')
        .nextCol().assert('2')
        .nextCol().assert('CF')
        .nextCol().assert('CsP')
        .nextCol().assert('Plast')
        .nextCol().assert('100')
        .nextCol().assert('0')
        .nextCol().assert('0')
        .nextCol().assert('0')
        .nextCol().assert('400')
        .nextCol().assert('500')
        .nextCol().assert('200')
        .nextCol().assert('0')

        // New / Old patient in same month
        .row(2).col(5).assert('2014-107')
        .nextCol(4).assert('New')

        .nextRow(1).col(5).assert('2014-107')
        .nextCol(4).assert('Old')

        // .nextCol().assert('=', 'last', 17, '400')
        // .nextCol().assert('=', 'last', 'last', '300')

        .row('last').col(17).assert('400')
        .row('last').col('last').assert('300')
        ;
    client
      .end();
  },

  'reportDailyActivity': function(client) {
    var report_table = client.page.cryptomedic().tableIterator('#report_table table');
    client
      .page.cryptomedic().authenticate('readonly')
      .page.cryptomedic().report('dailyActivity', { 'day': '2014-05-20' })
      ;
    report_table.assert('1')
        .nextCol().assert('2014-05-20')
        .nextCol().assert('Ershad')
        .nextCol().assert('RA') // Ramu (codage)
        .nextCol().assert('2014-103')
        .nextCol().assert('OSMAN')
        .nextCol().assert('5y4m')
        .nextCol().assert('Male')
        .nextCol().assert('Old')
        .nextCol().assert('4500')
        .nextCol().assert('9')
        .nextCol().assert('500')
        .nextCol().assert('2')
        .nextCol().assert('CF')
        .nextCol().assert('CsP')
        .nextCol().assert('Plast')
        .nextCol().assert('100')
        .nextCol().assert('0')
        .nextCol().assert('0')
        .nextCol().assert('0')
        .nextCol().assert('400')
        .nextCol().assert('500')
        .nextCol().assert('200')
        .nextCol().assert('0')

        .row('last').col(17).assert('200')
        .row('last').col('last').assert('300')
        ;
    client
      .end();
  }
};
