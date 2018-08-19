import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';
import classNames from 'classnames';

const STYLES = theme => ({
  self: {
    padding: theme.spacing.unit * 3
  }
});

class Panel extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
  };

  render() {
    const { className, classes, ...rest } = this.props;
    return (
      <Paper className={classNames(classes.self, className)} {...rest} />
    );
  }
}

export default withStyles(STYLES)(Panel);
