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
            mon: [{ from: '10:00', to: '23:00' }],
            tue: [{ from: '10:00', to: '23:00' }],
            wed: [{ from: '09:00', to: '13:30' }, { from: '14:00', to: '22:00' }],
            thu: [{ from: '11:00', to: '23:00' }],
            fri: [{ from: '12:00', to: '23:00' }],
        }})
        expect(component.text()).toEqual('open')
    })
})