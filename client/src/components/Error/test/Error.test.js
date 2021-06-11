import React from 'react'
import { create } from 'react-test-renderer'
import expect from 'expect'

import Error from '../Error'

describe('Error Component', () => {
    test('Matches the snapshot', () => {
        const error = create(<Error />)
        expect(error.toJSON()).toMatchSnapshot()
    });
});