class Bill extends PatientRelated {
    getModel() {
        return 'Bill';
    }

    getRelated() {
        return {
            'Payment': 'bill_id'
        }
    }

    constructor(data, folder = null) {
        super(data, folder);
        if (!data || Object.keys(data).length == 0) {
            // Initialize social level from last bill (if any)
            var last_bill = null;
            if (folder) {
                for (var v of folder.getListByType(Bill)) {
                    if (!last_bill) {
                        last_bill = v;
                    } else {
                        if (last_bill.Date < v.Date) {
                            last_bill = v;
                        }
                    }
                }
                if (last_bill) {
                    this.sl_familySalary = last_bill.sl_familySalary;
                    this.sl_numberOfHouseholdMembers = last_bill.sl_numberOfHouseholdMembers;
                }
            }
        }
    }

    getRatioSalary() {
        if (this.isNotZero('sl_numberOfHouseholdMembers')) {
            return Math.ceil(this.sl_familySalary / this.sl_numberOfHouseholdMembers);
        }
        return 0;
    }

    getCalculatedSocialLevel() {
        const rs = this.getRatioSalary();
        /**
          From TC:
          Level 0 is when the familial ration is < 300
          Level 1 is when the familial ration is 300<  FR < 500
          Level 2 is when the familial ration is 500< FR < 1500
          Level 3 is when the familial ration is 1500< FR < 3000
          Level 4 is when the familial ration is 3000< FR
         */
        if (rs < 0) {
            return 4;
        }

        if (this.isNotZero('sl_numberOfHouseholdMembers')) {
            if (rs <= 300) {
                return 0;
            } else {
                if (rs <= 500) {
                    return 1;
                } else {
                    if (rs <= 1500) {
                        return 2;
                    } else {
                        if (rs <= 3000) {
                            return 3;
                        }
                    }
                }
            }
        }
        return 4;
    }

    getPriceId() {
        if (window.cryptomedic && window.cryptomedic.serverSettings && window.cryptomedic.serverSettings.prices && this.Date) {
            const prices = window.cryptomedic.serverSettings.prices;
            for (const i in prices) {
                const p = prices[i];
                if (((p['datefrom'] == null) || (p['datefrom'] <= this.Date)) && ((p['dateto'] == null) || (p['dateto'] > this.Date))) {
                    return i;
                }
            }
        }
        return -1;
    }

    getPrice() {
        let i = this.getPriceId();
        if (i < 0) {
            return null;
        }
        const prices = window.cryptomedic.serverSettings.prices;
        return prices[i];
    }

    calculateTotalReal() {
        const price = this.getPrice();
        if (!price || !this.bill_lines) {
            this.total_real = 0;
        } else {
            this.total_real = this.bill_lines.reduce((acc, bval) => {
                if (bval.Amount <= 0) {
                    return acc;
                }
                return acc + this.getPrice().price_lines.reduce((acc, pval) => {
                    if (bval.title == pval.title) {
                        return acc + parseInt(bval.Amount) * parseInt(pval.Amount);
                    }
                    return acc;
                }, 0);
            }, 0);
        }
        return this.total_real;
    }

    getPercentageAsked() {
        const price = this.getPrice();
        const sl = this.getCalculatedSocialLevel();

        if (!price) {
            return 1;
        }

        if (price['socialLevelPercentage_' + sl]) {
            return price['socialLevelPercentage_' + sl];
        }
        return 1;
    }

    getPercentageAskedAsString() {
        return Math.round(this.getPercentageAsked() * 100) + '%';
    }

    calculateTotalAsked() {
        this.total_asked = this.calculateTotalReal() * this.getPercentageAsked();
        return this.total_asked;
    }

    validate(res) {
        /* Business rules (price > 4):
        - il faut pourvoir coder home visit ou give appointment mais pas les 2
        - il faut pourvoir coder consultation physio ou doctor mais pas les 2
        */
        res = super.validate(res);

        if ((this.Date > (new Date()).toISOString())) {
            res.dateInTheFuture = true;
        }

        if (this.price_id >= 2) {
            if ((this.consult_home_visit > 0) && (this.consult_give_appointment > 0)) {
                res.homeVisitAndGiveAppointment = true;
            }

            if ((this.consult_CDC_consultation_physio > 0) && (this.consult_CDC_consultation_Doctor > 0)) {
                res.consultPhisioAndDoctor = true;
            }
        }
        return res;
    }
}