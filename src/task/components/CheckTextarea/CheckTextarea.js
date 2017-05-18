import React from 'react';
import Textarea from 'react-textarea-autosize';
import ReactDOM from 'react-dom';
import cx from 'classnames';

import './checkTextarea.less';

class CheckTextarea extends React.Component {
    handleMount = (element) => {
        if (!element) {
            return;
        }
        
        this.textarea = ReactDOM.findDOMNode(element);
    }
    
    handleKeyPress = (e) => {
        const value = e.target.value;
        const isReturnKey = e.key === 'Enter';

        if (!isReturnKey) {
            return;
        }

        if (value === '') {
            e.preventDefault();
            return;
        }

        if (!e.shiftKey && !e.ctrlKey) {
            e.preventDefault();
            this.props.onValidate(value);
        }
    }

    render() {
        const { onValidate, className, ...props } = this.props;
        
        const classnames = cx(
            className,
            'checkTextarea',
        );
        
        return (
            <Textarea
                { ...props }
                className={ classnames }
                ref={ this.handleMount }
                onKeyPress={ this.handleKeyPress }
                onChange={ this.props.onChange }
            />
        );
    }
}

export default CheckTextarea;
