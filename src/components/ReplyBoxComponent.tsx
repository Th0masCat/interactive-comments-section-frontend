import { Card, Flex, Button, Textarea, Avatar } from '@mantine/core'
import axios from 'axios';
import { useState } from 'react';

import useUser from '../helpers/useUser';
import { endpoint } from '../helpers/useUser';

import { userState } from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';

export default function ReplyBoxComponent(props: any) {

    const user = useRecoilValue(userState)

    const [comment, setComment] = useState('');
    const { mutate } = useUser('/api/toka')

    const handleSubmit = (e: any) => {
        e.preventDefault();

        axios.post(endpoint + '/api/toka/', {
            username: user.name,
            post_content: comment,
            likes: 0,
            parent_post: props.parent_id? props.parent_id : null,
        });

        mutate(
            (data: any) => {
                if (props.parent_id === null) {
                    console.log("null rans");
                    return [
                        {
                            children: [],
                            data: {
                                id: data.length + 1,
                                username: user.name,
                                post_content: comment,
                                user_details: {
                                    user_image: user.user_image,
                                    name: user.name,
                                },
                                likes: 0,
                                parent_post: null,  
                            },
                            
                        },
                        ...data,
                    ];
                } else {
                    return addChildToNode(data, props.parent_id, {
                        id: data.length + 1,
                        username: user.name,
                        post_content: comment,
                        user_details: {
                            user_image: user.user_image,
                            name: user.name,
                        },
                        likes: 0,
                        parent_post: props.parent_id,
                    });
                }
            },
            true
        );

        props.closeModal();
        
        setComment('');
        console.log('You clicked submit.');
    };

    const addChildToNode = (data: any, parentId: any, childNode: any) => {
        return data.map((node: any) => {
            if (node.data.id === parentId) {
                const updatedChildren = [{ children: [], data: childNode }, ...node.children];
                return { ...node, children: updatedChildren };
            } else if (node.children) {
                const updatedChildren = addChildToNode(node.children, parentId, childNode);
                return { ...node, children: updatedChildren };
            }
            return node;
        });
    };

    return (
        <Card
            w={props.w}
            h={'auto'}
            radius="lg" >
            <Flex
                p={'sm'}
                gap="sm"
                justify={'space-between'}>
                <Avatar
                    src={user.isLoggedin ? endpoint + user.user_image : ''}
                    alt="user_avatar"
                    sx={{ borderRadius: '20rem' }}
                />
                <Textarea
                    placeholder='Write a reply...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    size='sm'
                    autosize
                    radius={'md'}
                    w={'100%'}
                    minRows={3}
                >
                </Textarea>
                <Button
                    disabled={comment === ''}
                    onClick={(e) => handleSubmit(e)}
                    size='sm'
                    styles={(theme) => ({
                        root: {
                            backgroundColor: theme.colors.sitePrimary[0],
                            color: theme.colors.siteNeutral[4],
                            '&:hover': {
                                backgroundColor: theme.colors.siteNeutral[3],
                                color: theme.colors.sitePrimary[0],
                            }
                        }
                    })

                    }
                >
                    Reply
                </Button>
            </Flex>
        </Card>
    );

}