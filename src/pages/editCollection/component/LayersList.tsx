import { ILayer } from 'api/collection';
import React from 'react';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import DraggableListItem from './DraggableLayer';

// export interface ILayer {
//   name: string;
// }
export type DraggableListProps = {
  items?: ILayer[];
  onDragEnd: OnDragEndResponder;
  setLayerId: (id: number) => void;
  layerId: number;
};

const DraggableList = React.memo(({ items, onDragEnd, setLayerId, layerId }: DraggableListProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items &&
              items.map((item, index) => (
                <DraggableListItem
                  item={item}
                  index={index}
                  key={item.name}
                  setLayerId={setLayerId}
                  layerId={layerId}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default DraggableList;
