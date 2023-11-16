-- 2023-07-29
ALTER TABLE `ricket_consults`
DROP `x_Surgery`;

-- 2023-07-30
ALTER TABLE `ricket_consults`
DROP `x_Brace`,
DROP `x_Nutrisupport`,
DROP `x_conclusion_medical_calcium500`,
DROP `x_conclusion_medical_calcium1000`,
DROP `x_conclusion_medical_vitaminD`;

ALTER TABLE `club_feet`
DROP `x_Treatment`;

ALTER TABLE `other_consults`
DROP `x_Surgery66`;
