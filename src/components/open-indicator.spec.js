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
            tue: [{ from: '01:04', to: '03:40' }, { from: '17:04', to: '22:40' }],
        }, timeZone: 'America/Los_Angeles' })
        expect(component.text()).toEqual(' is open')
    });
    it('should show close', () => {
        const component = setUp({ schedule: {
        }})
        expect(component.text()).toEqual(' will open ')
    });
})