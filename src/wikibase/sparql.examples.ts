const authorQid = "Q535"
export const firstWorking = `
SELECT ?work ?date WHERE {
  ?work wdt:P50 wd:${authorQid} .
  OPTIONAL {
    ?work wdt:P577 ?date .
  }
}
LIMIT 5
`

export const parentBach = `
SELECT ?child
WHERE
{
  ?child wdt:P22 wd:Q1339.
}
LIMIT 2
`
