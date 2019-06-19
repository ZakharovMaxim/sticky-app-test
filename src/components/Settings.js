import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Input, Button, Typography, Popconfirm } from 'antd';
import { getTags, compareTags } from '../services/TagsService';

const { Option } = Select;

const entityTypes = {
  color: {
    type: 'color',
    label: 'Set stick background color'
  },
  textColor: {
    type: 'color',
    label: 'Set stick text color'
  },
  name: {
    type: 'text',
    label: 'Set text'
  },
  tags: {
    type: 'tags',
    label: 'Tags'
  },
  category: {
    type: 'select',
    label: 'Select category'
  }, 
}

export default class Settings extends Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
  }
  getComponentByType = (key, index) => {
    const type = entityTypes[key] ? entityTypes[key].type : null;
    if (!type) return null;
    const updateListener = (value, updateTagLib) => {
      if (updateTagLib) {
        compareTags(value)
      }
      const type = this.props.item.type;
      const id = this.props.item.id;
      this.props.onUpdate(type, id, {
        [key]: value
      });
    }
    const componentKey = `item_${this.props.item.id}_${type}_${index}`;
    let component;
    switch (type) {
      case 'textColor':
      case 'color': component = <Input type="color" value={this.props.item[key]} onChange={e => updateListener(e.target.value)}/>;
      break;
      case 'text': component = <Input type="text" value={this.props.item[key]} onChange={e => updateListener(e.target.value)}/>;
      break;
      case 'tags': {
        const tagsLib = getTags();
        const tags = tagsLib.map((tag, i) => <Option key={i} value={tag}>{tag}</Option>);
        component = <Select mode="tags" className="w-100" value={this.props.item[key]} onChange={(v) => updateListener(v, true)}>
          {tags}
        </Select>;
        break;
      }
      case 'select': {
        const categories = this.props.categories.map((category) => <Option key={category.id} value={category.id}>{category.name}</Option>);
        component = <Select className="w-100" value={this.props.item[key]} onChange={(v) => updateListener(v)}>
          {categories}
        </Select>;
        break;
      }
      default: return null;
    }
    if (component) {
      return <div key={componentKey} className="form-group">
        {entityTypes[key].label || ''}
        {component}
      </div>
    }
  }
  confirmDelete = () => {
    this.props.onDelete(this.props.item.type, this.props.item.id);
  }
  render() {
    const { confirmDelete } = this;
    const { item } = this.props;
    return (
      <div>
        <Typography.Title className="section-title">Settings</Typography.Title>
        {Object.keys(item).map((key, i) => this.getComponentByType(key, i)).filter(v => !!v)}
        <Popconfirm
          title="Are you sure delete this item?"
          onConfirm={confirmDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete this item</Button>
        </Popconfirm>
      </div>
    )
  }
}
