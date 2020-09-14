
/* istanbul ignore file */

window.bug_reporting = function () {
    document.querySelector('body').innerHTML = `
<div>Dear sir,</div>
<div></div>
<div>Thank you for reporting a bug, or a feature request.</div>
<div></div>
<div>Because I had some problems with the previous system, please now send a email to 
    <a href='mailto:jeanhonlet@gmail.com&subject=Cryptomedic%20problem'>Jean Honlet</a>.
</div>
<div></div>
<div>If you want to come back to your page, please simply reload the page: 
    <a href='javascript:window.location.reload();'>Reload the page</a>.
</div>
<div></div>
<div>Have a great day</div>
<div>Jean Honlet</div>
`;

};
