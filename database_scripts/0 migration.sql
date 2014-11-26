--
-- Drop unused tables
-- 
DROP TABLE orthopedic_devices;
DROP TABLE surgeries_followups;

--
-- Disable old prices kept for old application compliance
--
UPDATE prices 
	SET consult_medecine = 0,
		consult_making_plaster = 0
	WHERE dateto is NULL;

--
-- migrate L/R to L+R in Club Foot file
--

-- MuscularInbalanceLeft = 
-- CurvedLateralBorderLeft	
-- MedialCreaseLeft	
-- TalarHeadCoverageLeft	
-- PosteriorCreaseLeft	
-- RigidEquinusLeft	
-- EmptyHeelLeft	

UPDATE club_foots SET
	PainLeft = Pain,
	WalkingFloorContactLeft = WalkingFloorContact,
	WalkingFirstContactLeft = WalkingFirstContact,
	JumpingOneLegLeft = JumpingOneLeg,
	RunLeft = Run,
	AdductionAngleLeft = AdductionAngle,
	HindFootAngleWLeft = HindFootAngleW,
	DorsalFlexionMaxLeft = DorsalFlexionMax,
	PlantarFlexionMaxLeft = PlantarFlexionMax
	WHERE (Side = 165) or (Side = 164)

UPDATE club_foots SET
	PainRight = Pain,
	WalkingFloorContactRight = WalkingFloorContact,
	WalkingFirstContactRight = WalkingFirstContact,
	JumpingOneLegRight = JumpingOneLeg,
	RunRight = Run,
	AdductionAngleRight = AdductionAngle,
	HindFootAngleWRight = HindFootAngleW,
	DorsalFlexionMaxRight = DorsalFlexionMax,
	PlantarFlexionMaxRight = PlantarFlexionMax
	WHERE (Side = 165) or (Side = 163)

--
-- examiner name = a list:  Rezaul, Ershad, Murshed, Ricta, Shetou, Dr Taslim, Dr Monir, Dr AMD-KDM
--
-- TODOJH

--
-- modified_by is a link to real users
--
-- TODOJH
