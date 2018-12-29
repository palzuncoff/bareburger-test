import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WhenOpen from './when-open';

Enzyme.configure({ adapter: new Adapter() });

Date.now = jest.fn(() => +process.env.REACT_APP_TEST_DATE);

describe('WhenOpen', () => {
    function setUp(props) {
        return mount(<WhenOpen { ...props } />)
    }
    it('should show Next week on Monday at 10:00 AM message', () => {
        const component = setUp({ schedule: {
                mon: [{ from: '00:00', to: '23:00' }],
                tue: [{ from: '10:00', to: '23:00' }],
                wed: [{ from: '09:00', to: '13:30' }, { from: '14:00', to: '22:00' }],
                thu: [{ from: '11:00', to: '23:00' }],
            }, timeZone: 'America/Los_Angeles'});
        expect(component.text()).toEqual('Next week on Monday at 10:00 AM');
    })
    it('should show Tomorrow at 9:00 AM message', () => {
        const component = setUp({ schedule: {
                mon: [{ from: '10:00', to: '23:00' }],
                tue: [{ from: '10:00', to: '21:00' }],
                wed: [{ from: '09:00', to: '13:30' }, { from: '14:00', to: '22:00' }],
                thu: [{ from: '11:00', to: '23:00' }],
                fri: [{ from: '12:00', to: '23:00' }],
                sat: [{ from: '09:00', to: '23:00' }],
                sun: [{ from: '09:00', to: '23:00' }],
            }, timeZone: 'Europe/Chisinau'});
        expect(component.text()).toEqual('Tomorrow at 9:00 AM');
    });
    it('should show On Sunday ay 10:00 AM message', () => {
        const component = setUp({ schedule: {
                sun: [{ from: '10:00', to: '23:00' }],
            }, timeZone: 'Europe/Chisinau'});
        expect(component.text()).toEqual('On Sunday ay 10:00 AM');
    });
    it('should show In 1 hour and 20 min message', () => {
        Date.now = jest.fn(() => 1546071796357);
        const component = setUp({ schedule: {
                sat: [{ from: '11:44', to: '14:00' }, { from: '22:00', to: '23:00' }],
            }, timeZone: 'Europe/Chisinau'});
        expect(component.text()).toEqual('In 1 hour and 20 min');
    })
});