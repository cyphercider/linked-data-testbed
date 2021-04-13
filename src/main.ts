import { findPerson } from "./wikidata-entity-lookup";
const query = {
  entity: "abraham lincoln",
};

async function getdata(): Promise<void> {
  const data = await findPerson(query);

  console.log(`data is`, data);
}

getdata();
