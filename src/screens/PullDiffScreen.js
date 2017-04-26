import React, {Component, PropTypes} from 'react';
import { Text } from 'react-native';
import {Card, ListItem} from 'react-native-elements';

import Parse from 'parse-diff';

import ViewContainer from '../components/ViewContainer';

const files = Parse(this.props.navigation.state.params.diff);

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

        {files.map((file, i) => (
          <Card containerStyle={{padding: 0}} >
           {
             file.chunks.map((chunk, i) => (
                 <ListItem
                  leftIcon={{'git-pull-request', color: colors.grey, type: 'octicon'}}
                   key={i}
                   title={chunk.name} />

                   {
                     chunk.changes.map((change, i) => (
                       <ListItem
                        key={i}
                        title={`Content: ${change.content}, Type: ${change.type}`} />
                     ))
                   }
               ))
            }
          </Card>
          ))}
      </ViewContainer>
    )
  }
}

PullDiff.propTypes = {
  diff: PropTypes.string,
};

export default PullDiff;
