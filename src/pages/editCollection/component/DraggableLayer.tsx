import { List, ListItemButton, useTheme } from '@mui/material';
import { ILayer } from 'api/collection';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

// const useStyles = makeStyles({
//   draggingListItem: {
//     background: 'rgb(235,235,235)',
//   },
// });

export type DraggableListItemProps = {
  item: ILayer;
  index: number;
  setLayerId: (id: number) => void;
  layerId: number;
};

const DraggableListItem = ({ item, index, setLayerId, layerId }: DraggableListItemProps) => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const classes = useStyles();

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    // setSelectedIndex(index);
    setLayerId(item?.id);
    console.log(selectedIndex, layerId);
  };
  return (
    <Draggable draggableId={item.name} index={index}>
      {(provided, snapshot) => (
        <List
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // className={snapshot.isDragging ? classes.draggingListItem : ''}
        >
          <ListItemButton
            sx={{
              border: theme.palette.secondary.dark,
              backgroundColor: theme.palette.primary.dark,
              width: '100%',
              p: 1,
              borderRadius: 2,
              height: 50,
            }}
            selected={selectedIndex === index + 1}
            onClick={(event) => handleListItemClick(event, index)}
          >
            {item?.name}
          </ListItemButton>
        </List>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
