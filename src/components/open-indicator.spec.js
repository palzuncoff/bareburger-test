import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import OpenIndicator from './open-indicator';
import moment from "moment";

Enzyme.configure({ adapter: new Adapter() });

Date.now = jest.fn(() => +process.env.REACT_APP_TEST_DATE);

describe('OpenIndicator', () => {
    function setUp(props) {
        return mount(<OpenIndicator { ...props } />)
    }
    it('should show open', () => {
        console.log(moment().format('ddd, hA'));
        const component = setUp({ schedule: {
            sat: [{ from: '03:00', to: '06:00' }],
        }, timeZone: 'Europe/Chisinau' })
        expect(component.text()).toEqual(' is open')
    });
    it('should show close', () => {
        const component = setUp({ schedule: {
        }})
        expect(component.text()).toEqual(' will open ')
    });
})