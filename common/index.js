'use strict';

const CREATE_UCAST = 'create_ucast';
const FIND_ALL_UCASTNICI = 'find_all_ucastnici';
const FIND_UCAST_BY_UCASTNIK = 'find_ucast_by_ucastnik';

const CODE_OK = 'ok';
const CODE_ALREADY_EXISTING = 'již existuje';
const CODE_NONEXISTING = 'neexistuje';
const CODE_UNPARSABLE_MESSAGE = 'unparsable message';
const CODE_UNRECOGNIZED_ACTION = 'unrecognized action';

const createUcast = ({ id, rok, udaje, prihlaska }) => ({
  action: CREATE_UCAST,
  request: { id, rok, udaje, prihlaska }
});

const findAllUcastnici = () => ({
  action: FIND_ALL_UCASTNICI,
  request: undefined
});

module.exports = {
  CREATE_UCAST,
  FIND_ALL_UCASTNICI,
  FIND_UCAST_BY_UCASTNIK,
  CODE_OK,
  CODE_ALREADY_EXISTING,
  CODE_NONEXISTING,
  CODE_UNPARSABLE_MESSAGE,
  CODE_UNRECOGNIZED_ACTION,
  createUcast,
  findAllUcastnici
};
