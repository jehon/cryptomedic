
function assertTableInitial(client, i = 0) {
    client.page.cryptomedic().tableIterator('#price_lists')
        .section('thead')
        .row(1)
        .col(1)
        .assert('Beginning date')
        .col(1 + i)
        .nextCol().assert('2016-01-03')
        .nextCol().assert('2013-01-01')
        .nextCol().assert('')
        .row(4).col(1)
        .assert('')
        .col(1 + i)
        .nextCol().assert('Locked')
        .nextCol().assert('Locked')
        .nextCol().assert('Locked')
        .section('tbody')
        .row(1).col(1)
        .assert('consult_CDC_consultation_Bengali_Doctor')
        .col(1 + i)
        .nextCol().assert('300')
        .nextCol().assert('300')
        .nextCol().assert('200')
        .nextRow(4).col(1)
        .assert('consult_field_visit')
        .col(1 + i)
        .nextCol().assert('-')
        .nextCol().assert('-')
        .nextCol().assert('100')
        .nextRow(7).col(1)
        .assert('other_Other_consultation_care')
        .col(1 + i)
        .nextCol().assert('open')
        .nextCol().assert('open')
        .nextCol().assert('open')
        .endTable();

    client.assert.not.elementPresent('#button_save_' + (i));
    client.assert.not.elementPresent('#button_save_' + (i + 1));
    client.assert.not.elementPresent('#button_save_' + (i + 2));
}

module.exports = {
    'go to the price page': function (client) {
        client.page.cryptomedic().authenticate('thierry');

        // Select file
        client.waitForElementVisible('#menu_prices');
        client.myClick('#menu_prices x-button');
        client.page.cryptomedic().myWaitFetch();

        assertTableInitial(client);
    },

    'create a new Price List': function (client) {
        // Button to create a new price list
        client.waitForElementVisible('#button_create');
        client.assert.not.elementPresent('#action_creating');
        client.myClick('#button_create');

        client.waitForElementVisible('#action_creating');
        client.assert.visible('#form_creating input[name=pivotDate]');

        client.myFormFillIn('#form_creating', { '[name=pivotDate]': '2010-01-01' }, '#button_do_create');

        client.waitForElementVisible('#error_date');

        client.myFormFillIn('#form_creating', { '[name=pivotDate]': '2030-01-01' }, '#button_do_create');
        client.pause(10);

        client.waitForElementNotPresent('#error_date');
        client.waitForElementNotPresent('#button_create');
        client.waitForElementNotPresent('#action_creating');
    },

    'edit the created price list, but not saving': function (client) {
        assertTableInitial(client, 1);
        client.waitForElementVisible('#button_save_0');
        client.waitForElementVisible('#button_cancel_0');
        client.assert.not.elementPresent('#button_edit_0');
        client.page.cryptomedic().tableIterator('#price_lists')
            .section('tbody')
            .col(2)
            .row(1)
            .assert(false, '[name=\'consult_CDC_consultation_Bengali_Doctor\'][value=\'300\']')
            .nextRow()
            .assert(false, '[name=\'consult_CDC_consultation_Doctor\'][value=\'-1\']')
            .nextRow()
            .assert(false, '[name=\'consult_CDC_consultation_physio\'][value=\'100\']')
            .nextRow()
            .assert(false, '[name=\'consult_ClubFoot_Follow_up\'][value=\'100\']')
            .row(12)
            .assert(false, '[name=\'other_Other_consultation_care\'][value=\'1\']')
            .endTable();

        client.myFormFillIn('#price_lists', {
            '[name=consult_CDC_consultation_Bengali_Doctor]': { value: 123 },
            '[name=consult_ClubFoot_Follow_up]': { value: 123 },
            '[name=consult_CDC_consultation_Doctor]': { value: 123 }
        });

        client.myClick('#button_cancel_0');
        client.pause(10);
        client.page.cryptomedic().myWaitFetch();

        client.page.cryptomedic().tableIterator('#price_lists')
            .section('tbody')
            .col(2)
            .row(1).assert('300')
            .nextRow().assert('-')
            .nextRow().assert('100')
            .nextRow().assert('100')
            .row(12).assert('open');
        assertTableInitial(client, 1);
    },

    'edit the created price list': function (client) {
        assertTableInitial(client, 1);
        client.myClick('#button_edit_0');
        client.page.cryptomedic().myWaitFetch();

        client.myFormFillIn('#price_lists', {
            '[name=consult_CDC_consultation_Doctor]': { value: 123 }
        });

        client.myClick('#button_save_0');
        client.pause(10);
        client.page.cryptomedic().myWaitFetch();
        client.pause(1000);

        client.page.cryptomedic().tableIterator('#price_lists')
            .section('tbody')
            .col(2)
            .row(1).assert(300)
            .nextRow().assert(123)
            .nextRow().assert(100)
            .nextRow().assert(100)
            .row(12).assert('open')
            .endTable();

        assertTableInitial(client, 1);
    },

    'delete the created price list': function (client) {
        client.waitForElementPresent('#button_delete_0');
        client.myClick('#button_delete_0');
        client.page.cryptomedic().myWaitFetch();

        client.pause(1000);
        assertTableInitial(client);

        client.end();
    }
};
