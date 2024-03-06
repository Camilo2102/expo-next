'use client';

import {ChakraProvider} from "@chakra-ui/react";
import {ApolloProvider} from "@apollo/client";

import apolloClient from '../../lib/apollo'
import { ReloadProvider } from "../context/taskContext";

export default function MainProvider({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider>
            <ApolloProvider client={apolloClient}>
                <ReloadProvider>
                    {children}
                </ReloadProvider>
            </ApolloProvider>
        </ChakraProvider>
    );
}