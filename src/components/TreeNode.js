import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNode, removeNode, editNode } from '../store/treeStore';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import '../styles/tree.scss';

const TreeNode = ({ node }) => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(node.name);

    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };

    const handleAddGroup = () => {
        const groupName = prompt('Enter the name of the new group:');
        if (!groupName) return;

        const newGroup = {
            id: `${node.id}-${node.children.length + 1}`,
            name: groupName,
            children: [],
        };
        dispatch(addNode({ parentId: node.id, newNode: newGroup }));
    };

    const handleDeleteGroup = () => {
        if (node.children.length > 0) {
            alert('Cannot delete a group that has children.');
            return;
        }
        dispatch(removeNode(node.id));
    };

    const handleEditName = () => {
        setIsEditing(true);
    };

    const handleSaveName = () => {
        if (!newName.trim()) {
            alert('Group name cannot be empty.');
            return;
        }
        dispatch(editNode({ nodeId: node.id, newName }));
        setIsEditing(false);
    };

    return (
        <li className="tree-node">
            <div
                className={`tree-node__header ${node.id.startsWith('h-') ? 'tree-node--hospital' : 'tree-node--group'}`}
                onClick={handleToggle}
            >
                <div className="tree-node__info">
                    {isEditing ? (
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onBlur={handleSaveName}
                            autoFocus
                        />
                    ) : (
                        <span>{node.name}</span>
                    )}
                </div>
                <div className="tree-node__actions">
                    <button className="tree__button" onClick={handleAddGroup}>
                        <AddIcon />
                    </button>
                    <button className="tree__button tree__button--secondary" onClick={handleEditName}>
                        <EditIcon />
                    </button>
                    <button className="tree__button tree__button--danger" onClick={handleDeleteGroup}>
                        <DeleteIcon />
                    </button>
                    {node.children && node.children.length > 0 ?
                        isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
                        : ""}
                </div>
            </div>
            {isExpanded && (
                <div className="tree-node__content">
                    <ul className="tree__list">
                        {node.children.map((child) => (
                            <TreeNode key={child.id} node={child} />
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
};

export default TreeNode;
