import { useEffect, useState } from "react";
import { Button, Text } from "@mantine/core";

import { endpoint } from '../helpers/useUser'
import { userState } from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';

import axios from "axios";

import useUser from '../helpers/useUser'

export default function LikesButton(props: any) {
    const { mutate } = useUser('/api/toka')
    const [likes, setLikes] = useState(props.like);
    const user = useRecoilValue(userState)

    const updateNodeInData = (data: any, nodeId: any, likes: any) => {
        return data.map((node: any) => {
            if (node.data.id === nodeId) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        likes: likes
                    }
                }
            } else if (node.children) {
                const updatedChildren = updateNodeInData(node.children, nodeId, likes);
                return {
                    ...node,
                    children: updatedChildren
                };
            }
            return node;
        });
    };

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
        mutate(
            (data: any) => {
                return updateNodeInData(data, props.id, likes);
            }, true
        )
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