import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import OpenIndicator from './open-indicator';

Enzyme.configure({ adapter: new Adapter() });

Date.now = jest.fn(() => +process.env.REACT_APP_TEST_DATE);

describe('OpenIndicator', () => {
    function setUp(props) {
        return mount(<OpenIndicator { ...props } />)
    }
    it('should show open', () => {
        const component = setUp({ schedule: {
            fri: [{ from: '22:00', to: '23:59' }],
        }, timeZone: 'Europe/Chisinau' })
        expect(component.text()).toEqual(' is open')
    });
    it('should show close', () => {
        const component = setUp({ schedule: {
        }})
        expect(component.text()).toEqual(' will open ')
    });
})