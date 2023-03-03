import React from 'react';
import { useEventListener } from '../../hooks/useEventListener';

interface SuggestionsProps {
  suggestions: string[]
  searchTerm: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
}

const Suggestions: React.FunctionComponent<SuggestionsProps> =
  ({ suggestions = [], searchTerm = '', setSearchQuery, setSuggestions }) => {
    const styles = {
      wrapper: {
        height: 'auto',
        display: 'flex',
        background: '#fff',
        flexDirection: 'column',
        borderRadius: 3
      } as React.CSSProperties,
      suggestionBtn: {
        padding: 8,
        border: 'none',
        background: 'transparent'
      } as React.CSSProperties
    }
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(-1)
    const handleSuggestionClick = (suggestion: string) => {
      setSearchQuery(suggestion)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp": {
          event.preventDefault()
          setSelectedItemIndex((prevIndex) =>
            prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
          );
          break
        }
        case "ArrowDown": {
          event.preventDefault()
          setSelectedItemIndex((prevIndex) =>
            prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
          );
          break
        }
        case "Enter": {
          setSearchQuery(suggestions[selectedItemIndex])
          break
        }
      }
    };

    useEventListener('keydown', selectedItemIndex, handleKeyDown)

    return (
      <>
        <div style={styles.wrapper}>
          {
            suggestions.map((suggestion, index) =>
            (
              <span
                key={`${index}-${suggestion}`}
                style={{
                  ...styles.suggestionBtn,
                  background: selectedItemIndex === index ? '#ccc' : '#fff'
                }}
                onClick={() => { handleSuggestionClick(suggestion) }}
                dangerouslySetInnerHTML={{ 
                  // Its the smartest way to accomplish the task but still unsafe for production.
                  __html: suggestion.replaceAll(searchTerm, `<strong>${searchTerm}</strong>`)
                }}
              />
            ))
          }
        </div>
      </>
    );
  }

export default Suggestions