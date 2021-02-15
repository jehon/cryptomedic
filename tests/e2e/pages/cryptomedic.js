'use strict';

/* global JHElement */

var authenticated = false;
var _timestampStart = 0;

module.exports = {
    elements: {},
    commands: [{
        authenticate_fillIn: function (login) {
            _timestampStart = Date.now();
            if (!login) {
                throw new Error('Cryptomedic: Authenticate expect parameter 1 to be the login');
            }

            var password = 'p'; // See password.sql
            this.api.init();
            this.waitForElementVisible('body');
            this.assert.title('Cryptomedic');
            this.waitForElementPresent('x-page-login');
            this.waitForElementNotPresent('x-page-login[requesting=doLoginCheck]');
            this.myComponentExecute('x-page-login #username', function (v) { this.value = v; }, [login]);
            this.myComponentExecute('x-page-login #password', function (v) { this.value = v; }, [password]);
            this.api.pause(10);

            this.myComponentExecute('x-page-login', function () { this.doLogin(); });

            this.api.pause(10);
            this.waitForElementNotPresent('x-page-login[requesting]');
            return this;
        },

        // Each action is written as a separate method which must return the browser
        // object in order to be able to be queued
        authenticate: function (login) {
            this.authenticate_fillIn(login);
            this.waitForElementPresent('x-login-status[login]');
            this.waitForElementPresent(`x-login-status[login=${login}]`);
            authenticated = true;
            return this;
        },

        myWaitFetch: function () {
            this.api.pause(10);
            this.waitForElementNotPresent('cryptomedic-data-service[running]');
            this.api.pause(10);

            return this;
        },

        report: function (reportName, params) {
            if (!authenticated) {
                throw new Error('Cryptomedic: You should be authenticated to use report function');
            }

            this.myClick('#menu_more');
            this.waitForElementVisible('#menu_reports');
            this.myClick('#menu_reports');
            this.waitForElementVisible('#launch_report_' + reportName);
            this.myClick('#launch_report_' + reportName);
            for (var k in params) {
                const el = '[name="' + k + '"]';
                if (k == 'period') {
                    this.myRadio(el, params['period']);
                } else {
                    this.waitForElementVisible('css selector', el, '@@ Waiting for parameter ' + k + ' => ' + params[k] + ': ' + el);
                    if (k == 'day') {
                        true;
                    } else {
                        this.clearValue(el);
                    }
                    if (params[k]) {
                        const p = {};
                        p[el] = params[k];
                        this.myFormFillIn('#reportParamsForm', p);
                    }
                }
            }
            this.api.pause(100);
            this.waitForElementVisible('#report_refresh_button');
            this.myClick('#report_refresh_button');
            this.waitForElementVisible('#report_table');
            this.waitForElementVisible('#report_table table');

            return this;
        },

        goPatient: function (entryyear, entryorder) {
            if (!authenticated) {
                throw new Error('Cryptomedic: You should be authenticated to use report function');
            }
            // this.sync();
            this.myClick('#menu_home');
            this.waitForElementVisible('x-patient-by-reference');

            this.myComponentExecute('x-patient-by-reference >>> [name="entryyear"]', function (v) { this.value = v; }, [entryyear]);
            this.myComponentExecute('x-patient-by-reference >>> [name="entryorder"]', function (v) { this.value = v; }, [entryorder]);
            this.myComponentExecute('x-patient-by-reference >>> [action="query"]', function () { this.click(); }, []);

            this.waitForElementVisible('#Patient_entryyear');
            this.assert.containsText('#Patient_entryyear', entryyear);
            this.waitForElementVisible('#Patient_entryorder');
            this.assert.containsText('#Patient_entryorder', entryorder);
            this.api.pause(500);

            this.myWaitFetch();

            return this;
        },

        selectFile: function (type, id) {
            this
                .myClick('#folder_menu_' + type + '_' + id)
                .waitForElementVisible('#folder_menu_' + type + '_' + id)
                .assert.containsText('#file_id', id);
            return this;
        },

        tableIterator: function (tableSelector, row = 1, col = 1, section = 'tbody') {
            const iterator = {
                col: (i = 1) => { col = i; return iterator; },
                row: (i = 1) => { row = i; return iterator; },
                section: (i = 'tbody') => { section = i; return iterator; },
                nextCol: (i = 1) => { col = col + i; return iterator; },
                nextRow: (i = 1) => { row = row + i; return iterator; },
                toString: () => {
                    return tableSelector
                        + ' > ' + section
                        + ' > ' + 'tr' + ':' + (row === 'last' ? 'last-child' : 'nth-child(' + row + ')')
                        + ' > ' + (section == 'tbody' ? 'td' : 'th') + ':' + (col === 'last' ? 'last-child' : 'nth-child(' + col + ')');
                },
                assert: (text = false, selector = '') => {
                    this.waitForElementVisible(tableSelector);
                    this.waitForElementVisible(iterator.toString() + ' ' + selector);
                    if (text) {
                        this
                            .assert.containsText(iterator.toString(), text);
                    }
                    return iterator;
                },
                endTable: () => {
                    return iterator;
                }
            };
            return iterator;
        }
    }]
};
