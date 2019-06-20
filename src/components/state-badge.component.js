import React from 'react';
import styled from 'styled-components';

import { colors, fonts, normalize } from 'config';
import { t } from 'utils';

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
    issueText = t('Merged', locale);
  } else if (issue && issue.state === 'open') {
    issueState = 'open';
    issueText = t('Open', locale);
  } else if (issue && issue.state === 'closed') {
    issueState = 'closed';
    issueText = t('Closed', locale);
  }

  const stateColor = {
    merged: colors.purple,
    open: colors.green,
    closed: colors.red,
  };
  const issueStateColor = stateColor[issueState]
    ? stateColor[issueState]
    : colors.gray;

  return (
    <Badge color={issueStateColor} style={style}>
      <BadgeText>{issueText}</BadgeText>
    </Badge>
  );
};
