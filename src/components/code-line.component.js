// @flow
/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import { Text, Dimensions } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { getLanguage } from 'lowlight';
import { github as GithubStyle } from 'react-syntax-highlighter/dist/styles';
import { colors, normalize, fonts } from 'config';
import styled, { css } from 'styled-components';

function addOrDelLineColors(change) {
  const lineColors = {
    lineNumbers: '',
    line: '',
  };

  if (change.type === 'add') {
    lineColors.lineNumbers = colors.addCodeLineNumberGreen;
    lineColors.line = colors.addCodeGreen;
  } else if (change.type === 'del') {
    lineColors.lineNumbers = colors.delCodeLineNumberRed;
    lineColors.line = colors.delCodeRed;
  }

  return lineColors;
}

const Container = styled.View`
  flex-direction: row;
`;

const Wrapper = styled.View`
  flex-direction: row;
  flex: 1;
`;

const CodeLineContainer = styled.View`
  min-width: ${Dimensions.get('window').width - 80};
  flex: 0.85;
  background-color: ${props =>
    props.newChunk
      ? colors.codeChunkBlue
      : addOrDelLineColors(props.change).line};
`;

const CodeLineStyled = styled.Text`
  ${fonts.fontCode};
  font-size: ${normalize(11)};
  padding: 3px 10px;
  ${props =>
    props.newChunk &&
    css`
      color: ${colors.grey};
    `};
`;

const LineNumbers = styled.View`
  width: 80;
  padding: 3px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props =>
    props.newChunk
      ? colors.codeChunkLineNumberBlue
      : addOrDelLineColors(props.change).lineNumbers};
`;

const CodeLineNumber = styled.Text`
  ${fonts.fontCode};
  font-size: ${normalize(11)};
  flex: 1;
  align-items: center;
  color: ${colors.grey};
`;

export class CodeLine extends Component {
  props: {
    newChunk: boolean,
    change: Object,
    filename: string,
  };

  isKnownType(language) {
    return language && getLanguage(language) && !this.props.newChunk;
  }

  render() {
    const { newChunk, change, filename } = this.props;
    const language = (filename || '').split('.').pop();
    // SyntaxHighlighter doesn't allow Stylesheet class style
    const customStyle = {
      backgroundColor: 'transparent',
      padding: 0,
    };

    return (
      <Container>
        <Wrapper>
          <LineNumbers newChunk change>
            <CodeLineNumber>
              {change.type === 'del'
                ? change.ln
                : change.type === 'normal'
                  ? change.ln1
                  : change.type === 'add' ? '' : '...'}
            </CodeLineNumber>
            <CodeLineNumber>
              {change.type === 'add'
                ? change.ln
                : change.type === 'normal'
                  ? change.ln2
                  : change.type === 'del' ? '' : '...'}
            </CodeLineNumber>
          </LineNumbers>

          <CodeLineContainer newChunk change>
            {(newChunk || !this.isKnownType(language)) && (
              <CodeLineStyled newChunk>{change.content}</CodeLineStyled>
            )}

            {this.isKnownType(language) && (
              <SyntaxHighlighter
                language={language}
                style={GithubStyle}
                CodeTag={Text}
                customStyle={customStyle}
                fontFamily={fonts.fontCode.fontFamily}
                fontSize={normalize(11)}
              >
                {change.content}
              </SyntaxHighlighter>
            )}
          </CodeLineContainer>
        </Wrapper>
      </Container>
    );
  }
}
