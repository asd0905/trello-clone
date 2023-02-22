import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function App() {
  const onDragEnd = () => {

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId='1'>
          {() =>
            <ul>
              <Draggable draggableId='first' index={0}>
                {() => <li>000000000</li>}
              </Draggable>
              <Draggable draggableId='second' index={1}>
                {() => <li>111111111</li>}
              </Draggable>
            </ul>
          }
        </Droppable>
      </div>
    </ DragDropContext>
  );
}

export default App;
