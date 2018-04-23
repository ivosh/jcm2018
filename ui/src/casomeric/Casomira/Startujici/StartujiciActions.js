export const startujiciDokonceno = (id, duration) => ({
  type: 'STARTUJICI_DOKONCENO',
  id,
  duration: duration.toJSON ? duration.toJSON() : duration
});

export const startujiciNaTrase = id => ({
  type: 'STARTUJICI_NA_TRASE',
  id
});

export const startujiciNedokonceno = id => ({
  type: 'STARTUJICI_NEDOKONCENO',
  id
});
