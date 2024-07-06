import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../api/API.jsx";

import UserList from "../ui/entities/user/UserList.jsx";
import ButtonBar from "../ui/button/ButtonBar.jsx";
import ButtonShowAll from "../ui/button/ButtonShowAll.jsx";
import ButtonStaff from "../ui/button/ButtonStaff.jsx";
import ButtonUsers from "../ui/button/ButtonUsers.jsx";
import ButtonAdd from "../ui/button/ButtonAdd.jsx";
import ButtonNo from "../ui/button/ButtonNo.jsx";
import ButtonYes from "../ui/button/ButtonYes.jsx";
import ToolTip from '../ui/tooltip/ToolTip.jsx';
import Modal from "../ui/modal/Modal.jsx";
import UserForm from "../ui/entities/user/UserForm.jsx";

import './Users.scss';

function Users() {
    // Properties ----------------------------------
    const navigate = useNavigate();
    let modalNumber = 0;

    // Hooks ---------------------------------------
    const [loadingMessage, setLoadingMessage] = useState("Loading Users...");
    const [users, setUsers] = useState(null);

    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalTitle, setModalTitle] = useState(undefined);
    const [modalDescription, setModalDescription] = useState(undefined);
    const [modalButtons, setModalButtons] = useState([]);

    // Context -------------------------------------
    useEffect(() => { fetchUsers() }, []);

    // Methods -------------------------------------
    const fetchUsers = async () => {
        const outcome = await apiRequest('users');
        if (outcome.success) {
            setUsers (outcome.response);
            return outcome.response;
        }
        else setLoadingMessage(`Error ${outcome.response.status}: Users could not be found.`);
    }

    const postUser = async newUser => {
        const outcome = await apiRequest('Users', 'POST', newUser);
        initialiseOutcomeModal('add', outcome);
        setModalVisibility(true);
    }

    const onSubmit = newUser => {
        postUser(newUser).then(() => fetchUsers());
        handleCancel();
    }

    const putUser = async editUser => {
        const outcome = await apiRequest(`Users/${editUser.UserID}`, 'PUT', editUser);
        initialiseOutcomeModal('edit', outcome);
        setModalVisibility(true);
    }

    const onEdit = editUser => {
        putUser(editUser).then(() => fetchUsers());
        handleCancel();
    }

    const handleAdd = () => {
        initialiseAddModal();
        setModalVisibility(true);
    }

    const deleteUser = async id => {
        const outcome = await apiRequest(`Users/${id}`, 'DELETE');
        initialiseOutcomeModal('delet', outcome);
        setModalVisibility(true);
    }

    const handleDelete = id => {
        deleteUser(id).then(() => fetchUsers());
        handleCancel();
    };

    const handleDeleteRequest = id => {
        initialiseDeleteModal(id);
        setModalVisibility(true);
    };

    const handleEdit = editUser => {
        initialiseEditModal(editUser);
        setModalVisibility(true);
    }

    const handleCancel = () => setModalVisibility(false);

    const createModal = (title, description, buttons) => {
        setModalTitle(title);
        setModalDescription(description);
        setModalButtons(buttons);
        modalNumber++;
    };
    
    const initialiseDeleteModal = id => {
        const selectedUser = users.find((user) => user.UserID === id);
        createModal(
            'Confirm User Deletion', 
            `Do you want to delete user '${selectedUser.UserFirstname} ${selectedUser.UserLastname}'?`,
            [
                <ToolTip text='Click to delete user'>
                    <ButtonYes hasTitle onClick={() => handleDelete(id)} />
                </ToolTip>,
                <ToolTip text='Click to retain user'>
                    <ButtonNo hasTitle onClick={handleCancel} />
                </ToolTip>
            ]
        );
    };

    const initialiseOutcomeModal = (type, outcome) => {
        createModal(
            outcome.success ? `User successfully ${type}ed` : `Error ${type}ing user`,
            outcome.success ? `Your user has been successfully ${type}ed`
                : `There was an error in ${type}ing your user, due to ${outcome}. Please try again later or contact technical support`,
            [
                <ToolTip text='Click to close this message'>
                    <ButtonYes hasTitle title='OK' onClick={handleCancel} />
                </ToolTip>
            ]
        );
    };

    const initialiseAddModal = () => {
        createModal(
            'Add New User',
            <UserForm onCancel={handleCancel} onSubmit={onSubmit} />,
            []
        );
    };

    const initialiseEditModal = editUser => {
        createModal(
            'Edit User',
            <UserForm onCancel={handleCancel} onSubmit={onEdit} existingUser={editUser}/>,
            []
        );
    };

    const handleShowAll = () => {
        setUsers(null);
        fetchUsers();
    }

    const handleShowStaff = async () => {
        setUsers(null);
        const allUsers = await fetchUsers();
        setUsers(allUsers.filter((user) => user.UserUsertypeID !== 2));
    }

    const handleShowStudents = async () => {
        setUsers(null);
        const allUsers = await fetchUsers();
        setUsers(allUsers.filter((user) => user.UserUsertypeID === 2));
    }

    const handleNavigate = userId => navigate(`/users/${userId}`);
    
    // View ----------------------------------------
    return (
        <>
            <h1>Enrolled Users</h1>
            <div className='modulebuttons'>
                <ButtonBar className='pagebar'>
                    <ToolTip text='Show all users'>
                        <ButtonShowAll hasTitle onClick={handleShowAll} />
                    </ToolTip>
                    <ToolTip text='Show only staff'>
                        <ButtonStaff hasTitle onClick={handleShowStaff} />
                    </ToolTip>
                    <ToolTip text='Show only students'>
                        <ButtonUsers hasTitle item='Show Students' onClick={handleShowStudents} />
                    </ToolTip>
                    <ToolTip text='Add module'>
                        <ButtonAdd hasTitle item='User' onClick={handleAdd} />
                    </ToolTip>
                </ButtonBar>
            </div>
            {
                !users
                ? <p>{loadingMessage}</p>
                : users.length === 0
                    ? <p>No users found</p>
                    : <UserList 
                        users={users}
                        handlers={{ handleEdit, handleDelete: handleDeleteRequest, handleNavigate }}
                      />
            }
            {
                modalVisibility &&
                    <Modal key={`${modalTitle}${modalNumber}`} title={modalTitle} buttons={modalButtons}>
                        {modalDescription}
                    </Modal>
            }
        </>
    );
}

export default Users;