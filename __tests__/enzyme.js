import React from 'react';
import { configure, shallow, render } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import YoutubeUrl from "../client/containers/youtubeURL.jsx"

configure({ adapter: new Adapter() });



describe ('YoutubeUrl', () => {
    let wrapper;
    let wrapper2

    beforeAll(() => {
        wrapper = shallow(<YoutubeUrl />);
        wrapper2 = render(<YoutubeUrl />);
        
    });

    it ('SHALLOW -Renders a <div> tag', () => {
        expect(wrapper.type()).toEqual('div');
    });
    it ('SHALLOW -Renders a form with a text area and spotify and youtube URL buttons', () => {
        expect(wrapper.find('form'));
        expect(wrapper.find('#spotifyButton'));
        expect(wrapper.find('#youTubeURLButton'));
        expect(wrapper.find('textarea'));
    });
    it('RENDER -Renders a form with a text area and spotify and youTube URL buttons', () => {
        expect(wrapper2.find('form'));
        expect(wrapper2.find('#spotifyButton'));
        expect(wrapper2.find('#youTubeURLButton'));
        expect(wrapper2.find('textarea'));
    });
});