import React from 'react';
import styled from 'styled-components';
import { withI18n } from '@lingui/react';

import { colors, fonts, normalize } from 'config';

type Props = {
  issue: Object,
  isMerged: boolean,
  text: string,
  type: string,
  style: Object,
  i18n: Object,
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

export const StateBadge = withI18n()(
  ({ issue, isMerged, text, type, style, i18n }: Props) => {
    let issueState = type;
    let issueText = text;

    if (isMerged) {
      issueState = 'merged';
      issueText = i18n.t`Merged`;
    } else if (issue && issue.state === 'open') {
      issueState = 'open';
      issueText = i18n.t`Open`;
    } else if (issue && issue.state === 'closed') {
      issueState = 'closed';
      issueText = i18n.t`Closed`;
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
  }
);
