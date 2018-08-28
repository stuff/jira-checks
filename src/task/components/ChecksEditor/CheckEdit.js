import React from 'react';
import cx from 'classnames';
import CheckTextarea from '../CheckTextarea';
import CheckUser from './CheckUser';
import StateSelector from './StateSelector';

import './checkEdit.less';

export const STATE_NONE      = 'NONE';
export const STATE_WIP       = 'WIP';
export const STATE_STAGE     = 'STAGE';
export const STATE_VALIDATED = 'VALIDATED';
export const STATE_WONT_DO   = 'WONTDO';

class CheckEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: this.props.check.status || STATE_NONE,
            locked: this.props.check.locked,
            text: this.props.check.text,
            user: this.props.check.user,
        };

        this.timeoutId = null;
        this.uid = Date.now() + (''+Math.random()).replace(/\./, '');
    }

    handleRemove = () => {
        if (confirm('Delete it?')) {
            this.props.onDelete();
        }
    }

    handleCheckChanged = () => {
        const check = {
            text: this.state.text,
            status: this.state.status,
            user: this.state.user,
        };

        this.props.onChange(check);
    }

    handleCheckToggle = (newstatus) => {
        this.setState({ status: newstatus }, this.handleCheckChanged);
    }

    handleTextareaMount = (textareaElement) => {
        if (!textareaElement) {
            return;
        }
        this.textareaElement = textareaElement.textarea;
    }

    handleTextChange = (event) => {
        this.setState({ text: event.target.value }, this.handleCheckChanged);
    }

    handleValidate = () => {
        this.endEdit();
    }

    handleInputFocus = () => {
        this.props.onStartEdit(this.uid);
        this.idleWait();
    }

    idleWait() {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.endEdit();
        }, 15 * 1000)
    }

    endEdit() {
        this.textareaElement.blur();
    }

    componentWillReceiveProps(nextProps) {
        const newState = {
            locked: nextProps.check.locked,
            text: nextProps.check.text,
            status: nextProps.check.status,
            user: nextProps.check.user,
        };

        this.setState(newState);
    }

    render() {
        const { onEndEdit } = this.props;
        const lockedBySomeoneElse = this.state.locked && (this.uid !== this.state.locked.uid );
        const isDone = this.state.status === STATE_VALIDATED;
        const classnames = cx(
            'checkEdit',
            { 'checkEdit--locked': lockedBySomeoneElse },
            { 'checkEdit--done': isDone }
        );
        
        const user = this.props.check.user;
        const status = this.state.status || STATE_NONE;

        return (
            <div className={ classnames }>
                <StateSelector className="checkEdit__states" status={ status } onChange={ this.handleCheckToggle } />
                <CheckUser user={ user } />
                <CheckTextarea
                    className="checkEdit__text"
                    value={ this.state.text }
                    ref={ this.handleTextareaMount }
                    onBlur={ onEndEdit }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleTextChange }
                    onValidate={ this.handleValidate }
                    disabled={ lockedBySomeoneElse || status !== STATE_NONE }
                />
                
                <a className="checkEdit__delete" onClick={ this.handleRemove }>
                    <i className="fa fa-trash"></i>
                </a>
            </div>
        );
    }
}

export default CheckEdit;
