import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);

const req = require.context('../stories', true, /stories\.js$/);
const loadStories = () => {
    req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
