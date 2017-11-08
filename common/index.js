'use strict';

const FIND_ALL_UCASTNICI = 'find_all_ucastnici';
const FIND_UCAST_BY_UCASTNIK = 'find_ucast_by_ucastnik';
const CREATE_UCAST = 'create_ucast';

const CODE_OK = 'ok';
const CODE_UNRECOGNIZED_ACTION = 'unrecognized action';
const CODE_UNPARSABLE_MESSAGE = 'unparsable message';
const CODE_ALREADY_EXISTING = 'již existuje';
const CODE_NONEXISTING = 'neexistuje';

const findAllUcastnici = () => ({
  action: FIND_ALL_UCASTNICI,
  request: undefined
});

const createUcast = ({ id, rok, udaje, prihlaska }) => ({
  action: CREATE_UCAST,
  request: { id, rok, udaje, prihlaska }
});

module.exports = {
  FIND_ALL_UCASTNICI,
  FIND_UCAST_BY_UCASTNIK,
  CREATE_UCAST,
  CODE_OK,
  CODE_UNRECOGNIZED_ACTION,
  CODE_UNPARSABLE_MESSAGE,
  CODE_ALREADY_EXISTING,
  CODE_NONEXISTING,
  findAllUcastnici,
  createUcast
};
