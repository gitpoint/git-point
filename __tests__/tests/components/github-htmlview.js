import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import { GithubHtmlView } from 'components';
import { Icon } from 'react-native-elements';

describe('<GithubHtmlView />', () => {
  it('correctly renders <details/> tag in GithubHtmlView', () => {
    const sourceHtml = `
      <details>
        <summary>  title  </summary>
        <div>description</div>
      </details> 
    `;

    const inst = renderer.create(
      <GithubHtmlView source={sourceHtml} onLinkPress={() => 0} />
    );

    // we should be able to find a <Icon/> with proper name,
    // which means our custom logic for <details/> is applied
    expect(inst.root.findByType(Icon).props.name).toEqual('triangle-right');

    // we should be able to find the processed title text node,
    // which means our custom logic for <details/> is applied
    expect(
      !!inst.root.findAllByType(Text).find(e => e.props.children === 'title')
    ).toBe(true);
  });
});
