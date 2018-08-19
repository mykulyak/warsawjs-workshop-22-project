import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';

import Panel from './Panel';

export default class ExchangeRates extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    rates: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      buy: PropTypes.number.isRequired,
      sell: PropTypes.number.isRequired,
    })).isRequired,
  };

  render() {
    const { date, rates } = this.props;
    return (
      <Panel>
        <Typography>{date}</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Waluta</TableCell>
              <TableCell>Kupno</TableCell>
              <TableCell>Sprzedaż</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rates.map(({ code, buy, sell }) => (
              <TableRow key={code}>
                <TableCell>{code}</TableCell>
                <TableCell>{buy}</TableCell>
                <TableCell>{sell}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    );
  }
}
