import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../api/API.jsx";

import ModuleList from "../ui/entities/module/ModuleList.jsx";
import ButtonBar from "../ui/button/ButtonBar.jsx";
import ButtonShowAll from "../ui/button/ButtonShowAll.jsx";
import ButtonShowFavorites from "../ui/button/ButtonShowFavorites.jsx";
import ButtonAdd from "../ui/button/ButtonAdd.jsx";
import ButtonNo from "../ui/button/ButtonNo.jsx";
import ButtonYes from "../ui/button/ButtonYes.jsx";
import ToolTip from '../ui/tooltip/ToolTip.jsx';
import Modal from "../ui/modal/Modal.jsx";
import ModuleForm from "../ui/entities/module/ModuleForm.jsx";

import './MyModules.scss';

function MyModules() {
    // Properties ----------------------------------
    const navigate = useNavigate();
    let modalNumber = 0;
    let termsModalNumber = 1;
    const termsModalButtons = [];

    // Hooks ---------------------------------------
    const [loadingMessage, setLoadingMessage] = useState("Loading Modules...");
    const [modules, setModules] = useState(null);

    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalTitle, setModalTitle] = useState(undefined);
    const [modalDescription, setModalDescription] = useState(undefined);
    const [modalButtons, setModalButtons] = useState([]);

    const [termsModalVisibility, setTermsModalVisibility] = useState(true);

    // Context -------------------------------------
    useEffect(() => { fetchModules() }, []);

    // Methods -------------------------------------
    const fetchModules = async () => {
        const outcome = await apiRequest('modules');
        if (outcome.success) setModules(outcome.response);
        else setLoadingMessage(`Error ${outcome.response.status}: Modules could not be found.`);
    }

    const handleShowAll = () => {
        setModules(null);
        fetchModules();
    }

    const handleShowFavorites = () => setModules(modules.filter((module) => module.isFavorite));

    const postModule = async newModule => {
        const outcome = await apiRequest('Modules', 'POST', newModule);
        initialiseOutcomeModal('add', outcome);
        setModalVisibility(true);
    }

    const onSubmit = newModule => {
        postModule(newModule).then(() => fetchModules());
        handleCancel();
    }

    const putModule = async editModule => {
        const outcome = await apiRequest(`Modules/${editModule.ModuleID}`, 'PUT', editModule);
        initialiseOutcomeModal('edit', outcome);
        setModalVisibility(true);
    }

    const onEdit = editModule => {
        putModule(editModule).then(() => fetchModules());
        handleCancel();
    }

    const handleAdd = () => {
        initialiseAddModal();
        setModalVisibility(true);
    }

    const handleFavorite = moduleId => setModules(
        modules.map((module) => (
            module.ModuleID === moduleId ? { ...module, isFavorite: true } : module
        ))
    );

    const handleUnfavorite = moduleId => setModules(
        modules.map((module) => (
            module.ModuleID === moduleId ? { ...module, isFavorite: false } : module
        ))
    );

    const deleteModule = async id => {
        const outcome = await apiRequest(`Modules/${id}`, 'DELETE');
        initialiseOutcomeModal('delete', outcome);
        setModalVisibility(true);
    }

    const handleDelete = id => {
        deleteModule(id).then(() => fetchModules());
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

    const handleSetTermsModalVisibilityFalse = () => setTermsModalVisibility(false);
    
    const initialiseDeleteModal = id => {
        const selectedModule = modules.find((module) => module.ModuleID === id);
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

    const initialiseAddModal = () => {
        createModal(
            'Add New Module',
            <ModuleForm onCancel={handleCancel} onSubmit={onSubmit} />,
            []
        );
    };

    const initialiseEditModal = editModule => {
        createModal(
            'Edit Module',
            <ModuleForm onCancel={handleCancel} onSubmit={onEdit} existingModule={editModule}/>,
            []
        );
    };

    const handleModuleClick = moduleId => navigate(`/modules/${moduleId}`);
    
    // View ----------------------------------------
    termsModalButtons.push(
        <ToolTip text="I agree to use of cookies">
          <ButtonYes hasTitle onClick={handleSetTermsModalVisibilityFalse} />
        </ToolTip>
    );

    termsModalButtons.push(
        <ToolTip text="I disagree to use of cookies">
            <ButtonNo hasTitle onClick={handleSetTermsModalVisibilityFalse} />
        </ToolTip>
    );

    return (
        <>
            <h1>My Modules</h1>
            <div className='modulebuttons'>
                <ButtonBar className='pagebar'>
                    <ToolTip text='Show all modules'>
                        <ButtonShowAll hasTitle onClick={handleShowAll} />
                    </ToolTip>
                    <ToolTip text='Show favourite modules'>
                        <ButtonShowFavorites hasTitle onClick={handleShowFavorites} />
                    </ToolTip>
                    <ToolTip text='Add module'>
                        <ButtonAdd hasTitle item='Module' onClick={handleAdd} />
                    </ToolTip>
                </ButtonBar>
            </div>
            {
                !modules
                ? <p>{loadingMessage}</p>
                : modules.length === 0 
                    ? <p>No modules found</p>
                    : <ModuleList 
                        modules={modules}
                        handlers={{ handleFavorite, handleUnfavorite, handleEdit, handleDelete: handleDeleteRequest, handleModuleClick }}
                      />
            }
            {
                modalVisibility &&
                    <Modal key={`${modalTitle}${modalNumber}`} title={modalTitle} buttons={modalButtons}>
                        {modalDescription}
                    </Modal>
            }
            {
                termsModalVisibility && (
                    <Modal key={termsModalNumber} title="Cookies Usage" buttons={termsModalButtons}>
                        <p>Do you agree to our usage of cookies?</p>
                    </Modal>
                )
            }
        </>
    );
}

export default MyModules;