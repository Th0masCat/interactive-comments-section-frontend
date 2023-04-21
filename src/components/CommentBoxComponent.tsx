import { Card, Flex, Text, Image, Button, Container, Box, Grid } from '@mantine/core'
import LikesButton from './LikesButton'
import avatar from '../../images/avatars/image-amyrobson.png'
import replyIcon from '../../images/icon-reply.svg'
import deleteIcon from '../../images/icon-delete.svg'
import editIcon from '../../images/icon-edit.svg'

export default function CommentBoxComponent() {
    const user = true;

    return (
        <Card display={'flex'} w={'50rem'} h={'auto'} radius="lg" p="md">
            <LikesButton />
            <Flex direction="column" p="md" gap={'lg'}>
                <Grid align={"center"} gutter={'sm'}>
                    <Grid.Col span={1}>
                        <Image
                            width={'2rem'}
                            src={avatar}
                            alt="Amy Robson" />
                    </Grid.Col>

                    <Grid.Col span={'content'}>
                        <Text weight={'bold'} color='siteNeutral.0' >
                            Amy Robinson
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
                            color='siteNeutral.1'>
                            One month ago
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

                                    <Button styles={(theme) => ({
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
                                span={'auto'}
                                offset={2}
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
                <Text color='siteNeutral.1'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ad sapiente tempora quae voluptates impedit id maiores suscipit. 
                    Consequuntur cupiditate voluptate enim! Quasi, veniam voluptas? Temporibus, perspiciatis. 
                    Tempora adipisci voluptatem ipsam.
                </Text>
            </Flex>
        </Card>
    );
}