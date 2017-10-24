import React from 'react';
import { shallow } from 'enzyme';

import { CodeLine } from 'components';

describe('<CodeLine />', () => {
  it('correctly renders patch line', () => {
    const wrapper = shallow(
      <CodeLine
        newChunk
        change={{ content: 'test line' }}
        filename={'test.js'}
      />
    ).childAt(0);

    const lineNumbers = wrapper.childAt(0);
    const lineContent = wrapper
      .childAt(1)
      .childAt(0)
      .childAt(0);

    expect(
      lineNumbers
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('...');
    expect(
      lineNumbers
        .childAt(1)
        .childAt(0)
        .text()
    ).toEqual('...');

    expect(lineContent.text()).toEqual('test line');
  });

  it('correctly renders normal line', () => {
    const wrapper = shallow(
      <CodeLine
        newChunk
        change={{ content: 'test line', type: 'normal', ln1: 50, ln2: 51 }}
        filename={'test.js'}
      />
    ).childAt(0);

    const lineNumbers = wrapper.childAt(0);
    const lineContent = wrapper
      .childAt(1)
      .childAt(0)
      .childAt(0);

    expect(
      lineNumbers
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('50');
    expect(
      lineNumbers
        .childAt(1)
        .childAt(0)
        .text()
    ).toEqual('51');

    expect(lineContent.text()).toEqual('test line');
  });

  it('correctly renders addition line', () => {
    const wrapper = shallow(
      <CodeLine
        change={{ content: 'test line', type: 'add', ln: 57 }}
        filename={'test.js'}
      />
    ).childAt(0);

    const lineNumbers = wrapper.childAt(0);
    const lineContent = wrapper
      .childAt(1)
      .childAt(0)
      .childAt(0);

    expect(
      lineNumbers
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('');
    expect(
      lineNumbers
        .childAt(1)
        .childAt(0)
        .text()
    ).toEqual('57');

    expect(lineContent.text()).toEqual('test line');
  });

  it('correctly renders deletion line', () => {
    const wrapper = shallow(
      <CodeLine
        change={{ content: 'test line', type: 'del', ln: 57 }}
        filename={'test.js'}
      />
    ).childAt(0);

    const lineNumbers = wrapper.childAt(0);
    const lineContent = wrapper
      .childAt(1)
      .childAt(0)
      .childAt(0);

    expect(
      lineNumbers
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('57');
    expect(
      lineNumbers
        .childAt(1)
        .childAt(0)
        .text()
    ).toEqual('');

    expect(lineContent.text()).toEqual('test line');
  });
});
