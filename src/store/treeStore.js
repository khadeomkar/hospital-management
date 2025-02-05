import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  treeData: [], // Start with an empty tree
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    addNode: (state, action) => {
      const { parentId, newNode } = action.payload;
      if (!parentId) {
        // If no parentId, add a new hospital at the root level
        state.treeData.push(newNode);
        return;
      }
      const addChild = (nodes) => {
        return nodes.map((node) => {
          if (node.id === parentId) {
            return { ...node, children: [...node.children, newNode] };
          } else if (node.children) {
            return { ...node, children: addChild(node.children) };
          }
          return node;
        });
      };
      state.treeData = addChild(state.treeData);
    },

    removeNode: (state, action) => {
      const idToRemove = action.payload;
      const removeChild = (nodes) =>
        nodes
          .filter((node) => node.id !== idToRemove)
          .map((node) => ({
            ...node,
            children: removeChild(node.children || []),
          }));

      state.treeData = removeChild(state.treeData);
    },

    editNode: (state, action) => {
      const { nodeId, newName } = action.payload;
      const editChild = (nodes) =>
        nodes.map((node) =>
          node.id === nodeId
            ? { ...node, name: newName }
            : { ...node, children: editChild(node.children || []) }
        );

      state.treeData = editChild(state.treeData);
    },
  },
});

export const { addNode, removeNode, editNode } = treeSlice.actions;

const store = configureStore({
  reducer: {
    tree: treeSlice.reducer,
  },
});

export default store;
