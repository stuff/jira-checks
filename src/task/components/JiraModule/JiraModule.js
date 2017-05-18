import React from 'react';

function JiraModule(props) {
    return (
        <div id="jirachecks-panel" className="module toggle-wrap" style={ { marginTop: '25px' } }>
            <div id="jirachecks-panel-panel_heading" className="mod-header">
                <ul className="ops"></ul>
                <h2 className="toggle-title">Checklist</h2>
                <div className="mod-content">
                    { props.children }
                </div>
            </div>
        </div>
    );
}

export default JiraModule;
