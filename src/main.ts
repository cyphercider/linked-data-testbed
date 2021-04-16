import wbk from "wikidata-sdk"
import axios from "axios"
import { SearchEntitiesResult } from "./types"
import fs from "fs"
// import path from 'path'
// const path = require("path")
import path from "path"
// import { findPerson, getPersonLookupURI } from "./wikidata-entity-lookup"
// const query = {
//   entity: "abraham lincoln",
// }

async function getdata(): Promise<void> {
  const searchUri = wbk.searchEntities("Ingmar Bergman")

  console.log(searchUri)

  const res = (await axios.get(searchUri)).data.search as SearchEntitiesResult[]
  console.log(res)

  console.log(`****************************`)

  const entityUri = wbk.getEntities({
    ids: [res[0].id],
    languages: ["en"], // returns all languages if not specified
    props: [], // returns all data if not specified
  })

  const entity = (await axios.get(entityUri)).data

  const dir = path.join(__dirname, "..", "data", "entity.json")
  fs.writeFileSync(dir, JSON.stringify(entity))

  // const uri = getPersonLookupURI(query)
  // console.log(`uri is`)
  // console.log(uri)

  // const data = await findPerson(query)

  // console.log(`data is`, data)
}

getdata()
