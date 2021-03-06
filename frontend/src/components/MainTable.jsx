import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'date', label: 'Gestionado', minWidth: 170 },
  { id: 'id', label: 'ID Caso', minWidth: 100 },
  {
    id: 'telefono',
    label: 'Teléfono',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'dni',
    label: 'Dni',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'grupo',
    label: 'Grupo',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'llamada',
    label: 'Llamada',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'estado',
    label: 'Estado',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(date, id, telefono, dni, grupo, orden, llamada, estado) {
  return { date, id, telefono, dni, grupo, orden, llamada, estado };
}

export default function ColumnGroupingTable({ data }) {
  let rows = data ? data.results.map((result) => createData(result.last_updated, result.id, result.phone, result.extra_metadata.dni, result.extra_metadata.grupo, result.extra_metadata.orden, result.case_duration, result.case_result.name)) : [];

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 560 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} className='cursor-pointer' key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}