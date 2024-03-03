'use client'

import { gql, useQuery } from "@apollo/client";

const getOneQuery = gql`
  query GetTask($id: ID!) {
    task(where: { id: $id }) {
      id
      title
      description
    }
  }
`

export default function GetOneTask({id}: {id: string}){
    const {data, loading, error} = useQuery(getOneQuery, {
        variables: {id}
    });

    if (loading) return <p>Loading...</p>
    if (error) return <p>Oh no... {error.message}</p>

    return (
        <h2>{data.id}</h2>
    )
}