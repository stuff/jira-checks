import React from 'react';
import classnames from 'classnames';

import CheckEdit from './CheckEdit';
import CheckNew from './CheckNew';

import css from './checkList.less';

function ChecksList({ jira, list, isOffline, onChange, onCreate, onStartEdit, onEndEdit, onDelete }) {
    return (
        <ul className={ classnames('checkList', {
          'checkList--offline': isOffline,
        }) }>
            {
                Object.keys(list).map(key => {
                    const handleStartEdit = (uid) => { onStartEdit(key, uid); };
                    const handleEndEdit = () => { onEndEdit(key); };
                    const handleDelete = () => { onDelete(key); };
                    const handleChange = (check) => {
                        onChange(key, check);
                    };

                    return (
                        <li className="checkList__item" key={ key }>
                            <CheckEdit
                                id={ key }
                                check={ list[key] }
                                onChange={ handleChange }
                                onDelete={ handleDelete }
                                onStartEdit={ handleStartEdit }
                                onEndEdit={ handleEndEdit }
                            />
                        </li>
                    )
                })
            }
            <li className="checkList__item">
                <CheckNew
                    jira={ jira }
                    onCreate={ onCreate }
                />
            </li>
        </ul>
    );
}

export default ChecksList;
