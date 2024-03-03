'use client';

import {ChakraProvider} from "@chakra-ui/react";
import {ApolloProvider} from "@apollo/client";

import apolloClient from '../lib/apollo'

export default function MainProvider({ children }: { children: React.ReactNode }) {
    console.log(apolloClient)

    return (
        <ChakraProvider>
            <ApolloProvider client={apolloClient}>
                {children}
            </ApolloProvider>
        </ChakraProvider>
    );
}