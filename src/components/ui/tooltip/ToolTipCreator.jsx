import { useState } from 'react';

import Card from '../card/Card.jsx';

import './ToolTip.scss';

export default function ToolTipCreator({ text, isMouseOver }) {
    // Properties ----------------------------------
    const initiatingHoverTime = 500;
    const visibilityTime = 2500;


    // Hooks ---------------------------------------
    const [toolTipVisibility, setToolTipVisibility] = useState('hidden');

    // Context -------------------------------------

    // Methods -------------------------------------
    const handleSetToolTipVisible = () => setToolTipVisibility('visible');

    const handleSetToolTipHidden = () => setToolTipVisibility('hidden');

    const displayToolTip = () => {
        setTimeout(handleSetToolTipVisible, initiatingHoverTime);
        setTimeout(handleSetToolTipHidden, visibilityTime);
    };

    // View ----------------------------------------
    if (isMouseOver && (toolTipVisibility==='hidden')) displayToolTip();
    
    if (!isMouseOver && (toolTipVisibility!=='hidden')) handleSetToolTipHidden();

    return (
        (toolTipVisibility === 'visible') &&
            <Card>
                <div className='ToolTipCreator'>
                    <p>{text}</p>
                </div>
            </Card>
    );
}