const authorQid = "Q535"
export const firstWorking = `
SELECT ?entity ?date ?itemLabel WHERE {
  ?entity wdt:P50 wd:${authorQid} .
  OPTIONAL {
    ?entity wdt:P577 ?date .
  }
}
LIMIT 5
`

export const parentBach = `
SELECT ?entity 
WHERE
{
  ?entity wdt:P22 wd:Q1339.
}
LIMIT 1
`
