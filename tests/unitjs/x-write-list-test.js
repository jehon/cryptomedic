
describe('x-write-list-test', function() {
    let listRadio = ['truc', 'brol', 'machin', 'chose'];
    let listSelect = ['truc', 'brol', 'machin', 'chose', 'bazar', 'ça', 'là'];

    let checkRadio = (el, v) => {
        // Are we set?
        expect(el).not.toBeNull();
        expect(el.shadowRoot.querySelector('input[type=radio]')).not.toBeNull();
        expect(el.shadowRoot.querySelector('select')).toBeNull();
        expect(el.getAttribute('mode')).toBe("radio");

        // Check the value
        expect(el.shadowRoot.querySelector('input[type=radio][value="' + v + '"]')).not.toBeNull();
        expect(el.shadowRoot.querySelector('input[type=radio][value="' + v + '"]').hasAttribute('checked')).toBeTruthy();
    }

    let checkRadioNull = (el) => {
        // Are we set?
        expect(el).not.toBeNull();

        // Check the mode
        expect(el.shadowRoot.querySelector('input[type=radio]')).not.toBeNull();
        expect(el.shadowRoot.querySelector('select')).toBeNull();
        expect(el.getAttribute('mode')).toBe("radio");

        // Check the value
        expect(el.shadowRoot.querySelector('input[type=radio][value=""]').hasAttribute('checked')).toBeTruthy();
        expect(el.getValue()).toBe(null);
    }

    let checkSelect = (el, v) => {
        // Are we set?
        expect(el).not.toBeNull();

        // Check the mode
        expect(el.shadowRoot.querySelector('input[type=radio]')).toBeNull();
        expect(el.shadowRoot.querySelector('select')).not.toBeNull();
        expect(el.getAttribute('mode')).toBe("select");

        // Check the value
        expect(el.shadowRoot.querySelector('select').value).toBe(v);
        expect(el.getValue()).toBe(v);
    }

    let checkSelectNull = (el) => {
        // Are we set?
        expect(el).not.toBeNull();

        // Check the mode
        expect(el.shadowRoot.querySelector('input[type=radio]')).toBeNull();
        expect(el.shadowRoot.querySelector('select')).not.toBeNull();
        expect(el.getAttribute('mode')).toBe("select");

        // Check the value
        expect(el.shadowRoot.querySelector('select').value).toBe('');
        expect(el.getValue()).toBe(null);
    }

    webDescribe("with emtpy list", `<x-write-list value='machin' list=''></x-write-list>`, function(element) {
        it("should render", function() {
            expect(element().getAttribute("mode")).toBe('empty');
            expect(element().querySelector('input[type=radio]')).toBeNull();
            expect(element().querySelector('select')).toBeNull();
        })
    })

    webDescribe("with emtpy list-name", `<x-write-list value='machin' list-name=''></x-write-list>`, function(element) {
        it("should render", function() {
            expect(element().getAttribute("mode")).toBe('empty');
            expect(element().querySelector('input[type=radio]')).toBeNull();
            expect(element().querySelector('select')).toBeNull();

            element().removeAttribute("list-name");
            expect(element().getAttribute("mode")).toBe('empty');
            expect(element().querySelector('input[type=radio]')).toBeNull();
            expect(element().querySelector('select')).toBeNull();
        })
    })

    webDescribe("should show RADIO when the list is < 5 items", `<x-write-list value='machin' list='${JSON.stringify(listRadio)}'></x-write-list>`, function(element) {
        it("should instanciated", function() {
            checkRadio(element(), 'machin');
        });

        it("should fire event", function() {
            let el = element().shadowRoot.querySelector('input[value="brol"]');
            expect(el).not.toBeNull();
            let res = false;
            element().addEventListener("change", (event) => {
                res = "test"
            });
            el.setAttribute('checked', 'checked');
            JHElement.fireOn(el, "change", "test");
            expect(res).toBe("test");
            expect(element().getValue()).toBe("brol");
        });
    })

    webDescribe("should show SELECT when the list is > 5 items", `<x-write-list value='machin' list='${JSON.stringify(listSelect)}'></x-write-list>`, function(element) {
        it("should instanciated", function() {
            checkSelect(element(), 'machin');
        });

        it("should fire event", function() {
            let el = element().shadowRoot.querySelector('select');
            expect(el).not.toBeNull();
            let res = false;
            element().addEventListener("change", (event) => {
                res = "test"
            });
            el.value = 'brol';
            JHElement.fireOn(el, "change", "test");
            expect(res).toBe("test");
            expect(element().getValue()).toBe("brol");
        });
    })

    webDescribe("should handle RADIO nullable", `<x-write-list nullable value='machin' list='${JSON.stringify(listRadio)}'></x-write-list>`, function(element) {
        it("should instanciated", function() {
            expect(element().shadowRoot.querySelector('input[type=radio][value=""]')).not.toBeNull();
        });
    })

    webDescribe("should handle SELECT nullable", `<x-write-list nullable value='machin' list='${JSON.stringify(listSelect)}'></x-write-list>`, function(element) {
        it("should instanciated", function() {
            expect(element().shadowRoot.querySelector('select option[value=""]')).not.toBeNull();
        });
    })

    webDescribe("should handle RADIO with null", `<x-write-list nullable value='' list='${JSON.stringify(listRadio)}'></x-write-list>`, function(element) {
        it("should instanciated", function() {
            checkRadioNull(element());
        });
    })

    webDescribe("should handle SELECT with null", `<x-write-list nullable value='' list='${JSON.stringify(listSelect)}'></x-write-list>`, function(element) {
        it("should instanciated", function() {
            checkSelectNull(element());
        });
    });

    // Test changes in value
    webDescribe("should handle RADIO value change", `<x-write-list nullable value='machin' list='${JSON.stringify(listRadio)}'></x-write-list>`, function(element) {
        it("should instanciated", function() {
            checkRadio(element(), 'machin');
            element().setAttribute('value', 'truc');
            checkRadio(element(), 'truc');
        });
    });

    webDescribe("should handle SELECT value change", `<x-write-list nullable value='machin' list='${JSON.stringify(listSelect)}'></x-write-list>`, function(element) {
        it("should instanciated", function() {
            checkSelect(element(), 'machin');
            element().setAttribute('value', 'truc');
            checkSelect(element(), 'truc');
        });
    });

    // Test changes in html elements
    webDescribe("should handle RADIO html change", `<x-write-list nullable value='machin' list='${JSON.stringify(listRadio)}'></x-write-list>`, function(element) {
        it("should instanciated", function() {
            checkRadio(element(), 'machin');
            element().shadowRoot.querySelector('input[type=radio][value=truc]').setAttribute('checked', true);
            checkRadio(element(), 'truc');
        });
    });

    webDescribe("should handle SELECT html change", `<x-write-list nullable value='machin' list='${JSON.stringify(listSelect)}'></x-write-list>`, function(element) {
        it("should instanciated", function() {
            checkSelect(element(), 'machin');
            element().shadowRoot.querySelector('select').value = 'truc';
            checkSelect(element(), 'truc');
        });
    })

    // Test click on span for radio
    webDescribe("should handle RADIO Span click", `<x-write-list nullable value='machin' list='${JSON.stringify(listRadio)}'></x-write-list>`, function(element) {
        it("should instanciated", function() {
            checkRadio(element(), 'machin');
            element().shadowRoot.querySelector('span[to=truc').click();
            checkRadio(element(), 'truc');
        });
    })

    webDescribe("should handle named list", `<x-write-list value='machin' list-name='listRadio'></x-write-list>`, function(element) {
        it("should instanciated", function() {
            expect(element()).not.toBeNull();
            XWriteList.setReferences({
                listRadio: listRadio,
                listSelect: listSelect
            })
            checkRadio(element(), 'machin');
        });
    })
});