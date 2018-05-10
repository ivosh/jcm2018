import { findDokonceno } from '../../../Util';

export const canDrop = ({ dokonceno, name, sourceTyp, destinationTyp }) => {
  if (sourceTyp !== destinationTyp) {
    return false;
  }

  const sourceDokonceno = findDokonceno(dokonceno);
  if (sourceDokonceno === name || name === 'dokonceno') {
    return false;
  }

  return true;
};
