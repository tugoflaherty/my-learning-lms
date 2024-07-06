import Card from '../../card/Card.jsx';
import HoverCard from '../../card/HoverCard.jsx';
import ButtonBar from '../../button/ButtonBar.jsx';
import ButtonUnfavorite from '../../button/ButtonUnfavorite.jsx';
import ButtonFavorite from '../../button/ButtonFavorite.jsx';
import ButtonDelete from '../../button/ButtonDelete.jsx';
import ButtonEdit from '../../button/ButtonEdit.jsx';
import ButtonFavoriteOverlay from '../../button/ButtonFavoriteOverlay.jsx';
import ToolTip from '../../tooltip/ToolTip.jsx';

import './ModuleItem.scss';

function ModuleItem({ module, handlers }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------
    const handleFavorite = () => handlers.handleFavorite(module.ModuleID);

    const handleUnfavorite = () => handlers.handleUnfavorite(module.ModuleID);

    const handleEdit = () => handlers.handleEdit(module);

    const handleDelete = () => handlers.handleDelete(module.ModuleID);

    const handleModuleClick = () => handlers.handleModuleClick(module.ModuleID);

    // View ----------------------------------------
    return (
        <HoverCard>
            <Card>
                { 
                    module.isFavorite && 
                        <ToolTip text='Click to unfavourite' >
                            <ButtonFavoriteOverlay unFavorite={handleUnfavorite}/>
                        </ToolTip>
                }
                <div className='item'>
                    <div className='image' onClick={handleModuleClick}>
                        <img src={module.ModuleImageURL} alt={module.ModuleName} />
                    </div>
                    <div className='content' onClick={handleModuleClick}>
                        <h2>{module.ModuleName} ({module.ModuleCode})</h2>
                        <h3>Level {module.ModuleLevel}</h3>
                    </div>
                    <div className='modulebuttons'>
                        <ButtonBar className='cardbar'>
                            {
                                module.isFavorite
                                    ?   <ToolTip text='Unfavourite'>
                                            <ButtonUnfavorite onClick ={handleUnfavorite} />
                                        </ToolTip>
                                    :   <ToolTip text='Favourite'>
                                            <ButtonFavorite onClick={handleFavorite} />
                                        </ToolTip>
                            }
                            <ToolTip text='Edit' >
                                <ButtonEdit onClick={handleEdit} />
                            </ToolTip>
                            <ToolTip text='Delete' >
                                <ButtonDelete onClick={handleDelete} />
                            </ToolTip>
                        </ButtonBar>
                    </div>
                </div>
            </Card>
        </HoverCard>
    );
}

export default ModuleItem;