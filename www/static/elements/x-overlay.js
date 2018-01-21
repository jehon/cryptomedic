// Rewrite this as the master of x-waiting
//    and add params:
//    - z-index
//    - cover screen or element
//    - show / hide "close button"

(function() {
    class XOverlay extends XWaiting {
        constructor() {
            super();
            this.shadowRoot.innerHTML = `
			<style>
				:host {
					position: relative;
				}

                #overlay[hidden] {
                    display: none !important;
                }

				#overlay {
				    position: fixed; // means fixed on screen (invariable when scrolling ?)
				    top: 0;
				    left: 0;
				    width: 100%;
				    height: 100%;
				    z-index: 1;      // transform into parameter

				    display: flex;
					flex-direction: column; // ??? should be row ?
                    align-items: center; 
					justify-content: center;

				    background-color: rgba(0,0,0, 0.9); /* Black w/opacity */
				    overflow-x: hidden;
				    transition: 0.5s;
				}

				#close {
				    position: absolute;
				    top: 20px;
				    right: 45px;
				    font-size: 60px;
				}

				#close {
				    text-decoration: none;
				    color: #818181;
				}

				#close:hover, #close:focus {
				    text-decoration: none;
				    color: #f1f1f1;
				}

				/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
				@media screen and (max-height: 450px) {
				    .closebtn {
				        font-size: 40px;
				        top: 15px;
				        right: 35px;
				    }
				}
			</style>
			<div id="overlay">
				<a id='close' href="javascript:void(0)">&times;</a>
				<slot></slot>
			</div>
			`;
            this.shadowRoot.querySelector("#close").addEventListener("click", () => this.free());
            this.shadowRoot.querySelector("#close").style.display = "none";
            this.free();
		}
	}

    window.customElements.define('x-overlay', XOverlay);
})();
