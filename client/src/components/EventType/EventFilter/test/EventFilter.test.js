import React from 'react'
import { create } from 'react-test-renderer'
import expect from 'expect'

import EventFilter from '../EventFilter'

describe('EventFilter Component', () => {
    test('Matches the snapshot', () => {
        const eventFilter = create(<EventFilter />)
        expect(eventFilter.toJSON()).toMatchSnapshot()
    });
});