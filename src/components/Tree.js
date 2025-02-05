import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TreeNode from './TreeNode';
import { addNode } from '../store/treeStore';
import '../styles/tree.scss';

const Tree = () => {
  const treeData = useSelector((state) => state.tree.treeData);
  const dispatch = useDispatch();

  const handleAddHospital = () => {
    const hospitalName = prompt('Enter hospital name:');
    if (!hospitalName) return;

    const newHospital = {
      id: `h-${Date.now()}`,
      name: hospitalName,
      children: [],
    };

    dispatch(addNode({ parentId: null, newNode: newHospital }));
  };

  return (
    <div className="tree">
      <h2>Hospital Management System</h2>
      <button className="tree__button--primary" onClick={handleAddHospital}>Add New Hospital</button>
      <ul className="tree__list">
        {treeData.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </ul>
    </div>
  );
};

export default Tree;
