import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Subheading } from '../typography'
import { ExternalLink } from '../link'

const Wrapper = styled.div`
  padding: 1rem;
  background-color: #eee;
  border-left: 0.5rem solid var(--color-lightgrey);
`

const LIST_DELIMITER = ' ; '

const DbGapLink = ({ pht }) => {
  const re = new RegExp(/pht(\d+)\.v\d\.p\d/)
  const [, digits] = pht.match(re)
  return <ExternalLink to={ `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/dataset.cgi?study_id=phs000956.v4.p1&pht=${ digits }` }>{ pht }</ExternalLink>
}

export const ExpansionPanel = ({ columns, data }) => {
  return (
    <Wrapper>
      <Subheading>
        { data.Name } ({ data.Accession })
      </Subheading>
      <hr />
      <strong>Study Description:</strong> { data.Description }<br /><br />
      <strong>Primary Research Focus:</strong> { data.Primary_Research_Focus }<br /><br />
      <strong>Total Number of Variables:</strong> { data.Number_of_Variables }<br /><br />
      <strong>dbGaP Listed Variable:</strong> { data.dbGaP_Listed_Variable.join(LIST_DELIMITER) }<br /><br />
      <strong>Study Type:</strong> { data.Type.join(LIST_DELIMITER) }<br /><br />
      <strong>Study-Reported Population(s):</strong> { data.Populations.join(LIST_DELIMITER) }<br /><br />
      <strong>Study Consent:</strong> { data.Consent_Short.join(LIST_DELIMITER) }<br /><br />
      <strong>Type of Molecular Data Available:</strong> { data.Molecular_Data.join(LIST_DELIMITER) }<br /><br />
      <strong>Primary Data Dictionary Link:</strong> <DbGapLink pht={ data.Data_Dictionary_Link }/><br />
    </Wrapper>
  )
}
