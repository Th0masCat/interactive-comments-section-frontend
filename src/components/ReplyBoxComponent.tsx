import { Card, Flex, Button, Textarea, Avatar } from '@mantine/core'
import avatar from '../../images/avatars/image-amyrobson.png';
import axios from 'axios';
import { useState } from 'react';

import useUser from '../helpers/useUser';

const endpoint = 'https://th0mascat.pythonanywhere.com/'

export default function ReplyBoxComponent() {
    
    const [comment, setComment] = useState('');

    const { mutate } = useUser(endpoint+'/api/toka')

    const handleSubmit = (e:any) => {
        e.preventDefault();
        axios.post(endpoint + '/api/toka/', {
            username: 'Sahil',
            post_content: comment,
            likes: 0,
        })
        setComment('')
        mutate()

        console.log('You clicked submit.');
    }

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
                    src={avatar}
                    alt="Amy Robson"
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
                    minRows={3}>
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

                    }>
                    Reply
                </Button>
            </Flex>
        </Card>
    );
}