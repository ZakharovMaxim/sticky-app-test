import React from 'react';
import { Card } from 'antd';
import StickyList from './StickyList';
import Settings from './Settings';

export default class App extends React.Component {
  state = {
    activeEntity: null
  }
  click = () => {
    this.setState(state => {
      return {
        activeEntity: !state.activeEntity
      }
    })
  }
  render() {
    const { activeEntity } = this.state;
    const containerClassName = "container" + (activeEntity ? " container--active" : "");

    return (
      <div className={containerClassName} onClick={this.click}>
        <div className="content">
          <main>
            <Card className="h-100">
              <StickyList />
            </Card>
          </main>
          <aside>
            <Card className="h-100">
              <Settings />
            </Card>
          </aside>
        </div>
      </div>
    )
  }
}