import { deepFreeze } from "../_helpers/objects";

type ModelDescription = {
  name: string;
  icon: string;
  label: string;
  remote: string;
};

const constants = {
  models: {} as Record<string, ModelDescription>,
  freezeDays: 35
};

function technical2Human(technical: string): string {
  if (technical == "") {
    return "";
  }

  return technical
    .split("_")
    .map((component) => component[0].toUpperCase() + component.slice(1))
    .join(" ");
}

function addModel(
  model: string,
  opts: { icon?: string; label?: string; remote?: string } = {}
) {
  constants.models[model] = {
    name: model,
    icon: "/static/img/" + (opts.icon ?? `model_${model}.svg`),
    label: opts.label ?? technical2Human(model),
    remote: opts.remote ?? model
  };
}

// TODO: normalize all constants

addModel("appointment", {
  icon: "model_appointment.gif",
  remote: "appointments"
});
addModel("bill", {
  remote: "bills"
});
addModel("consult_clubfoot", {
  remote: "clubfeet"
});
addModel("consult_other", {
  remote: "otherconsults"
});
addModel("consult_ricket", {
  remote: "ricketconsults"
});
addModel("patient", {
  icon: "model_patient.gif",
  remote: "patients"
});
addModel("payment", {
  icon: "payment.gif",
  remote: "payments"
});
addModel("picture", {
  remote: "pictures"
});
addModel("surgery", {
  icon: "model_surgery.png",
  remote: "surgeries"
});

export default deepFreeze(constants);
