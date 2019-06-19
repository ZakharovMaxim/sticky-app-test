import React from 'react';
import { Card, Icon } from 'antd';
import StickyList from './StickyList';
import NewItem from './NewItem';
import Settings from './Settings';
import { setCategories, getCategories } from '../services/CategoriesService';
import { setSticks, getSticks } from '../services/SticksService';
export default class App extends React.Component {

  state = {
    activeEntity: null,
    items: [],
    categories: []
  }
  componentDidMount() {
    const categories = getCategories();
    const items = getSticks();
    this.setState({
      items,
      categories
    })
  }
  addItem = (item) => {
    const formattedItem = {
      ...item,
      id: Math.random()
    }
    this.setState(state => ({
      [item.type]: [...state[item.type], formattedItem]
    }), () => {
      this.updateDB(item.type)
    });
  }
  updateDB = (type) => {
    if (type === 'categories') {
      setCategories(this.state[type]);
    } else if (type === 'items') {
      setSticks(this.state[type]);
    }
  }
  deleteItem = (type, id) => {
    this.setState(state => {
      const newItemsList = state[type].filter(item => item.id !== id);
      return {
        [type]: newItemsList,
        activeEntity: newItemsList[0] || null
      }
    }, () => {
      this.updateDB(type)
    });
  }
  updateItem = (type, id, data) => {
    this.setState(state => {
      const itemIndex = state[type].findIndex(item => item.id === id);
      if (itemIndex === -1) return;

      const newItem = {
        ...state[type][itemIndex],
        ...data
      };
      const items = [...state[type].slice(0, itemIndex), newItem, ...state[type].slice(itemIndex + 1)];
      return {
        [type]: items,
        activeEntity: newItem
      };
    }, () => {
      this.updateDB(type)
    });
  }
  selectItem = (id, type) => {
    const item = this.state[type].find(item => item.id === id);
    if (!item) return;

    this.setState({
      activeEntity: item
    })
  }
  unSelectItem = () => {
    this.setState({
      activeEntity: null
    })
  }
  render() {
    const { selectItem, addItem, updateItem, deleteItem, unSelectItem } = this;
    const { activeEntity, items, categories } = this.state;
    const containerClassName = "container" + (activeEntity ? " container--active" : "");

    return (
      <div className={containerClassName}>
        <div className="content">
          <main>
            <Card className="h-100">
              <NewItem handleCreate={addItem}/>
              <StickyList items={items} onSelect={selectItem} categories={categories} />
            </Card>
          </main>
          <aside className="sidebar">
            <div className="sidebar-close" onClick={unSelectItem}>
              <Icon type="close-circle" />
            </div>
            <Card className="h-100">
            { activeEntity && <Settings item={activeEntity} onUpdate={updateItem} onDelete={deleteItem} categories={categories}/>}
            </Card>
          </aside>
        </div>
      </div>
    )
  }
}