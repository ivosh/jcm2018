import { DragSource } from 'react-dnd';
import { DragTypes } from '../../../constants';
import StartovniCislo from './StartovniCislo';

const dragSource = {
  beginDrag: ({ id, startCislo, dokonceno, cas, typ }) => ({ id, startCislo, dokonceno, cas, typ }),
};

const collectDrag = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource(DragTypes.STARTOVNI_CISLO, dragSource, collectDrag)(StartovniCislo);
