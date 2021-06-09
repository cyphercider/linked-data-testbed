export interface WikibaseQueryResult {
  head: { vars: string[] }
  results: { bindings: any[] }
}

export interface GetEntitiesByIdResponse {
  entities: {
    [entityId: string]: any
  }
}

export interface WikibaseEntity {
  id: string
  enLabel: string
  enDescription: string
  enAliases: any[]
  outboundRelations: {
    [relationId: string]: any[]
  }
}

export function rawEntityToFormattedEntity(input: any): WikibaseEntity {
  const id = input.id
  const enLabel = input.labels?.en?.value || "[no label found]"
  const enDescription = input.descriptions?.en?.value || "[no description found]"
  const enAliases = input.aliases?.en || []
  const outboundRelations = input.claims || {}
  return {
    id,
    enLabel,
    enDescription,
    enAliases,
    outboundRelations,
  }
}
