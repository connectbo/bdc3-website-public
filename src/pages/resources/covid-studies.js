import React from 'react'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title } from '../../components/typography'
import { DataTable, ExpansionPanel } from '../../components/data-table'
import { useStudies } from '../../hooks'

const columns = [
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
    name: 'Short Name',
    selector: 'Short_Name',
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
    name: 'Study Type',
    selector: 'Type',
    type: 'string',
    omit: false,
    groupable: true,
  },
  {
    name: 'Study Link',
    selector: 'Link',
    type: 'string',
    omit: true,
    groupable: false,
  },
  {
    name: 'Organizational Network',
    selector: 'Network',
    type: 'number',
    omit: true,
    groupable: true,
  },
  {
    name: 'Responsible Party',
    selector: 'Responsible_Party',
    type: 'string',
    omit: true,
    groupable: false,
  },
  {
    name: 'Study Status',
    selector: 'Status',
    type: 'string',
    omit: true,
    groupable: true,
  },
]

const CovidStudiesPage = ({ data }) => {
  const studies = useStudies()
  
  return (
    <PageContent width="95%" maxWidth="1200px" center gutters style={{ position: 'relative' }}>
      <SEO
        title="BioData Catalyst COVID-19 Studies"
        description=""
        keywords=""
      />
      
      <Title>BioData Catalyst COVID-19 Studies</Title>

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

export default CovidStudiesPage
