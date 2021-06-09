import axios from "axios"
import { parentBach } from "./sparql.examples"
import { WikibaseQueryResult } from "./wikibase.types"

const WBK = require("wikibase-sdk")

const wikibaseApi = WBK({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql",
})
async function wikibase(): Promise<void> {
  try {
    const res = await getWikibaseResults(parentBach)
    for (const item of res.results.bindings) {
      console.log(item)
    }
  } catch (err) {
    console.log(`Error calling wikibase `, err.response.data)
  }
}

async function getWikibaseResults(sparqlQuery: string): Promise<WikibaseQueryResult> {
  const url = wikibaseApi.sparqlQuery(sparqlQuery)
  const res = await axios.get(url)
  return res.data
}

wikibase()
