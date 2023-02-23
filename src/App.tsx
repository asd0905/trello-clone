import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function App() {
  const onDragEnd = () => {

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId='one'>
          {(provided) =>
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId='first' index={0}>
                {(provided) =>
                    <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <span {...provided.dragHandleProps}>:D</span>
                        000000000
                    </li>
                }
              </Draggable>
              <Draggable draggableId='second' index={1}>
                {(provided) =>
                    <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <span {...provided.dragHandleProps}>:D</span>
                        111111111
                    </li>
                }
              </Draggable>
            </ul>
          }
        </Droppable>
      </div>
    </ DragDropContext>
  );
}

export default App;
