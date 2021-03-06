
import XButton from '../../app/widgets/style/x-button.js';
import { createOverlay, overlayAcknowledge, overlayWaiting } from '../../app/js/overlay-builder.js';
import { createElementWithTag } from '../../app/js/custom-element.js';
import '../../app/widgets/func/x-form.js';
import '../../app/widgets/func/x-overlay.js';

document.querySelector('x-overlay#inline').block();

document.querySelector('x-button#info').addEventListener('click', () =>
    overlayAcknowledge('This is the overlay')
        .then(data => console.info('Done with data: ', data))
);

document.querySelector('x-button#form').addEventListener('click', () =>
    createOverlay()
        .withTexts(['Please answer the question'])
        .withForm([
            createElementWithTag('input', { name: 'my-input' })
        ])
        .withButtons([XButton.Default])
        .go()
        .then(data => console.info('Done with data: ', data))
);

document.querySelector('x-button#waiting').addEventListener('click', () => {
    const endWait = overlayWaiting('Please wait 3 seconds');
    setTimeout(() => endWait(), 3000);
});
