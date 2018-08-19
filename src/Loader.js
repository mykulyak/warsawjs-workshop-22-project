import React, { PureComponent } from 'react';
import { LinearProgress, Typography } from '@material-ui/core';

import Panel from './Panel';

export default class Loader extends PureComponent {
  render() {
    return (
      <Panel>
        <Typography>Loading data ...</Typography>
        <LinearProgress variant="query" />
      </Panel>
    );
  }
}