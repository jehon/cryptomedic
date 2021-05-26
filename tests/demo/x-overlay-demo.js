import { actions } from '../../app/config.js';
import { createOverlay, createOverlayInfo } from '../../app/elements/x-overlay-builder.js';
import { createElementWithTag } from '../../app/js/custom-element.js';

document.querySelector('x-overlay#inline').block();

document.querySelector('x-button#info').addEventListener('click', () =>
    createOverlayInfo('This is the overlay')
        .go()
        .then(data => console.info('Done with data: ', data))
);

document.querySelector('x-button#form').addEventListener('click', () =>
    createOverlay()
        .withTexts(['Please answer the question'])
        .withForm([
            createElementWithTag('input', { name: 'my-input' })
        ])
        .withButtons([actions.ok])
        .go()
        .then(data => console.info('Done with data: ', data))
);
