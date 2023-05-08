import { useEffect, useState } from "react";
import { Button, Text } from "@mantine/core";

import { endpoint } from '../helpers/useUser'
import { userState } from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';

import axios from "axios";

export default function LikesButton(props: any) {
    const [likes, setLikes] = useState(props.like);
    const user = useRecoilValue(userState)

    useEffect(() => {
        if (props.id === undefined) {
            return
        }
        axios.put(endpoint + '/api/toka/', {
            id: props.id,
            likes: likes
        }).catch((error) => {
            console.log(error)
        })
    }, [likes])

    const subtractLike = () => {
        if (!user.isLoggedin) {
            alert('You must be logged in to like.')
            return
        }

        if (likes > 0) {
            setLikes(likes - 1);
        }
    };

    const addLike = () => {
        if (!user.isLoggedin) {
            alert('You must be logged in to like.')
            return
        }
        setLikes(likes + 1);
    };

    return (
        <Button.Group
            orientation="vertical"
            sx={
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
                onClick={addLike}
            >
                <Text
                    color={"sitePrimary.2"}
                    weight={'bold'}
                >
                    +
                </Text>
            </Button>

            <Text
                align="center"
                color={"sitePrimary.0"}
                weight={'bold'}
                w={"100%"}
                bg={"siteNeutral.2"}
            >
                {likes}
            </Text>

            <Button
                w={'100%'}
                color={"siteNeutral.2"}
                onClick={subtractLike}
            >
                <Text
                    color={"sitePrimary.2"}
                    weight={'bold'}
                >
                    -
                </Text>
            </Button>
        </Button.Group>
    );
}