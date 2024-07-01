import ModuleItem from './ModuleItem';

import './ModuleList.scss';

function ModuleList({ modules, handlers }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <>
            <div className='info'>
                <h3 className='resultsheading'>{`Displaying ${modules.length} Modules`}</h3>
            </div>
            <div className='list'>
                {
                    modules.map((module) => (
                        <ModuleItem
                            key={module.ModuleID}
                            module={module}
                            handlers={handlers}
                        />
                    ))
                }
            </div>
        </>
    );
}

export default ModuleList;