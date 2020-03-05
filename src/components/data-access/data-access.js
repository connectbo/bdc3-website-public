import React, { Fragment } from 'react'
import { useLocation } from 'gatsby'
import styled from 'styled-components'
import { useFence, useWindowWidth } from '../../hooks'
import { Dots as LoadingDots } from '../../components/loading'
import { Alert } from '../../components/alert'
import { DownloadIcon, UserIcon } from '../../components/icons'
import { Button } from '../../components/buttons'
import { Title, Heading, Subheading, Paragraph } from '../../components/typography'
import { Card, CardHeader, CardBody, CardFooter } from '../../components/card'

const parseHash = hash => {
    const hashReducer = (object, item) => {
        const [key, value] = item.split('=')
        object[key] = value
        return object
    }
    const returnObject = hash.split('&').reduce(hashReducer, {})
    return returnObject
}

const LoggedInNote = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const ProjectList = styled.select`
    width: 100%;
`

const ProjectOption = styled.option`
    padding: 0.5rem;
`

const Wrapper = styled.div`
    // margin-top: 4rem;
    // display: flex;
    // flex-direction: ${ props => props.compact ? 'column' : 'row' };
    // justify-content: space-around;
    // align-items: ${ props => props.compact ? 'center' : 'flex-start' };;
`
const DownloadButton = styled(Button)`
    // width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const DataAccess = ({ location }) => {
    const { authed, user, projects, isLoading, error } = useFence(location)
    const { isCompact } = useWindowWidth()
    const fenceCheckAccessUrl = `${ process.env.GATSBY_FENCE_AUTH_ROOT }/user/oauth2/authorize?idp=fence&client_id=${ process.env.GATSBY_FENCE_CLIENT_ID }&redirect_uri=${ location.origin }/resources/data&response_type=id_token+token&scope=openid+user&nonce=2bfe151af238d21f48d8a8bf8bbec408838c8dc0ace6b4c5621ac9dfa157798b`

    const handleDownload = () => {
        const csvData = `Project\n${ projects.join(`\n`) }`
        const url = window.URL.createObjectURL(new Blob([csvData], { type: 'text/csv' }))
        const downloadLink = document.createElement('a')
        downloadLink.href = url
        downloadLink.setAttribute('download', `${ user.name }-projects.csv`)
        document.body.appendChild(downloadLink)
        downloadLink.click()
    }

    return (
        <Card>
            <CardHeader>My Access</CardHeader>
            <CardBody>
                { isLoading && <LoadingDots /> }
                {
                    !isLoading && user && projects ? (
                        <Wrapper compact={ isCompact }>
                            <Subheading>You are logged in as { user.name }</Subheading>
                            {
                                projects.length
                                ? (
                                    <Fragment>
                                        <Paragraph>
                                            You have access to { projects.length } projects.
                                        </Paragraph>
                                        <ProjectList size="3">
                                            { projects.map(project => <ProjectOption key={ project}>{ project }</ProjectOption>) }
                                        </ProjectList>
                                        <br/><br/>
                                        <Paragraph>
                                            <DownloadButton onClick={ handleDownload }><span>Download Project List</span>&nbsp;&nbsp;<DownloadIcon size="24" fill="#fff" /></DownloadButton>
                                        </Paragraph>
                                    </Fragment>
                                ) : (
                                    <Paragraph>
                                        You don't have access to any projects yet.
                                    </Paragraph>
                                )
                            }
                        </Wrapper>
                    ) : (
                        <Fragment>
                            <Paragraph>
                                Log in with your eRA Commons credentials to determine which datasets to which you currently have access.
                            </Paragraph>
                                
                            <Paragraph center style={{ margin: '2rem' }}>
                                <Button as="a" href={ fenceCheckAccessUrl }>Check My Access</Button>
                            </Paragraph>
                        </Fragment>
                    )
                }
            </CardBody>
        </Card>
    )
}
