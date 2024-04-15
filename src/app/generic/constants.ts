import { deepFreeze } from "../_helpers/objects";

type ModelDescription = {
  name: string;
  icon: string;
  label: string;
};

const constants = {
  models: {} as Record<string, ModelDescription>
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

function addModel(model: string, opts: { icon?: string; label?: string } = {}) {
  constants.models[model] = {
    name: model,
    icon: "/static/img/" + (opts.icon ?? `model_${model}.svg`),
    label: opts.label ?? technical2Human(model)
  };
}

addModel("appointment", {
  icon: "model_appointment.gif"
});
addModel("bill");
addModel("consult_clubfoot");
addModel("consult_other");
addModel("consult_ricket");
addModel("patient", {
  icon: "model_patient.gif"
});
addModel("payment", {
  icon: "payment.gif"
});
addModel("picture");
addModel("surgery", {
  icon: "model_surgery.svg"
});

export default deepFreeze(constants);
