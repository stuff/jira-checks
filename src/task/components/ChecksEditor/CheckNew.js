import React from 'react';
import CheckTextarea from '../CheckTextarea';

import './checkNew.less';

class CheckNew extends React.Component {
    state = {
        value: '',
    }
    
    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }
    
    handleValidate = (value) => {
        this.setState({ value: '' });
        this.props.onCreate({ text: value });
    }
    
    render() {
        return (
            <CheckTextarea
                className="checkNew"
                placeholder="Enter something useful :)"
                onChange={ this.handleChange }
                onValidate={ this.handleValidate }
                value={ this.state.value }
            />
        );
    }
}

export default CheckNew;
