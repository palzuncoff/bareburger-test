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
            mon: [{ from: '00:00', to: '23:59' }],
            tue: [{ from: '00:00', to: '23:59' }],
            wed: [{ from: '00:00', to: '23:59' }],
            thu: [{ from: '00:00', to: '23:59' }],
            fri: [{ from: '00:00', to: '23:59' }],
            sat: [{ from: '00:00', to: '23:59' }],
            sun: [{ from: '00:00', to: '23:59' }],
        }})
        expect(component.text()).toEqual('open')
    });
    it('should show close', () => {
        const component = setUp({ schedule: {
        }})
        expect(component.text()).toEqual('closed')
    });
})