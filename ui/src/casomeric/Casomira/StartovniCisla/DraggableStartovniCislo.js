import { DragSource } from 'react-dnd';
import { DragTypes } from '../../../constants';
import StartovniCislo from './StartovniCislo';

const dragSource = {
  beginDrag: ({ id, startCislo, dokonceno, typ }) => ({ id, startCislo, dokonceno, typ })
};

const collectDrag = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

export default DragSource(DragTypes.STARTOVNI_CISLO, dragSource, collectDrag)(StartovniCislo);
