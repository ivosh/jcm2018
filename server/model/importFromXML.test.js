'use strict';

const db = require('../db');
const importFromXML = require('./importFromXML');
const Kategorie = require('./Kategorie/Kategorie');
const Rocnik = require('./Rocnik/Rocnik');
const Ucastnik = require('./Ucastnik/Ucastnik');

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
  await importFromXML({ data: xml });

  const rocniky = await Rocnik.find({}, { _id: 0 })
    .populate('kategorie.kategorie', { _id: 0 })
    .lean();
  expect(rocniky).toMatchSnapshot();

  await Rocnik.collection.drop();
  await Kategorie.collection.drop();
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
        <startCisla>40-100 24 30 35 37-39</startCisla>
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
      <typKategorie typ="maraton">
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
        <startCisla barva="cervena">1-100</startCisla>
        <startovne predem="200" naMiste="250"/>
      </typKategorie>
      <typKategorie typ="půlmaraton">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla barva="cerna">1-100</startCisla>
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
        <startCisla>100-90</startCisla>
        <startovne predem="200" naMiste="250"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="30" naMiste="30"/>
      </typKategorie>
      <ubytovaniPaSo>50</ubytovaniPaSo>
    </rocnik>
  </jcm>`;
  await importFromXML({ data: xml });

  const rocniky = await Rocnik.find({}, { _id: 0 })
    .populate('kategorie.kategorie', { _id: 0 })
    .lean();
  expect(rocniky).toMatchSnapshot();

  const kategorie = await Kategorie.find({}, { _id: 0 }).lean();
  expect(kategorie.length).toEqual(30);

  await Rocnik.collection.drop();
  await Kategorie.collection.drop();
});

it('naimportuj všechny ročníky', async () => {
  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <jcm>
    <rocnik rok="2001">
      <datum>2001-06-09</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="30"/>
        <kategorie pohlavi="muz" minVek="31" maxVek="40"/>
        <kategorie pohlavi="muz" minVek="41" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="30"/>
        <kategorie pohlavi="zena" minVek="31" maxVek="40"/>
        <kategorie pohlavi="zena" minVek="41" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
    </rocnik>
    <rocnik rok="2002">
      <datum>2002-06-08</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="30"/>
        <kategorie pohlavi="muz" minVek="31" maxVek="40"/>
        <kategorie pohlavi="muz" minVek="41" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="30"/>
        <kategorie pohlavi="zena" minVek="31" maxVek="40"/>
        <kategorie pohlavi="zena" minVek="41" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <startCisla>51-200</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
    </rocnik>
    <rocnik rok="2003">
      <datum>2003-06-07</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="30"/>
        <kategorie pohlavi="muz" minVek="31" maxVek="40"/>
        <kategorie pohlavi="muz" minVek="41" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="30"/>
        <kategorie pohlavi="zena" minVek="31" maxVek="40"/>
        <kategorie pohlavi="zena" minVek="41" maxVek="150"/>
        <startCisla>41-190</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <startCisla>71-220</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
    </rocnik>
    <rocnik rok="2004">
      <datum>2004-06-05</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="30"/>
        <kategorie pohlavi="muz" minVek="31" maxVek="40"/>
        <kategorie pohlavi="muz" minVek="41" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="30"/>
        <kategorie pohlavi="zena" minVek="31" maxVek="40"/>
        <kategorie pohlavi="zena" minVek="41" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <startCisla>41-190</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
    </rocnik>
    <rocnik rok="2005">
      <datum>2005-06-04</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="30"/>
        <kategorie pohlavi="muz" minVek="31" maxVek="40"/>
        <kategorie pohlavi="muz" minVek="41" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="30"/>
        <kategorie pohlavi="zena" minVek="31" maxVek="40"/>
        <kategorie pohlavi="zena" minVek="41" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <kategorie pohlavi="muz" minVek="18" maxVek="35"/>
        <kategorie pohlavi="muz" minVek="36" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="35"/>
        <kategorie pohlavi="zena" minVek="36" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>30</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2006">
      <datum>2006-06-10</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="110"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <kategorie pohlavi="muz" minVek="18" maxVek="35"/>
        <kategorie pohlavi="muz" minVek="36" maxVek="45"/>
        <kategorie pohlavi="muz" minVek="46" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="35"/>
        <kategorie pohlavi="zena" minVek="36" maxVek="45"/>
        <kategorie pohlavi="zena" minVek="46" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="110"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>30</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2007">
      <datum>2007-06-09</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla>51-200</startCisla>
        <startovne predem="95" naMiste="110"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <kategorie pohlavi="muz" minVek="18" maxVek="35"/>
        <kategorie pohlavi="muz" minVek="36" maxVek="45"/>
        <kategorie pohlavi="muz" minVek="46" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="35"/>
        <kategorie pohlavi="zena" minVek="36" maxVek="45"/>
        <kategorie pohlavi="zena" minVek="46" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="110"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>40</ubytovaniPaSo>
      <ubytovaniSoNe>40</ubytovaniSoNe>
    </rocnik>
    <rocnik rok="2008">
      <datum>2008-06-07</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="110"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <kategorie pohlavi="muz" minVek="18" maxVek="35"/>
        <kategorie pohlavi="muz" minVek="36" maxVek="45"/>
        <kategorie pohlavi="muz" minVek="46" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="35"/>
        <kategorie pohlavi="zena" minVek="36" maxVek="45"/>
        <kategorie pohlavi="zena" minVek="46" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="110"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>30</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2009">
      <datum>2009-06-13</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla>45-194</startCisla>
        <startovne predem="120" naMiste="140"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <kategorie pohlavi="muz" minVek="18" maxVek="35"/>
        <kategorie pohlavi="muz" minVek="36" maxVek="45"/>
        <kategorie pohlavi="muz" minVek="46" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="35"/>
        <kategorie pohlavi="zena" minVek="36" maxVek="45"/>
        <kategorie pohlavi="zena" minVek="46" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="120" naMiste="140"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>30</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2010">
      <datum>2010-06-12</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="120" naMiste="140"/>
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
        <startovne predem="120" naMiste="140"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>30</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2011">
      <datum>2011-06-11</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla>51-200</startCisla>
        <startovne predem="120" naMiste="140"/>
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
        <startovne predem="120" naMiste="140"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>30</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2012">
      <datum>2012-06-09</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="120" naMiste="140"/>
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
        <startovne predem="120" naMiste="140"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>30</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2013">
      <datum>2013-06-08</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla>60-100 40-49 20 24-25 34 21-23 26-33 35-39 50-59 160 195-196 199</startCisla>
        <startovne predem="130" naMiste="150"/>
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
        <startovne predem="130" naMiste="150"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>30</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2014">
      <datum>2014-06-14</datum>
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
        <startovne predem="130" naMiste="150"/>
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
        <startovne predem="130" naMiste="150"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>50</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2015">
      <datum>2015-06-13</datum>
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
        <startovne predem="130" naMiste="150"/>
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
        <startovne predem="130" naMiste="150"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>50</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2016">
      <datum>2016-06-11</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla>40-100 24 30 35 37-39</startCisla>
        <startovne predem="140" naMiste="190"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <kategorie minVek="16" maxVek="17" presnyVek="true"/>
        <kategorie pohlavi="muz" minVek="18" maxVek="35"/>
        <kategorie pohlavi="muz" minVek="36" maxVek="45"/>
        <kategorie pohlavi="muz" minVek="46" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="35"/>
        <kategorie pohlavi="zena" minVek="36" maxVek="45"/>
        <kategorie pohlavi="zena" minVek="46" maxVek="150"/>
        <startCisla>1-140</startCisla>
        <startovne predem="140" naMiste="190"/>
      </typKategorie>
      <typKategorie typ="kolobezka">
        <kategorie pohlavi="muz" minVek="18" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="150"/>
        <startCisla>100-102</startCisla>
        <startovne predem="140" naMiste="190"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>50</ubytovaniPaSo>
    </rocnik>
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
      <typKategorie typ="maraton">
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
        <startCisla barva="cervena">1-100</startCisla>
        <startovne predem="200" naMiste="250"/>
      </typKategorie>
      <typKategorie typ="půlmaraton">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla barva="cerna">1-100</startCisla>
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
        <startCisla>100-90</startCisla>
        <startovne predem="200" naMiste="250"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="30" naMiste="30"/>
      </typKategorie>
      <ubytovaniPaSo>50</ubytovaniPaSo>
    </rocnik>
  </jcm>`;
  await importFromXML({ data: xml });

  const rocniky = await Rocnik.find({}, { _id: 0 })
    .populate('kategorie.kategorie', { _id: 0 })
    .lean();
  expect(rocniky).toMatchSnapshot();

  // Try to find duplicit kategorie.
  const kategorie = await Kategorie.find({}, { _id: 0 }).lean();
  kategorie.forEach(element => {
    const elements = kategorie.reduce((a, e) => {
      if (JSON.stringify(element) === JSON.stringify(e)) {
        a.push(e);
      }
      return a;
    }, []);
    expect(elements).toHaveLength(1);
  });
  expect(kategorie.length).toEqual(39);

  await Rocnik.collection.drop();
  await Kategorie.collection.drop();
});

it('naimportuj účastníka', async () => {
  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <jcm>
    <rocnik rok="2003">
      <datum>2003-06-07</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz"/>
        <kategorie pohlavi="zena"/>
        <startCisla>41-190</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <startCisla>71-220</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
    </rocnik>
    <rocnik rok="2004">
      <datum>2004-06-05</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="30"/>
        <kategorie pohlavi="muz" minVek="31" maxVek="40"/>
        <kategorie pohlavi="muz" minVek="41" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="30"/>
        <kategorie pohlavi="zena" minVek="31" maxVek="40"/>
        <kategorie pohlavi="zena" minVek="41" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <startCisla>41-190</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
    </rocnik>
    <rocnik rok="2005">
      <datum>2005-06-04</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="30"/>
        <kategorie pohlavi="muz" minVek="31" maxVek="40"/>
        <kategorie pohlavi="muz" minVek="41" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="30"/>
        <kategorie pohlavi="zena" minVek="31" maxVek="40"/>
        <kategorie pohlavi="zena" minVek="41" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <kategorie pohlavi="muz" minVek="18" maxVek="35"/>
        <kategorie pohlavi="muz" minVek="36" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="35"/>
        <kategorie pohlavi="zena" minVek="36" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="95"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>30</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2008">
      <datum>2008-06-07</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="110"/>
      </typKategorie>
      <typKategorie typ="cyklo">
        <kategorie pohlavi="muz" minVek="18" maxVek="35"/>
        <kategorie pohlavi="muz" minVek="36" maxVek="45"/>
        <kategorie pohlavi="muz" minVek="46" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="35"/>
        <kategorie pohlavi="zena" minVek="36" maxVek="45"/>
        <kategorie pohlavi="zena" minVek="46" maxVek="150"/>
        <startCisla>1-150</startCisla>
        <startovne predem="95" naMiste="110"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>30</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2013">
      <datum>2013-06-08</datum>
      <typKategorie typ="beh">
        <kategorie pohlavi="muz" minVek="18" maxVek="39"/>
        <kategorie pohlavi="muz" minVek="40" maxVek="49"/>
        <kategorie pohlavi="muz" minVek="50" maxVek="59"/>
        <kategorie pohlavi="muz" minVek="60" maxVek="150"/>
        <kategorie pohlavi="zena" minVek="18" maxVek="39"/>
        <kategorie pohlavi="zena" minVek="40" maxVek="49"/>
        <kategorie pohlavi="zena" minVek="50" maxVek="59"/>
        <kategorie pohlavi="zena" minVek="60" maxVek="150"/>
        <startCisla>60-100 40-49 20 24-25 34 21-23 26-33 35-39 50-59 160 195-196 199</startCisla>
        <startovne predem="130" naMiste="150"/>
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
        <startovne predem="130" naMiste="150"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>30</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2014">
      <datum>2014-06-14</datum>
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
        <startovne predem="130" naMiste="150"/>
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
        <startovne predem="130" naMiste="150"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>50</ubytovaniPaSo>
    </rocnik>
    <rocnik rok="2015">
      <datum>2015-06-13</datum>
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
        <startovne predem="130" naMiste="150"/>
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
        <startovne predem="130" naMiste="150"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>50</ubytovaniPaSo>
    </rocnik>
    <ucastnici>
      <ucastnik id="38">
        <udaje>
          <jmeno>Václav</jmeno>
          <prijmeni>Pěnička</prijmeni>
          <narozen>1974-12-10</narozen>
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
            <ubytovaniSoNe/>
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
            <zaplaceno>0</zaplaceno>
            <startCislo>3</startCislo>
            <ubytovaniPaSo/>
            <vykon>
              <kategorie>beh</kategorie>
              <dokonceno>true</dokonceno>
              <cas>PT6H44M45.1S</cas>
            </vykon>
            <sponzor>manželka pořadatele</sponzor>
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
            <kategorie>pesi</kategorie>
            <ubytovaniPaSo/>
          </prihlaska>
        </zajem>
        <zajem rok="2015">
          <prihlaska>
            <datum>2015-03-02</datum>
            <kategorie>pesi</kategorie>
            <ubytovaniPaSo/>
          </prihlaska>
          <ucast>
            <zaplaceno>150</zaplaceno>
            <startCislo>34</startCislo>
            <ubytovaniPaSo/>
            <vykon>
              <kategorie>beh</kategorie>
              <dokonceno>false</dokonceno>
            </vykon>
          </ucast>
          <poznamka>pravděpodobně poslední běh</poznamka>
        </zajem>
      </ucastnik>
    </ucastnici>
  </jcm>`;
  await importFromXML({ data: xml });

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie', { _id: 0 })
    .populate('ucasti.vykon.kategorie', { _id: 0 })
    .lean();
  expect(ucastnici).toMatchSnapshot();
});

it('naimportuj dva účastníky', async () => {
  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <jcm>
    <rocnik rok="2015">
      <datum>2015-06-13</datum>
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
        <startovne predem="130" naMiste="150"/>
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
        <startovne predem="130" naMiste="150"/>
      </typKategorie>
      <typKategorie typ="pesi">
        <startovne predem="25" naMiste="25"/>
      </typKategorie>
      <ubytovaniPaSo>50</ubytovaniPaSo>
    </rocnik>
    <ucastnici>
      <ucastnik id="38">
        <udaje>
          <jmeno>Václav</jmeno>
          <prijmeni>Pěnička</prijmeni>
          <narozen>1974-12-10</narozen>
          <pohlavi>muz</pohlavi>
          <adresa>17. listopadu 1314</adresa>
          <mesto>Kroměříž</mesto>
          <PSC>597 01</PSC>
          <stat>Česká republika</stat>
          <klub>SK Nudle</klub>
          <telefon>678 412 745</telefon>
          <email/>
        </udaje>
        <zajem rok="2015">
          <prihlaska>
            <datum>2015-03-02</datum>
            <kategorie>pesi</kategorie>
            <ubytovaniPaSo/>
          </prihlaska>
          <ucast>
            <zaplaceno>150</zaplaceno>
            <startCislo>34</startCislo>
            <ubytovaniPaSo/>
            <vykon>
              <kategorie>beh</kategorie>
              <dokonceno>false</dokonceno>
            </vykon>
          </ucast>
          <poznamka>pravděpodobně poslední běh</poznamka>
        </zajem>
      </ucastnik>
      <ucastnik id="54">
        <udaje>
          <jmeno>Karel</jmeno>
          <prijmeni>Mašle</prijmeni>
          <narozen>1979-2-4</narozen>
          <pohlavi>zena</pohlavi>
          <mesto>Chrášťany</mesto>
          <PSC>356 01</PSC>
          <stat>Česká republika</stat>
          <klub>KB Kudla</klub>
          <email>sk@s.cz</email>
        </udaje>
        <zajem rok="2015">
          <ucast>
            <zaplaceno>200</zaplaceno>
            <vykon>
              <kategorie>pesi</kategorie>
              <dokonceno>true</dokonceno>
            </vykon>
          </ucast>
        </zajem>
      </ucastnik>
    </ucastnici>
  </jcm>`;
  await importFromXML({ data: xml });

  const ucastnici = await Ucastnik.find({}, { _id: 0 })
    .populate('ucasti.prihlaska.kategorie', { _id: 0 })
    .populate('ucasti.vykon.kategorie', { _id: 0 })
    .lean();
  ucastnici.sort((a, b) => a.ucasti[0].udaje.prijmeni.localeCompare(b.ucasti[0].udaje.prijmeni));
  expect(ucastnici).toMatchSnapshot();
});
