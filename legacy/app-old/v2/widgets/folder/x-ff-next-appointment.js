import { defineCustomElement } from "../../js/custom-element.js";
import date2CanonicString from "../../js/date2CanonicString.js";
import { getRouteToFolderAdd, setRoute } from "../../js/router.js";
import Appointment from "../../models/Appointment.js";
import XWithFolder from "./x-with-folder.js";
import "../style/x-group-panel.js";
import "../style/x-message.js";
import "../style/x-button.js";
import "../func/x-buttons.js";
import { messages } from "../../../../../src/config.js";
import XButton from "../style/x-button.js";

// TODO: better layout for without appointment

export default class XFfNextAppointment extends XWithFolder {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <css-inherit></css-inherit>
            <style>
                :host(:not([next-appointment])) #withAppointment {
                  display: none;
                }

                :host([next-appointment]) #withoutAppointment {
                  display: none;
                }

                #withoutAppointment {
                    display: flex;
                    flex-direction: column;        
                }
            </style>
            <x-group-panel class='related' title='Next Appointment'>
                <div slot='versal'>
                    <img src="/static/img/consultOfDay.gif" style='height: 60px'>
                </div>
                <div id='withAppointment'>
                    Next appointment: <span id='appointment'></span>
                </div>
                <div id='withoutAppointment'>
                    <x-message level='${messages.warning}'>No appointment planned</x-message>
                    <x-buttons>
                        <x-button id='add-appointment' action='${XButton.Save}'>Add an appointment</x-button>
                    </x-buttons>
                </div>
            </x-group-panel>`;

    this.shadowRoot
      .querySelector("x-button#add-appointment")
      .addEventListener("click", () =>
        setRoute(getRouteToFolderAdd(this.folder.getId(), "Appointment"))
      );
  }

  _next_appointment() {
    if (!this.isOk()) {
      return null;
    }

    const today = date2CanonicString(new Date(), true);
    var next = "";
    this.folder.getListByType(Appointment).forEach((v, _k) => {
      if (v.next_appointment > today) {
        if (!next || v.next_appointment < next) {
          next = v.next_appointment;
        }
      }
    });
    return next;
  }

  adapt() {
    const next_appointment = this._next_appointment();
    if (next_appointment) {
      this.setAttribute("next-appointment", next_appointment);
      this.shadowRoot.querySelector("#appointment").innerHTML =
        next_appointment;
    } else {
      this.removeAttribute("next-appointment");
      this.shadowRoot.querySelector("#appointment").innerHTML = "";
    }
  }
}

defineCustomElement(XFfNextAppointment);
