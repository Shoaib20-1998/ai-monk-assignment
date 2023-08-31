import React, { useState, useEffect } from 'react';
import TagView from './TagView';
import { JSONTree } from 'react-json-tree';
import { Button, Container, VStack } from '@chakra-ui/react';
import { styled } from 'styled-components';

const initialTree = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: 'c1-c1 Hello' },
        { name: 'child1-child2', data: 'c1-c2 JS' },
      ],
    },
    { name: 'child2', data: 'c2 World' },
  ],
};

const updateTagInTree = (tree, targetTag, updatedTag) => {
  if (tree === targetTag) {
    return updatedTag;
  }

  if (tree.children) {
    return {
      ...tree,
      children: tree.children.map((childTag) =>
        updateTagInTree(childTag, targetTag, updatedTag)
      ),
    };
  }

  return tree;
};

function Tagtree() {
  const [tree, setTree] = useState(initialTree);
  const [count, setCount] = useState(3);
  const [exportedJSON, setExportedJSON] = useState(null);
  const [isExported, setIsExported] = useState(false);

  useEffect(() => {
    if (isExported) {
      const exportedTree = JSON.stringify(tree, ["name", "children", "data"], 2);
      setExportedJSON(exportedTree);
    }
  }, [tree, isExported]);

  const handleAddChild = (parentTag) => {
    const newChildTag = { name: `New child`, data: 'Data' };

    const updatedParentTag = {
      ...parentTag,
      children: parentTag.children ? [...parentTag.children, newChildTag] : [newChildTag],
    };

    const updatedTree = updateTagInTree(tree, parentTag, updatedParentTag);
    setTree(updatedTree);
    setCount(count + 1);
  };

  const handleEditName = (oldTag, newTag) => {
    const updatedTree = updateTagInTree(tree, oldTag, newTag);
    setTree(updatedTree);
  };

  const handleEditData = (tagToUpdate, newData) => {
    const updatedTree = updateTagInTree(tree, tagToUpdate, { ...tagToUpdate, data: newData });
    setTree(updatedTree);
  };

  const handleExport = () => {
    setIsExported(true);
  };
  const customTheme = {
    scheme: 'monokai', // You can change the color scheme
    base00: '#1E1E1E', // Background color
    base0B: '#69a4dc', // Color for strings
    // Add more color keys here
  };

  return (
    <>
    <h1 style={{ fontFamily: 'sans-serif', fontSize: '25px', margin: '20px auto' }}>
      Nested Tree Design
    </h1>
    <TagView
      depth={0}
      isRoot
      tag={tree}
      countchild={setCount}
      onAddChild={handleAddChild}
      onEditName={handleEditName}
      onEditData={handleEditData}
    />
    
    <Button backgroundColor={'#69a4dc'} color={'white'} _hover={'#69a4dc'} onClick={handleExport}>
      Export
    </Button>
    <ContainerDiv>
    {isExported && exportedJSON && (
      <JSONTree
        data={JSON.parse(exportedJSON)}
        shouldExpandNode={() => true}
        theme={customTheme}
        invertTheme={false}
       
      />
    )}
  </ContainerDiv>
  </>
);
}

export default Tagtree;


const ContainerDiv = styled.div`
  width: 60%;
  margin: 0 auto;
`;