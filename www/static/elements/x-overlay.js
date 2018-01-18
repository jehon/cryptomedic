(function() {
    class XOverlay extends XWaiting {
        constructor() {
            super();
            this.shadowRoot.innerHTML = `
<div id="overlay" class="overlay">
	<!-- Button to close the overlay navigation -->
	<a id='close' href="javascript:void(0)" class="closebtn">&times;</a>

	<!-- Overlay content -->
	<div class="overlay-content">
		<slot></slot>
	</div>
</div>
<style>
	/* The Overlay (background) */
	.overlay {
	    height: 100%;
	    width: 100%;
	    position: fixed;
	    z-index: 1;
	    left: 0;
	    top: 0;
	    background-color: rgb(0,0,0); /* Black fallback color */
	    background-color: rgba(0,0,0, 0.9); /* Black w/opacity */
	    overflow-x: hidden; /* Disable horizontal scroll */
	    transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
	}

	/* Position the content inside the overlay */
	.overlay-content {
	    position: relative;
	    top: 25%; /* 25% from the top */
	    width: 100%; /* 100% width */
	    text-align: center; /* Centered text/links */
	    margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */
	}

	/* The navigation links inside the overlay */
	.overlay a {
	    padding: 8px;
	    text-decoration: none;
	    font-size: 36px;
	    color: #818181;
	    display: block; /* Display block instead of inline */
	    transition: 0.3s; /* Transition effects on hover (color) */
	}

	/* When you mouse over the navigation links, change their color */
	.overlay a:hover, .overlay a:focus {
	    color: #f1f1f1;
	}

	/* Position the close button (top right corner) */
	.overlay .closebtn {
	    position: absolute;
	    top: 20px;
	    right: 45px;
	    font-size: 60px;
	}

	/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
	@media screen and (max-height: 450px) {
	    .overlay a {font-size: 20px}
	    .overlay .closebtn {
	        font-size: 40px;
	        top: 15px;
	        right: 35px;
	    }
	}
</style>
`
            this.shadowRoot.querySelector("#close").addEventListener("click", () => this.free());
            this.shadowRoot.querySelector("#close").style.display = "none";
            this.free();
		}
	}

    window.customElements.define('x-overlay', XOverlay);
})();
