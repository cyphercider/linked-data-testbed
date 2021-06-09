import axios from "axios"
import { firstWorking, parentBach } from "./sparql.examples"
import { WikibaseQueryResult } from "./wikibase.types"

const WBK = require("wikibase-sdk")

const wikibaseApi = WBK({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql",
})
async function wikibase(): Promise<void> {
  try {
    const res = await getSparqlResults(parentBach)
    for (const item of res.results.bindings) {
      console.log(item)
      const id = entityIdFromUri(item.entity.value)
      await getEntityById(id)
    }
    // await getOneEntity()
  } catch (err) {
    console.log(`Error calling wikibase `, err.response.data)
  }
}

async function getSparqlResults(sparqlQuery: string): Promise<WikibaseQueryResult> {
  const url = wikibaseApi.sparqlQuery(sparqlQuery)
  const res = await axios.get(url)
  return res.data
}

export async function getEntityById(id: string): Promise<void> {
  const url = wikibaseApi.getEntities({
    ids: [id],
  })
  const res = await axios.get(url)
  console.log(res.data)
}

function entityIdFromUri(uri: string) {
  const components = uri.split("/")
  const id = components[components.length - 1]
  return id
}

wikibase()
