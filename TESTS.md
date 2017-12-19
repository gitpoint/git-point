# Test Guidelines
We're using [Jest](https://facebook.github.io/jest/) and [Enzyme](https://github.com/airbnb/enzyme) for our unit tests.

First of all, what we want with our unit tests is to ensure that our components behave the way we want. We're testing each component as a single unit. You should test your components isolated from the rest of the application (no redux involved for example)

## An Example

Let's say we have a component like

```js
class TheComponent extends React.Component {
  foo = name => {
    return `the ${name}`;
  }
  render() {
    return(
      <View>
        {
          this.props.isOpen &&
          <Bar>Foo</Bar>
        }
        <Text>{this.props.name}</Text>
        <Text>{this.foo()}</Text>
      </View>
    );
  }
}
```

We would expect a couple of scenarios that test:
1. `the component should render the Bar component when isOpen is truthy`
2. `the component should not render the Bar component when isOpen is falsy`
3. `the method foo should return 'the NAME'`

As you can see, we didn't include a scenario that says something like `the component should render the name prop`, that's because testing that scenario will be like testing if React works. So please, avoid that kind of tests.

## Tests folder structure

All the test files live under `/__tests__/`. In that folder you'll find everything you need to keep working on tests of create new ones. If you're adding a test for a component, you should find/create its file under `/__tests__/components/the-component.js`

## Tests file conventions

A test file should look like:

```js
import React from 'react';
import { shallow } from 'enzyme';
import { TheComponent, Bar } from 'components'; // this may change depending on WHAT you want to test. utils, actions, components, etc...

// Default props of the component
const defaultProps = {
  isOpen: false,
  name: 'foo'
};

describe('<TheComponent />', () => { // Usually, is the name of the component.
  it('should render the Bar component when isOpen is truthy', () => {
    const wrapper = shallow(
      <TheComponent
        {...defaultProps}
        isOpen={false}
      />
    );

    expect(wrapper.find(Bar).length).toBe(1);
  });

  it('should not render the Bar component when isOpen is falsy', () => { ... });

  it('should return 'the NAME' when foo received "name" as a param', () => { ... });

  // ...add more tests accordingly

});
```

## Considerations
1. Try to always use `shallow` instead of `render`, it's faster and only renders your component 1 level deep (real unit tests)
2. Use the `defaultProps` object so you don't have to write all the props for each test
3. Try to not nest `describe` blocks unless it's absolutely necessary
4. Don't test unecessary stuff like we mentioned above
5. Every `it` must start with `should...` to keep things consistent

If you still have questions, don't hesitate to ask.
