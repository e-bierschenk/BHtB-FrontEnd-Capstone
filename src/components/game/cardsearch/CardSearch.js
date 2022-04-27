import "./CardSearch.css"


export const CardSearch = ({ handleInputChange, searchInputValue}) => {

    return (
        <input ref={input => input && input.focus()} 
            className="cardsearch"
            type="text" 
            onChange={handleInputChange} 
            value={searchInputValue} 
            placeholder="Search..." />
    )
}