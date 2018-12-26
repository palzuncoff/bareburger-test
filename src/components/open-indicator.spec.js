import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import OpenIndicator from './open-indicator';

Enzyme.configure({ adapter: new Adapter() });

describe('OpenIndicator', () => {
    function setUp(props) {
        return mount(<OpenIndicator { ...props } />)
    }
    it('should show open', () => {
        const component = setUp({ schedule: {
            wed: [{ from: '03:00', to: '06:00' }],
        }, timeZone: 'Asia/Shanghai' })
        expect(component.text()).toEqual(' is open')
    });
    it('should show close', () => {
        const component = setUp({ schedule: {
        }})
        expect(component.text()).toEqual(' will open ')
    });
})