import React from 'react';
import ColorHash from 'color-hash';

import './checkUser.less';

const colorHash = new ColorHash();

function CheckUser({ user }) {
    if (!user) {
        return null;
    }
    
    const color = colorHash.hex(user.username);
    
    const style = {
        borderColor: color,
        color: color,
    }
    
    return (
        <span style={ style } className="checkUser">{ getShorName(user) }</span>
    );
}

function getShorName(user) {
    let { displayname } = user;
    let split = displayname.split(' ');
    const firstName = split.shift();
    const last = split.reduce((t, a) => { return t + a[0] + '.' }, '');
    
    return firstName + ' ' + last;
}

export default CheckUser;
