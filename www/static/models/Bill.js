'use strict';

// TODO: there seems to have a race condition around here...

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
        for(var v of folder.getListByType(Bill)) {
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

  ratioSalary() {
  /**
    From TC:
    Level 0 is when the familial ration is < 300
    Level 1 is when the familial ration is 300<  FR < 500
    Level 2 is when the familial ration is 500< FR < 1500
    Level 3 is when the familial ration is 1500< FR < 3000
    Level 4 is when the familial ration is 3000< FR
   */
    this.Sociallevel = 4;
    if (!this.isNotZero('sl_numberOfHouseholdMembers')) {
      throw new DataMissingException('sl_numberOfHouseholdMembers');
    }

    var rs = Math.ceil(this.sl_familySalary / this.sl_numberOfHouseholdMembers);

    if (rs <= 300)  {
      this.Sociallevel = 0;
    } else {
      if (rs <= 500) {
        this.Sociallevel = 1;
      } else {
        if (rs <= 1500) {
          this.Sociallevel = 2;
        } else {
          if (rs <= 3000) {
            this.Sociallevel = 3;
          } else {
            this.Sociallevel = 4;
          }
        }
      }
    }
    return rs;
  }

  calculate_total_real() {
    if (!this.price) {
      this.total_real = 0;
      this.total_asked = 0;
      return -1;
    }
    if (!this.bill_lines)  {
      this.total_real = 0;
    } else {
      this.total_real = this.bill_lines.reduce((acc, bval) => {
        if (bval.Amount <= 0) {
          return acc;
        }
        return acc + this.getPriceLines().reduce((acc, pval) => {
          if (bval.title == pval.title) {
            return acc + parseInt(bval.Amount) * parseInt(pval.Amount);
          }
          return acc;
        }, 0);
      }, 0);
    }
    this.total_asked = this.total_real * this.calculate_percentage_asked();
    return this.total_real;
  }

  calculate_percentage_asked() {
    if (!this.price) {
      //console.warn('calculate_percentage_asked(): no price id');
      return 1;
    }
    var sl = this['Sociallevel'];
    if (sl == null) {
      //console.warn('calculate_percentage_asked(): no social level');
      return 1;
    }
    if (typeof(this.price['socialLevelPercentage_' + sl]) == 'undefined') {
      //console.warn('calculate_percentage_asked(): no social level in price for sl ' + sl);
      return 1;
    }
    var perc = this.price['socialLevelPercentage_' + sl];
    // console.log("price", this.price, sl, perc)
    return perc;
  }

  getPriceLines() {
    if (!this.price) {
      return [];
    }
    return this.price.price_lines;
  }

  calculatePriceId(prices) {
    if (typeof(this.Date) == 'undefined' || !prices) {
      this.price_id = 1;
      return 0;
    }
    this.price_id = -1;
    var t = this;
    var dref = this.Date;
    for(var i in prices) {
      var p = prices[i];
      if (((p['datefrom'] == null) || (p['datefrom'] <= dref))
        && ((p['dateto'] == null) || (p['dateto'] > dref))) {
        t.price_id = i;
        t.price = prices[i];
      }
    }
    if (this.price_id < 0) {
      throw new Error('Price Id not set');
    }
    this.calculate_total_real();
  }

  getPriceId() {
    return this.price_id;
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
