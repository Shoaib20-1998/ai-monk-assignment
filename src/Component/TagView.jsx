import React, { useState } from "react";
import { Button, Input, useColorModeValue } from '@chakra-ui/react';
import { styled } from "styled-components";

const TagView = ({ tag, onAddChild, onEditName, onEditData, isRoot = false, depth = 0 }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(tag.name);

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleEditName = () => {
    setEditingName(true);
    setNewName(tag.name);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNameEditComplete = () => {
    const updatedTag = { ...tag, name: newName };
    onEditName(tag, updatedTag); // Pass the updated tag to onEditName
    setEditingName(false);
  };

  const handleNameKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleNameEditComplete(tag, newName); // Pass the current tag and new name
    }
  };

  const handleDataChange = (event) => {
    const newData = event.target.value;
    onEditData(tag, newData);
  };

  const buttonColor = useColorModeValue('black', 'white');
  
  return (
    <DIV>
    <StyledTag depth={depth} collapsed={collapsed}>
      <div className="tag-header">
        <div className="semi">
          <Button
            size="sm"
            backgroundColor={buttonColor === 'black' ? 'white' : 'black'}
            onClick={handleCollapseToggle}
            className="collapse-button"
          >
            {collapsed ? '>' : 'v'}
          </Button>
        {editingName ? (
          <Input
            type="text"
            value={newName}
            onChange={handleNameChange}
            onBlur={handleNameEditComplete}
            onKeyPress={handleNameKeyPress} // Handle Enter key press
            autoFocus
            backgroundColor={'white'}
          />
        ) : (
          <span onClick={handleEditName} className="tag-name">
            {tag.name}
          </span>
        )}
        {tag.data && (
          <Input
            type="text"
            value={tag.data}
            onChange={handleDataChange}
            style={{ display: collapsed ? 'none' : 'block', backgroundColor:'white' }}
          />
        )}
        </div>
        <div className="add-child-container">
          <Button
            size="sm"
            backgroundColor={'white'}
            onClick={() => {
              onAddChild(tag);
            }}
          >
            Add Child
          </Button>
        </div>
      </div>
      {!collapsed && tag.children && (
        <div className="tag-children">
          {tag.children.map((childTag, index) => (
            <TagView
              key={index}
              tag={childTag}
              onAddChild={onAddChild}
              onEditName={onEditName}
              onEditData={onEditData}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </StyledTag>
    </DIV>
  );
};

export default TagView;

const DIV=styled.div`
  width: 90%;
  margin: 20px auto;

`

const StyledTag = styled.div`

  border: 1px solid #5c2929;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;

  
  .tag-header {
    display: flex;
    justify-content: space-between;
    background-color:#69a4dc; 
    padding:10px;
  }

  .semi {
    /* Empty for now */
  }

  .add-child-container {
    /* This will keep the "Add Child" button fixed on the right */
    display: flex;
    align-items: center;
  }
  

  .semi{
    
  }
  .collapse-button {
    margin-right: 10px;
  }

  .tag-name {
    cursor: pointer;
    margin-right: 10px;
  }

  input {

    margin-left: auto;
    margin-right: 10px;
    background-color: 'white';
  }

  button {
    margin-left: auto;
    background-color: 'white';
  }
`;
