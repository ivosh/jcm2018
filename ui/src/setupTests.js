/* eslint-disable import/no-extraneous-dependencies */
/* This file is used only by jest test framework. */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-localstorage-mock';
/* eslint-enable import/no-extraneous-dependencies */

configure({ adapter: new Adapter() });
