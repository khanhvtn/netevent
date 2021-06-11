import React from 'react'
import { create } from 'react-test-renderer'
import expect from 'expect'

import UserNotification from '../UserNotification/UserNotification'

describe('UserNotification Component', () => {
    test('Matches the snapshot', () => {
        const userNotification = create(<UserNotification />)
        expect(userNotification.toJSON()).toMatchSnapshot()
    });
});