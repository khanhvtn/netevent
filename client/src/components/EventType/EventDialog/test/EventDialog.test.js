import React from 'react'
import { create } from 'react-test-renderer'
import expect from 'expect'

import EventDialog from '../EventDialog'

describe('EventDialog Component', () => {
    test('Matches the snapshot', () => {
        const eventDialog = create(<EventDialog />)
        expect(eventDialog.toJSON()).toMatchSnapshot()
    });
});