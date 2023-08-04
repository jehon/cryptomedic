import style from "../../node_modules/bootstrap5/dist/css/bootstrap.min.css";

export default class XStyleIOBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
      </style>
      <div class="card">
        <div class="card-header">
          Featured
        </div>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    `;

    //   this.attachShadow({ mode: "open" }).innerHTML = `
    //   <style>
    //     :host() {
    //       width: "calc(min(100%, 800px))",
    //       display: "flex",
    //       flexDirection: "row",
    //       justifyContent: "space-between",
    //       margin: "0 auto"
    //     }
    //   </style>
    //   <Accordion defaultActiveKey="" style={{ width: "100%" }}>
    //     <Card>
    //       <Accordion.Toggle as={Card.Header} eventKey="0">
    //         <div
    //           style={{
    //             width: "100%",
    //             display: "flex",
    //             flexDirection: "row",
    //             justifyContent: "space-between"
    //           }}
    //         >
    //           {options.type ? (
    //             <img
    //               src={options.header_image ?? `/static/${options.type}.gif`}
    //               alt="Header"
    //               className="inline"
    //             />
    //           ) : null}
    //           {header}
    //           <img src="/static/img/view.svg" alt="View" className="inline" />
    //         </div>
    //       </Accordion.Toggle>
    //       <Accordion.Collapse eventKey="0">
    //         <Card.Body>
    //           <div
    //             style={{
    //               width: "calc(min(800px, 100%))",
    //               margin: "0 auto",
    //               display: "flex",
    //               flexDirection: "row",
    //               flexWrap: "wrap",
    //               justifyContent: "space-between",
    //               columnGap: "20px"
    //             }}
    //           >
    //             {block}
    //           </div>
    //         </Card.Body>
    //       </Accordion.Collapse>
    //     </Card>
    //   </Accordion>
    // </div>`;
  }
}

customElements.define("x-style-io-block", XStyleIOBlock);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "x-style-io-block": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
