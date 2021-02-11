module.exports = {

    autoGenerateReference: function (client) {
        client.page.cryptomedic().authenticate('murshed');

        client.myClick('#menu_home');
        client.waitForElementVisible('#button_generate_reference');
        client.myClick('#button_generate_reference');
        client.waitForElementPresent('#Patient_Name');

        // Edit and save
        client.setValue('#Patient_entryyear', 1998);
        client.setValue('#Patient_Name', 'rezaul');
        client.myScreenshotReference();
        client.myClick('#bottomsubmenu #patient_create');

        client.pause(1000);

        client.assert.containsText('#Patient_entryyear', 1998);
        client.assert.containsText('#Patient_Name', 'rezaul');
        client.assert.containsText('#Patient_entryorder', 10000); // Should be above 10000 as automatically generated

        client.myClick('#topsubmenu #patient_edit');
        client.myClick('#topsubmenu #patient_delete');
        client.acceptAlert();
        client.waitForElementVisible('#page_home');
        // .pause(500);
        client.assert.myAssertHashIs('#/home');

        client.end();
    }
};
