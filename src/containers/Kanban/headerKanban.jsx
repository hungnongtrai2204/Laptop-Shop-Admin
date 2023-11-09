import React from 'react';

const headerKanban = ({ category, title }) => (
    <div>
        <p style={{ color: 'gray', fontSize: '14px', marginBottom: '0px' }}>{category}</p>
        <p style={{ color: 'black', fontSize: '24px', fontWeight: 'bolder' }}>
            {title}
        </p>
    </div>
);

export default headerKanban;