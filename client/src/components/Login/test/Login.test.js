import expect from 'expect'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Login from '../Login'
import { act } from 'react-dom/test-utils';

describe('Login', () => {
    describe('with valid inputs', () => {
        it('calls the handleSubmit function',async () => {
            const mockHandleSubmit= jest.fn()
            const {getByLabelText, getByRole} = render(<Login handleSubmit={mockHandleSubmit}/>)
            
            await act(async () => {
            fireEvent.change(getByLabelText("Email"), {target: {value: "trantritai99@gmail.com"}})
            fireEvent.change(getByLabelText("Password"), {target: {value: "123456"}})
        })

            await act(async () => {
                fireEvent.click(getByRole("button"))
            })

            expect(mockHandleSubmit).toHaveBeenCalled()
    });

    describe('with invalid email', () => {
        it.todo('renders the email validation error')
    });

    describe('with invalid password', () => {
        it.todo('renders the password validation error')
    });
});
})
