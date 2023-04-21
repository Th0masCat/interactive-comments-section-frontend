import { useState } from "react";
import { Button, Text } from "@mantine/core";

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
                width: "fit-content",
                borderRadius: "0.5rem",
                alignItems: "center",
                margin: "0.5rem",
            }
        }

        >
            <Button
                w={"100%"}
                color={"siteNeutral.2"}
                onClick={addLike}>
                <Text
                    color={"sitePrimary.2"}
                    weight={'bold'}>
                    +
                </Text>
            </Button>

            <Text
                align="center"
                color={"sitePrimary.0"}
                weight={'bold'}
                w={"100%"}
                bg={"siteNeutral.2"}>
                {likes}
            </Text>

            <Button
                w={'100%'}
                color={"siteNeutral.2"}
                onClick={subtractLike}>
                <Text
                    color={"sitePrimary.2"}
                    weight={'bold'}>
                    -
                </Text>
            </Button>
        </Button.Group>
    );
}