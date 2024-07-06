import Card from '../../card/Card.jsx';
import HoverCard from '../../card/HoverCard.jsx';
import ButtonBar from '../../button/ButtonBar.jsx';
import ButtonDelete from '../../button/ButtonDelete.jsx';
import ButtonEdit from '../../button/ButtonEdit.jsx';
import ToolTip from '../../tooltip/ToolTip.jsx';

import './UserItem.scss';

function UserItem({ user, handlers }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    const handleEdit = () => handlers.handleEdit(user);

    const handleDelete = () => handlers.handleDelete(user.UserID);

    const handleNavigate = () => handlers.handleNavigate(user.UserID);

    // View ----------------------------------------
    return (
        <HoverCard>
            <Card>
                <div className='listview'>
                    <div className='image navigate' onClick={handleNavigate}>
                        <img src={user.UserImageURL} alt={`${user.UserLastname}, ${user.UserFirstname}`} />
                    </div>
                    <div className='content navigate' onClick={handleNavigate}>
                        <h2>{`${user.UserFirstname} ${user.UserLastname}`}</h2>
                        <h3>{`Level ${user.UserLevel}`}</h3>
                        <h4>{user.UserEmail}</h4>
                    </div>
                    <div className='modulebuttons'>
                        <ButtonBar className='cardbar'>
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

export default UserItem;