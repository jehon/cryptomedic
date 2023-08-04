import bootstrap5raw from "../../node_modules/bootstrap5/dist/css/bootstrap.min.css";
export let bootstrap5 = `
    <styles>${atob(bootstrap5raw.split(";base64,")[1])}</styles>`;
