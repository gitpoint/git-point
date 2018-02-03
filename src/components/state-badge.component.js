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

const Badge = styled.View`
  padding: 3px 12px;
  border-radius: 20px;
  background-color: ${props => props.color};
`;

const BadgeText = styled.Text`
  color: ${colors.white};
  font-size: ${normalize(12)};
  ${fonts.fontPrimarySemiBold};
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

  let issueStateColor;

  switch (issueState) {
    case 'merged':
      issueStateColor = colors.purple;
      break;
    case 'open':
      issueStateColor = colors.green;
      break;
    case 'closed':
      issueStateColor = colors.red;
      break;
    default:
      issueStateColor = colors.gray;
  }

  return (
    <Badge color={issueStateColor} style={style}>
      <BadgeText>{issueText}</BadgeText>
    </Badge>
  );
};
