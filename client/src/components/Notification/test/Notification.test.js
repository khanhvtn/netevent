import React from 'react'
import { create } from 'react-test-renderer'
import expect from 'expect'

import SystemNotification from '../Notification'

describe('SystemNotification Component', () => {
    test('Matches the snapshot', () => {
        const systemNotification = create(<SystemNotification />)
        expect(systemNotification.toJSON()).toMatchSnapshot()
    });
});