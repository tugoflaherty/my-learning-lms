import HoverSense from './HoverSense.jsx';
import ToolTipCreator from './ToolTipCreator.jsx';

import './ToolTip.scss';

function ToolTip({ children, text }) {
  // Properties ----------------------------------

  // Hooks ---------------------------------------

  // Context -------------------------------------

  // Methods -------------------------------------

  // View ----------------------------------------
    return (
      <div className='ToolTip'>
        <HoverSense>
          {children}
          <ToolTipCreator text={text} />
        </HoverSense>
      </div>
  );
}

export default ToolTip;