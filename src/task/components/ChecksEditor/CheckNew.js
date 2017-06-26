import React from 'react';
import CheckTextarea from '../CheckTextarea';
import { STATE_NONE } from './CheckEdit';

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
        this.props.onCreate({
          text: value,
          status: STATE_NONE,
        });
    }
    
    render() {
        return (
            <CheckTextarea
                className="checkNew"
                placeholder={ `Enter something useful for ${this.props.jira.issueKey} :)` }
                onChange={ this.handleChange }
                onValidate={ this.handleValidate }
                value={ this.state.value }
            />
        );
    }
}

export default CheckNew;
