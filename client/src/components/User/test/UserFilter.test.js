import React from 'react'
import { create } from 'react-test-renderer'
import expect from 'expect'

import UserFilter from '../UserFilter/UserFilter'

describe('UserFilter Component', () => {
    test('Matches the snapshot', () => {
        const userFilter = create(<UserFilter />)
        expect(userFilter.toJSON()).toMatchSnapshot()
    });
});