import { graphql, useStaticQuery } from 'gatsby'

const studiesQuery = graphql`
{
  studies: allStudiesJson {
    edges {
      node {
        Accession
        Name
        Description
        Short_Description
        Cohort_Abbreviation
        Primary_Research_Focus
        Consent
        Consent_Short
        dbGaP_Listed_Variable
        Data_Dictionary_Link
        Number_of_Variables
        Type
        Molecular_Data
        Populations
      }
    }
  }
  covidStudies: allCovidStudiesJson {
    edges {
      node {
        Name
        Short_Name
        Description
        Type
        Link
        Network
        Responsible_Party
        Status
      }
    }
  }
}
`

export const useStudies = () => {
  const { studies, covidStudies } = useStaticQuery(studiesQuery)
  return {
    studies: studies.edges.map(({ node }) => node),
    covidStudies: covidStudies.edges.map(({ node }) => node),
  }
}
