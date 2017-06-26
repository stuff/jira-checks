import React from 'react';

import CheckEdit from './CheckEdit';
import CheckNew from './CheckNew';

import css from './checkList.less';

function ChecksList({ jira, list, onChange, onCreate, onStartEdit, onEndEdit, onDelete }) {
    return (
        <ul className="checkList">
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
