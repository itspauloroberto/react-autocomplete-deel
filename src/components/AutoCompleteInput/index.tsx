import React from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useEventListener } from '../../hooks/useEventListener';
import Suggestions from '../Suggestions';

const AutoCompleteInput: React.FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [suggestions, setSuggestions] = React.useState(Array<string>)
  const debouncedSearchQuery = useDebounce(searchQuery, 250)

  React.useEffect(
    () => {
      async function simulateFetchData() {
        const data = await (new Promise<Array<string>>(
          (resolve) => resolve(
            [
              'how to create good code',
              'how to bake a cake',
              'how to do something',
              'how to manage everything',
              'how to become a better version of yourself',
              'how to overcome all the barriers',
              'how to increase productivity',
              'becoming a great developer',
              'starting to learn everyday',
              'doing great code practices',
            ])
          )
        )
        const foundTerms = data.filter(text => text.includes(debouncedSearchQuery))
        const hasFullMatch = foundTerms.some(term => term === debouncedSearchQuery)
        const emptySearchTerm = debouncedSearchQuery === ''

        if (hasFullMatch || emptySearchTerm)
          setSuggestions([])
        else
          setSuggestions(foundTerms)
      }
      simulateFetchData()
    }, [debouncedSearchQuery])

  const escFunction = React.useCallback((event: any): any => {
    if (event.key === "Escape") {
      setSuggestions([])
    }
  }, []);

  useEventListener('keydown', escFunction, escFunction)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const styles = {
    mainWrapper: {
      background: '#333',
      minHeight: '100vh',
      paddingTop: 50,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    } as React.CSSProperties,
    inputWrapper: {
      width: 500
    } as React.CSSProperties,
    input: {
      width: 'calc(100% - 8px)',
      height: 40,
      marginTop: 15
    } as React.CSSProperties,
    heading: {
      fontSize: 45,
      color: '#fff',
      marginBottom: 20
    } as React.CSSProperties,
    subHeading: {
      fontSize: 20,
      color: '#fff'
    } as React.CSSProperties,
  }

  return (
    <div style={styles.mainWrapper}>
      <div>
        <h1 style={styles.heading}>Type anything and get suggestions</h1>
        <small style={styles.subHeading}>Hint: type 'how to'</small>
      </div>
      <div style={styles.inputWrapper}>
        <input style={styles.input} type="text" value={searchQuery} onChange={handleSearch} />
        <Suggestions
          searchTerm={searchQuery}
          suggestions={suggestions}
          setSearchQuery={setSearchQuery}
          setSuggestions={setSuggestions}
        />
      </div>
    </div>
  );
}

export default AutoCompleteInput