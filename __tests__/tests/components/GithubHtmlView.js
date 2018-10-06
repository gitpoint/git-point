import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import { GithubHtmlView } from 'components';
import { Icon } from 'react-native-elements';

describe('<GithubHtmlView />', () => {
  it('correctly renders <details/> tag in GithubHtmlView with correct icon', () => {
    const sourceHtml = `
      <details>
        <summary>title</summary>
        <div>description</div>
      </details> 
    `;

    const inst = renderer.create(
      <GithubHtmlView source={sourceHtml} onLinkPress={() => 0} />
    );

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

    expect(
      !!inst.root
        .findAllByType(Text)
        .find(
          e => e.props.children === 'make some space and line break here...'
        )
    ).toBe(true);
  });

  it('if there is no <summary/> tag, we should do fallback render which contains no icon', () => {
    const sourceHtml = `
      <details>
        <div>no summary here!!</div>
      </details> 
    `;

    const inst = renderer.create(
      <GithubHtmlView source={sourceHtml} onLinkPress={() => 0} />
    );

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

    expect(inst.root.findByType(Icon).props.name).toEqual('triangle-right');
  });
});
