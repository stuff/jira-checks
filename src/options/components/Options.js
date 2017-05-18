import React, { Component } from 'react';
import cx from 'classnames';

import './options.less';

class Options extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            firebaseConfig: '',
        }
        
        this.handleSave = this.handleSave.bind(this);
        this.handleConfigurationChange = this.handleConfigurationChange.bind(this);
    }
    
    componentDidMount() {
        chrome.storage.sync.get({
            firebaseConfig: '',
        }, (items) => {
            this.setState(() => ({ firebaseConfig: JSON.stringify(items.firebaseConfig, null, 4) }));
        });
    }
    
    handleSave() {
        chrome.storage.sync.set({
            firebaseConfig: JSON.parse(this.state.firebaseConfig),
        });
    }
    
    handleConfigurationChange(e) {
        const value = e.target.value;
        this.setState(() => ({ firebaseConfig: value }));
    }
    
    isValidConfig() {
        const { firebaseConfig } = this.state;
        
        if (firebaseConfig === '') {
            return true;
        }
        
        let firebaseConfigJson;

        try {
            firebaseConfigJson = JSON.parse(firebaseConfig);
        } catch (e) { }

        if (!firebaseConfigJson) {
            return false;
        }

        const neededKeys = ['apiKey', 'authDomain', 'databaseURL', 'storageBucket', 'messagingSenderId'];
        
        return neededKeys.sort().join() === Object.keys(firebaseConfigJson).sort().join();
    }
    
    render() {
        const isValidConfig = this.isValidConfig();
        const rootClassNames = cx(
            'options',
            { 'options--hasError': !isValidConfig }
        );

        const configClassNames = cx(
            'options__row',
            { 'options__row--hasError': !isValidConfig }
        );
        
        return (
            <div className={ rootClassNames }>
                <div className={ configClassNames }>
                    <label className="options__label">Firebase Configuration</label>
                    <textarea className="options__widget" onChange={ this.handleConfigurationChange } value={ this.state.firebaseConfig }/>
                </div>

                <div className="options__row">
                    <button onClick={ this.handleSave} disabled={ !isValidConfig || this.state.firebaseConfig.length === 0 } className="options__widget">Save</button>
                </div>
                
                <div className="options__version">
                    v{ VERSION } <small>{ BUILD_DATE }</small>
                </div>
            </div>
        )
    }
}

export default Options;
