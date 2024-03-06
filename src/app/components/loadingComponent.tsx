import { CircularProgress, Flex } from "@chakra-ui/react";

export default function LoadingComponent(){
    return(
        <Flex justifyContent={"center"} alignContent={"center"}>
            <CircularProgress isIndeterminate color='green.300' />
        </Flex>
    )
}