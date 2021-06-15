import axios from "axios"

import { parentBachQuery } from "./sparql.examples"
import { rawEntityToFormattedEntity, WikibaseEntity, WikibaseQueryResult } from "./wikibase.types"
import path from "path"
import fs from "fs"
import { relative } from "node:path"

const WBK = require("wikibase-sdk")

const wikibaseApi = WBK({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql",
})
async function getSampleEntity(): Promise<void> {
  // get entity
  const res = await getSparqlResults(parentBachQuery)
  try {
    for (const item of res.results.bindings) {
      console.log(item)
      const id = entityIdFromUri(item.entity.value)
      const entity = await getEntityById(id)
      writeJsonToFile("entity_bach.json", entity)
    }
  } catch (err) {
    console.log(`Error calling wikibase `, err.response.data)
  }
}

async function getSampleSchemaItem(): Promise<void> {
  // get schema item
  const wikidataEntityId = "P2600"
  try {
    const res = await getEntityById("P2600")
    writeJsonToFile(`schema_entity_${wikidataEntityId}.json`, res)
  } catch (err) {}
}

async function getSparqlResults(sparqlQuery: string): Promise<WikibaseQueryResult> {
  const url = wikibaseApi.sparqlQuery(sparqlQuery)
  const res = await axios.get(url)
  return res.data
}

export async function getEntityById(id: string): Promise<WikibaseEntity> {
  const url = wikibaseApi.getEntities({
    ids: [id],
  })
  const res = await axios.get(url)

  const rawEntity = res?.data?.entities[id]
  const entity = rawEntityToFormattedEntity(rawEntity)
  return entity
}

function entityIdFromUri(uri: string) {
  const components = uri.split("/")
  const id = components[components.length - 1]
  return id
}

function writeJsonToFile(fileName: string, object: Object) {
  const dir = path.join(__dirname, "../data", fileName)
  fs.writeFileSync(dir, JSON.stringify(object), { encoding: "utf-8" })
  console.log(`data written to ${dir}`)
}

getSampleEntity()
getSampleSchemaItem()
