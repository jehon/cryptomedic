/**
 * @jest-environment jsdom
 */

import { expect, test } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import IODate from "../io-date";

// https://jestjs.io/fr/docs/expect
test('io-date', () => {
    render(<IODate value={new Date(2023, 0, 2)}/>)
    // expect(screen.getByText('2023')).toBeInTheDocument();
});
