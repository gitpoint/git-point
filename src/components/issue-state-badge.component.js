import React from 'react';

import { StateBadge } from 'components';

type Props = {
  issue: Object,
  isMerged: boolean,
};

export const IssueStateBadge = ({ issue, isMerged }: Props) => {
  let type = '';
  let title = '';

  if (isMerged) {
    type = 'merged';
    title = 'Merged';
  } else if (issue.state === 'open') {
    type = 'open';
    title = 'Open';
  } else if (issue.state === 'closed') {
    type = 'closed';
    title = 'Closed';
  }

  return <StateBadge type={type} text={title} />;
};
