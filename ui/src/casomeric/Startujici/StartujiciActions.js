export const dokonceno = (id, duration) => ({
  type: 'DOKONCENO',
  id,
  duration: duration.toJSON ? duration.toJSON() : duration
});

export const naTrase = id => ({
  type: 'NA_TRASE',
  id
});

export const nedokonceno = id => ({
  type: 'NEDOKONCENO',
  id
});
