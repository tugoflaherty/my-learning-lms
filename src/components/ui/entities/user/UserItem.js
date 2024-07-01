import Card from '../../card/Card';
import HoverCard from '../../card/HoverCard';
import ButtonBar from '../../button/ButtonBar';
import ButtonDelete from '../../button/ButtonDelete';
import ButtonEdit from '../../button/ButtonEdit';
import ToolTip from '../../tooltip/ToolTip';

import './UserItem.scss';

function UserItem({ user, handlers }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    const handleEdit = () => handlers.handleEdit(user);

    const handleDelete = () => handlers.handleDelete(user.UserID);

    // View ----------------------------------------
    return (
        <HoverCard>
            <Card>
                <div className='listview'>
                    <div className='image'>
                        <img src={user.UserImageURL} alt={`${user.UserLastname}, ${user.UserFirstname}`} />
                    </div>
                    <div className='content'>
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