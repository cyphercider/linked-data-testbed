"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wikidata_entity_lookup_1 = require("./wikidata-entity-lookup");
const query = {
    entity: "abraham lincoln",
};
async function getdata() {
    const data = await wikidata_entity_lookup_1.findPerson(query);
    console.log(`data is`, data);
}
getdata();
