export const dokonceno = (id, duration) => ({
  type: 'DOKONCENO',
  id: id,
  duration: duration
});

export const naTrase = id => ({
  type: 'NA_TRASE',
  id: id
});

export const nedokonceno = id => ({
  type: 'NEDOKONCENO',
  id: id
});
