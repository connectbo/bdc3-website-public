import React from 'react'
import { SEO } from '../components/seo'
import { PageContent } from '../components/layout'
import { Title, Heading, Paragraph } from '../components/typography'
import { List, ListItem } from '../components/list'
import { ExternalLink } from '../components/link'

const Covid19Page = () => {
    return (
  <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
    title="COVID-19"
    description=""
    keywords=""
      />
      
      <Title>About BioData Catalyst COVID-19 Data</Title>

      <Paragraph>
    NHLBI's response to the public health threat posed by COVID-19 includes
    a <ExternalLink to="https://www.nhlbi.nih.gov/directors-messages/coronavirus-covid-19-nhlbi-response">multi-pronged research strategy</ExternalLink>,
    which includes translational research, clinical trials, clinical epidemiology, and population science.
    The NHLBI will also leverage its cyberinfrastructure, namely the BioData Catalyst ecosystem,
    to help coordinate various data management needs among many of the COVID-19 efforts.
      </Paragraph>

      <Paragraph>
    BioData Catalyst is supporting data aggregation, rapid and broad access, and computation for NHLBI-funded COVID-19 datasets.
    In an effort to drive more impactful analyses, BioData Catalyst will be interoperable with other COVID-19 data resources.
      </Paragraph>

      <Heading>Available COVID-19 Data</Heading>

      <Paragraph>
        The filterable data table below provides metadata on the ORCHID study in the BioData Catalyst ecosystem. 
      </Paragraph>

      <div style={{ textAlign: 'center' }}>
        [DATA TABLE GOES HERE]
      </div>

      <Heading>Accessing ORCHID Trial Data</Heading>

      <Paragraph>
        At this time, BioData Catalyst has available ORCHID (Outcomes Related to COVID-19 treated with Hydroxychloroquine among In-patients with symptomatic Disease) trial data.
        Access to ORCHID data requires data access approvals from the NLM Database of Genotypes and Phenotypes
        (<ExternalLink to="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login">dbGaP</ExternalLink>) system.
        ORCHID data is also available to those with appropriate access permission
        on <ExternalLink to="https://biolincc.nhlbi.nih.gov/studies/petal_orchid/ ">BioLINCC</ExternalLink>,
        where they may download the data. ORCHID and other hosted data on BioData Catalyst may not be downloaded
        (see the <ExternalLink to="https://biodatacatalyst.nhlbi.nih.gov/data-protection">BioData Catalyst Data Protection webpage</ExternalLink>).
      </Paragraph>

      <Paragraph>
        To learn more about data access and data use on the BioData Catalyst system,
        visit our <ExternalLink to="https://biodatacatalyst.nhlbi.nih.gov/resources/data">Data webpage</ExternalLink>.
        With dbGaP approval, users are able to:
      </Paragraph>

      <Heading>Getting Started on BioData Catalyst</Heading>

      <List ordered>
        <ListItem
          primary="Request access to ORCHID study data"
        />
        <ListItem
          primary="Read the BioData Catalyst Ecosystem Overview document because it provides important information for new users and links to additional guidance and resources."
        />
        <ListItem
          primary="Obtain or confirm you already have an eRA Commons account, the credentials for which will be used as part of the login process."
        />
        <ListItem
          primary="Refer to the Ecosystem Access, Hosted Data, and System Services section of the Overview document for login information."
        />
        <ListItem
          primary="Once you have approved dbGaP access for the ORCHID data, you may create accounts on our system workspaces to work with the ORCHID data in the Cloud."
        />
        <ListItem
          primary="Prepare for cloud storage costs (incurred from computation and storage of derived results) which may be paid via users’ Amazon and Google accounts. Cloud credits may be available for those conducting concrete heart, lung, blood, or sleep research. Visit the Cloud Credits webpage for more information. "
        />
      </List>

      <Paragraph>
        Researchers using ORCHID data may find helpful the reproducible code originally used by the ORCHID research team to arrive at their results.
        It is available in BioData Catalyst Powered by PIC-SURE for which there is more information in a Jupyter notebook..
      </Paragraph>

      <Heading>Related Resources</Heading>

      <List>
        <ListItem primary={ <ExternalLink to="https://github.com/hms-dbmi/Access-to-Data-using-PIC-SURE-API/blob/master/NHLBI_BioData_Catalyst/R/ORCHID_COVID19.ipynb">ORCHID Clinical Trial: statistical analysis reproduction</ExternalLink> } />
        <ListItem primary={ <ExternalLink to="https://biolincc.nhlbi.nih.gov/studies/petal_orchid/">Downloadable PETAL ORCHID data (BioLINCC)</ExternalLink> } />
      </List>

    </PageContent>
  )
}

export default Covid19Page
