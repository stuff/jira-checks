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
    const split = user.displayname.split(' ');
    return split[0] + ' ' + split[1].charAt(0) + '.';
}

export default CheckUser;
