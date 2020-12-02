import React from 'react'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title } from '../../components/typography'
import { DataTable, ExpansionPanel } from '../../components/data-table'
import { useStudies } from '../../hooks'

const columns = [
  {
    name: 'Accession',
    selector: 'Accession',
    type: 'string',
    sortable: true,
    grow: 1,
    groupable: false,
  },
  {
    name: 'Study Name',
    selector: 'Name',
    type: 'string',
    sortable: true,
    grow: 8,
    maxWidth: '1000px',
    groupable: false,
  },
  {
    name: 'Study/Cohort Abbreviation',
    selector: 'Cohort_Abbreviation',
    type: 'string',
    omit: true,
    groupable: false,
  },
  {
    name: 'Description',
    selector: 'Description',
    type: 'string',
    omit: true,
    groupable: false,
  },
  {
    name: 'Short Description',
    selector: 'Short_Description',
    type: 'string',
    omit: true,
    groupable: false,
  },
  {
    name: 'Primary Research Focus',
    selector: 'Primary_Research_Focus',
    type: 'array',
    omit: true,
    groupable: true,
  },
  {
    name: 'Number of Variables',
    selector: 'Number_of_Variables',
    type: 'number',
    omit: true,
    groupable: false,
  },
  {
    name: 'dbGaP Listed Variable',
    selector: 'dbGaP_Listed_Variable',
    type: 'array',
    omit: true,
    groupable: true,
  },
  {
    name: 'Study Type',
    selector: 'Type',
    type: 'string',
    omit: true,
    groupable: true,
  },
  {
    name: 'Populations',
    selector: 'Populations',
    type: 'array',
    omit: true,
    groupable: true,
  },
  {
    name: 'Consent',
    selector: 'Consent',
    type: 'string',
    omit: true,
    groupable: false,
  },
  {
    name: 'Consent',
    selector: 'Consent_Short',
    type: 'array',
    omit: true,
    groupable: true,
  },
  {
    name: 'Molecular Data Available',
    selector: 'Molecular_Data',
    type: 'array',
    omit: true,
    groupable: true,
  },
  {
    name: 'Data Dictionary Link',
    selector: 'Data_Dictionary_Link',
    type: 'string',
    omit: true,
    groupable: false,
  },
]

const StudiesPage = () => {
  const { studies } = useStudies()
  
  return (
    <PageContent width="95%" maxWidth="1200px" center gutters style={{ position: 'relative' }}>
      <SEO
        title="BioData Catalyst Studies"
        description=""
        keywords=""
      />
      
      <Title>BioData Catalyst Studies</Title>

      <br/>

      {
        studies && (
          <DataTable
            columns={ columns }
            data={ studies }
            expandableRows
            expandableRowsComponent={ <ExpansionPanel columns={ columns } /> }
            expandOnRowClicked
            highlightOnHover
            dense
          />
        )
      }

    </PageContent>
  )
}

export default StudiesPage
