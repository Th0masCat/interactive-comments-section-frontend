import { Card, Flex, Text, Image, Button, Grid, Avatar, Textarea } from '@mantine/core'
import LikesButton from './LikesButton'
import replyIcon from '../../images/icon-reply.svg'
import deleteIcon from '../../images/icon-delete.svg'
import editIcon from '../../images/icon-edit.svg'
import Moment from 'react-moment'
import axios from 'axios';
import { useState } from 'react';

import useUser from '../helpers/useUser'


const endpoint = 'https://th0mascat.pythonanywhere.com/'


export default function CommentBoxComponent(props: any) {
    const user = true;


    const [comment, setComment] = useState('');

    const { mutate } = useUser(endpoint + '/api/toka')

    const [edit, setEdit] = useState(false)

    const handleEditClick = () => {
        setComment(props.content)
        setEdit(!edit)
    }

    const handleEdit = () => {
        axios.put(endpoint + '/api/toka/', {
            id: props.id,
            post_content: comment
        })
        mutate()

        setEdit(false)
        console.log('Edit')
    }

    const handleDelete = () => {
        axios.delete(endpoint + '/api/toka/', {
            data: {
                id: props.id
            }
        })
        mutate()
        console.log('Delete')
    }

    return (
        <Card display={'flex'} w={'50rem'} h={'auto'} radius="lg" p="md">
            <LikesButton like={props.like} />
            <Flex
                align={'flex-end'}
                direction="column"
                p="md"
                gap={'lg'}
                w={"100%"}>
                <Grid
                    grow
                    align={"center"}
                    w={"100%"}>
                    <Grid.Col
                        display={'flex'}
                        span={'auto'}
                        sx={{ justifyContent: 'center' }}>

                        <Avatar
                            radius="xl"
                            src={props.img}
                            alt="profile_img" />
                    </Grid.Col>

                    <Grid.Col span={'content'}>
                        <Text align='left' weight={'bold'} color='siteNeutral.0' >
                            {props.name}
                            {
                                user ?
                                    <Text
                                        size={'xs'}
                                        ml={"0.5rem"}
                                        p="5px"
                                        span
                                        bg={'sitePrimary.0'}
                                        color='white'
                                        align='center'
                                        sx={{ borderRadius: '2px' }}>
                                        you
                                    </Text>
                                    :
                                    null
                            }
                        </Text>

                    </Grid.Col>

                    <Grid.Col span={3}>
                        <Text
                            align='left'
                            color='siteNeutral.1'>
                            <Moment fromNow date={props.time} />
                        </Text>
                    </Grid.Col>
                    {
                        user ?
                            <Grid.Col
                                display={'flex'}
                                span={5}
                                sx={{ justifyContent: "flex-end" }}>
                                <Button.Group>
                                    <Button
                                        onClick={handleDelete}
                                        styles={(theme) => ({
                                            root: {
                                                backgroundColor: 'transparent',
                                                color: theme.colors.sitePrimary[1],
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                }
                                            }
                                        })

                                        }
                                        leftIcon={<Image src={deleteIcon} />}>
                                        Delete
                                    </Button>

                                    <Button
                                        onClick={handleEditClick}
                                        styles={(theme) => ({
                                            root: {
                                                backgroundColor: 'transparent',
                                                color: theme.colors.sitePrimary[0],
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                }
                                            }
                                        })

                                        }
                                        leftIcon={<Image src={editIcon} />}>
                                        Edit
                                    </Button>
                                </Button.Group>
                            </Grid.Col>
                            :
                            <Grid.Col
                                display={'flex'}
                                span={2}
                                offset={4}
                                sx={{ justifyContent: "flex-end" }}>
                                <Button
                                    styles={(theme) => ({
                                        root: {
                                            backgroundColor: 'transparent',
                                            color: theme.colors.sitePrimary[0],
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                            }
                                        }
                                    })

                                    } leftIcon={<Image src={replyIcon} />}>
                                    Reply
                                </Button>
                            </Grid.Col>
                    }

                </Grid>
                <Text
                    align='left'
                    w={"100%"}
                    color='siteNeutral.1'>
                    {edit ?
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
                        : props.content
                    }
                </Text>
                {edit ?
                    <Button
                        onClick={handleEdit}
                        disabled={comment === ''}
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
                        Update
                    </Button>
                    : null
                }
            </Flex>
        </Card>
    );
}