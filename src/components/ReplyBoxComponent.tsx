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
    const { mutate } = useUser(endpoint + '/api/toka')
    const [edit, setEdit] = useState(props.edit)

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.post(endpoint + '/api/toka/', {
            username: user.name,
            post_content: comment,
            likes: 0,
            parent_post: props.parent_id,
        }).then(
            ()=>mutate()
        )
        setComment('')
        setEdit(false)
        console.log('You clicked submit.');
    }

    if (edit) {
        return (
            <Card
                w={'45rem'}
                h={'auto'}
                radius="lg" >
                <Flex
                    p={'sm'}
                    gap="sm"
                    justify={'space-between'}>
                    <Avatar
                        src={endpoint + user.user_image}
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
    } else {
        return null
    }
}