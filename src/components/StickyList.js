import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Typography } from 'antd';
import Stick from './Stick';

export default function StickyList(props) {
  const addedToCategory = [];
  props.categories.forEach(cat => {
    cat.items = [];
    props.items.forEach(item => {
      if (item.category === cat.id) {
        cat.items.push(item);
        addedToCategory.push(item.id);
      }
    })
  })
  return (
    <div>
      {props.categories.map(cat => 
        <div key={cat.id}>
          <Typography.Title onClick={() => {props.onSelect(cat.id, 'categories')}}>{cat.name}</Typography.Title>
          {cat.items.map(item => <Stick item={item} key={item.id} onSelect={props.onSelect}/>)}
          <Divider />
        </div>
      )}
      {props.items.filter(item => addedToCategory.indexOf(item.id) === -1).map(item => <Stick item={item} key={item.id} onSelect={props.onSelect}/>)}
    </div>
  )
}
StickyList.propTypes = {
  items: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired
}