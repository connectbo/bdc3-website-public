import React, { Fragment, useEffect, useMemo, useState } from 'react'
import ReactDataTable from 'react-data-table-component'
import { Card, CardHeader, CardBody, CardFooter } from '../card'
import { TextInput } from '../form'
import { Button, IconButton } from '../buttons'
import { BarChart, NetworkChart, PieChart } from '../charts'
import { Stat } from './stat'
import { downloadCSV } from '../../utils'
import { BackspaceIcon, CloseIcon, FullscreenIcon } from '../icons'

//

const countObjectsByStringProperty = (objArray, strProperty) => {
  let counts = {}
  objArray.forEach(obj => {
    if (counts.hasOwnProperty(obj[strProperty])) {
      counts[obj[strProperty]] += 1
    } else {
      counts[obj[strProperty]] = 1
    }
  })
  return Object.keys(counts).map(key => ({ id: key, value: counts[key] }))
}

const countObjectsByArrayProperty = (objArray, arrProperty) => {
  let counts = {}
  objArray.forEach(obj => {
    arrProperty && obj[arrProperty] && 
      obj[arrProperty].forEach(value => {
        if (counts.hasOwnProperty(value.trim())) {
          counts[value] += 1
        } else {
          counts[value] = 1
        }
      })
  })
  return Object.keys(counts).map(key => ({ id: key, value: counts[key] }))
}

const countObjectsByProperty = (objArray, property) => {
  if (typeof objArray[0][property] === 'string') {
    return countObjectsByStringProperty(objArray, property)
  }
  if (typeof objArray[0][property] === 'object') {
    return countObjectsByArrayProperty(objArray, property)
  }
  return ({ })
}

//

const ExportButton = ({ onExport }) => <Button small onClick={ e => onExport(e.target.value) }>Download Studies</Button>

export const DataTable = ({ columns, data, ...props }) => {
  const [query, setQuery] = useState('')
  const [filteredStudies, setFilteredStudies] = useState()
  const [grouping, setGrouping] = useState('Primary_Research_Focus')
  const [groupCounts, setGroupCounts] = useState([])
  const [variablesCount, setVariablesCount] = useState(0)
  const [types, setTypes] = useState([])
  const [consents, setConsents] = useState([])
  const [links, setLinks] = useState([])
  const [fullscreen, setFullscreen] = useState(false)
  // filter state is maintained in this object,
  // whose properties are column.selectors
  // and whose values are initialized ehre as empty strings,
  // to be updated by the user via form fields.
  const [filters, setFilters] = useState(() => {
    const keys = columns.map(column => column.selector)
    let f = {}
    keys.forEach(key => f[key] = '')
    return f
  })

  //

  useEffect(() => setFilteredStudies(data), [data])

  // set types for network nodes
  useEffect(() => {
    if (filteredStudies) {
      const bucket = []
      filteredStudies.forEach(study => {
        study.Type.forEach(t => {
          if (!bucket.includes(t)) {
            bucket.push(t)
          }
        })
      })
      setTypes(bucket)
    }
  }, [filteredStudies])

  // set consent for network nodes
  useEffect(() => {
    if (filteredStudies) {
      const bucket = []
      filteredStudies.forEach(study => {
        study.Consent_Short.forEach(t => {
          if (!bucket.includes(t)) {
            bucket.push(t)
          }
        })
      })
      setConsents(bucket)
    }
  }, [filteredStudies])

  // set links for network
  useEffect(() => {
    if (filteredStudies) {
      const bucket = []
      filteredStudies.forEach(study => {
        study.Type.forEach(t => {
          bucket.push({ source: study.Accession, target: t, distance: 50 })
        })
        study.Consent_Short.forEach(t => {
          bucket.push({ source: study.Accession, target: t, distance: 50 })
        })
      })
      setLinks(bucket)
    }
  }, [types, consents])

  const isFiltered = (obj, key, value = '') => obj[key] && obj[key].toLowerCase().includes(value.toLowerCase())

  useEffect(() => {
    if (filteredStudies) {
      setFilteredStudies(data.filter(study => isFiltered(study, 'Accession', filters.Accession) && isFiltered(study, 'Name', filters.Name)))
    }
  }, [filters])

  useEffect(() => {
    if (filteredStudies && grouping) {
      const num = filteredStudies.reduce((total, study) => total + parseInt(study.Number_of_Variables), 0)
      setVariablesCount(num)
    }
  }, [filteredStudies])

  useEffect(() => {
    if (filteredStudies && grouping) {
      setGroupCounts(countObjectsByProperty(filteredStudies, grouping))
    }
  }, [filteredStudies, grouping])

  //

  const handleGroupingChange = event => setGrouping(event.target.value)

  const handleFilterChange = key => e => {
    const f = { ...filters }
    f[key] = e.target.value
    setFilters(f)
  }

  const handleToggleFullScreen = () => {
    setFullscreen(!fullscreen)
  }

  const fullscreenStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  }

  const memoizedSubHeaderComponent = useMemo(() => {
    return (
      <Fragment>
        <TextInput id="search-by-study-name" type="text" placeholder="Filter by Study Name" aria-label="Study Name Search Input" value={ filters.Name } onChange={ handleFilterChange('Name') } />
        <IconButton type="button" onClick={ () => setFilters({ ...filters, Name: '' }) }><BackspaceIcon size={24} fill="var(--color-crimson)"/></IconButton>
        <ExportButton onExport={ () => downloadCSV(filteredStudies) } />
      </Fragment>
    )
  }, [query, filters, filteredStudies])

  //

  if (!filteredStudies) return null

  return (
    <Card style={ fullscreen ? fullscreenStyle : null }>
      <CardHeader style={{ display: 'flex', justifyContent: 'flex-end' }}>
        &nbsp;<IconButton onClick={ handleToggleFullScreen }>{ fullscreen ? <CloseIcon size={ 24 } fill="var(--color-white)" /> : <FullscreenIcon size={ 24 } fill="var(--color-white)" /> }</IconButton>
      </CardHeader>

      <em style={{ margin: '1rem auto' }}>Note: this is still very much a work in progress.</em>

      <CardBody style={{ overflowY: 'auto', padding: 0, flex: 1, position: 'relative' }}>
        <details>
          <summary style={{ cursor: 'pointer', backgroundColor: '#eee', padding: '1rem' }}>Pie</summary>
          <select value={ grouping } onChange={ handleGroupingChange } style={{ margin: '2rem' }}>
            { columns.filter(column => column.groupable).map(column => <option key={ `option-${ column.selector }` } value={ column.selector }>{ column.name }</option>) }
          </select>
          <PieChart title={ `Studies grouped by ${ columns.find(column => column.selector === grouping).name }`} data={ groupCounts } height={ fullscreen ? 800 : 500 } radialLabelsSkipAngle={ fullscreen ? 4 : 10 }/>
        </details>
        
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Stat name="Studies" value={ filteredStudies.length } />
          <Stat name="Variables" value={ variablesCount } />
        </div>
      
        <ReactDataTable
          data={ filteredStudies }
          columns={ columns }
          subHeader
          subHeaderComponent={ memoizedSubHeaderComponent }
          { ...props }
        />
      </CardBody>
      <CardFooter>&nbsp;</CardFooter>
    </Card>
  )
}
