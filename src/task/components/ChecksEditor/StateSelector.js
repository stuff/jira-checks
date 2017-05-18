import React from 'react';
import cx from 'classnames';

import './stateSelector.less';

import { STATE_NONE, STATE_STAGE, STATE_VALIDATED, STATE_WIP } from './CheckEdit';

class StateSelector extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelectNone = this.handleSelect.bind(this, STATE_NONE);
        this.handleSelectWip = this.handleSelect.bind(this, STATE_WIP);
        this.handleSelectStage = this.handleSelect.bind(this, STATE_STAGE);
        this.handleSelectValidated = this.handleSelect.bind(this, STATE_VALIDATED);
    }

    handleSelect(state) {
        this.props.onChange(state);
    }

    render() {
        const status = this.props.status || STATE_NONE;
        
        const classnames = cx(
            this.props.className,
            'stateSelector',
            { 'stateSelector--none': status === STATE_NONE },
            { 'stateSelector--wip': status === STATE_WIP },
            { 'stateSelector--stage': status === STATE_STAGE },
            { 'stateSelector--done': status === STATE_VALIDATED },
        );

        return (
            <span className={ classnames }>
                <span  onClick={ this.handleSelectNone } className="stateSelector__state" />
                <span title="WIP" onClick={ this.handleSelectWip } className="stateSelector__state" />
                <span title="STAGE" onClick={ this.handleSelectStage } className="stateSelector__state" />
                <span title="DONE" onClick={ this.handleSelectValidated } className="stateSelector__state" />
            </span>
        );
    }
}

export default StateSelector;
