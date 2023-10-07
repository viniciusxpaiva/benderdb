import React from 'react';
import { MDBDataTable } from 'mdbreact';

const DatatablePage = (props) => {
  
    console.log(props.intersectionData)
    
    const data = {
    columns: [
      {
        label: 'Residue',
        field: 'residue',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Number',
        field: 'number',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Chain',
        field: 'chain',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Occurrance',
        field: 'occurrance',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Predictors',
        field: 'predictors',
        sort: 'asc',
        width: 150
      }
    ],
    rows: [
        {
        residue: 'ARG',
        number: '125',
        chain: 'A',
        occurrance: '7',
        predictors: 'PUResNet, P2Rank, DeepPocket, PointSite'
        },
        {
        residue: 'LYS',
        number: '104',
        chain: 'A',
        occurrance: '5',
        predictors: 'PUResNet, P2Rank, DeepPocket, PointSite'
        },
        {
        residue: 'PHE',
        number: '55',
        chain: 'A',
        occurrance: '2',
        predictors: 'GRaSP, DeepPocket'
        }
    ]
  };

  return (
    <MDBDataTable
      striped
      bordered
      small
      data={props.data}
    />
  );
}

export default DatatablePage;