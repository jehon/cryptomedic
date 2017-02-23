
update payments set Date = (select bills.Date from bills where bills.id = payments.bill_id),
  updated_at = now()
  where date is null;

update payments set ExaminerName = (select bills.ExaminerName from bills where bills.id = payments.bill_id),
  updated_at = now()
  where ExaminerName is null;

update payments set lastuser = (select bills.lastuser from bills where bills.id = payments.bill_id),
  updated_at = now()
  where lastuser is null;
