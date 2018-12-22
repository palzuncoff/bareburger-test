import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WhenOpen from './when-open';

Enzyme.configure({ adapter: new Adapter() });

describe('WhenOpen', () => {
    function setUp(props) {
        return mount(<WhenOpen { ...props } />)
    }
    it('should show Next week on Monday at 10:00 AM message', () => {
        const component = setUp({ schedule: {
                mon: [{ from: '10:00', to: '23:00' }],
                tue: [{ from: '10:00', to: '23:00' }],
                wed: [{ from: '09:00', to: '13:30' }, { from: '14:00', to: '22:00' }],
                thu: [{ from: '11:00', to: '23:00' }],
                fri: [{ from: '12:00', to: '23:00' }],
            }});
        expect(component.text()).toEqual('Next week on Monday at 10:00 AM');
    })
    it('should show Tomorrow at 9:00 AM message', () => {
        const component = setUp({ schedule: {
                mon: [{ from: '10:00', to: '23:00' }],
                tue: [{ from: '10:00', to: '23:00' }],
                wed: [{ from: '09:00', to: '13:30' }, { from: '14:00', to: '22:00' }],
                thu: [{ from: '11:00', to: '23:00' }],
                fri: [{ from: '12:00', to: '23:00' }],
                sun: [{ from: '09:00', to: '23:00' }],
            }});
        expect(component.text()).toEqual('Tomorrow at 9:00 AM');
    });
    it('should show On Friday ay 10:00 AM message', () => {
        const component = setUp({ schedule: {
                fri: [{ from: '10:00', to: '23:00' }],
            }});
        expect(component.text()).toEqual('On Friday ay 10:00 AM');
    })
    it('should show In 1 hour and 20 min message', () => {
        const component = setUp({ schedule: {
                sat: [{ from: '10:00', to: '14:00' }, { from: '19:12', to: '23:00' }],
            }});
        expect(component.text()).toEqual('In 1 hour and 20 min');
    })
})