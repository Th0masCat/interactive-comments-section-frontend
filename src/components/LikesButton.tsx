import { useState } from "react";
import { Button, Flex, Image, Text } from "@mantine/core";
import plusIcon from "../../images/icon-plus.svg";
import minusIcon from "../../images/icon-minus.svg";



export default function LikesButton() {
    const [likes, setLikes] = useState(0);

    const subtractLike = () => {
        if (likes > 0) {
            setLikes(likes - 1);
        }
    };

    const addLike = () => {
        setLikes(likes + 1);
    };


    return (
        <Button.Group orientation="vertical" sx={
            {
                borderRadius: "0.5rem",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                margin: "0.5rem",
            }
        }
            bg={"siteNeutral.2"}
        >
            <Button w={"100%"} color={"siteNeutral.2"} onClick={addLike}>
                <Text color={"sitePrimary.0"} weight={'bold'}>
                    +
                </Text>
            </Button>

            <Text color={"sitePrimary.0"} weight={'bold'}>
                {likes}
            </Text>
            
            <Button w={'100%'} color={"siteNeutral.2"} onClick={subtractLike}>
                <Text color={"sitePrimary.0"} weight={'bold'}>
                    -
                </Text>
            </Button>
        </Button.Group>
    );
}