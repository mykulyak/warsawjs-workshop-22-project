import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error'; 

import Panel from './Panel';

export default class ErrorMessage extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
  };

  render() {
    const { text } = this.props;
    return (
      <Panel>
        <ErrorIcon />
        <Typography>{text || 'An error has occurred'}</Typography>
      </Panel>
    );
  }
}
