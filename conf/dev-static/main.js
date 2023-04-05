class XDevProd extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title");
    const url = this.getAttribute("url") ?? "";
    let remoteUrl = this.getAttribute("remote-url") ?? url;
    if (remoteUrl[0] == "/") {
      remoteUrl = "http://www.cryptomedic.org" + remoteUrl;
    }

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
        <style>
            :host(*) {
                display: flex;
                flex-direction: row;
                width: 100%;
            }

            :host([action]) > *::before {
                display: inline-block;
                content: "";
                background: no-repeat left/1em url("https://upload.wikimedia.org/wikipedia/commons/9/92/Caution_sign_used_on_roads_pn.svg");
                height: 100%;
                width: 1em;
                margin-right: 1em;
            }

            * {
                flex-grow:  1;
                flex-basis: 10px;
                padding:    5px;
                text-align: center;
            }

            .prod {
                background-color: lightcoral;
            }

            .dev {
                background-color: lightgreen;
            }

            a[href=''] {
                text-decoration: none;
                color: black;
            }
        </style>
        <a class='prod' href='${remoteUrl}'>${title ?? "Production"}</a>
        <a class='dev' href='${url}'>${title ?? "Development"}</a>
    `;
  }
}

customElements.define("x-dev-prod", XDevProd);
