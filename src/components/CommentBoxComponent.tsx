import { Card, Flex, Text, Image, Button, Container, Box, Grid } from '@mantine/core'
import LikesButton from './LikesButton'
import avatar from '../../images/avatars/image-amyrobson.png'
import replyIcon from '../../images/icon-reply.svg'

export default function CommentBoxComponent() {
    return (
        <Card display={'flex'} w={'30rem'} h={'auto'} radius="lg" p="md">
                <LikesButton />
            <Flex direction="column" p="md" gap={'sm'}>

                    <Grid align={"center"} grow gutter={'sm'}>
                        <Grid.Col span={'content'}><Image width={'2rem'} src={avatar} alt="Amy Robson" />
                        </Grid.Col>
                        
                        <Grid.Col span={'content'}>
                        <Text weight={'bold'} size={'0.7rem'} color='siteNeutral.0'>Amy Robinson</Text>
                        </Grid.Col>

                        <Grid.Col span={'content'}>
                        <Text size={'0.7rem'} color='siteNeutral.1'>One month ago</Text>
                        </Grid.Col>

                        <Grid.Col span={'content'} offset={1}>

                        <Button  styles={(theme) => ({
                            root: {
                                backgroundColor: 'transparent',
                                color: theme.colors.sitePrimary[0],
                                alignSelf: 'flex-end',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                }
                            }
                        })
                        
                        } leftIcon={<Image src={replyIcon} />}>Reply</Button>
                    
                    </Grid.Col>
                    </Grid>
                    <Text size={'0.7rem'} color='siteNeutral.1'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sapiente tempora quae voluptates impedit id maiores suscipit. Consequuntur cupiditate voluptate enim! Quasi, veniam voluptas? Temporibus, perspiciatis. Tempora adipisci voluptatem ipsam.
                    </Text>
        </Flex>
        </Card>
    );
}