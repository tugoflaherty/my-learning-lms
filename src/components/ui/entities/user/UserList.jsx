import UserItem from './UserItem.jsx';

import './UserList.scss';

function UserList({ users, handlers }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <>
            <div className='info'>
                <h3 className='resultsheading'>{`Displaying ${users.length} Users`}</h3>
            </div>
            <div className='list'>
                {
                    users.map((user) => (
                        <UserItem
                            key={user.UserID}
                            user={user}
                            handlers={handlers}
                        />
                    ))
                }
            </div>
        </>
    );
}

export default UserList;