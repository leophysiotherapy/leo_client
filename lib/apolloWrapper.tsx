import React, { ReactNode } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'



export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache()
})

export default function ApolloWrapper({ children }: { children: ReactNode }) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}
