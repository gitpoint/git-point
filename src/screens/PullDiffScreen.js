import React, {Component, PropTypes} from 'react';
import { Text } from 'react-native';
import Parse from 'parse-diff';

import ViewContainer from '../components/ViewContainer';

class PullDiff extends Component {
  componentDidMount() {
    const files = Parse(this.props.navigation.state.params.diff);

    console.log(files.length);

    files.forEach(function(file) {
    	console.log(file.chunks.length); // number of hunks
    	console.log(file.chunks[0].changes.length) // hunk added/deleted/context lines
    	// each item in changes is a string
    	console.log(file.deletions); // number of deletions in the patch
    	console.log(file.additions); // number of additions in the patch
    });
  }

  render() {
    const  {navigation} = this.props;
    const filesChanged = Parse(navigation.state.params.diff);

    return (
      <ViewContainer>
        <Text>{navigation.state.params.diff}</Text>
      </ViewContainer>
    )
  }
}

PullDiff.propTypes = {
  diff: PropTypes.string,
};

export default PullDiff;
