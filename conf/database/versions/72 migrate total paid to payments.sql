
insert into payments(bill_id, amount, notes) select id, total_paid, 'automatically generated from previous system' from bills where total_paid > 0

