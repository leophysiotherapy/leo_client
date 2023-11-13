import React, { ReactNode } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache, split } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { createClient } from 'graphql-ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'

const uploadLink = createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    headers: {
        'Apollo-Require-Preflight': 'true'
    }
})


const webSocketLink = typeof window !== "undefined" ? new GraphQLWsLink(createClient({
    // url: process.env.NODE_ENV === "production" ? process.env.productions as string : process.env.websocketLocalhost as string
    url: "ws://localhost:4000/graphql"
})) : null

const splitLink = typeof window !== "undefined" && webSocketLink !== null ? split(({ query }) => {
    const definition = getMainDefinition(query)
    return (
        definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    )
}, webSocketLink, uploadLink) : uploadLink

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
})


export default function ApolloWrapper({ children }: { children: ReactNode }) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}
