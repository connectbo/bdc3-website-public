import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { Title, Heading, Subheading, Subsubheading, Paragraph } from '../../components/typography'
import { useFellows, useWindowWidth } from '../../hooks'
import { Collapser } from '../../components/collapser'
import { ExternalLink } from '../../components/link'
import { kebabCase } from '../../utils'

const FellowHeading = styled(Subheading)`
    margin-bottom: 1rem;
    display: flex;
    flex-direction: ${ props => props.compact ? 'column' : 'row' };
    justify-content: flex-start;
`

const FellowAbstractTitle = styled(Subsubheading)`
    margin: 0;
`

const FellowName = styled.span`
`

const FellowOrganization = styled.span`
    font-style: italic;
    font-weight: normal;
`

const FellowBio = styled(Paragraph)`
`

const FellowDetails = styled.div`
    flex: 1;
`

const PhotoWrapper = styled.div`
    margin: 2rem;
    max-width: 231px;
    max-height: 200px;
    min-width: 231px;
    min-height: 200px;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.2));
`

const FellowPhoto = styled(Img)`
    max-width: 231px;
    max-height: 200px;
    min-width: 231px;
    min-height: 200px;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    transition: filter 250ms, transform 500ms;
    filter: saturate(0.5);
    transform: scale(1.0);
    transform-origin: center center;
`

const Profile = styled.article`
    // border: 1px solid #f99; * { border: 1px solid #f99; }
    display: flex;
    flex-direction: ${ props => props.compact ? 'column' : 'row' };
    justify-content: center;
    align-items: ${ props => props.compact ? 'center' : 'flex-start' };
    margin-bottom: 3rem;
    &:hover ${ FellowPhoto } {
        transition: filter 500ms, transform 250ms;
        filter: saturate(1.0);
        transform: scale(1.02);
    }
    &::before { 
        content: " ";
        display: block; 
        height: 150px;
        margin-top: -150px;
        visibility: hidden;
    }
}`

const FellowsLinkList = styled.div`
    -moz-columns: 250px 3;
    -webkit-columns: 250px 3;
    columns: 250px 4;
    margin: 2rem auto;
    padding: 0;
    line-height: 1.5;
    @media (max-width: 768px) {
        text-align: center;
    }
`

const FellowsPage = () => {
    const fellows = useFellows()
    const { isCompact } = useWindowWidth()

    return (
        <PageContent width="95%" maxWidth="1200px" center gutters>
            <SEO
                title="Cohort I Fellows"
                description=""
                keywords=""
            />

            <Title>Cohort I Fellows</Title>
            
            <section id="overview">
                <Paragraph>
                    The NHLBI BioData Catalyst Fellows Program provides researchers, especially early-career researchers, the opportunity to receive funding to support research on novel and innovative data science and data-focused research problems. 
                </Paragraph>
                <Paragraph>
                    Cohort I Fellows will work on the BioData Catalyst Ecosystem from March 2020 to March 2021.
                    Read what our <ExternalLink to="https://drive.google.com/file/d/1obNRHh3s0s8k4yJCctYvCHdZ5KsL6Uj_/view?usp=sharing">Cohort I Fellows have said</ExternalLink> about the NHLBI BioData Catalyst ecosystem.
                </Paragraph>
            </section>
            

            <section id="fellows">
                <Heading>Meet the Fellows</Heading>

                <FellowsLinkList>
                    {
                        fellows.map(fellow => (
                            <div key={ kebabCase(fellow.name.replace(/, Ph\.D\.$/, '')) }>
                                <AnchorLink to={ `/fellows/cohort1#${ kebabCase(fellow.name.replace(/, Ph\.D\.$/, '')) }` }>{ fellow.name }</AnchorLink>
                            </div>
                        ))
                    }
                </FellowsLinkList>

                {
                    fellows.map(fellow => (
                        <Profile
                            key={ kebabCase(fellow.name.replace(/, Ph\.D\.$/, '')) }
                            id={ kebabCase(fellow.name.replace(/, Ph\.D\.$/, '')) }
                            compact={ isCompact }
                        >
                            <PhotoWrapper>
                                <FellowPhoto fixed={ fellow.photo.childImageSharp.fixed } />
                            </PhotoWrapper>
                            <FellowDetails>
                                <FellowHeading compact={ isCompact }>
                                    <FellowName center={ isCompact }>{ fellow.name }</FellowName>
                                    { !isCompact && <span>&nbsp;-&nbsp;</span> }
                                    <FellowOrganization center={ isCompact }>{ fellow.university }</FellowOrganization>
                                </FellowHeading>
                                <FellowBio dangerouslySetInnerHTML={{ __html: fellow.bio }} />
                                <Collapser
                                    title={ <FellowAbstractTitle>Project: { fellow.project.title }</FellowAbstractTitle> }
                                    ariaId={ `${ kebabCase(fellow.project.title.slice(0, 20)) }_abstract` }
                                >
                                    <Paragraph>
                                        Abstract: { fellow.project.abstract }
                                    </Paragraph>
                                </Collapser>
                            </FellowDetails>
                        </Profile>
                    ))
                }
            </section>

        </PageContent>
    )
}

export default FellowsPage
