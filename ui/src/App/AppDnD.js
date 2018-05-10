import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import App from './App';

// :TODO: When decorators are supported by babel for ES7, do: @DragDropContext(HTML5Backend)
export default DragDropContext(HTML5Backend)(App);
