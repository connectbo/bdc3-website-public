import React from 'react'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title, Paragraph } from '../../components/typography'
import { DataTable, ExpansionPanel } from '../../components/data-table'
import { useStudies } from '../../hooks'

const StudiesPage = () => {
  const { studies, studiesColumns } = useStudies()
  
  return (
    <PageContent width="95%" maxWidth="1200px" center gutters style={{ position: 'relative' }}>
      <SEO
        title="BioData Catalyst Studies"
        description=""
        keywords=""
      />
      
      <Title>BioData Catalyst Studies</Title>

      <br/>

      <Paragraph>
        The filterable data table below provides metadata on all studies available in BioData Catalyst.
      </Paragraph>

      {
        studies && studiesColumns && (
          <DataTable
            columns={ studiesColumns }
            data={ studies }
            expandableRows
            expandableRowsComponent={ <ExpansionPanel columns={ studiesColumns } /> }
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
