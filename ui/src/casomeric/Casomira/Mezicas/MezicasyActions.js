// eslint-disable-next-line import/prefer-default-export
export const canDrop = ({ dokonceno, sourceTyp, destinationTyp }) => {
  if (sourceTyp !== destinationTyp) {
    return false;
  }

  return dokonceno === null || dokonceno === undefined;
};
