import { html } from 'lit';
import '../src/ornate-lamp.js';

export default {
  title: 'OrnateLamp',
  component: 'ornate-lamp',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <ornate-lamp
      style="--ornate-lamp-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </ornate-lamp>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
