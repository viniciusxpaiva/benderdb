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
        residue: 'Tiger Nixon',
        number: 'System Architect',
        chain: 'Edinburgh',
        occurrance: '61',
        predictors: '2011/04/25'
        },
        {
        residue: 'Tiger Nixon',
        number: 'System Architect',
        chain: 'Edinburgh',
        occurrance: '61',
        predictors: '2011/04/25'
        },
        {
        residue: 'Tiger Nixon',
        number: 'System Architect',
        chain: 'Edinburgh',
        occurrance: '61',
        predictors: '2011/04/25'
        },
        {
        residue: 'Tiger Nixon',
        number: 'System Architect',
        chain: 'Edinburgh',
        occurrance: '61',
        predictors: '2011/04/25'
        },
        {
        residue: 'Tiger Nixon',
        number: 'System Architect',
        chain: 'Edinburgh',
        occurrance: '61',
        predictors: '2011/04/25'
        },
        {
        residue: 'Tiger Nixon',
        number: 'System Architect',
        chain: 'Edinburgh',
        occurrance: '61',
        predictors: '2011/04/25'
        },
        {
        residue: 'Tiger Nixon',
        number: 'System Architect',
        chain: 'Edinburgh',
        occurrance: '61',
        predictors: '2011/04/25'
        }
    ]
  };

  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
  );
}

export default DatatablePage;