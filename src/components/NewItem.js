import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Menu, Dropdown, Icon, Input } from 'antd';


export default class NewItem extends Component {
  static propTypes = {
    handleCreate: PropTypes.func.isRequired
  }
  state = {
    isCreateStickOpen: false,
    isCreateCategoryOpen: false,
    name: '',
    color: '#000000',
    textColor: '#FFFFFF'
  }
  resetState = () => {
    this.setState({
      isCreateStickOpen: false,
      isCreateCategoryOpen: false,
      name: '',
      color: '#000000',
      textColor: '#FFFFFF'
    })
  }
  handleCreateStickOpen = () => {
    this.setState({
      isCreateStickOpen: true
    })
    // this.resetState()
  }
  handleCreateCategoryOpen = () => {
    this.setState({
      isCreateCategoryOpen: true
    })
    // this.resetState()
  }
  handleCancel = () => {
    this.resetState()
  }
  handleName = e => {
    this.setState({
      name: e.target.value
    })
  }
  handleColor = e => {
    this.setState({
      color: e.target.value
    })
  }
  handleTextColor = e => {
    this.setState({
      textColor: e.target.value
    })
  }
  handleCreateCategory = () => {
    if (!this.state.name) return;
    this.props.handleCreate({
      name: this.state.name,
      type: 'categories'
    });
    this.resetState();
  }
  handleCreateStick = () => {
    if (!this.state.name) return;
    this.props.handleCreate({
      name: this.state.name,
      color: this.state.color,
      textColor: this.state.textColor,
      tags: [],
      type: 'items',
      category: null
    });
    this.resetState();
  }
  render() {
    const { isCreateStickOpen, isCreateCategoryOpen, name, color, textColor } = this.state;
    const { handleCreateStickOpen, handleCancel, handleCreateCategoryOpen, handleName, handleColor, handleTextColor, handleCreateCategory, handleCreateStick } = this;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <span onClick={handleCreateStickOpen}>Create stick</span>
        </Menu.Item>
        <Menu.Item key="1">
        <span onClick={handleCreateCategoryOpen}>Create category</span>
        </Menu.Item>
      </Menu>);
    return (
      <div>
        <Dropdown overlay={menu} trigger={['click']}>
          <span className="dropdown-link">
            Create item <Icon type="plus" />
          </span>
        </Dropdown>
        <Modal visible={isCreateStickOpen}
          onOk={handleCreateStick}
          onCancel={handleCancel}
        >
          Create stick
          <div>
            <Input placeholder="Type stick name" onChange={handleName} value={name}/>
          </div>
          <div>
            <label>
              <span>Select stick background</span>
              <Input type="color" onChange={handleColor} value={color}/>
            </label>
          </div>
          <div>
            <label>
              <span>Select stick text color</span>
              <Input type="color" onChange={handleTextColor} value={textColor}/>
            </label>
          </div>
        </Modal>
        <Modal visible={isCreateCategoryOpen}
          onOk={handleCreateCategory}
          onCancel={handleCancel}
        >
          Create category
          <div>
            <Input placeholder="Type category name" onChange={handleName} value={name}/>
          </div>
        </Modal>
      </div>
    )
  }
}
