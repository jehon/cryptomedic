
ALTER TABLE `bills`
  DROP `modified`,
  DROP `created`;
  
ALTER TABLE `club_foots`
  DROP `modified`,
  DROP `created`;

ALTER TABLE `deleted`
  DROP `modified`;
  
ALTER TABLE `nonricket_consults`
  DROP `modified`,
  DROP `created`;

ALTER TABLE `patients`
  DROP `modified`,
  DROP `created`;

ALTER TABLE `pictures`
  DROP `modified`,
  DROP `created`;

ALTER TABLE `prices`
  DROP `modified`,
  DROP `created`;

ALTER TABLE `settings`
  DROP `modified`;

ALTER TABLE `surgeries`
  DROP `modified`,
  DROP `created`;

ALTER TABLE `ricket_consults`
  DROP `modified`,
  DROP `created`;

ALTER TABLE `users`
  DROP `modified`,
  DROP `created`;
