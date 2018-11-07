import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import has from 'lodash/has';

import ChecksDb from '../../../db/ChecksDb';
import ChecksList from './ChecksList';
import { STATE_NONE } from './CheckEdit';
import Spinner from '../Spinner';

import './checksEditor.less';

class ChecksEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            isOffline: false,
            checks: {},
        };

        this.handleRemovedCheck = this.handleRemovedCheck.bind(this);
        this.handleAddedCheck = this.handleAddedCheck.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleCheckCreate = this.handleCheckCreate.bind(this);
        this.handleChangedCheck = this.handleChangedCheck.bind(this);
        this.handleReceivedCheckList = this.handleReceivedCheckList.bind(this);
        this.handleStartEdit = this.handleStartEdit.bind(this);
        this.handleEndEdit = this.handleEndEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.checksDb = new ChecksDb(this.props.jira.issueKey);
        this.checksDb.getAll(this.props.jira.issueKey).then(this.handleReceivedCheckList);
        this.checksDb.on('child_added', this.handleAddedCheck);
        this.checksDb.on('child_changed', this.handleChangedCheck);
        this.checksDb.on('child_removed', this.handleRemovedCheck);
        this.checksDb.on('offline', this.handleOffline);
        this.checksDb.on('online', this.handleOnline);
    }

    handleOffline = () => {
        this.setState({
          isOffline: true,
        });
    };

    handleOnline = () => {
      this.setState({
        isOffline: false,
      });
    };

    handleDelete(key) {
        this.checksDb.delete(key);
    }

    handleStartEdit(id, uid) {
        this.checksDb.lock(id, uid);
    }

    handleEndEdit(id) {
        this.checksDb.unlock(id);
    }

    handleReceivedCheckList(checks) {
        this.setState({
            loading: false,
            checks,
        });
    }

    handleCheckChange(id, check) {
        if (check.status === STATE_NONE) {
            check.user = null;
        } else {
            if (!check.user) {
                check.user = this.props.user;
            }
        }

        this.checksDb.update(id, check);
    }

    handleCheckCreate(check) {
        this.checksDb.create(check);
    }

    handleChangedCheck(id, changedCheck) {
        let newChecks = cloneDeep(this.state.checks);

        newChecks[id] = changedCheck;

        this.setState({
            checks: newChecks,
        });
    }

    handleAddedCheck(id, addedCheck) {
        if (has(this.state.checks, id)) {
            return;
        }

        let newChecks = cloneDeep(this.state.checks);

        newChecks[id] = addedCheck;

        this.setState({
            checks: newChecks,
        });
    }

    handleRemovedCheck(id, removedCheck) {
        let newChecks = cloneDeep(this.state.checks);
        delete newChecks[id];

        this.setState({
            checks: newChecks,
        });
    }

    componentWillUnmount() {
        this.checksDb.destroy();
    }

    render() {
        return (
            <div className="checksEditor">
                { this.state.loading && <Spinner /> }

                <ChecksList
                    isOffline={ this.state.isOffline }
                    jira={ this.props.jira }
                    list={ this.state.checks }
                    onChange={ this.handleCheckChange }
                    onCreate={ this.handleCheckCreate }
                    onDelete={ this.handleDelete }
                    onStartEdit={ this.handleStartEdit }
                    onEndEdit={ this.handleEndEdit }
                />
            </div>
        )
    }
}

export default ChecksEditor;
