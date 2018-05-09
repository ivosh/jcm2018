import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import StartovniCisla from './StartovniCisla';

// :TODO: When decorators are supported by babel for ES7, do: @DragDropContext(HTML5Backend)
export default DragDropContext(HTML5Backend)(StartovniCisla);
