import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Subheading } from '../typography'
import { ExternalLink } from '../link'

const Wrapper = styled.div`
  padding: 1rem;
  background-color: #eee;
  border-left: 0.5rem solid var(--color-lightgrey);
  font-size: 80%;
`

const LIST_DELIMITER = ' ; '

const DbGapLink = ({ pht }) => {
  const re = new RegExp(/pht(\d+)\.v\d\.p\d/)
  const [, digits] = pht.match(re)
  return <ExternalLink to={ `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/dataset.cgi?study_id=phs000956.v4.p1&pht=${ digits }` }>{ pht }</ExternalLink>
}

export const ExpansionPanel = ({ data }) => {
  return (
    <Wrapper>
      <Subheading>
        { data.Name } ({ data.Accession })
      </Subheading>
      <hr />
      <strong>Study Description:</strong> { data.Description }<br /><br />
      <strong>Primary Research Focus:</strong> { data.Primary_Research_Focus }<br /><br />
      <strong>dbGaP Listed Variable:</strong> { data.dbGaP_Listed_Variable.join(LIST_DELIMITER) }<br /><br />
      <strong>Study Type:</strong> { data.Type.join(LIST_DELIMITER) }<br /><br />
      <strong>Study-Reported Population(s):</strong> { data.Populations.join(LIST_DELIMITER) }<br /><br />
      <strong>Study Consent:</strong> { data.Consent_Short.join(LIST_DELIMITER) }<br /><br />
      <strong>Primary Data Dictionary Link:</strong> <DbGapLink pht={ data.Data_Dictionary_Link }/><br />
    </Wrapper>
  )
}

export const CovidExpansionPanel = ({ data }) => {
  return (
    <Wrapper>
      <Subheading>
        { data.Name }
      </Subheading>
      <hr />
      <strong>Short Name:</strong> { data.Short_Name }<br /><br />
      <strong>Study Description:</strong> { data.Description }<br /><br />
      <strong>Study Type:</strong> { data.Type }<br /><br />
      <strong>Study Link:</strong> { data.Study_Link }<br /><br />
      <strong>Network:</strong> { data.Network }<br /><br />
      <strong>Responsible Party:</strong> { data.Responsible_Party }<br /><br />
      <strong>Status:</strong> { data.Status }<br />
    </Wrapper>
  )
}
