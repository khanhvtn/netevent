import React from 'react'
import { create } from 'react-test-renderer'
import expect from 'expect'

import FacilityFilter from '../FacilityFilter'

describe('FacilityFilter Component', () => {
    test('Matches the snapshot', () => {
        const facilityFilter = create(<FacilityFilter />)
        expect(facilityFilter.toJSON()).toMatchSnapshot()
    });
});