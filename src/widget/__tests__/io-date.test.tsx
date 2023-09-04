/**
 * @jest-environment jsdom
 */

import { expect, test } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';

import IODate from "../io-date";

// https://jestjs.io/fr/docs/expect
test('io-date', () => {
    render(<IODate label="test" value={new Date(2023, 0, 2)}/>)
    expect(screen.getByText('Jan 02, 2023')).toBeInTheDocument();
});

test('empty', () => {
    const { container } = render(<IODate label="test" value={null}/>)
    expect((container.querySelector("[data-function='value']") as HTMLElement).children[0]).toBeEmptyDOMElement();
});
