import React from 'react';
import styled from 'styled-components/native';

import { colors, fonts, normalize } from 'config';
import { translate } from 'utils';

type Props = {
  issue: Object,
  isMerged: boolean,
  text: string,
  type: string,
  style: Object,
  locale: string,
};

const colorOfIssueState = issueState => {
  switch (issueState) {
    case 'merged':
      return colors.purple;
    case 'open':
      return colors.green;
    case 'closed':
      return colors.red;
    default:
      return colors.black;
  }
};

const Badge = styled.View`
  padding-left: 12;
  padding-right: 12;
  padding-top: 3;
  padding-bottom: 3;
  border-radius: 20;
  background-color: ${({ issueState }) => colorOfIssueState(issueState)};
`;

const BadgeText = styled.Text`
  font-size: ${normalize(12)};
  font-family: ${fonts.fontPrimaryBold.fontFamily};
  color: ${colors.white};
`;

export const StateBadge = ({
  issue,
  isMerged,
  text,
  type,
  style,
  locale,
}: Props) => {
  let issueState = type;
  let issueText = text;

  if (isMerged) {
    issueState = 'merged';
    issueText = translate('issue.main.states.merged', locale);
  } else if (issue && issue.state === 'open') {
    issueState = 'open';
    issueText = translate('issue.main.states.open', locale);
  } else if (issue && issue.state === 'closed') {
    issueState = 'closed';
    issueText = translate('issue.main.states.closed', locale);
  }

  return (
    <Badge issueState={issueState} style={style}>
      <BadgeText>{issueText}</BadgeText>
    </Badge>
  );
};
