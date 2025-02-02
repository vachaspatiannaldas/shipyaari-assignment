import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: {
      title: 'To Do',
      items: [
        { id: '1', content: 'Task 1' },
        { id: '2', content: 'Task 2' },
      ]
    },
    inProgress: {
      title: 'In Progress',
      items: [
        { id: '3', content: 'Task 3' }
      ]
    },
    done: {
      title: 'Done',
      items: [
        { id: '4', content: 'Task 4' }
      ]
    }
  });

  useEffect(() => {
    const savedColumns = localStorage.getItem('kanbanColumns');
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kanbanColumns', JSON.stringify(columns));
  }, [columns]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const newItems = [...column.items];
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: newItems
        }
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Kanban Board</h2>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        <div className="row">
          {Object.entries(columns).map(([columnId, column]) => (
            <div  className="col-md-4" key={columnId}>
              <div className="card mb-3">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">{column.title}</h5>
                </div>
                <Droppable droppableId={columnId}  >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="card-body"
                      style={{
                        minHeight: '400px',
                        backgroundColor: snapshot.isDraggingOver ? '#f8f9fa' : 'white',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      {column.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card mb-2"
                              style={{
                                userSelect: 'none',
                                padding: 16,
                                margin: '0 0 8px 0',
                                backgroundColor: snapshot.isDragging ? '#e9ecef' : 'white',
                                boxShadow: snapshot.isDragging ? '0px 3px 5px rgba(0,0,0,0.2)' : 'none',
                                ...provided.draggableProps.style,
                              }}
                            >
                              <div className="card-body p-2">{item.content}</div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;


