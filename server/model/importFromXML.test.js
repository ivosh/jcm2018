'use strict';

const util = require('util');
const db = require('../db');
const importFromXML = require('./importFromXML');
const Kategorie = require('./Kategorie');
const Rocnik = require('./Rocnik');
const Ucastnik = require('./Ucastnik');

beforeAll(async () => {
  await db.dropDatabase();
});

afterAll(async () => {
  await db.disconnect();
});

it('naimportuj ročník', async () => {
  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <jcm>
    <rocnik rok="2017">
      <datum>2017-06-10</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <startCisla>1-100</startCisla>
        <startovne predem="150" naMiste="200"/>
      </typKategorie>
    </rocnik>
  </jcm>`;
  await importFromXML(xml);

  const rocniky = await Rocnik.find({}, { _id: 0 })
    .populate('kategorie.kategorie', { _id: 0 })
    .lean();
  expect(rocniky).toMatchSnapshot();

  await Rocnik.remove({});
  await Ucastnik.remove({});
  await Kategorie.remove({});
});

it('naimportuj dva ročníky', async () => {
  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <jcm>
    <rocnik rok="2017">
      <datum>2017-06-10</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla>1-100</startCisla>
        <startovne predem="150" naMiste="200"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <kategorie minVek="16" maxVek="17" presnyVek="true"/>
        <kategorie pohlavi="muz" minVek="18" maxVek="35"/>
        <kategorie pohlavi="muz" minVek="36" maxVek="45"/>
        <kategorie pohlavi="muz" minVek="46" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="35"/>
        <kategorie pohlavi="zena" minVek="36" maxVek="45"/>
        <kategorie pohlavi="zena" minVek="46" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="150" naMiste="200"/>
      </typKategorie>
      <typKategorie typ="kolobezka">
        <kategorie pohlavi="muz" minVek="18" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="150"/>
        <startCisla>90-100</startCisla>
        <startovne predem="150" naMiste="200"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>50</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2018">
      <datum>2018-06-09</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="69"/>
        <kategorie pohlavi="muz" minVek="70" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="69"/>
        <kategorie pohlavi="zena" minVek="70" maxVek="150"/>
        <startCisla>1-100</startCisla>
        <startovne predem="200" naMiste="250"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <kategorie minVek="16" maxVek="17" presnyVek="true"/>
        <kategorie pohlavi="muz" minVek="18" maxVek="35"/>
        <kategorie pohlavi="muz" minVek="36" maxVek="45"/>
        <kategorie pohlavi="muz" minVek="46" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="35"/>
        <kategorie pohlavi="zena" minVek="36" maxVek="45"/>
        <kategorie pohlavi="zena" minVek="46" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="200" naMiste="250"/>
      </typKategorie>
      <typKategorie typ="kolobezka">
        <kategorie pohlavi="muz" minVek="18" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="150"/>
        <startCisla>90-100</startCisla>
        <startovne predem="200" naMiste="250"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="30" naMiste="30"/>
      </typKategorie>
      <ubytovaniPaSo>50</ubytovaniPaSo>
    </rocnik>
  </jcm>`;
  await importFromXML(xml);

  const rocniky = await Rocnik.find({}, { _id: 0 })
    .populate('kategorie.kategorie', { _id: 0 })
    .lean();
  expect(rocniky).toMatchSnapshot();

  const kategorie = await Kategorie.find({}, { _id: 0 }).lean();
  expect(kategorie.length).toEqual(22);

  await Rocnik.remove({});
  await Ucastnik.remove({});
  await Kategorie.remove({});
});

/*
it('naimportuj účastníka', async () => {
  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <jcm>
    <ucastnici>
      <ucastnik id="38">
        <udaje>
          <jmeno>Václav</jmeno>
          <prijmeni>Pěnička</prijmeni>
          <narozen>1954-12-10</narozen>
          <pohlavi>muz</pohlavi>
          <adresa>17. listopadu 1314</adresa>
          <mesto>Kroměříž</mesto>
          <PSC>597 01</PSC>
          <stat>Česká republika</stat>
          <klub>SK Nudle</klub>
          <telefon>678 412 745</telefon>
          <email/>
        </udaje>
        <zajem rok="2003">
          <ucast>
            <zaplaceno>95</zaplaceno>
            <startCislo>46</startCislo>
            <vykon>
              <kategorie>beh</kategorie>
              <dokonceno>true</dokonceno>
              <cas>PT5H51M59.0S</cas>
            </vykon>
          </ucast>
        </zajem>
        <zajem rok="2004">
          <ucast>
            <zaplaceno>95</zaplaceno>
            <startCislo>11</startCislo>
            <vykon>
              <kategorie>beh</kategorie>
              <dokonceno>true</dokonceno>
              <cas>PT5H34M54.0S</cas>
            </vykon>
          </ucast>
        </zajem>
        <zajem rok="2005">
          <ucast>
            <zaplaceno>95</zaplaceno>
            <startCislo>11</startCislo>
            <ubytovaniPaSo/>
            <vykon>
              <kategorie>beh</kategorie>
              <dokonceno>true</dokonceno>
              <cas>PT6H51M58.0S</cas>
            </vykon>
          </ucast>
        </zajem>
        <zajem rok="2008">
          <prihlaska>
            <datum>2008-04-01</datum>
            <kategorie>beh</kategorie>
            <ubytovaniPaSo/>
            <ubytovaniSoNe/>
          </prihlaska>
          <ucast>
            <zaplaceno>95</zaplaceno>
            <startCislo>3</startCislo>
            <ubytovaniPaSo/>
            <vykon>
              <kategorie>beh</kategorie>
              <dokonceno>true</dokonceno>
              <cas>PT6H44M45.1S</cas>
            </vykon>
          </ucast>
        </zajem>
        <zajem rok="2013">
          <prihlaska>
            <datum>2013-06-04</datum>
            <kategorie>beh</kategorie>
          </prihlaska>
          <ucast>
            <zaplaceno>130</zaplaceno>
            <startCislo>68</startCislo>
            <vykon>
              <kategorie>beh</kategorie>
              <dokonceno>true</dokonceno>
              <cas>PT7H33M46.24S</cas>
            </vykon>
          </ucast>
        </zajem>
        <zajem rok="2014">
          <prihlaska>
            <datum>2014-06-09</datum>
            <kategorie>beh</kategorie>
            <ubytovaniPaSo/>
          </prihlaska>
        </zajem>
      </ucastnik>
    </ucastnici>
  </jcm>`;
  await importFromXML(xml);

  const ucastnici = await Ucastnik.find({}, { _id: 0 }).lean();
  expect(ucastnici).toMatchSnapshot();
  console.log(util.inspect(ucastnici, false, null));
});
*/
