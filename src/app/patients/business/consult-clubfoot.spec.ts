import ConsultClubfoot from "./consult-clubfoot";

describe("consult-clubfoot", async () => {
  it("Pirani", () => {
    const file = new ConsultClubfoot();

    expect(file.getPiraniRight()).toBe("?");
    expect(file.getPiraniLeft()).toBe("?");

    file.curved_lateral_border_right = 1;
    file.medial_crease_right = 1;
    file.talar_head_coverage_right = 1;
    file.posterior_crease_right = 1;
    file.rigid_equinus_right = 1;

    expect(file.getPiraniRight()).toBe("?");

    file.empty_heel_right = 1;

    expect(file.getPiraniRight()).toBe(6);

    file.empty_heel_right = 0.5;

    expect(file.getPiraniRight()).toBe(5.5);
    expect(file.getPiraniLeft()).toBe("?");
  });
});
