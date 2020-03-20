import * as React from 'react';

interface ISearchBarState {
    inputValue: string
}
class SearchBar extends React.Component<{}, ISearchBarState> {
    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: ''
        };
        this.onInputChange = this.onInputChange.bind(this);
    }

    private onInputChange(e: any) {
        const { value } = e.target;
        this.setState({
            inputValue: value
        });
    }
    
    public render() {
        const { inputValue } = this.state;
        return (
            <div className='input-wrapper'>
                <h1>Session ID Search</h1>
                <input
                    placeholder='Search...'
                    value={inputValue}
                    spellCheck={false}
                />
                <span className='input-highlight'>
                    {inputValue.replace(/ /g, "\u00a0")}
                </span>
                
            </div>);
    }
}
export default SearchBar;