import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Schedule from './schedule';

Enzyme.configure({ adapter: new Adapter() });

Date.now = jest.fn(() => +process.env.REACT_APP_TEST_DATE);

describe('Schedule', () => {
    function setUp(props) {
        return mount(<Schedule { ...props } />)
    }
    it('should render', () => {
        const component = setUp()
        expect(component.exists()).toEqual(true)
    });
    it('should handle not working store ', () => {
        const component = setUp({ schedule: {}});
        expect(component.text()).toEqual('MON-SUN: not working');
    });
    it('should handle one day without brakes', () => {
        const component = setUp({ schedule: { mon: [{ from: '10:00', to: '23:00' }] }});
        expect(component.find('li').at(0).text()).toEqual('MON : 10:00 AM - 11:00 PM ');
    });
    it('should handle 2 days in a row', () => {
        const component = setUp({ schedule: {
            mon: [{ from: '10:00', to: '23:00' }],
            tue: [{ from: '10:00', to: '23:00' }],
            wed: [{ from: '09:00', to: '13:30' }, { from: '14:00', to: '22:00' }],
            thu: [{ from: '11:00', to: '23:00' }],
        }});
        expect(component.find('li').at(0).text()).toEqual('MON-TUE : 10:00 AM - 11:00 PM ');
        expect(component.find('li').last().text()).toEqual('FRI-SUN : not working');
    });
    it('should show time duration', () => {
        const component = setUp({ schedule: {
            wed: [{ from: '09:00', to: '13:30' }, { from: '14:00', to: '22:00' }],
        }});
        expect(component.find('li').at(1).text()).toEqual('WED : 09:00 AM - 10:00 PM ');
    });
})