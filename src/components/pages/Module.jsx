import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiRequest } from "../api/API.jsx";

import ButtonBar from "../ui/button/ButtonBar.jsx";
import ButtonNo from "../ui/button/ButtonNo.jsx";
import ButtonYes from "../ui/button/ButtonYes.jsx";
import ButtonEdit from "../ui/button/ButtonEdit.jsx";
import ButtonDelete from "../ui/button/ButtonDelete.jsx";
import ToolTip from '../ui/tooltip/ToolTip.jsx';
import Modal from "../ui/modal/Modal.jsx";
import ModuleForm from "../ui/entities/module/ModuleForm.jsx";

import './Module.scss';

function Module() {
    // Properties ----------------------------------
    const { id } = useParams();
    const navigate = useNavigate();
    let modalNumber = 0;

    // Hooks ---------------------------------------
    const [loadingMessage, setLoadingMessage] = useState("Loading Module Information...");
    const [module, setModule] = useState(null);

    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalTitle, setModalTitle] = useState(undefined);
    const [modalDescription, setModalDescription] = useState(undefined);
    const [modalButtons, setModalButtons] = useState([]);

    // Context -------------------------------------
    useEffect(() => { fetchModule() }, []);

    // Methods -------------------------------------
    const fetchModule = async () => {
        const outcome = await apiRequest(`modules/${id}`);
        if (outcome.success) setModule(outcome.response);
        else setLoadingMessage(`Error ${outcome.response.status}: Module could not be found.`);
    }

    const putModule = async editModule => {
        const outcome = await apiRequest(`modules/${editModule.ModuleID}`, 'PUT', editModule);
        initialiseOutcomeModal('edit', outcome);
        setModalVisibility(true);
    }

    const onEdit = editModule => {
        putModule(editModule).then(() => fetchModule());
        handleCancel();
    }

    const deleteModule = async id => {
        const outcome = await apiRequest(`modules/${id}`, 'DELETE');
        initialiseOutcomeModal('delete', outcome);
        setModalVisibility(true);
    }

    const handleDelete = id => {
        deleteModule(id).then(() => fetchModule());
        handleCancel();
    };

    const handleDeleteRequest = id => {
        initialiseDeleteModal(id);
        setModalVisibility(true);
    };

    const handleEdit = editModule => {
        initialiseEditModal(editModule);
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
        const selectedModule = module.find((module) => module.ModuleID === id);
        createModal(
            'Confirm Module Deletion', 
            `Do you want to delete module '${selectedModule.ModuleCode} (${selectedModule.ModuleName})'?`,
            [
                <ToolTip text='Click to delete module'>
                    <ButtonYes hasTitle onClick={() => handleDelete(id)} />
                </ToolTip>,
                <ToolTip text='Click to retain module'>
                    <ButtonNo hasTitle onClick={handleCancel} />
                </ToolTip>
            ]
        );
    };

    const initialiseOutcomeModal = (type, outcome) => {
        createModal(
            outcome.success ? `Module successfully ${type}ed` : `Error ${type}ing module`,
            outcome.success ? `Your module has been successfully ${type}ed`
                : `There was an error in ${type}ing your module, due to ${outcome}. Please try again later or contact technical support`,
            [
                <ToolTip text='Click to close this message'>
                    <ButtonYes hasTitle title='OK' onClick={handleCancel} />
                </ToolTip>
            ]
        );
    };

    const initialiseEditModal = editModule => {
        createModal(
            'Edit Module',
            <ModuleForm onCancel={handleCancel} onSubmit={onEdit} existingModule={editModule}/>,
            []
        );
    };
    
    // View ----------------------------------------
    return (
        <>
            <h1>View Module</h1>
            <div className='modulebuttons'>
                <ButtonBar className='pagebar'>
                    <ToolTip text='Edit module'>
                        <ButtonEdit hasTitle item='Module' onClick={() => handleEdit(module)} />
                    </ToolTip>
                    <ToolTip text='Delete module'>
                        <ButtonDelete hasTitle item='Module' onClick={() => handleDeleteRequest(module)} />
                    </ToolTip>
                </ButtonBar>
            </div>
            {
                !module
                ? <p>{loadingMessage}</p>
                : module.length === 0 
                    ? <p>Module not found</p>
                    : (
                        <div className='moduledetail'>
                            <div>
                                <img className="moduledetailimage" src={module.ModuleImageURL} alt={module.ModuleName} />
                            </div>
                            <div>
                                <h2 className="moduledetailh2">{module.ModuleName}</h2>
                                <h3 className="moduledetailh3">{module.ModuleCode}</h3>
                                <p className="moduledetailp">Level: {module.ModuleLevel}</p>
                                <p className="moduledetailp">Year: {module.ModuleYearName}</p>
                                <p className="navigate moduledetailp" onClick={() => navigate(`/users/${module.ModuleLeaderID}`)}>Module Leader: {module.ModuleLeaderName}</p>
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

export default Module;