import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { CodeLine } from 'components';

describe('<CodeLine />', () => {
  it('correctly renders patch line', () => {
    const wrapper = render(
      <CodeLine
        newChunk
        change={{ content: 'test line' }}
        filename={'test.js'}
      />
    );

    expect(wrapper.text()).toEqual('......test line');
  });

  it('correctly renders normal line', () => {
    const wrapper = render(
      <CodeLine
        newChunk
        change={{ content: 'test line', type: 'normal', ln1: 50, ln2: 51 }}
        filename={'test.js'}
      />
    );

    expect(wrapper.text()).toEqual('5051test line');
  });

  it('correctly renders addition line', () => {
    const wrapper = render(
      <CodeLine
        change={{ content: 'test line', type: 'add', ln: 57 }}
        filename={'test.js'}
      />
    );

    expect(wrapper.text()).toEqual('57test line');
  });

  it('correctly renders deletion line', () => {
    const wrapper = render(
      <CodeLine
        change={{ content: 'test line', type: 'del', ln: 57 }}
        filename={'test.js'}
      />
    );

    expect(wrapper.text()).toEqual('57test line');
  });
});
