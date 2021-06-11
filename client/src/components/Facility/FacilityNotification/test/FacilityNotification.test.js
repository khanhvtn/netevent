import React from 'react'
import { create } from 'react-test-renderer'
import expect from 'expect'

import FacilityNotification from '../FacilityNotification'

describe('FacilityNotification Component', () => {
    test('Matches the snapshot', () => {
        const facilityNotification = create(<FacilityNotification />)
        expect(facilityNotification.toJSON()).toMatchSnapshot()
    });
});