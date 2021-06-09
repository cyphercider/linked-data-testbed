import axios from "axios"

import { parentBach } from "./sparql.examples"
import { rawEntityToFormattedEntity, WikibaseEntity, WikibaseQueryResult } from "./wikibase.types"

const WBK = require("wikibase-sdk")

const wikibaseApi = WBK({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql",
})
async function tryEntity(): Promise<void> {
  // get entity
  try {
    const res = await getSparqlResults(parentBach)
    for (const item of res.results.bindings) {
      console.log(item)
      const id = entityIdFromUri(item.entity.value)
      const entity = await getEntityById(id)
      console.log(entity)
    }
  } catch (err) {
    console.log(`Error calling wikibase `, err.response.data)
  }
}

async function trySchemaItem(): Promise<void> {
  // get schema item
  try {
    const res = await getEntityById("P2600")
    console.log(`schema item`, res)
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

// tryEntity()
trySchemaItem()
