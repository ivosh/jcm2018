// eslint-disable-next-line import/prefer-default-export
export const canDrop = ({ source, destination }) => {
  if (source.typ !== destination.typ) {
    return false;
  }

  return (source.dokonceno === null || source.dokonceno === undefined) && !destination.startCislo;
};
