import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { apiRequest } from "../api/API.jsx";

import ButtonBar from "../ui/button/ButtonBar.jsx";
import ButtonNo from "../ui/button/ButtonNo.jsx";
import ButtonYes from "../ui/button/ButtonYes.jsx";
import ButtonEdit from "../ui/button/ButtonEdit.jsx";
import ButtonDelete from "../ui/button/ButtonDelete.jsx";
import ToolTip from '../ui/tooltip/ToolTip.jsx';
import Modal from "../ui/modal/Modal.jsx";
import UserForm from "../ui/entities/user/UserForm.jsx";

import './User.scss';

function User() {
    // Properties ----------------------------------
    const { id } = useParams();
    let modalNumber = 0;

    // Hooks ---------------------------------------
    const [loadingMessage, setLoadingMessage] = useState("Loading User Information...");
    const [user, setUser] = useState(null);

    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalTitle, setModalTitle] = useState(undefined);
    const [modalDescription, setModalDescription] = useState(undefined);
    const [modalButtons, setModalButtons] = useState([]);

    // Context -------------------------------------
    useEffect(() => { fetchUser() }, []);

    // Methods -------------------------------------
    const fetchUser = async () => {
        const outcome = await apiRequest(`users/${id}`);
        if (outcome.success) {
            setUser (outcome.response);
            return outcome.response;
        }
        else setLoadingMessage(`Error ${outcome.response.status}: User could not be found.`);
    }

    const putUser = async editUser => {
        const outcome = await apiRequest(`users/${editUser.UserID}`, 'PUT', editUser);
        initialiseOutcomeModal('edit', outcome);
        setModalVisibility(true);
    }

    const onEdit = editUser => {
        putUser(editUser).then(() => fetchUser());
        handleCancel();
    }

    const deleteUser = async id => {
        const outcome = await apiRequest(`users/${id}`, 'DELETE');
        initialiseOutcomeModal('delete', outcome);
        setModalVisibility(true);
    }

    const handleDelete = id => {
        deleteUser(id).then(() => fetchUser());
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
        const selectedUser = user.find((user) => user.UserID === id);
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

    const initialiseEditModal = editUser => {
        createModal(
            'Edit User',
            <UserForm onCancel={handleCancel} onSubmit={onEdit} existingUser={editUser}/>,
            []
        );
    };
    
    // View ----------------------------------------
    return (
        <>
            <h1>View User</h1>
            <div className='modulebuttons'>
                <ButtonBar className='pagebar'>
                    <ToolTip text='Edit user'>
                        <ButtonEdit hasTitle item='User' onClick={() => handleEdit(user)} />
                    </ToolTip>
                    <ToolTip text='Delete user'>
                        <ButtonDelete hasTitle item='Module' onClick={() => handleDeleteRequest(user)} />
                    </ToolTip>
                </ButtonBar>
            </div>
            {
                !user
                ? <p>{loadingMessage}</p>
                : user.length === 0
                    ? <p>User not found</p>
                    : (
                        <div className='userdetail'>
                            <div>
                                <img className="userdetailimage" src={user.UserImageURL} alt={`${user.UserFirstname} ${user.UserLastname}`} />
                            </div>
                            <div>
                                <h2 className="userdetailh2">{`${user.UserFirstname} ${user.UserLastname}`}</h2>
                                <h3 className="userdetailh3">{user.UserEmail}</h3>
                                <p className="userdetailp">Level: {user.UserLevel || 'N/A'}</p>
                                <p className="userdetailp">{`Enrolment Year: ${user.UserYearName || 'N/A'}`}</p>
                                <p className="userdetailp">Role: {user.UserUsertypeName}</p>
                            </div>
                        </div>
                    )
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

export default User;