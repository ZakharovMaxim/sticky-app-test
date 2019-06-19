import React from 'react';
import { Card, Tag } from 'antd';

export default function Stick(props) {
  const { onSelect } = props;
  const { name, color = '#fff', tags = [], textColor = '#000', type, id } = props.item;
  const onClick = () => {
    onSelect(id, type)
  }
  return (
    <Card style={{'background': color, 'color': textColor}} className="stick" size="small" onClick={onClick}>
      { name }
      <div className="stick-tags">
      {
        tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)
      }
        
      </div>
    </Card>
  )
}
