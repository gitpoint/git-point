import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import { GithubHtmlView } from 'components';
import { Icon } from 'react-native-elements';

describe('<GithubHtmlView />', () => {
  it('correctly renders <details/> tag in GithubHtmlView', () => {
    const sourceHtml = `
      <details>
        <summary>title</summary>
        <div>description</div>
      </details> 
    `;

    const inst = renderer.create(
      <GithubHtmlView source={sourceHtml} onLinkPress={() => 0} />
    );

    // we should be able to find a <Icon/> with proper name,
    // which means our custom logic for <details/> is applied
    expect(inst.root.findByType(Icon).props.name).toEqual('triangle-right');
  });

  it('if <summary/> tag contains a single text node, we shoud prettify it', () => {
    const sourceHtml = `
      <details>
        <summary>    
              make some space and line break here...     
        
        </summary>
        <div>description</div>
      </details> 
    `;

    const inst = renderer.create(
      <GithubHtmlView source={sourceHtml} onLinkPress={() => 0} />
    );

    // we should be able to find the processed title text node,
    // which means our custom logic for <details/> is applied
    expect(
      !!inst.root
        .findAllByType(Text)
        .find(
          e => e.props.children === 'make some space and line break here...'
        )
    ).toBe(true);
  });

  it('if there is no <summary/> tag, we should do fallback render', () => {
    const sourceHtml = `
      <details>
        <div>no summary here!!</div>
      </details> 
    `;

    const inst = renderer.create(
      <GithubHtmlView source={sourceHtml} onLinkPress={() => 0} />
    );

    // fallback render in this case won't contain any Icon
    expect(inst.root.findAllByType(Icon).length).toBe(0);
  });

  it('if <summary/> contain nested tags, should still be rendered without exception', () => {
    const sourceHtml = `
      <details>
        <summary>
          abcde <div>test</div> fg
        </summary>
        <div>no summary here!!</div>
      </details> 
    `;

    const inst = renderer.create(
      <GithubHtmlView source={sourceHtml} onLinkPress={() => 0} />
    );

    // should still reach here, and correct render the right arrow icon
    expect(inst.root.findByType(Icon).props.name).toEqual('triangle-right');
  });
});
